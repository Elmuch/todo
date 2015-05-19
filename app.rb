require 'sinatra' 
require 'sinatra/activerecord' #ORM - activerecord in sinatras
require 'sinatra/base'


set :database, {adapter: "sqlite3", database: "todo.sqlite3"}

class Item < ActiveRecord::Base
  # Item model
end 

get "/" do 
  "ahoy"
end 

# Create

post "/items" do 
  puts params['items']
end

# Edit
put "/item/:id" do 

end 

# Delete

delete "/item/:id" do

end 