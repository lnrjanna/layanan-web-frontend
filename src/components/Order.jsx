import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
          localStorage.removeItem('user');
          navigate('/dashboard');
        };
      
    const [showSidebar, setShowSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState('ALL ORDER');
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${user?.id}`);
        setOrders(res.data || []);
      } catch (err) {
        console.error('Gagal mengambil data pesanan:', err);
      }
    };

    if (user?.id) fetchOrders();
  }, [user?.id]);

  const formatPrice = (price) => {
    if (!price) return '0 IDR';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " IDR";
  };

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleDetailClick = (orderId) => {
    console.log(`Melihat detail pesanan ${orderId}`);
  };

  const handleCancelOrder = (orderId) => {
    console.log(`Membatalkan pesanan ${orderId}`);
  };

  const handleConfirmReceived = async (orderId) => {
  try {
    await axios.put(`http://localhost:5000/api/orders/status/${orderId}`, {
      status: 'done',
    });

    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'done' } : order
      )
    );
  } catch (err) {
    console.error('Gagal konfirmasi pesanan diterima:', err);
  }
};


  const filteredOrders = orders.filter(order => {
  if (activeTab === 'ALL ORDER') return true;
  return order.status === activeTab.toLowerCase(); // ubah ke lowercase
});

  return (
    <div className="order-container">
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

      {/* Tabs */}
      <div className="order-tabs">
        {['ALL ORDER', 'PACKED', 'DELIVERED', 'DONE', 'CANCELED'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="order-list">
        {filteredOrders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-status">
              <div className="status-icon">
                {order.status === 'PACKED' ? '📦' : '✅'}
              </div>
              <div className="status-message">{order.statusMessage || ''}</div>
              <div className="status-badge">{order.status}</div>
            </div>

            {(order.items || []).map(item => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <img
                    src={item.image ? `http://localhost:5000/${item.image}` : '/images/placeholder.png'}
                    alt={item.name || 'product'}
                  />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name || 'Unnamed Product'}</h3>
                  <p className="item-size">size {item.size}</p>
                  <p className="item-quantity">x{item.quantity}</p>
                </div>
                <div className="item-price">{formatPrice(item.price)}</div>
              </div>
            ))}

            <div className="order-footer">
              <div className="order-total">
                <span>Order Total</span>
                <span className="total-price">{formatPrice(order.total_price)}</span>
              </div>
              <div className="order-actions">
  {order.status === 'delivered' && (
    <button className="confirm-btn" onClick={() => handleConfirmReceived(order.id)}>
      Confirm Received
    </button>
  )}
</div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
