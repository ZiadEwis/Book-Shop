const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

/**
 * @route   POST /api/admin/books
 * @desc    Add a new book
 * @access  Admin only
 */
router.post('/books', adminController.addBook);

/**
 * @route   PUT /api/admin/books/:isbn
 * @desc    Update book details
 * @access  Admin only
 */
router.put('/books/:isbn', adminController.updateBook);

/**
 * @route   PUT /api/admin/books/:isbn/stock
 * @desc    Update book stock quantity
 * @access  Admin only
 */
router.put('/books/:isbn/stock', adminController.updateStock);

/**
 * @route   POST /api/admin/orders
 * @desc    Manually place an order to publisher
 * @access  Admin only
 */
router.post('/orders', adminController.placeOrder);

/**
 * @route   PUT /api/admin/orders/:orderId/confirm
 * @desc    Confirm an order
 * @access  Admin only
 */
router.put('/orders/:orderId/confirm', adminController.confirmOrder);

/**
 * @route   GET /api/admin/orders/:isbn/count
 * @desc    Get total number of times a book has been ordered
 * @access  Admin only
 */
router.get('/orders/:isbn/count', adminController.getBookOrderCount);

/**
 * @route   GET /api/admin/reports/sales/previous-month
 * @desc    Get total sales for previous month
 * @access  Admin only
 */
router.get('/reports/sales/previous-month', adminController.getSalesPreviousMonth);

/**
 * @route   GET /api/admin/reports/sales/by-date
 * @desc    Get total sales for specific date
 * @access  Admin only
 */
router.get('/reports/sales/by-date', adminController.getSalesByDate);

/**
 * @route   GET /api/admin/reports/customers/top
 * @desc    Get top 5 customers (last 3 months)
 * @access  Admin only
 */
router.get('/reports/customers/top', adminController.getTopCustomers);

/**
 * @route   GET /api/admin/reports/books/top-selling
 * @desc    Get top 10 selling books (last 3 months)
 * @access  Admin only
 */
router.get('/reports/books/top-selling', adminController.getTopSellingBooks);

module.exports = router;
