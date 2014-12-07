require 'rails_helper'

describe 'GET /api/v1/people.json' do

  it 'should return all people' do
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

describe 'POST /api/v1/people' do

  it 'should create new person with name and details' do
    
    post 'api/v1/people.json', {
      person: {
        name: 'Joan',
        details: 'CTO'
      }
    }.to_json, {'Content-Type' => 'application/json'}

    person = Person.last

    expect(person.name).to eq("Joan")
    expect(person.details).to eq("CTO")
  end

  it 'should return a 422 status code and appropriate error messages when invalid' do
    
    post 'api/v1/people.json', {
      person: { # name is missing
        details: 'CTO'
      }
    }.to_json, {'Content-Type' => 'application/json'}

    expect(response.status).to eq(422)

    expect(JSON.parse(response.body)).to eq({
      "errors" => ["Name can't be blank"]
    })
  end
end