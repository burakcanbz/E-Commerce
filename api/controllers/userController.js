const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
exports.authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else{
        res.status(401);
        throw new Error('Invalid email or Password')
    }
});


// @desc Register user
// @route POST /api/users
// @access Public
exports.registerUser = asyncHandler(async (req, res) => {
    res.send('register user');
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private
exports.logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user');
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
exports.getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile');
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile');
});

// @desc Get users
// @route GET /api/users
// @access Private/Admin
exports.getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
exports.getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id');
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
    res.send('update users');
});