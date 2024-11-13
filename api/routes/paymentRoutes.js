const {
  paymentConfig,
  orderPaymentStripe,
} = require("../controllers/paymentController");
const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/config").get(protect, paymentConfig);
router.route("/payment-intent").post(protect, orderPaymentStripe);

module.exports = { paymentRoutes: router };
