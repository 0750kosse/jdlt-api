const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  supplier: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  productImage: {
    type: String,
    required: true

  }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product;