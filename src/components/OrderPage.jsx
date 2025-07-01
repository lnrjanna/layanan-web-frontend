import React, { useState, useEffect } from 'react';
import './OrderPage.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const OrderPage = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState('NEW ORDER');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);

  const statusMap = {
    'NEW ORDER': 'pending',
    'PACKED': 'packed',
    'DELIVERED': 'delivered',
    'SUCCEED': 'done',
    'CANCELED': 'canceled',
    'ALL': 'all'
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders');
        setOrders(res.data);
      } catch (err) {
        console.error('Gagal mengambil data pesanan:', err);
      }
    };
    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/dashboard');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAcceptOrder = async (id) => {
  const currentOrder = orders.find(order => order.id === id);
  if (!currentOrder) return;

  let nextStatus = '';
  switch (currentOrder.status) {
    case 'pending':
      nextStatus = 'packed';
      break;
    case 'packed':
      nextStatus = 'delivered';
      break;
    case 'delivered':
      nextStatus = 'done';
      break;
    default:
      return;
  }

  try {
    await axios.put(`http://localhost:5000/api/orders/status/${id}`, {
      status: nextStatus,
    });

    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status: nextStatus } : order
      )
    );
  } catch (err) {
    console.error('Gagal mengubah status pesanan:', err);
  }
};


  const handleCancelOrder = (id) => {
    console.log(`Canceling order with id: ${id}`);
  };

  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('id-ID') + ' IDR';
  };

  const filteredOrders = orders.filter(order => {
    const tabStatus = statusMap[activeTab];
    const matchesTab = tabStatus === 'all' || order.status === tabStatus;
    const matchesSearch =
      order.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.items || []).some(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesTab && matchesSearch;
  });

  return (
    <div className="order-page-container">
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

      <header className="order-header">
        <button className="menu-toggle" onClick={() => setShowSidebar(true)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="store-name">D'SAPATUAN</h1>
      </header>

      <div className="tab-navigation">
        {['NEW ORDER', 'PACKED', 'DELIVERED', 'SUCCEED', 'CANCELED', 'ALL'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="orders-table-container">
        <input
          type="text"
          placeholder="Cari ID / Produk"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID Pembelian</th>
              <th>Produk</th>
              <th>Quantity</th>
              <th>Total Harga</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center' }}>Tidak ada data</td></tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{(order.items || []).map(item => item.name).join(', ')}</td>
                  <td>{(order.items || []).reduce((sum, item) => sum + item.quantity, 0)}</td>
                  <td>{formatPrice(order.total_price)}</td>
                  <td className="action-buttons">
                    {order.status !== 'done' && order.status !== 'canceled' && (
  <button onClick={() => handleAcceptOrder(order.id)}>
    {order.status === 'delivered' ? 'Finish' : 'Accepted'}
  </button>
)}

                    <button
                      className="cancel-btn"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Canceled
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;