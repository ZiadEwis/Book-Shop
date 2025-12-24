const db = require('../config/database');

/**
 * Add a new book
 */
exports.addBook = async (req, res) => {
  // TODO: Implement add book
  // SQL Reference: See queries.sql - Query #1
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * Update book details
 */
exports.updateBook = async (req, res) => {
  // TODO: Implement update book
  // SQL Reference: See queries.sql - Query #2
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * Update book stock quantity
 */
exports.updateStock = async (req, res) => {
  // TODO: Implement update stock
  // SQL Reference: See queries.sql - Query #3
  // Note: Triggers will handle validation and auto-ordering
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * Manually place order to publisher
 */
exports.placeOrder = async (req, res) => {
  // TODO: Implement place order
  // SQL Reference: See queries.sql - Query #4
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * Confirm an order
 */
exports.confirmOrder = async (req, res) => {
  // TODO: Implement confirm order
  // SQL Reference: See queries.sql - Query #5
  // Note: Trigger will automatically update stock
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * Get total number of times a book has been ordered
 */
exports.getBookOrderCount = async (req, res) => {
  // TODO: Implement get book order count
  // SQL Reference: See queries.sql - Query #10
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * Get total sales for previous month
 */
exports.getSalesPreviousMonth = async (req, res) => {
  // TODO: Implement get sales previous month
  // SQL Reference: See queries.sql - Query #6
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * Get total sales for specific date
 */
exports.getSalesByDate = async (req, res) => {
  // TODO: Implement get sales by date
  // SQL Reference: See queries.sql - Query #7
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * Get top 5 customers (last 3 months)
 */
exports.getTopCustomers = async (req, res) => {
  // TODO: Implement get top customers
  // SQL Reference: See queries.sql - Query #8
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * Get top 10 selling books (last 3 months)
 */
exports.getTopSellingBooks = async (req, res) => {
  // TODO: Implement get top selling books
  // SQL Reference: See queries.sql - Query #9
  res.status(501).json({ error: 'Not Implemented' });
};
