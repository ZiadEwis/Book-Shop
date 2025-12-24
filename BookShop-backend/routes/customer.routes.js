const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');

/**
 * @route   GET /api/customer/profile
 * @desc    Get customer profile
 * @access  Private (Customer)
 */
router.get('/profile', customerController.getProfile);

/**
 * @route   PUT /api/customer/profile
 * @desc    Update customer profile
 * @access  Private (Customer)
 */
router.put('/profile', customerController.updateProfile);

/**
 * @route   PUT /api/customer/password
 * @desc    Update customer password
 * @access  Private (Customer)
 */
router.put('/password', customerController.updatePassword);

/**
 * @route   GET /api/customer/cart
 * @desc    View shopping cart
 * @access  Private (Customer)
 */
router.get('/cart', customerController.getCart);

/**
 * @route   POST /api/customer/cart
 * @desc    Add item to cart
 * @access  Private (Customer)
 */
router.post('/cart', customerController.addToCart);

/**
 * @route   PUT /api/customer/cart/:cartId
 * @desc    Update cart item quantity
 * @access  Private (Customer)
 */
router.put('/cart/:cartId', customerController.updateCartItem);

/**
 * @route   DELETE /api/customer/cart/:cartId
 * @desc    Remove item from cart
 * @access  Private (Customer)
 */
router.delete('/cart/:cartId', customerController.removeFromCart);

/**
 * @route   POST /api/customer/checkout
 * @desc    Checkout shopping cart
 * @access  Private (Customer)
 */
router.post('/checkout', customerController.checkout);

/**
 * @route   GET /api/customer/orders
 * @desc    View order history
 * @access  Private (Customer)
 */
router.get('/orders', customerController.getOrderHistory);

module.exports = router;
