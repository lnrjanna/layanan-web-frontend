import React, { useState } from 'react';
import './DashboardAdmin.css';
import { FaBox, FaBolt, FaPlusSquare, FaUsers } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
  const [showSidebar, setShowSidebar] = useState(false); // <-- Pindah ke atas
    const navigate = useNavigate();                        // <-- Pindah ke atas
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.role !== 'admin') {
      return <Navigate to="/signin" />;
    }

    const handleLogout = () => {
      localStorage.removeItem('user');
      navigate('/dashboard');
    }
  // Data statistik (bisa diganti dengan state dan API call di implementasi nyata)
  const stats = {
    totalProduct: 5,
    orders: 3,
    visitors: 5
  };

  // Handler untuk menambah produk
  const handleAddProduct = () => {
    console.log('/tambah_produk');
    // Implementasi navigasi ke halaman tambah produk
  };

  return (
    <div className="dashboard-container">
      {showSidebar && (
              <div className="sidebar-overlay" onClick={() => setShowSidebar(false)}>
                <div className="sidebar-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="sidebar-header-admin">
                    <h2 className="brand-name">D’SAPATUAN</h2>
                    <button className="close-btn" onClick={() => setShowSidebar(false)}>✕</button>
                  </div>
                  <ul className="menu-list">
                    <li><Link to="/dashboard_admin" className="menu-item">📊 Dashboard</Link></li>
                    <li><Link to="/productpage" className="menu-item">📦 Data Produk</Link></li>
                    <li><Link to="/addproduct" className="menu-item">➕ Tambah Produk</Link></li>
                    <li><Link to="/orderpage" className="menu-item">🛒 Data Pesanan</Link></li>
                  </ul>
                  <div className="sign-in-section">
                    <button className="sign-in-btn" onClick={handleLogout}>LogOut</button>
                  </div>
                </div>
              </div>
            )}
      {/* Header */}
      <header className="dashboard-header">
        <button className="menu-toggle" onClick={() => setShowSidebar(true)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="store-name">D'SAPATUAN</h1>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="stats-container">
          {/* Total Product */}
          <div className="stat-card">
            <div className="stat-icon product-icon">📦</div>
            <div className="stat-info">
              <h2 className="stat-value">{stats.totalProduct}</h2>
              <p className="stat-label">Total Product</p>
            </div>
          </div>

          {/* Orders */}
          <div className="stat-card">
            <div className="stat-icon order-icon">📋</div>
            <div className="stat-info">
              <h2 className="stat-value">{stats.orders}</h2>
              <p className="stat-label">Pesanan</p>
            </div>
          </div>

          {/* Add Product */}
          <Link to="/addproduct" className="menu-item-ad">
          <div className="stat-card clickable" onClick={handleAddProduct}>
            <div className="stat-icon add-icon">➕</div>
            <div className="stat-info">
              <p className="stat-label">Tambah Produk</p>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;