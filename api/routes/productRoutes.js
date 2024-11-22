const express = require('express')
<<<<<<< HEAD
const { getProducts, getProductsById, getHighestRateProducts, getPaginatedProducts, getProductCategories, getCategorizedProducts } = require('../controllers/productController')
=======
const { getProducts, getProductsById, getHighestRateProducts } = require('../controllers/productController')
>>>>>>> master

const router = express.Router();

router.get('/', getProducts);
<<<<<<< HEAD
router.get('/paginated', getPaginatedProducts);
router.get('/categories', getProductCategories);
router.get('/categorized', getCategorizedProducts)
=======
>>>>>>> master
router.get('/topRatedProducts', getHighestRateProducts);
router.get('/:id', getProductsById);

module.exports = { productRoutes: router };