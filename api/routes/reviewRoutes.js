const express = require('express');
const { addReview, getReviews, deleteReview, getReviewById } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/product/:id').get(getReviews).post(protect, addReview);
// router.route('/:id').get(protect, getReviewById);
router.route('/:id').delete(protect, deleteReview);

module.exports = { reviewRoutes: router };