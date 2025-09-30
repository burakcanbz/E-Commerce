const asyncHandler = require('express-async-handler');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');

exports.addReview = asyncHandler(async (req, res) => {
  res.send("Add review");
});

exports.getReviews = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const review = await Review.find({ product: productId }).populate('user', 'name email');       
  res.status(200).json({reviews: review});
});

exports.deleteReview = asyncHandler(async (req, res) => {
  res.send("Delete review");
});

exports.getReviewById = asyncHandler(async (req, res) => {
  res.send("Get review by id");
});
