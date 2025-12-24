const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new customer
 * @access  Public
 */
router.post('/register', authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login customer or admin
 * @access  Public
 */
router.post('/login', authController.login);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user and clear shopping cart
 * @access  Private
 */
router.post('/logout', authController.logout);

module.exports = router;
