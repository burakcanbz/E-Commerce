const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

/**
 * @description Create new Order
 * @route POST /api/orders
 * @access Private
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

/**
 * @description Get logged in user orders
 * @route GET /api/orders/myorders
 * @access Private
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

/**
 * @description Get Order by ID
 * @route POST /api/orders/:id
 * @access Private
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); // Get the user's name and email by populating the user field, which stores a reference to the User model
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

/**
 * @description Update the order to paid status
 * @route PUT /api/orders/:id/pay
 * @access Private
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await Order.findById(req.params.id);
    console.log(order);
    if (order) {
      order.isPaid = true;
      order.paidAmount = amount;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.user.email_address,
      };
      const updatedOrder = await order.save();
      res.status(200).json({ updatedOrder });
    } else {
      res.status(404);
      throw new Error("Order not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving order" });
  }
});

/**
 * @description Update order to delivered
 * @route PUT /api/orders/:id/deliver
 * @access Private/Admin
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

/**
 * @description get orders
 * @route GET /api/orders
 * @access Private/Admin
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.getOrders = asyncHandler(async (req, res) => {
  res.send("get all Orders");
});
