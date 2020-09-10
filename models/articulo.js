var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ArticuloSchema = Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  state: Boolean,
  image: String

})

module.exports = mongoose.model('Articulo', ArticuloSchema)
