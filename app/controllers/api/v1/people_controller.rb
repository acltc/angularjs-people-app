class Api::V1::PeopleController < ApplicationController
  def index
    @people = Person.all
  end

  def create
    @person = Person.new(person_params)
    if @person.save
    else
      render json: { errors: @person.errors.full_messages }, status: 422
    end
  end

  private

  def person_params
    params.require(:person).permit(:name, :details)
  end
end
