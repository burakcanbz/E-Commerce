const asyncHandler = require("express-async-handler");
const stripe = require('../config/payment'); 

exports.paymentConfig = asyncHandler(async (req, res) => {
  res.status(200).json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

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
