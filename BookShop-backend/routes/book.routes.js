const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

/**
 * @route   GET /api/books/search
 * @desc    Search books by various criteria
 * @query   isbn, title, category, author, publisher
 * @access  Public
 */
router.get('/search', bookController.searchBooks);

/**
 * @route   GET /api/books/:isbn
 * @desc    Get book details by ISBN
 * @access  Public
 */
router.get('/:isbn', bookController.getBookByISBN);

/**
 * @route   GET /api/books/categories/list
 * @desc    Get all book categories
 * @access  Public
 */
router.get('/categories/list', bookController.getCategories);

/**
 * @route   GET /api/books/publishers/list
 * @desc    Get all publishers
 * @access  Public
 */
router.get('/publishers/list', bookController.getPublishers);

module.exports = router;
