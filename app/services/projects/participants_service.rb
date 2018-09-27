# frozen_string_literal: true

module Projects
  class ParticipantsService < BaseService
    include Users::ParticipableService

    def execute(noteable)
      @noteable = noteable

      participants = noteable_owner + participants_in_noteable + all_members + groups + project_members
      participants.uniq
    end

    def project_members
      @project_members ||= sorted(project.team.members)
    end

    def all_members
      [{ username: "all", name: "所有项目和组成员", count: project_members.count }]
    end
  end
end
