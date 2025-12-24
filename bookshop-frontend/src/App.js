import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Default Route - Redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Customer Routes */}
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          {/* TODO: Add more customer routes
          <Route path="/customer/profile" element={<Profile />} />
          <Route path="/customer/cart" element={<ShoppingCart />} />
          <Route path="/customer/checkout" element={<Checkout />} />
          <Route path="/customer/orders" element={<OrderHistory />} />
          */}

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* TODO: Add more admin routes
          <Route path="/admin/books" element={<BookManagement />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/reports" element={<Reports />} />
          */}

          {/* TODO: Add book browsing routes
          <Route path="/books" element={<BookSearch />} />
          <Route path="/books/:isbn" element={<BookDetails />} />
          */}

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
