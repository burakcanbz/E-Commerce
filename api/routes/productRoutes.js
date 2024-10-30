const express = require('express')
const { getProducts, getProductsById } = require('../controller/productController')

router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductsById);

module.exports = { productRouter: router };