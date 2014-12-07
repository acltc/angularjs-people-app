require 'rails_helper'

describe 'GET /api/v1/people.json' do

  it 'should return all people in json' do
    person_1 = Person.create(:name => "Joan Yates", :details => "Software Developer")
    person_2 = Person.create(:name => "John Johnson", :details => "Software Developer Pretender")

    get "/api/v1/people.json"

    expect(JSON.parse(response.body)).to eq(
      [
        {
          "name" => "Joan Yates",
          "details" => "Software Developer"
        },
        {
          "name" => "John Johnson",
          "details" => "Software Developer Pretender"
        }
      ]
    )

  end

  it 'should return an empty array if there is no data' do
    get "/api/v1/people.json"

    expect(JSON.parse(response.body)).to eq([])
  end

end

describe 'POST /api/v1/people.json' do

  it 'should save a person to the database' do
    post 'api/v1/people.json', { 
      person: {
        name: 'Beatrice Haley',
        details: 'CTO'
      }
    }.to_json, {'Content-Type' => 'application/json'}

    person = Person.last

    expect(person.name).to eq('Beatrice Haley')
    expect(person.details).to eq('CTO')
  end

  it 'should return the attributes of the newly created person as json' do
    post 'api/v1/people.json', { 
      person: {
        name: 'Beatrice Haley',
        details: 'CTO'
      }
    }.to_json, {'Content-Type' => 'application/json'}

    expect(JSON.parse(response.body)).to eq({"name" => "Beatrice Haley", "details" => "CTO"})
  end

  it 'should not save person to database if data is invalid' do
    post 'api/v1/people.json', { 
      person: {
        name: 'Beatrice Haley'
      }
    }.to_json, {'Content-Type' => 'application/json'}

    expect(Person.find_by(:name => "Beatrice Haley")).to eq(nil)
  end

  it 'should return a 422 and appropriate error message when data is invalid' do
    post 'api/v1/people.json', { 
      person: {
        name: 'Beatrice Haley'
      }
    }.to_json, {'Content-Type' => 'application/json'}

    expect(response.status).to eq(422)
    expect(JSON.parse(response.body)).to eq({"errors"=>["Details can't be blank"]})
  end
end