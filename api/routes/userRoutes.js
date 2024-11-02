const { authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile,
    updateUserProfile, 
    getUsers, 
    getUserById, 
    deleteUser, 
    updateUser} = require('../controllers/userController');
const express = require('express');

const router = express.Router();

router.route('/').post(registerUser).get(getUsers)
router.post('/logout', logoutUser);
router.post('/login', authUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);

module.exports = { userRouter: router}