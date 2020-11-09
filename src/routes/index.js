const express = require('express');
const api = express.Router();
const productController = require('../../controllers/products')

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const upload = multer({ storage: storage })

api.get('/products', productController.getAllProducts);
api.post('/products', upload.single('productImage'), productController.addProduct);
api.get('/products/:productId', productController.getProductById);
api.patch('/products/:productId', productController.updateProduct);
api.delete('/products/:productId', productController.deleteProduct)

module.exports = api;