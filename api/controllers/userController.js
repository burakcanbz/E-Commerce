const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

/**
 * @description Auth user & get token
 * @route POST /api/users/login
 * @access Public
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or Password");
  }
});

/**
 * @description Register user
 * @route POST /api/users
 * @access Public
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @description Logout user - clear cookie
 * @route POST /api/users/logout
 * @access Private
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
});

/**
 * @description Get user profile
 * @route GET /api/users/profile
 * @access Private
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

/**
 * @description Update user profile
 * @route PUT /api/users/profile
 * @access Private
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.updateUserProfile = asyncHandler(async (req, res) => {
  
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    }
    else {
      res.status(404);
      throw new Error('User not found');
    }
});

/**
 * @description Get users
 * @route GET /api/users
 * @access Private/Admin
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.getUsers = asyncHandler(async (req, res) => {
  res.send('get users')
});

/**
 * @description Get user by ID
 * @route GET /api/users/:id
 * @access Private/Admin
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

/**
 * @description Delete user
 * @route DELETE /api/users/:id
 * @access Private/Admin
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

/**
 * @description Update user
 * @route PUT /api/users/:id
 * @access Private/Admin
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.updateUser = asyncHandler(async (req, res) => {
  res.send("update users");
});
