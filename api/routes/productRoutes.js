const express = require('express')
const { getProducts, getProductsById, getHighestRateProducts, getPaginatedProducts, getProductCategories, getCategorizedProducts } = require('../controllers/productController')

const router = express.Router();

router.get('/', getProducts);
router.get('/paginated', getPaginatedProducts);
router.get('/categories', getProductCategories);
router.get('/categorized', getCategorizedProducts)
router.get('/topRatedProducts', getHighestRateProducts);
router.get('/:id', getProductsById);

module.exports = { productRoutes: router };