const express = require('express');
const api = express.Router();
const productController = require('../../controllers/products')

api.get('/products', productController.getAllProducts);
api.post('/products', productController.addProduct);
api.get('/products/:productId', productController.getProductById);
api.patch('/products/:productId', productController.updateProduct);
api.delete('/products/:productId', productController.deleteProduct)

module.exports = api;