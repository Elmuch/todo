require 'sinatra' 
require 'sinatra/activerecord' #ORM - activerecord in sinatras
require 'sinatra/base'


set :database, {adapter: "sqlite3", database: "todo.sqlite3"}