# Homepage (Root path)
get '/' do
  erb :index
end

# I need to be able to:

### - READ contacts #############################################

get '/contacts' do
  @contact = Contact.all.as_json
  json @contact
end

### - CREATE a contact ##########################################

get '/contacts/new' do
  erb :index
end

post '/contacts/new' do
  @contact = Contact.new(params)

  if @contact.save
    @contact.to_json # last line is returned/sent as 'results' line 30 (js)
  end
end

### - FIND contacts #############################################

get '/contacts/search' do
  # '/contacts/search?id=1'

  # id = params['id'].to_json
  @contact = Contact.find(params['id'])
  puts @contact
  json @contact
end


### - UPDATE contacts #############################################
# post '/contacts/edit/:id' do
#   @contact = Contact.find(params[:id])
#   data = params.slice('firstname', 'lastname', 'email')
#   @contact.update(data)

# end



# ### - DELETE contacts #############################################

get 'contacts/delete' do
  erb :index
end


post '/contacts/delete' do
  @contact = Contact.find(params['id'])
  puts @contact
  @contact.destroy
end

# post '/contacts/delete/:id' do
#   @contact = Contact.find(params[:id])

#   @contact.destroy

# end
