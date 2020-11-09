const Product = require('../models/products');

async function getAllProducts(req, res, next) {
  try {
    const products = await Product.find({});
    const count = products.length
    if (!products) { return res.status(404).json({ message: 'no products available' }) }
    else { return res.status(200).json({ message: `we have ${count} products`, products, }) }
  } catch (e) { next(e) }
}

async function addProduct(req, res, next) {
  const product = {
    supplier: req.body.supplier,
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  }
  try {
    const newProduct = await Product.create(product);
    if (!newProduct) { return res.status(404).json({ message: 'there was an error' }) }
    else { res.status(201).json({ message: 'product created', newProduct }) }
  } catch (e) { next(e) }
}

async function getProductById(req, res, next) {
  try {
    const productById = await Product.findById(req.params.productId).populate('product');
    if (!productById) res.status(404).json({ message: 'Could not find it' })
    else res.status(200).json({ message: `the product is : ${productById}`, productById })
  } catch (e) { next(e) }
}

async function updateProduct(req, res, next) {
  try {
    const productById = await Product.findByIdAndUpdate({ _id: req.params.productId }, { $set: req.body }, { new: true });
    if (!productById) res.status(404).json({ message: 'No product with such ID' })
    else res.status(200).json({ message: 'Product is updated', productById })
  } catch (e) { next(e) }
}

async function deleteProduct(req, res, next) {
  try {
    const productById = await Product.findByIdAndDelete({ _id: req.params.productId });
    if (!productById) res.status(404).json({ message: 'Could not delete' })
    else res.status(200).json({ message: 'Deleted product', productById })
  } catch (e) { next(e) }
}

module.exports = { getAllProducts, addProduct, getProductById, updateProduct, deleteProduct }