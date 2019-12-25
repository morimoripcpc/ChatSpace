class UsersController < ApplicationController
  def index
    @users = user.all
  end
end
