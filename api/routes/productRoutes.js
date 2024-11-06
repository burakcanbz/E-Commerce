const express = require('express')
const { getProducts, getProductsById } = require('../controllers/productController')

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductsById);

module.exports = { productRoutes: router };