const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");


// @desc Create new Order
// @route POST /api/orders
// @access Private
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

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc Get Order by ID
// @route POST /api/orders/:id
// @access Private
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); // Get the user's name and email by populating the user field, which stores a reference to the User model
  console.log(order);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAmount = amount;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();

    res
      .status(200)
      .json({ ...updatedOrder, clientSecret: process.env.STRIPE_SECRET_KEY });
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

// @desc Update order to paid
// @route POST /api/orders/:id/pay
// @access Private/Admin
exports.getOrders = asyncHandler(async (req, res) => {
  res.send("get all Orders");
});

