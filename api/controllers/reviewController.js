const asyncHandler = require('express-async-handler');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');

exports.addReview = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  console.log("Product ID:", productId);
  const { rating, comment } = req.body;
  console.log(comment);
  
  if (!rating || !comment) {
    res.status(400);
    throw new Error('Rating and comment are required');
  }
    const user = await User.findById(req.user._id).select('-password');
    const review = new Review({
      user: req.user._id,
      product: productId,
      rating: Number(rating),
      comment});
    const createdReview = await review.save();
    res.status(201).json(createdReview);
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
