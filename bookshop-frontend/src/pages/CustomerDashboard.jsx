import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');

    if (!isAuthenticated || !userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);

    // Check if user is customer
    if (parsedUser.role !== 'customer') {
      navigate('/login');
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>📚 Customer Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>

      <div className="welcome-section">
        <h2>Welcome back, {user.first_name} {user.last_name}! 👋</h2>
        <p>Explore our collection and manage your orders</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>🔍 Browse Books</h3>
          <p>Search and discover new books</p>
          <button className="btn-primary">Browse Catalog</button>
        </div>

        <div className="dashboard-card">
          <h3>🛒 Shopping Cart</h3>
          <p>View items in your cart</p>
          <button className="btn-primary">View Cart</button>
        </div>

        <div className="dashboard-card">
          <h3>📦 My Orders</h3>
          <p>Track your order history</p>
          <button className="btn-primary">View Orders</button>
        </div>

        <div className="dashboard-card">
          <h3>👤 Profile</h3>
          <p>Update your account information</p>
          <button className="btn-primary">Edit Profile</button>
        </div>
      </div>

      <div className="user-info">
        <h3>Account Information</h3>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
      </div>
    </div>
  );
};

export default CustomerDashboard;
