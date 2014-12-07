require 'rails_helper'

describe 'GET /api/v1/people.json' do

  it 'should return all employees' do
    person_1 = Person.create(name: "Jill Smith", details: "Software Engineer")
    person_2 = Person.create(name: "Joel Yates", details: "Software Engineer Pretender")

    get "/api/v1/people.json"

    expect(JSON.parse(response.body)).to eq(
      [
        {
          'name' => person_1.name,
          'details' => person_1.details
        },
        {
          'name' => person_2.name,
          'details' => person_2.details
        }
      ]
    )
  end

end