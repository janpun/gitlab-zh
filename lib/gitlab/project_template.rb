module Gitlab
  class ProjectTemplate
    attr_reader :title, :name, :description, :preview

    def initialize(name, title, description, preview)
      @name, @title, @description, @preview = name, title, description, preview
    end

    alias_method :logo, :name

    def file
      archive_path.open
    end

    def archive_path
      Rails.root.join("vendor/project_templates/#{name}.tar.gz")
    end

    def clone_url
      "https://gitlab.com/gitlab-org/project-templates/#{name}.git"
    end

    def ==(other)
      name == other.name && title == other.title
    end

    TEMPLATES_TABLE = [
      ProjectTemplate.new('rails', 'Ruby on Rails', '包括MVC结构，Gemfile，Rakefile以及许多其他结构，以帮助您入门。', 'https://gitlab.com/gitlab-org/project-templates/rails'),
      ProjectTemplate.new('spring', 'Spring', '包括MVC结构，mvnw和pom.xml，以帮助您入门。', 'https://gitlab.com/gitlab-org/project-templates/spring'),
      ProjectTemplate.new('express', 'NodeJS Express', '包含MVC结构，以帮助您入门。', 'https://gitlab.com/gitlab-org/project-templates/express')
    ].freeze

    class << self
      def all
        TEMPLATES_TABLE
      end

      def find(name)
        all.find { |template| template.name == name.to_s }
      end

      def archive_directory
        Rails.root.join("vendor_directory/project_templates")
      end
    end
  end
end
