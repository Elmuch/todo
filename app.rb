require 'sinatra' 
require 'sinatra/activerecord' 
require 'sinatra/base'
require 'byebug'
require 'json'

set :database, {adapter: "sqlite3", database: "todo.sqlite3"}

class Item < ActiveRecord::Base
  # Item model
end 

get "/" do 
  erb :todo
end 

# Get
get '/items' do 
  @items = Item.all
  @items.to_json
end 


# Create

post "/items" do 
  item = JSON.parse(params[:item])
  @item = Item.new(description: item['description'], done: item['done'])
  
  if @item.save
    @item.to_json
  end
end

# Put
put "/item/:id" do 
  @item =  @item = Item.find(set_params['id'].to_i)
  @item.update_attributes(set_params)
end 

# Delete

delete "/item/:id" do
  @item = Item.find(params['id'].to_i)
  if @item.destroy
    @item.to_json
  end
end 

def set_params
  params["item"]
end