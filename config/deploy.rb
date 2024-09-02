# config valid for current version and patch releases of Capistrano
lock "~> 3.19.0"

set :application, "rizikove_kaceni_teplice"
set :repo_url, "git@github.com:jakubkouba/rizikove_kaceni_teplice.git"

# Default branch is :master
ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

set :deploy_to, "/home/git/apps/rizikovekaceni/#{fetch(:stage)}"

# Insltall Composer
SSHKit.config.command_map[:composer] = "composer"

ask :sync_db, 'no'
ask :sync_uploads, 'no'
ask :build_assets, 'yes'

namespace :deploy do
  after :starting, 'composer:install_executable'
  
  after :updated, 'set:env_file'
  after :updated, 'set:set_rw_permittion_to_plugin_folder'
  after :updated, 'set:symlink_to_wp_uploads'
  after :updated, 'set:copy_acf_repeater_plugin'
  after :updated, 'wpcli:db:push' if fetch(:sync_db) == 'yes'
  after :updated, 'wpcli:uploads:rsync:push' if fetch(:sync_uploads) == 'yes'

  if fetch(:build_assets) == 'yes'
  	before :updated, 'assets:bower_install'
  	before :updated, 'assets:build'
  end
end

set :deploy_via, :remote_cache
set :theme_dir, './web/app/themes/rizikove_kaceni_sage_based'

set :npm_target_path, -> { release_path.join(fetch(:theme_dir)) }
set :npm_flags, '--silent --no-progress'



namespace :set do
  desc 'Create symlink to .env file'
  task :env_file do
  	on roles(:app) do
  	  within release_path do
  	  	execute "ln -s #{shared_path}/.env #{release_path}/.env" 	
  	  end
  	end
  end

  desc 'Set symlink to wp uploads'
  task 'symlink_to_wp_uploads' do
	on roles(:app) do
	  within release_path do
		execute "ln -s #{fetch(:wpcli_remote_uploads_dir)} #{release_path}/web/app/uploads"
	  end
	end
  end

  desc 'Copy ACF repater plugin to plugins folder'
  task 'copy_acf_repeater_plugin' do
    on roles(:app) do
      within release_path do 
        execute "cp -r #{fetch(:wp_external_plugins)}/acf-repeater #{release_path}/web/app/plugins"
      end	
    end	
  end

  desc 'Set read and write permittions on plugins folder'
  task 'set_rw_permittion_to_plugin_folder'do
  	on roles(:app) do
  	  within release_path do 
        execute "sudo chmod -R 0777 #{release_path}/web/app/plugins"
      end	
  	end
  end
end

# WPCLI config
set :wpcli_local_url, 'http://rizikovekaceni-teplice.local:8080'
set :local_tmp_dir, 'tmp'
set :wpcli_backup_db, true # backup remote db
set :wpcli_remote_uploads_dir, '~/apps/rizikovekaceni/wp_uploads'
set :wp_external_plugins, '~/apps/rizikovekaceni/external-plugins'
set :wpcli_args, '--all-tables'

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure
