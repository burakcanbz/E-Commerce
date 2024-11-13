const express = require('express')
const { getProducts, getProductsById, getHighestRateProducts } = require('../controllers/productController')

const router = express.Router();

router.get('/', getProducts);
router.get('/topRatedProducts', getHighestRateProducts);
router.get('/:id', getProductsById);

module.exports = { productRoutes: router };