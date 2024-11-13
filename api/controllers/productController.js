const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

/**
 * @description Fetch all products
 * @route GET /api/products
 * @access Public
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products);
})

/**
 * @description Fetch a products
 * @route GET /api/products/:id
 * @access Public
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.getProductsById = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product) {
        return res.json(product)
    }

    res.status(404)
    throw new Error('Product not found');
})

/**
 * @description Fetch a highest rated products
 * @route GET /api/products/topRatedProducts
 * @access Public
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.getHighestRateProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1}).limit(3)
    res.json(products);
})