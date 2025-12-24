const db = require('../config/database');

/**
 * Register a new customer
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.register = async (req, res) => {
  try {
    const { username, password, first_name, last_name, email, phone, shipping_address } = req.body;

    // Validate required fields
    if (!username || !password || !first_name || !last_name || !email) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Username, password, first name, last name, and email are required'
      });
    }

    // Check if username already exists
    const [existingUsername] = await db.query(
      'SELECT customer_id FROM Customers WHERE username = ?',
      [username]
    );

    if (existingUsername.length > 0) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Username already exists'
      });
    }

    // Check if email already exists
    const [existingEmail] = await db.query(
      'SELECT customer_id FROM Customers WHERE email = ?',
      [email]
    );

    if (existingEmail.length > 0) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Email already registered'
      });
    }

    // Insert new customer
    // SQL Reference: See queries.sql - Query #11
    // NOTE: In production, password should be hashed using bcrypt before storing
    const [result] = await db.query(
      'INSERT INTO Customers (username, password, first_name, last_name, email, phone, shipping_address) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, password, first_name, last_name, email, phone || null, shipping_address || null]
    );

    // Return success without password
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        customer_id: result.insertId,
        username,
        first_name,
        last_name,
        email,
        phone,
        shipping_address
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'An error occurred during registration'
    });
  }
};

/**
 * Login customer or admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Username and password are required'
      });
    }

    // Check if user is admin (hardcoded admin check)
    if (username === 'admin' && password === 'admin123') {
      return res.status(200).json({
        success: true,
        user: {
          username: 'admin',
          first_name: 'Admin',
          last_name: 'User',
          role: 'admin'
        },
        message: 'Admin login successful'
      });
    }

    // Query database for customer
    // SQL Reference: See queries.sql - Query #12
    const [rows] = await db.query(
      'SELECT customer_id, username, password, first_name, last_name, email, phone, shipping_address FROM Customers WHERE username = ?',
      [username]
    );

    // Check if user exists
    if (rows.length === 0) {
      return res.status(401).json({
        error: 'Authentication Failed',
        message: 'Invalid username or password'
      });
    }

    const customer = rows[0];

    // Verify password (plain text comparison - in production use bcrypt)
    // NOTE: In real implementation, use: await bcrypt.compare(password, customer.password)
    if (password !== customer.password) {
      return res.status(401).json({
        error: 'Authentication Failed',
        message: 'Invalid username or password'
      });
    }

    // Return user info without password
    const { password: _, ...userWithoutPassword } = customer;

    res.status(200).json({
      success: true,
      user: {
        ...userWithoutPassword,
        role: 'customer'
      },
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'An error occurred during login'
    });
  }
};

/**
 * Logout user and clear shopping cart
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.logout = async (req, res) => {
  // TODO: Implement logout
  // 1. Get customer_id from session/token
  // 2. Clear shopping cart for this customer
  // 3. Destroy session/token
  // 4. Return success message

  res.status(501).json({
    error: 'Not Implemented',
    message: 'Logout endpoint not yet implemented'
  });
};
