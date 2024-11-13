const asyncHandler = require("express-async-handler");
const stripe = require('../config/payment'); 

/**
 * @description get config of stripe
 * @route GET /api/payment/config
 * @access Private
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.paymentConfig = asyncHandler(async (req, res) => {
  res.status(200).json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

/**
 * @description POST payment
 * @route POST /api/payment/payment-intent
 * @access Private
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.orderPaymentStripe = asyncHandler(async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).json({
      error: {
        message: e.message,
      },
    });
  }
});
