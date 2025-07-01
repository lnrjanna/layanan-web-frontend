import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import './ProductDetail.css';
import axios from 'axios';

const ProductDetail = () => {
  const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/dashboard');
      };
    
  const [showSidebar, setShowSidebar] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const data = res.data;

        // Parse images dan sizes dari JSON string
        data.images = JSON.parse(data.images || '[]');
        data.sizes = JSON.parse(data.sizes || '[]');

        setProduct(data);
      } catch (err) {
        console.error('Gagal mengambil data produk:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('id-ID');
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    for (let i = 0; i < 5 - fullStars - (hasHalfStar ? 1 : 0); i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }
    return stars;
  };

  const handleAddToCart = async () => {
  if (!selectedSize) {
    alert('Pilih ukuran terlebih dahulu');
    return;
  }

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    alert('Silakan login terlebih dahulu.');
    navigate('/login'); // arahkan ke login jika belum login
    return;
  }

  const cartItem = {
    user_id: user.id,
    product_id: product.id,
    size: selectedSize,
    quantity: 1,
    checked: true
  };

  try {
    await axios.post('http://localhost:5000/api/carts', cartItem);
    alert('Berhasil ditambahkan ke keranjang');
    navigate('/cart'); // arahkan ke halaman cart jika perlu
  } catch (error) {
    console.error('Gagal tambah ke keranjang:', error);
    alert('Gagal menambahkan ke keranjang');
  }
};


  if (!product) return <p className="loading-message">Sedang memuat detail produk...</p>;

  const imageUrl = product.images?.length > 0
    ? `http://localhost:5000/${product.images[0]}`
    : 'https://via.placeholder.com/400x400?text=No+Image';

  const availableSizes = product.sizes?.length > 0 ? product.sizes : [37, 38, 39, 40, 41, 42];

  return (
    <div className="product-detail-container">
      {showSidebar && (
            <div className="sidebar-overlay" onClick={() => setShowSidebar(false)}>
              <div className="sidebar-modal" onClick={(e) => e.stopPropagation()}>
                <div className="sidebar-header">
                  <h2 className="brand-name">D’SAPATUAN</h2>
                  <button className="close-btn" onClick={() => setShowSidebar(false)}>✕</button>
                </div>
                <ul className="menu-list">
                  <li><Link to="/home" className="menu-item"><span>🏠</span> Home</Link></li>
                  <li><Link to="/collections" className="menu-item"><span>📁</span> All Collections</Link></li>
                  <li><Link to="/account" className="menu-item"><span>👤</span> Account</Link></li>
                  <li><Link to="/cart" className="menu-item"><span>🛒</span> Cart</Link></li>
                  <li><Link to="/order" className="menu-item"><span>📦</span> My Order</Link></li>
                </ul>
                <div className="sign-in-section">
                  <button className="sign-in-btn" onClick={handleLogout}>LogOut</button>
                </div>
              </div>
            </div>
          )}
      <header className="header">
        <div className="header-left">
          <button className="menu-btn" onClick={() => setShowSidebar(true)}>☰ Menu</button>
          <div className="search-bar"><input type="text" placeholder="Search" /></div>
        </div>
        <div className="header-right">
          <Link to="/account"><button className="icon-btn user-btn">👤</button></Link>
          <Link to="/cart"><button className="icon-btn cart-btn">🛒</button></Link>
        </div>
      </header>

      <div className="product-detail-content">
        <div className="product-detail-left">
          <button className="back-button" onClick={() => navigate(-1)}>←</button>
          <div className="product-image-container-det">
            <img
              src={imageUrl}
              alt={product.name}
              className="product-image-det"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
              }}
            />
          </div>
        </div>

        <div className="product-detail-right">
          <h1 className="product-name">{product.name}</h1>
          <div className="product-rating">
            <div className="rating-stars">{renderRatingStars(product.rating)}</div>
            <span className="review-count">{product.review_count || 0} review</span>
          </div>
          <div className="product-price-det">{formatPrice(product.price)} IDR</div>

          <div className="product-size-section">
            <div className="size-label">Size</div>
            <div className="size-options">
              {availableSizes.map(size => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-actions">
            <button className="buy-now-btn" onClick={handleAddToCart}>🛒 Add to cart</button>
            <button className="favorite-btn">♡</button>
          </div>

          <div className="product-description-section">
            <div className="description-header"><h2>Description</h2><span className="toggle-icon">▼</span></div>
            <p className="product-description">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
