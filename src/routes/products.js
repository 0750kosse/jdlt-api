const express = require('express');
const router = express.Router();
const Product = require('../models/products')

router.get('/', (req, res, next) => {
  Product.find({}).then((product) => {
    res.status(200).json({ product })
  })

})

router.post('/', (req, res, next) => {
  Product.create(req.body).then((product) => {
    res.status(200).send({ product })
  })

})

router.get('/:productID', (req, res, next) => {
  const id = req.params.productId;
  if (id === id) {
    res.status(200).json({
      message: 'Correct product',
      id: id
    })
  }
  res.status(200).json({
    message: 'Incorrect'
  })
})

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'updated product'
  })
})

router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'deleted product'
  })
})

module.exports = router;