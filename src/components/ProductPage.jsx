import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (e) {
      console.error('Error fetch products:', e);
      setProducts([]);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/dashboard');
  };

  const handleDelete = async (id) => {
  const confirm = window.confirm('Yakin ingin menghapus produk ini secara permanen?');
  if (!confirm) return;

  try {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  } catch (e) {
    console.error('Gagal menghapus produk:', e);
    alert('Gagal menghapus produk.');
  }
};


  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = price =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);

  if (!user || user.role !== 'admin') return <Navigate to="/signin" />;

  return (
    <div className="product-page-container">
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

      <header className="dashboard-header">
        <button className="menu-toggle" onClick={() => setShowSidebar(true)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="store-name">D'SAPATUAN</h1>
      </header>

      <div className="product-content">
        <div className="product-tabs">
          <h2>Data Produk</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Cari produk"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-grid">
          {filtered.length > 0 ? (
            filtered.map(p => (
              <div key={p.id} className="product-card">
                <div className="product-badge">Aktif</div>
                <div className="product-image-container">
                  <img
                    src={`http://localhost:5000/${JSON.parse(p.images)[0]}`}
                    alt={p.name}
                    className="product-image"
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-price">{formatPrice(p.price)}</p>
                </div>
                <div className="product-actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit-product/${p.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Tidak ada produk ditemukan</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
