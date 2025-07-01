import React, { useEffect, useState } from 'react';
import './Collections.css';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import axios from 'axios';

const Collections = () => {
  const handleLogout = () => {
      localStorage.removeItem('user');
      navigate('/dashboard');
    };
  
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
  // Data produk (contoh data)
  const [products, setProducts] = useState([]);

useEffect(() => {
  axios.get('http://localhost:5000/api/products')
    .then((res) => setProducts(res.data))
    .catch((err) => {
      console.error('Gagal ambil produk:', err);
    });
}, []);


  // Format harga dalam Rupiah
  const formatPrice = (price) => {
    return price.toLocaleString('id-ID');
  };

  // Render bintang rating
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={'full-${i}'} className="star full">★</span>);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={'empty-${i}'} className="star empty">☆</span>);
    }

    return stars;
  };


  return (
    <div className="collections-container">
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
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button className="menu-btn" onClick={() => setShowSidebar(true)}>Menu</button>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="header-right">
          <Link to="/account"><button className="icon-btn user-btn">👤</button></Link>
          <Link to="/cart"><button className="icon-btn cart-btn">🛒</button></Link>
        </div>
      </header>

      {/* Banner */}
      <div
  className="collections-banner"
  style={{
    backgroundImage: "url('/images/collections-banner.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '220px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px'
  }}
>
  <p className="collections-title">All Collections</p>
</div>



      {/* Filter Button */}
      <div className="filter-container">
      </div>

      {/* Products Grid */}
      <div className="products-grid">
  {products.map((product) => {
    let imageSrc = '/default.png';

    try {
      const images = JSON.parse(product.images);
      if (Array.isArray(images) && images.length > 0) {
        imageSrc = `http://localhost:5000/${images[0]}`;
      }
    } catch (e) {
      // fallback ke product.image jika ada
      if (product.image) {
        imageSrc = product.image;
      }
    }

    return (
      <div key={product.id} className="product-card">
        <div className="product-image-container">
          <img
            src={imageSrc}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://via.placeholder.com/200x200?text=${product.name.replace(/ /g, '+')}`;
            }}
          />
        </div>
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-rating">{renderRatingStars(product.rating)}</div>
          <div className="product-price">{formatPrice(product.price)} IDR</div>
          <Link to={`/detailproduct/${product.id}`}><button className="detail-btn">Detail</button></Link>


        </div>
      </div>
    );
  })}
</div>

    </div>
  );
};

export default Collections;