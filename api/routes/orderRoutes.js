const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders
} = require("../controllers/orderController");
const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
<<<<<<< HEAD
router.route('/myOrders').get(protect, getMyOrders);
=======
router.route('/myorders').get(protect, getMyOrders);
>>>>>>> master
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = { orderRoutes: router };
