const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Replace with your actual secret key

module.exports = stripe;