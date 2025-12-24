import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const AdminDashboard = () => {
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

    // Check if user is admin
    if (parsedUser.role !== 'admin') {
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
        <h1>⚙️ Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>

      <div className="welcome-section">
        <h2>Welcome, Administrator! 👨‍💼</h2>
        <p>Manage your bookstore operations</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>📚 Manage Books</h3>
          <p>Add, edit, and update book inventory</p>
          <button className="btn-primary">Manage Books</button>
        </div>

        <div className="dashboard-card">
          <h3>📦 Manage Orders</h3>
          <p>View and confirm publisher orders</p>
          <button className="btn-primary">View Orders</button>
        </div>

        <div className="dashboard-card">
          <h3>📊 Sales Reports</h3>
          <p>View sales analytics and reports</p>
          <button className="btn-primary">View Reports</button>
        </div>

        <div className="dashboard-card">
          <h3>👥 Customers</h3>
          <p>View customer information and stats</p>
          <button className="btn-primary">View Customers</button>
        </div>

        <div className="dashboard-card">
          <h3>🏢 Publishers</h3>
          <p>Manage publisher relationships</p>
          <button className="btn-primary">View Publishers</button>
        </div>

        <div className="dashboard-card">
          <h3>📈 Top Sellers</h3>
          <p>View top selling books and customers</p>
          <button className="btn-primary">View Stats</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
