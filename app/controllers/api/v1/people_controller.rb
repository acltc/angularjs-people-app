class Api::V1::PeopleController < ApplicationController
  def index
    @people = Person.all
  end

  def create
    @person = Person.create(:name => params[:name], :details => params[:details])
  end
end
