const db = require('../config/database');

/**
 * Get customer profile
 */
exports.getProfile = async (req, res) => {
  // TODO: Implement get profile
  // Get customer_id from session/token, return customer details (without password)
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * Update customer profile
 */
exports.updateProfile = async (req, res) => {
  // TODO: Implement update profile
  // SQL Reference: See queries.sql - Query #13
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * Update customer password
 */
exports.updatePassword = async (req, res) => {
  // TODO: Implement update password
  // SQL Reference: See queries.sql - Query #14
  // Should hash password before storing
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * View shopping cart
 */
exports.getCart = async (req, res) => {
  // TODO: Implement get cart
  // SQL Reference: See queries.sql - Query #16 and #17
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * Add item to cart
 */
exports.addToCart = async (req, res) => {
  // TODO: Implement add to cart
  // SQL Reference: See queries.sql - Query #15
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * Update cart item quantity
 */
exports.updateCartItem = async (req, res) => {
  // TODO: Implement update cart item
  // SQL Reference: See queries.sql - Query #19
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * Remove item from cart
 */
exports.removeFromCart = async (req, res) => {
  // TODO: Implement remove from cart
  // SQL Reference: See queries.sql - Query #18
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * Checkout shopping cart
 */
exports.checkout = async (req, res) => {
  // TODO: Implement checkout
  // SQL Reference: See queries.sql - Query #20
  // This is a complex multi-step transaction
  res.status(501).json({ error: 'Not Implemented' });
};

/**
 * View order history
 */
exports.getOrderHistory = async (req, res) => {
  // TODO: Implement get order history
  // SQL Reference: See queries.sql - Query #21
  res.status(501).json({ error: 'Not Implemented' });
};
