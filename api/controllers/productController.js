<<<<<<< HEAD
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { categories } = require("../constants/categories");
=======
const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
>>>>>>> master

/**
 * @description Fetch all products
 * @route GET /api/products
 * @access Public
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */

exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

/**
 * @description Fetch paginated products with given params
 * @route GET /api/products?page=..&limit=..
 * @access Public
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */

exports.getPaginatedProducts = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 6;
  const startIndex = (page - 1) * limit;

  const electronics = await Product.find({ category: "Electronics" })
    .skip(startIndex)
    .limit(limit);
  const casual = await Product.find({ category: "Casual" })
    .skip(startIndex)
    .limit(limit);
  const totalProductCount = await Product.countDocuments();
  const totalPages = Math.ceil(totalProductCount / limit);

  res
    .status(200)
    .json({
      electronics,
      casual,
      categories: ["Electronics", "Casual"],
      totalProductCount,
      totalPages,
      currentPage: page,
    });
});

/**
 * @description Fetch categories
 * @route GET /api/products/categories
 * @access Public
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */

exports.getProductCategories = asyncHandler(async (req, res) => {
  res.status(200).json(categories);
});

/**
 * @description Fetch categorized products
 * @route GET /api/products/categorized?category=...
 * @access Public
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */

exports.getCategorizedProducts = asyncHandler(async (req, res) => {
  const searchedCategory = req.query.category;
  const page = req.query.page || 1;
  const limit = req.query.limit || 6;
  const startIndex = (page - 1) * limit;
  const products = await Product.find({ category: searchedCategory })
    .skip(startIndex)
    .limit(limit);
  const totalProductCount = await Product.countDocuments();
  const totalPages = Math.ceil(totalProductCount / limit);
  res.status(200).json({
    products,
    totalProductCount,
    totalPages,
  });
});

/**
 * @description Fetch a products
 * @route GET /api/products/:id
 * @access Public
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.getProductsById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (product) {
    return res.json(product);
  }

  res.status(404);
  throw new Error("Product not found");
});

/**
 * @description Fetch a highest rated products
 * @route GET /api/products/topRatedProducts
 * @access Public
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.getHighestRateProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});
