class Api::V1::PeopleController < ApplicationController
  def index
    @people = Person.all
  end

  def create
    if @person = Person.create(person_params)
    else
      render json: { errors: @person.errors.full_messages }, status: 422
    end
  end

  private

  def person_params
    params.require(:person).permit(:name, :details)
  end
end
