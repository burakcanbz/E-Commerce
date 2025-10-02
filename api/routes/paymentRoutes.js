const {
  getPayment,
  refundPayment,
} = require("../controllers/paymentController");
const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(getPayment);
router.route("/refundPayment").post(refundPayment);

module.exports = { paymentRoutes: router };