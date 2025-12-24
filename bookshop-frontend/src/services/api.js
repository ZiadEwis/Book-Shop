import axios from 'axios';

// API base URL - update this to match your backend server
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// ============================================
// AUTHENTICATION API
// ============================================

/**
 * Register a new customer
 * @param {Object} customerData - Customer registration data
 * @returns {Promise} - API response
 */
export const register = async (customerData) => {
  const response = await api.post('/auth/register', customerData);
  return response.data;
};

/**
 * Login user (customer or admin)
 * @param {Object} credentials - Username and password
 * @returns {Promise} - API response with user data
 */
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

/**
 * Logout current user
 * @returns {Promise} - API response
 */
export const logout = async () => {
  // TODO: Implement logout API call
  // POST /api/auth/logout
  return Promise.reject(new Error('Not implemented'));
};

// ============================================
// BOOK API (Public)
// ============================================

/**
 * Search books by various criteria
 * @param {Object} searchParams - Search parameters (isbn, title, category, author, publisher)
 * @returns {Promise} - API response with book list
 */
export const searchBooks = async (searchParams) => {
  // TODO: Implement search books API call
  // GET /api/books/search
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Get book details by ISBN
 * @param {string} isbn - Book ISBN
 * @returns {Promise} - API response with book details
 */
export const getBookByISBN = async (isbn) => {
  // TODO: Implement get book API call
  // GET /api/books/:isbn
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Get all book categories
 * @returns {Promise} - API response with categories list
 */
export const getCategories = async () => {
  // TODO: Implement get categories API call
  // GET /api/books/categories/list
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Get all publishers
 * @returns {Promise} - API response with publishers list
 */
export const getPublishers = async () => {
  // TODO: Implement get publishers API call
  // GET /api/books/publishers/list
  return Promise.reject(new Error('Not implemented'));
};

// ============================================
// CUSTOMER API
// ============================================

/**
 * Get customer profile
 * @returns {Promise} - API response with profile data
 */
export const getProfile = async () => {
  // TODO: Implement get profile API call
  // GET /api/customer/profile
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Update customer profile
 * @param {Object} profileData - Updated profile data
 * @returns {Promise} - API response
 */
export const updateProfile = async (profileData) => {
  // TODO: Implement update profile API call
  // PUT /api/customer/profile
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Update customer password
 * @param {Object} passwordData - Old and new password
 * @returns {Promise} - API response
 */
export const updatePassword = async (passwordData) => {
  // TODO: Implement update password API call
  // PUT /api/customer/password
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Get shopping cart
 * @returns {Promise} - API response with cart items
 */
export const getCart = async () => {
  // TODO: Implement get cart API call
  // GET /api/customer/cart
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Add item to cart
 * @param {Object} item - Book ISBN and quantity
 * @returns {Promise} - API response
 */
export const addToCart = async (item) => {
  // TODO: Implement add to cart API call
  // POST /api/customer/cart
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Update cart item quantity
 * @param {number} cartId - Cart item ID
 * @param {number} quantity - New quantity
 * @returns {Promise} - API response
 */
export const updateCartItem = async (cartId, quantity) => {
  // TODO: Implement update cart item API call
  // PUT /api/customer/cart/:cartId
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Remove item from cart
 * @param {number} cartId - Cart item ID
 * @returns {Promise} - API response
 */
export const removeFromCart = async (cartId) => {
  // TODO: Implement remove from cart API call
  // DELETE /api/customer/cart/:cartId
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Checkout cart
 * @param {Object} checkoutData - Credit card information
 * @returns {Promise} - API response
 */
export const checkout = async (checkoutData) => {
  // TODO: Implement checkout API call
  // POST /api/customer/checkout
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Get order history
 * @returns {Promise} - API response with past orders
 */
export const getOrderHistory = async () => {
  // TODO: Implement get order history API call
  // GET /api/customer/orders
  return Promise.reject(new Error('Not implemented'));
};

// ============================================
// ADMIN API
// ============================================

/**
 * Add a new book
 * @param {Object} bookData - Book details
 * @returns {Promise} - API response
 */
export const addBook = async (bookData) => {
  // TODO: Implement add book API call
  // POST /api/admin/books
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Update book details
 * @param {string} isbn - Book ISBN
 * @param {Object} bookData - Updated book data
 * @returns {Promise} - API response
 */
export const updateBook = async (isbn, bookData) => {
  // TODO: Implement update book API call
  // PUT /api/admin/books/:isbn
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Update book stock
 * @param {string} isbn - Book ISBN
 * @param {number} quantityChange - Stock change amount
 * @returns {Promise} - API response
 */
export const updateStock = async (isbn, quantityChange) => {
  // TODO: Implement update stock API call
  // PUT /api/admin/books/:isbn/stock
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Place order to publisher
 * @param {Object} orderData - Order details
 * @returns {Promise} - API response
 */
export const placeOrder = async (orderData) => {
  // TODO: Implement place order API call
  // POST /api/admin/orders
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Confirm an order
 * @param {number} orderId - Order ID
 * @returns {Promise} - API response
 */
export const confirmOrder = async (orderId) => {
  // TODO: Implement confirm order API call
  // PUT /api/admin/orders/:orderId/confirm
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Get book order count
 * @param {string} isbn - Book ISBN
 * @returns {Promise} - API response with order count
 */
export const getBookOrderCount = async (isbn) => {
  // TODO: Implement get order count API call
  // GET /api/admin/orders/:isbn/count
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Get sales for previous month
 * @returns {Promise} - API response with sales total
 */
export const getSalesPreviousMonth = async () => {
  // TODO: Implement get previous month sales API call
  // GET /api/admin/reports/sales/previous-month
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Get sales by date
 * @param {string} date - Date (YYYY-MM-DD)
 * @returns {Promise} - API response with sales total
 */
export const getSalesByDate = async (date) => {
  // TODO: Implement get sales by date API call
  // GET /api/admin/reports/sales/by-date?date=YYYY-MM-DD
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Get top 5 customers
 * @returns {Promise} - API response with customer list
 */
export const getTopCustomers = async () => {
  // TODO: Implement get top customers API call
  // GET /api/admin/reports/customers/top
  return Promise.reject(new Error('Not implemented'));
};

/**
 * Get top 10 selling books
 * @returns {Promise} - API response with book list
 */
export const getTopSellingBooks = async () => {
  // TODO: Implement get top selling books API call
  // GET /api/admin/reports/books/top-selling
  return Promise.reject(new Error('Not implemented'));
};

export default api;
