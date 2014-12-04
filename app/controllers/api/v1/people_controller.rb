class Api::V1::PeopleController < ApplicationController
  def index
    @people = Person.all
  end

  def create
    @person = Person.create(person_params)
  end

  def search
    @people = Person.where("name like ?", "%#{params[:name]}%")
  end

  private

  def person_params
    params.require(:person).permit(:name, :details)
  end
end
