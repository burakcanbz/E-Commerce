const express = require('express')
const { getProducts, getProductsById, getHighestRateProducts, getPaginatedProducts, getProductCategories, getProductsByCategory, getCategorizedProductsByPagination } = require('../controllers/productController')

const router = express.Router();

router.get('/', getProducts);
router.get('/category', getProductsByCategory);
router.get('/paginated', getPaginatedProducts);
router.get('/categories', getProductCategories);
router.get('/categorized', getCategorizedProductsByPagination)
router.get('/topRatedProducts', getHighestRateProducts);
router.get('/:id', getProductsById);

module.exports = { productRoutes: router };