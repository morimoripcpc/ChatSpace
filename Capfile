require "capistrano/setup"
require "capistrano/deploy"
require 'capistrano/rbenv'
require 'capistrano/bundler'
require 'capistrano/rails/assets'
require 'capistrano/rails/migrations'
require 'capistrano3/unicorn'

Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }

	
server '18.177.176.200', user: 'ec2-user', roles: %w{app db web}