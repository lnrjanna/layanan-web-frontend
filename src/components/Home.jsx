import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const carouselItems = [
    {
      id: 1,
      title: 'NEW STYLE ON SALE',
      subtitle: 'UP TO 20% OFF',
      image: '/images/carousel1.png',
      bgColor: '#d4e7c5',
    },
    {
      id: 2,
      title: 'SPECIAL OFFER',
      subtitle: 'FREE SHIPPING',
      image: '/images/carousel2.png',
      bgColor: '#d4b8c7',
    },
    {
      id: 3,
      title: 'NEW COLLECTION',
      subtitle: 'DISCOVER NOW',
      image: '/images/carousel3.png',
      bgColor: '#FFD4CA',
    },
  ];
  
  const [recommendedProducts, setRecommendedProducts] = useState([]);
useEffect(() => {
  const fetchRecommended = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/recommended/top-selling');
      setRecommendedProducts(res.data);
    } catch (err) {
      console.error('Gagal mengambil produk rekomendasi:', err);
    }
  };

  fetchRecommended();
}, []);

  
  
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselItems.length) % carouselItems.length);
  };

   const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/dashboard');
  };


  return (
  <div className="dashboard">
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

      {/* Carousel */}
      <div className="carousel-container">
        <button className="carousel-arrow left" onClick={handlePrev}>❮</button>
        <div className="carousel-wrapper">
  <div
    className="carousel-track"
    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
  >
    {carouselItems.map((item) => (
      <div
        key={item.id}
        className="carousel-slide"
        style={{ backgroundColor: item.bgColor }}
      >
        <div className="carousel-content">
          <h2>{item.title}</h2>
          <h3>{item.subtitle}</h3>
        </div>
        <div className="carousel-image">
          <img src={item.image} alt={item.title} />
        </div>
      </div>
    ))}
  </div>
</div>

        <button className="carousel-arrow right" onClick={handleNext}>❯</button>
        <div className="carousel-indicators">
          {carouselItems.map((item, index) => (
  <span 
    key={item.id} 
    className={`indicator ${index === currentSlide ? 'active' : ''}`}
  ></span>
))}
        </div>
      </div>

      {/* Recommended Products */}
      <section className="product-section">
        <h2 className="section-title">Recommended For You</h2>
        <div className="product-grid">
          {recommendedProducts.map((product) => (
  <div key={product.id} className="product-card">
    <div className="product-image-container">
      <img className="product-image"
        src={product.image ? `http://localhost:5000/${product.image}` : '/images/placeholder.png'}
        alt={product.name}
      />
    </div>
    <div className="product-info">
      <h3 className="product-name-home">{product.name}</h3>
      <div className="product-price-cart">
        <p className="product-price">Rp {formatPrice(product.price)}</p>
        <Link to={`/detailproduct/${product.id}`}>
          <button className="detail-btn">Detail</button>
        </Link>
      </div>
    </div>
  </div>
))}

        </div>
      </section>


      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>D'SAPATUAN</h2>
            <div className="subscribe">
              <p>Subscribe now</p>
              <div className="subscribe-form">
                <input type="email" placeholder="Your email" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h3>Information</h3>
              <ul>
                <li><a href="#">About us</a></li>
                <li><a href="#">Store search</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Testimonials</a></li>
                <li><a href="#">Events</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Helpful links</h3>
              <ul>
                <li><a href="#">Services</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Privacy policy</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Our service</h3>
              <ul>
                <li><a href="#">Rapid delivery</a></li>
                <li><a href="#">Order</a></li>
                <li><a href="#">Worldwide shipping</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Contact Us</h3>
              <ul>
                <li>📞 +62 XXX XXXX XXX</li>
                <li>📧 dsapatuan@email.id</li>
              </ul>
              <div className="social-icons">
                <a href="#">FB</a>
                <a href="#">IG</a>
                <a href="#">TW</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>©2023 D'Sapatuan | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;