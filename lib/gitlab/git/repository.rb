require 'tempfile'
require 'forwardable'
require "rubygems/package"

module Gitlab
  module Git
    class Repository
      include Gitlab::Git::RepositoryMirroring
      include Gitlab::Git::Popen
      include Gitlab::EncodingHelper
      include Gitlab::Utils::StrongMemoize

      ALLOWED_OBJECT_DIRECTORIES_VARIABLES = %w[
        GIT_OBJECT_DIRECTORY
        GIT_ALTERNATE_OBJECT_DIRECTORIES
      ].freeze
      ALLOWED_OBJECT_RELATIVE_DIRECTORIES_VARIABLES = %w[
        GIT_OBJECT_DIRECTORY_RELATIVE
        GIT_ALTERNATE_OBJECT_DIRECTORIES_RELATIVE
      ].freeze
      SEARCH_CONTEXT_LINES = 3
      REV_LIST_COMMIT_LIMIT = 2_000
      # In https://gitlab.com/gitlab-org/gitaly/merge_requests/698
      # We copied these two prefixes into gitaly-go, so don't change these
      # or things will break! (REBASE_WORKTREE_PREFIX and SQUASH_WORKTREE_PREFIX)
      REBASE_WORKTREE_PREFIX = 'rebase'.freeze
      SQUASH_WORKTREE_PREFIX = 'squash'.freeze
      GITALY_INTERNAL_URL = 'ssh://gitaly/internal.git'.freeze
      GITLAB_PROJECTS_TIMEOUT = Gitlab.config.gitlab_shell.git_timeout
      EMPTY_REPOSITORY_CHECKSUM = '0000000000000000000000000000000000000000'.freeze

      NoRepository = Class.new(StandardError)
      InvalidRepository = Class.new(StandardError)
      InvalidBlobName = Class.new(StandardError)
      InvalidRef = Class.new(StandardError)
      GitError = Class.new(StandardError)
      DeleteBranchError = Class.new(StandardError)
      CreateTreeError = Class.new(StandardError)
      TagExistsError = Class.new(StandardError)
      ChecksumError = Class.new(StandardError)

      class << self
        def create_hooks(repo_path, global_hooks_path)
          local_hooks_path = File.join(repo_path, 'hooks')
          real_local_hooks_path = :not_found

          begin
            real_local_hooks_path = File.realpath(local_hooks_path)
          rescue Errno::ENOENT
            # real_local_hooks_path == :not_found
          end

          # Do nothing if hooks already exist
          unless real_local_hooks_path == File.realpath(global_hooks_path)
            if File.exist?(local_hooks_path)
              # Move the existing hooks somewhere safe
              FileUtils.mv(
                local_hooks_path,
                "#{local_hooks_path}.old.#{Time.now.to_i}")
            end

            # Create the hooks symlink
            FileUtils.ln_sf(global_hooks_path, local_hooks_path)
          end

          true
        end
      end

      # Directory name of repo
      attr_reader :name

      # Relative path of repo
      attr_reader :relative_path

      attr_reader :gitlab_projects, :storage, :gl_repository, :relative_path

      # This initializer method is only used on the client side (gitlab-ce).
      # Gitaly-ruby uses a different initializer.
      def initialize(storage, relative_path, gl_repository)
        @storage = storage
        @relative_path = relative_path
        @gl_repository = gl_repository

        @gitlab_projects = Gitlab::Git::GitlabProjects.new(
          storage,
          relative_path,
          global_hooks_path: Gitlab.config.gitlab_shell.hooks_path,
          logger: Rails.logger
        )

        @name = @relative_path.split("/").last
      end

      def ==(other)
        [storage, relative_path] == [other.storage, other.relative_path]
      end

      # This method will be removed when Gitaly reaches v1.1.
      def path
        File.join(
          Gitlab.config.repositories.storages[@storage].legacy_disk_path, @relative_path
        )
      end

      # Default branch in the repository
      def root_ref
        gitaly_ref_client.default_branch_name
      rescue GRPC::NotFound => e
        raise NoRepository.new(e.message)
      rescue GRPC::Unknown => e
        raise Gitlab::Git::CommandError.new(e.message)
      end

      # This method will be removed when Gitaly reaches v1.1.
      def rugged
        circuit_breaker.perform do
          Rugged::Repository.new(path, alternates: alternate_object_directories)
        end
      rescue Rugged::RepositoryError, Rugged::OSError
        raise NoRepository.new('no repository for such path')
      end

      def cleanup
        @rugged&.close
      end

      def circuit_breaker
        @circuit_breaker ||= Gitlab::Git::Storage::CircuitBreaker.for_storage(storage)
      end

      def exists?
        gitaly_repository_client.exists?
      end

      # Returns an Array of branch names
      # sorted by name ASC
      def branch_names
        wrapped_gitaly_errors do
          gitaly_ref_client.branch_names
        end
      end

      # Returns an Array of Branches
      def branches
        wrapped_gitaly_errors do
          gitaly_ref_client.branches
        end
      end

      def reload_rugged
        @rugged = nil
      end

      # Directly find a branch with a simple name (e.g. master)
      #
      def find_branch(name)
        wrapped_gitaly_errors do
          gitaly_ref_client.find_branch(name)
        end
      end

      def local_branches(sort_by: nil)
        wrapped_gitaly_errors do
          gitaly_ref_client.local_branches(sort_by: sort_by)
        end
      end

      # Returns the number of valid branches
      def branch_count
        wrapped_gitaly_errors do
          gitaly_ref_client.count_branch_names
        end
      end

      def expire_has_local_branches_cache
        clear_memoization(:has_local_branches)
      end

      def has_local_branches?
        strong_memoize(:has_local_branches) do
          uncached_has_local_branches?
        end
      end

      # Git repository can contains some hidden refs like:
      #   /refs/notes/*
      #   /refs/git-as-svn/*
      #   /refs/pulls/*
      # This refs by default not visible in project page and not cloned to client side.
      alias_method :has_visible_content?, :has_local_branches?

      # Returns the number of valid tags
      def tag_count
        wrapped_gitaly_errors do
          gitaly_ref_client.count_tag_names
        end
      end

      # Returns an Array of tag names
      def tag_names
        wrapped_gitaly_errors do
          gitaly_ref_client.tag_names
        end
      end

      # Returns an Array of Tags
      #
      def tags
        wrapped_gitaly_errors do
          gitaly_ref_client.tags
        end
      end

      # Returns true if the given ref name exists
      #
      # Ref names must start with `refs/`.
      def ref_exists?(ref_name)
        wrapped_gitaly_errors do
          gitaly_ref_exists?(ref_name)
        end
      end

      # Returns true if the given tag exists
      #
      # name - The name of the tag as a String.
      def tag_exists?(name)
        wrapped_gitaly_errors do
          gitaly_ref_exists?("refs/tags/#{name}")
        end
      end

      # Returns true if the given branch exists
      #
      # name - The name of the branch as a String.
      def branch_exists?(name)
        wrapped_gitaly_errors do
          gitaly_ref_exists?("refs/heads/#{name}")
        end
      end

      # Returns an Array of branch and tag names
      def ref_names
        branch_names + tag_names
      end

      def delete_all_refs_except(prefixes)
        wrapped_gitaly_errors do
          gitaly_ref_client.delete_refs(except_with_prefixes: prefixes)
        end
      end

      # Returns an Array of all ref names, except when it's matching pattern
      #
      # regexp - The pattern for ref names we don't want
      def all_ref_names_except(prefixes)
        rugged.references.reject do |ref|
          prefixes.any? { |p| ref.name.start_with?(p) }
        end.map(&:name)
      end

      def archive_metadata(ref, storage_path, project_path, format = "tar.gz", append_sha:)
        ref ||= root_ref
        commit = Gitlab::Git::Commit.find(self, ref)
        return {} if commit.nil?

        prefix = archive_prefix(ref, commit.id, project_path, append_sha: append_sha)

        {
          'ArchivePrefix' => prefix,
          'ArchivePath' => archive_file_path(storage_path, commit.id, prefix, format),
          'CommitId' => commit.id,
          'GitalyRepository' => gitaly_repository.to_h
        }
      end

      # This is both the filename of the archive (missing the extension) and the
      # name of the top-level member of the archive under which all files go
      def archive_prefix(ref, sha, project_path, append_sha:)
        append_sha = (ref != sha) if append_sha.nil?

        formatted_ref = ref.tr('/', '-')

        prefix_segments = [project_path, formatted_ref]
        prefix_segments << sha if append_sha

        prefix_segments.join('-')
      end
      private :archive_prefix

      # The full path on disk where the archive should be stored. This is used
      # to cache the archive between requests.
      #
      # The path is a global namespace, so needs to be globally unique. This is
      # achieved by including `gl_repository` in the path.
      #
      # Archives relating to a particular ref when the SHA is not present in the
      # filename must be invalidated when the ref is updated to point to a new
      # SHA. This is achieved by including the SHA in the path.
      #
      # As this is a full path on disk, it is not "cloud native". This should
      # be resolved by either removing the cache, or moving the implementation
      # into Gitaly and removing the ArchivePath parameter from the git-archive
      # senddata response.
      def archive_file_path(storage_path, sha, name, format = "tar.gz")
        # Build file path
        return nil unless name

        extension =
          case format
          when "tar.bz2", "tbz", "tbz2", "tb2", "bz2"
            "tar.bz2"
          when "tar"
            "tar"
          when "zip"
            "zip"
          else
            # everything else should fall back to tar.gz
            "tar.gz"
          end

        file_name = "#{name}.#{extension}"
        File.join(storage_path, self.gl_repository, sha, file_name)
      end
      private :archive_file_path

      # Return repo size in megabytes
      def size
        size = gitaly_repository_client.repository_size

        (size.to_f / 1024).round(2)
      end

      # Use the Rugged Walker API to build an array of commits.
      #
      # Usage.
      #   repo.log(
      #     ref: 'master',
      #     path: 'app/models',
      #     limit: 10,
      #     offset: 5,
      #     after: Time.new(2016, 4, 21, 14, 32, 10)
      #   )
      def log(options)
        default_options = {
          limit: 10,
          offset: 0,
          path: nil,
          follow: false,
          skip_merges: false,
          after: nil,
          before: nil,
          all: false
        }

        options = default_options.merge(options)
        options[:offset] ||= 0

        limit = options[:limit]
        if limit == 0 || !limit.is_a?(Integer)
          raise ArgumentError.new("invalid Repository#log limit: #{limit.inspect}")
        end

        wrapped_gitaly_errors do
          gitaly_commit_client.find_commits(options)
        end
      end

      # Gitaly migration: https://gitlab.com/gitlab-org/gitaly/issues/1233
      def new_commits(newrev)
        gitaly_migrate(:new_commits) do |is_enabled|
          if is_enabled
            gitaly_ref_client.list_new_commits(newrev)
          else
            refs = Gitlab::GitalyClient::StorageSettings.allow_disk_access do
              rev_list(including: newrev, excluding: :all).split("\n").map(&:strip)
            end

            Gitlab::Git::Commit.batch_by_oid(self, refs)
          end
        end
      end

      def new_blobs(newrev)
        return [] if newrev.blank? || newrev == ::Gitlab::Git::BLANK_SHA

        strong_memoize("new_blobs_#{newrev}") do
          wrapped_gitaly_errors do
            gitaly_ref_client.list_new_blobs(newrev, REV_LIST_COMMIT_LIMIT)
          end
        end
      end

      def count_commits(options)
        options = process_count_commits_options(options.dup)

        wrapped_gitaly_errors do
          if options[:left_right]
            from = options[:from]
            to = options[:to]

            right_count = gitaly_commit_client
              .commit_count("#{from}..#{to}", options)
            left_count = gitaly_commit_client
              .commit_count("#{to}..#{from}", options)

            [left_count, right_count]
          else
            gitaly_commit_client.commit_count(options[:ref], options)
          end
        end
      end

      # Counts the amount of commits between `from` and `to`.
      def count_commits_between(from, to, options = {})
        count_commits(from: from, to: to, **options)
      end

      # old_rev and new_rev are commit ID's
      # the result of this method is an array of Gitlab::Git::RawDiffChange
      def raw_changes_between(old_rev, new_rev)
        @raw_changes_between ||= {}

        @raw_changes_between[[old_rev, new_rev]] ||=
          begin
            return [] if new_rev.blank? || new_rev == Gitlab::Git::BLANK_SHA

            wrapped_gitaly_errors do
              gitaly_repository_client.raw_changes_between(old_rev, new_rev)
                .each_with_object([]) do |msg, arr|
                msg.raw_changes.each { |change| arr << ::Gitlab::Git::RawDiffChange.new(change) }
              end
            end
          end
      rescue ArgumentError => e
        raise Gitlab::Git::Repository::GitError.new(e)
      end

      # Returns the SHA of the most recent common ancestor of +from+ and +to+
      def merge_base(from, to)
        wrapped_gitaly_errors do
          gitaly_repository_client.find_merge_base(from, to)
        end
      end

      # Returns true is +from+ is direct ancestor to +to+, otherwise false
      def ancestor?(from, to)
        gitaly_commit_client.ancestor?(from, to)
      end

      def merged_branch_names(branch_names = [])
        return [] unless root_ref

        root_sha = find_branch(root_ref)&.target

        return [] unless root_sha

        branches = wrapped_gitaly_errors do
          gitaly_merged_branch_names(branch_names, root_sha)
        end

        Set.new(branches)
      end

      # Return an array of Diff objects that represent the diff
      # between +from+ and +to+.  See Diff::filter_diff_options for the allowed
      # diff options.  The +options+ hash can also include :break_rewrites to
      # split larger rewrites into delete/add pairs.
      def diff(from, to, options = {}, *paths)
        iterator = gitaly_commit_client.diff(from, to, options.merge(paths: paths))

        Gitlab::Git::DiffCollection.new(iterator, options)
      end

      # Returns a RefName for a given SHA
      def ref_name_for_sha(ref_path, sha)
        raise ArgumentError, "sha can't be empty" unless sha.present?

        gitaly_ref_client.find_ref_name(sha, ref_path)
      end

      # Get refs hash which key is is the commit id
      # and value is a Gitlab::Git::Tag or Gitlab::Git::Branch
      # Note that both inherit from Gitlab::Git::Ref
      def refs_hash
        return @refs_hash if @refs_hash

        @refs_hash = Hash.new { |h, k| h[k] = [] }

        (tags + branches).each do |ref|
          next unless ref.target && ref.name

          @refs_hash[ref.dereferenced_target.id] << ref.name
        end

        @refs_hash
      end

      # Returns url for submodule
      #
      # Ex.
      #   @repository.submodule_url_for('master', 'rack')
      #   # => git@localhost:rack.git
      #
      def submodule_url_for(ref, path)
        wrapped_gitaly_errors do
          gitaly_submodule_url_for(ref, path)
        end
      end

      # Return total commits count accessible from passed ref
      def commit_count(ref)
        wrapped_gitaly_errors do
          gitaly_commit_client.commit_count(ref)
        end
      end

      # Mimic the `git clean` command and recursively delete untracked files.
      # Valid keys that can be passed in the +options+ hash are:
      #
      # :d - Remove untracked directories
      # :f - Remove untracked directories that are managed by a different
      #      repository
      # :x - Remove ignored files
      #
      # The value in +options+ must evaluate to true for an option to take
      # effect.
      #
      # Examples:
      #
      #   repo.clean(d: true, f: true) # Enable the -d and -f options
      #
      #   repo.clean(d: false, x: true) # -x is enabled, -d is not
      def clean(options = {})
        strategies = [:remove_untracked]
        strategies.push(:force) if options[:f]
        strategies.push(:remove_ignored) if options[:x]

        # TODO: implement this method
      end

      def add_branch(branch_name, user:, target:)
        wrapped_gitaly_errors do
          gitaly_operation_client.user_create_branch(branch_name, user, target)
        end
      end

      def add_tag(tag_name, user:, target:, message: nil)
        wrapped_gitaly_errors do
          gitaly_operation_client.add_tag(tag_name, user, target, message)
        end
      end

      def update_branch(branch_name, user:, newrev:, oldrev:)
        gitaly_migrate(:operation_user_update_branch) do |is_enabled|
          if is_enabled
            gitaly_operation_client.user_update_branch(branch_name, user, newrev, oldrev)
          else
            Gitlab::GitalyClient::StorageSettings.allow_disk_access do
              OperationService.new(user, self).update_branch(branch_name, newrev, oldrev)
            end
          end
        end
      end

      def rm_branch(branch_name, user:)
        wrapped_gitaly_errors do
          gitaly_operation_client.user_delete_branch(branch_name, user)
        end
      end

      def rm_tag(tag_name, user:)
        wrapped_gitaly_errors do
          gitaly_operation_client.rm_tag(tag_name, user)
        end
      end

      def find_tag(name)
        tags.find { |tag| tag.name == name }
      end

      def merge(user, source_sha, target_branch, message, &block)
        wrapped_gitaly_errors do
          gitaly_operation_client.user_merge_branch(user, source_sha, target_branch, message, &block)
        end
      end

      def ff_merge(user, source_sha, target_branch)
        wrapped_gitaly_errors do
          gitaly_operation_client.user_ff_branch(user, source_sha, target_branch)
        end
      end

      def revert(user:, commit:, branch_name:, message:, start_branch_name:, start_repository:)
        args = {
          user: user,
          commit: commit,
          branch_name: branch_name,
          message: message,
          start_branch_name: start_branch_name,
          start_repository: start_repository
        }

        wrapped_gitaly_errors do
          gitaly_operation_client.user_revert(args)
        end
      end

      def check_revert_content(target_commit, source_sha)
        args = [target_commit.sha, source_sha]
        args << { mainline: 1 } if target_commit.merge_commit?

        revert_index = rugged.revert_commit(*args)
        return false if revert_index.conflicts?

        tree_id = revert_index.write_tree(rugged)
        return false unless diff_exists?(source_sha, tree_id)

        tree_id
      end

      def cherry_pick(user:, commit:, branch_name:, message:, start_branch_name:, start_repository:)
        args = {
          user: user,
          commit: commit,
          branch_name: branch_name,
          message: message,
          start_branch_name: start_branch_name,
          start_repository: start_repository
        }

        wrapped_gitaly_errors do
          gitaly_operation_client.user_cherry_pick(args)
        end
      end

      def diff_exists?(sha1, sha2)
        rugged.diff(sha1, sha2).size > 0
      end

      def user_to_committer(user)
        Gitlab::Git.committer_hash(email: user.email, name: user.name)
      end

      # Delete the specified branch from the repository
      def delete_branch(branch_name)
        wrapped_gitaly_errors do
          gitaly_ref_client.delete_branch(branch_name)
        end
      rescue CommandError => e
        raise DeleteBranchError, e
      end

      def delete_refs(*ref_names)
        wrapped_gitaly_errors do
          gitaly_delete_refs(*ref_names)
        end
      end

      # Create a new branch named **ref+ based on **stat_point+, HEAD by default
      #
      # Examples:
      #   create_branch("feature")
      #   create_branch("other-feature", "master")
      def create_branch(ref, start_point = "HEAD")
        wrapped_gitaly_errors do
          gitaly_ref_client.create_branch(ref, start_point)
        end
      end

      # If `mirror_refmap` is present the remote is set as mirror with that mapping
      def add_remote(remote_name, url, mirror_refmap: nil)
        wrapped_gitaly_errors do
          gitaly_remote_client.add_remote(remote_name, url, mirror_refmap)
        end
      end

      def remove_remote(remote_name)
        wrapped_gitaly_errors do
          gitaly_remote_client.remove_remote(remote_name)
        end
      end

      AUTOCRLF_VALUES = {
        "true" => true,
        "false" => false,
        "input" => :input
      }.freeze

      def autocrlf
        AUTOCRLF_VALUES[rugged.config['core.autocrlf']]
      end

      def autocrlf=(value)
        rugged.config['core.autocrlf'] = AUTOCRLF_VALUES.invert[value]
      end

      # Returns result like "git ls-files" , recursive and full file path
      #
      # Ex.
      #   repo.ls_files('master')
      #
      def ls_files(ref)
        gitaly_commit_client.ls_files(ref)
      end

      def copy_gitattributes(ref)
        wrapped_gitaly_errors do
          gitaly_repository_client.apply_gitattributes(ref)
        end
      end

      def info_attributes
        return @info_attributes if @info_attributes

        content = gitaly_repository_client.info_attributes
        @info_attributes = AttributesParser.new(content)
      end

      # Returns the Git attributes for the given file path.
      #
      # See `Gitlab::Git::Attributes` for more information.
      def attributes(path)
        info_attributes.attributes(path)
      end

      def gitattribute(path, name)
        attributes(path)[name]
      end

      # Check .gitattributes for a given ref
      #
      # This only checks the root .gitattributes file,
      # it does not traverse subfolders to find additional .gitattributes files
      #
      # This method is around 30 times slower than `attributes`, which uses
      # `$GIT_DIR/info/attributes`. Consider caching AttributesAtRefParser
      # and reusing that for multiple calls instead of this method.
      def attributes_at(ref, file_path)
        parser = AttributesAtRefParser.new(self, ref)
        parser.attributes(file_path)
      end

      def languages(ref = nil)
        wrapped_gitaly_errors do
          gitaly_commit_client.languages(ref)
        end
      end

      def license_short_name
        wrapped_gitaly_errors do
          gitaly_repository_client.license_short_name
        end
      end

      def with_repo_branch_commit(start_repository, start_branch_name)
        Gitlab::Git.check_namespace!(start_repository)
        start_repository = RemoteRepository.new(start_repository) unless start_repository.is_a?(RemoteRepository)

        return yield nil if start_repository.empty?

        if start_repository.same_repository?(self)
          yield commit(start_branch_name)
        else
          start_commit_id = start_repository.commit_id(start_branch_name)

          return yield nil unless start_commit_id

          if branch_commit = commit(start_commit_id)
            yield branch_commit
          else
            with_repo_tmp_commit(
              start_repository, start_branch_name, start_commit_id) do |tmp_commit|
              yield tmp_commit
            end
          end
        end
      end

      def with_repo_tmp_commit(start_repository, start_branch_name, sha)
        source_ref = start_branch_name

        unless Gitlab::Git.branch_ref?(source_ref)
          source_ref = "#{Gitlab::Git::BRANCH_REF_PREFIX}#{source_ref}"
        end

        tmp_ref = fetch_ref(
          start_repository,
          source_ref: source_ref,
          target_ref: "refs/tmp/#{SecureRandom.hex}"
        )

        yield commit(sha)
      ensure
        delete_refs(tmp_ref) if tmp_ref
      end

      def fetch_source_branch!(source_repository, source_branch, local_ref)
        wrapped_gitaly_errors do
          gitaly_repository_client.fetch_source_branch(source_repository, source_branch, local_ref)
        end
      end

      def compare_source_branch(target_branch_name, source_repository, source_branch_name, straight:)
        tmp_ref = "refs/tmp/#{SecureRandom.hex}"

        return unless fetch_source_branch!(source_repository, source_branch_name, tmp_ref)

        Gitlab::Git::Compare.new(
          self,
          target_branch_name,
          tmp_ref,
          straight: straight
        )
      ensure
        delete_refs(tmp_ref)
      end

      def write_ref(ref_path, ref, old_ref: nil, shell: true)
        ref_path = "#{Gitlab::Git::BRANCH_REF_PREFIX}#{ref_path}" unless ref_path.start_with?("refs/") || ref_path == "HEAD"

        wrapped_gitaly_errors do
          gitaly_repository_client.write_ref(ref_path, ref, old_ref, shell)
        end
      end

      # This method, fetch_ref, is used from within
      # Gitlab::Git::OperationService. OperationService will eventually only
      # exist in gitaly-ruby. When we delete OperationService from gitlab-ce
      # we can also remove fetch_ref.
      def fetch_ref(source_repository, source_ref:, target_ref:)
        Gitlab::Git.check_namespace!(source_repository)
        source_repository = RemoteRepository.new(source_repository) unless source_repository.is_a?(RemoteRepository)

        args = %W(fetch --no-tags -f #{GITALY_INTERNAL_URL} #{source_ref}:#{target_ref})
        message, status = run_git(args, env: source_repository.fetch_env)
        raise Gitlab::Git::CommandError, message if status != 0

        target_ref
      end

      # Refactoring aid; allows us to copy code from app/models/repository.rb
      def commit(ref = 'HEAD')
        Gitlab::Git::Commit.find(self, ref)
      end

      def empty?
        !has_visible_content?
      end

      def fetch_repository_as_mirror(repository)
        wrapped_gitaly_errors do
          gitaly_remote_client.fetch_internal_remote(repository)
        end
      end

      def blob_at(sha, path)
        Gitlab::Git::Blob.find(self, sha, path) unless Gitlab::Git.blank_ref?(sha)
      end

      # Items should be of format [[commit_id, path], [commit_id1, path1]]
      def batch_blobs(items, blob_size_limit: Gitlab::Git::Blob::MAX_DATA_DISPLAY_SIZE)
        Gitlab::Git::Blob.batch(self, items, blob_size_limit: blob_size_limit)
      end

      def fsck
        msg, status = gitaly_repository_client.fsck

        raise GitError.new("Could not fsck repository: #{msg}") unless status.zero?
      end

      def create_from_bundle(bundle_path)
        gitaly_repository_client.create_from_bundle(bundle_path)
      end

      def create_from_snapshot(url, auth)
        gitaly_repository_client.create_from_snapshot(url, auth)
      end

      def rebase(user, rebase_id, branch:, branch_sha:, remote_repository:, remote_branch:)
        wrapped_gitaly_errors do
          gitaly_operation_client.user_rebase(user, rebase_id,
                                            branch: branch,
                                            branch_sha: branch_sha,
                                            remote_repository: remote_repository,
                                            remote_branch: remote_branch)
        end
      end

      def rebase_in_progress?(rebase_id)
        wrapped_gitaly_errors do
          gitaly_repository_client.rebase_in_progress?(rebase_id)
        end
      end

      def squash(user, squash_id, branch:, start_sha:, end_sha:, author:, message:)
        wrapped_gitaly_errors do
          gitaly_operation_client.user_squash(user, squash_id, branch,
              start_sha, end_sha, author, message)
        end
      end

      def squash_in_progress?(squash_id)
        wrapped_gitaly_errors do
          gitaly_repository_client.squash_in_progress?(squash_id)
        end
      end

      def push_remote_branches(remote_name, branch_names, forced: true)
        success = @gitlab_projects.push_branches(remote_name, GITLAB_PROJECTS_TIMEOUT, forced, branch_names)

        success || gitlab_projects_error
      end

      def delete_remote_branches(remote_name, branch_names)
        success = @gitlab_projects.delete_remote_branches(remote_name, branch_names)

        success || gitlab_projects_error
      end

      def delete_remote_branches(remote_name, branch_names)
        success = @gitlab_projects.delete_remote_branches(remote_name, branch_names)

        success || gitlab_projects_error
      end

      def bundle_to_disk(save_path)
        wrapped_gitaly_errors do
          gitaly_repository_client.create_bundle(save_path)
        end

        true
      end

      def multi_action(
        user, branch_name:, message:, actions:,
        author_email: nil, author_name: nil,
        start_branch_name: nil, start_repository: self)

        wrapped_gitaly_errors do
          gitaly_operation_client.user_commit_files(user, branch_name,
              message, actions, author_email, author_name,
              start_branch_name, start_repository)
        end
      end

      def write_config(full_path:)
        return unless full_path.present?

        # This guard avoids Gitaly log/error spam
        raise NoRepository, 'repository does not exist' unless exists?

        set_config('gitlab.fullpath' => full_path)
      end

      def set_config(entries)
        wrapped_gitaly_errors do
          gitaly_repository_client.set_config(entries)
        end
      end

      def delete_config(*keys)
        wrapped_gitaly_errors do
          gitaly_repository_client.delete_config(keys)
        end
      end

      def gitaly_repository
        Gitlab::GitalyClient::Util.repository(@storage, @relative_path, @gl_repository)
      end

      def gitaly_ref_client
        @gitaly_ref_client ||= Gitlab::GitalyClient::RefService.new(self)
      end

      def gitaly_commit_client
        @gitaly_commit_client ||= Gitlab::GitalyClient::CommitService.new(self)
      end

      def gitaly_repository_client
        @gitaly_repository_client ||= Gitlab::GitalyClient::RepositoryService.new(self)
      end

      def gitaly_operation_client
        @gitaly_operation_client ||= Gitlab::GitalyClient::OperationService.new(self)
      end

      def gitaly_remote_client
        @gitaly_remote_client ||= Gitlab::GitalyClient::RemoteService.new(self)
      end

      def gitaly_blob_client
        @gitaly_blob_client ||= Gitlab::GitalyClient::BlobService.new(self)
      end

      def gitaly_conflicts_client(our_commit_oid, their_commit_oid)
        Gitlab::GitalyClient::ConflictsService.new(self, our_commit_oid, their_commit_oid)
      end

      def gitaly_migrate(method, status: Gitlab::GitalyClient::MigrationStatus::OPT_IN, &block)
        Gitlab::GitalyClient.migrate(method, status: status, &block)
      rescue GRPC::NotFound => e
        raise NoRepository.new(e)
      rescue GRPC::InvalidArgument => e
        raise ArgumentError.new(e)
      rescue GRPC::BadStatus => e
        raise CommandError.new(e)
      end

      def wrapped_gitaly_errors(&block)
        yield block
      rescue GRPC::NotFound => e
        raise NoRepository.new(e)
      rescue GRPC::InvalidArgument => e
        raise ArgumentError.new(e)
      rescue GRPC::BadStatus => e
        raise CommandError.new(e)
      end

      def clean_stale_repository_files
        wrapped_gitaly_errors do
          gitaly_repository_client.cleanup if exists?
        end
      rescue Gitlab::Git::CommandError => e # Don't fail if we can't cleanup
        Rails.logger.error("Unable to clean repository on storage #{storage} with relative path #{relative_path}: #{e.message}")
        Gitlab::Metrics.counter(
          :failed_repository_cleanup_total,
          'Number of failed repository cleanup events'
        ).increment
      end

      def branch_names_contains_sha(sha)
        gitaly_ref_client.branch_names_contains_sha(sha)
      end

      def tag_names_contains_sha(sha)
        gitaly_ref_client.tag_names_contains_sha(sha)
      end

      def search_files_by_content(query, ref)
        return [] if empty? || query.blank?

        safe_query = Regexp.escape(query)
        ref ||= root_ref

        gitaly_repository_client.search_files_by_content(ref, safe_query)
      end

      def can_be_merged?(source_sha, target_branch)
        if target_sha = find_branch(target_branch)&.target
          !gitaly_conflicts_client(source_sha, target_sha).conflicts?
        else
          false
        end
      end

      def search_files_by_name(query, ref)
        safe_query = Regexp.escape(query.sub(%r{^/*}, ""))
        ref ||= root_ref

        return [] if empty? || safe_query.blank?

        gitaly_repository_client.search_files_by_name(ref, safe_query)
      end

      def find_commits_by_message(query, ref, path, limit, offset)
        wrapped_gitaly_errors do
          gitaly_commit_client
            .commits_by_message(query, revision: ref, path: path, limit: limit, offset: offset)
            .map { |c| commit(c) }
        end
      end

      def shell_blame(sha, path)
        output, _status = run_git(%W(blame -p #{sha} -- #{path}))
        output
      end

      def last_commit_for_path(sha, path)
        wrapped_gitaly_errors do
          gitaly_commit_client.last_commit_for_path(sha, path)
        end
      end

      def rev_list(including: [], excluding: [], options: [], objects: false, &block)
        args = ['rev-list']

        args.push(*rev_list_param(including))

        exclude_param = *rev_list_param(excluding)
        if exclude_param.any?
          args.push('--not')
          args.push(*exclude_param)
        end

        args.push('--objects') if objects

        if options.any?
          args.push(*options)
        end

        run_git!(args, lazy_block: block)
      end

      def checksum
        # The exists? RPC is much cheaper, so we perform this request first
        raise NoRepository, "Repository does not exists" unless exists?

        gitaly_repository_client.calculate_checksum
      rescue GRPC::NotFound
        raise NoRepository # Guard against data races.
      end

      private

      def uncached_has_local_branches?
        wrapped_gitaly_errors do
          gitaly_repository_client.has_local_branches?
        end
      end

      def run_git(args, chdir: path, env: {}, nice: false, lazy_block: nil, &block)
        cmd = [Gitlab.config.git.bin_path, *args]
        cmd.unshift("nice") if nice

        object_directories = alternate_object_directories
        if object_directories.any?
          env['GIT_ALTERNATE_OBJECT_DIRECTORIES'] = object_directories.join(File::PATH_SEPARATOR)
        end

        circuit_breaker.perform do
          popen(cmd, chdir, env, lazy_block: lazy_block, &block)
        end
      end

      def run_git!(args, chdir: path, env: {}, nice: false, lazy_block: nil, &block)
        output, status = run_git(args, chdir: chdir, env: env, nice: nice, lazy_block: lazy_block, &block)

        raise GitError, output unless status.zero?

        output
      end

      def run_git_with_timeout(args, timeout, env: {})
        circuit_breaker.perform do
          popen_with_timeout([Gitlab.config.git.bin_path, *args], timeout, path, env)
        end
      end

      def git_env_for_user(user)
        {
          'GIT_COMMITTER_NAME' => user.name,
          'GIT_COMMITTER_EMAIL' => user.email,
          'GL_ID' => Gitlab::GlId.gl_id(user),
          'GL_PROTOCOL' => Gitlab::Git::Hook::GL_PROTOCOL,
          'GL_REPOSITORY' => gl_repository
        }
      end

      def gitaly_merged_branch_names(branch_names, root_sha)
        qualified_branch_names = branch_names.map { |b| "refs/heads/#{b}" }

        gitaly_ref_client.merged_branches(qualified_branch_names)
          .reject { |b| b.target == root_sha }
          .map(&:name)
      end

      def process_count_commits_options(options)
        if options[:from] || options[:to]
          ref =
            if options[:left_right] # Compare with merge-base for left-right
              "#{options[:from]}...#{options[:to]}"
            else
              "#{options[:from]}..#{options[:to]}"
            end

          options.merge(ref: ref)

        elsif options[:ref] && options[:left_right]
          from, to = options[:ref].match(/\A([^\.]*)\.{2,3}([^\.]*)\z/)[1..2]

          options.merge(from: from, to: to)
        else
          options
        end
      end

      def gitaly_submodule_url_for(ref, path)
        # We don't care about the contents so 1 byte is enough. Can't request 0 bytes, 0 means unlimited.
        commit_object = gitaly_commit_client.tree_entry(ref, path, 1)

        return unless commit_object && commit_object.type == :COMMIT

        gitmodules = gitaly_commit_client.tree_entry(ref, '.gitmodules', Gitlab::Git::Blob::MAX_DATA_DISPLAY_SIZE)
        return unless gitmodules

        found_module = GitmodulesParser.new(gitmodules.data).parse[path]

        found_module && found_module['url']
      end

      def alternate_object_directories
        relative_object_directories.map { |d| File.join(path, d) }
      end

      def relative_object_directories
        Gitlab::Git::HookEnv.all(gl_repository).values_at(*ALLOWED_OBJECT_RELATIVE_DIRECTORIES_VARIABLES).flatten.compact
      end

      def sort_branches(branches, sort_by)
        case sort_by
        when 'name'
          branches.sort_by(&:name)
        when 'updated_desc'
          branches.sort do |a, b|
            b.dereferenced_target.committed_date <=> a.dereferenced_target.committed_date
          end
        when 'updated_asc'
          branches.sort do |a, b|
            a.dereferenced_target.committed_date <=> b.dereferenced_target.committed_date
          end
        else
          branches
        end
      end

      # Returns true if the given ref name exists
      #
      # Ref names must start with `refs/`.
      def gitaly_ref_exists?(ref_name)
        gitaly_ref_client.ref_exists?(ref_name)
      end

      def gitaly_copy_gitattributes(revision)
        gitaly_repository_client.apply_gitattributes(revision)
      end

      def gitaly_delete_refs(*ref_names)
        gitaly_ref_client.delete_refs(refs: ref_names) if ref_names.any?
      end

      def gitlab_projects_error
        raise CommandError, @gitlab_projects.output
      end

      def rev_list_param(spec)
        spec == :all ? ['--all'] : spec
      end
    end
  end
end
