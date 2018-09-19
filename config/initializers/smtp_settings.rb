# This file is managed by gitlab-ctl. Manual changes will be
# erased! To change the contents below, edit /etc/gitlab/gitlab.rb
# and run `sudo gitlab-ctl reconfigure`.

if Rails.env.production?
  Gitlab::Application.config.action_mailer.delivery_method = :smtp

  ActionMailer::Base.delivery_method = :smtp
  ActionMailer::Base.smtp_settings = {
    authentication: :login,
    address: "smtp.exmail.qq.com",
    port: 465,
    user_name: "service@task.org.cn",
    password: "5273847Qyd",
    domain: "task.org.cn",
    enable_starttls_auto: true,
    tls: true,
    
    
    
    ca_file: "/opt/gitlab/embedded/ssl/certs/cacert.pem",
  }
end
