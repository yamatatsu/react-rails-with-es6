json.array!(@tags) do |tag|
  json.extract! tag, :id, :color
  json.url tag_url(tag, format: :json)
end
