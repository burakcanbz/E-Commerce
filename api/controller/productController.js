const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

// @desc Fetch all products
// @route GET /api/products
// @access Public
exports.getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products);
})

// @desc Fetch a products
// @route GET /api/products/:id
// @access Public
exports.getProductsById = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id).exec();

    if (product) {
        return res.json(product)
    }

    res.status(404)
    throw new Error('Product not found');
})