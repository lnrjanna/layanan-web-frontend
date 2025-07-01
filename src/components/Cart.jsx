import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 15000,
    taxes: 0,
    discount: -50000,
    total: 0
  });

  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch cart items from database
  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.id) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/carts/${user.id}`);
        const formatted = res.data.map(item => ({
          id: item.cart_id,
          product_id: item.product_id,
          name: item.product_name,
          image: `http://localhost:5000/${item.images[0]}`,
          price: item.price,
          size: item.size,
          quantity: item.quantity,
          checked: item.checked === 1
        }));
        setCartItems(formatted);
      } catch (err) {
        console.error('Gagal mengambil keranjang:', err);
      }
    };

    fetchCart();
  }, [user?.id]);

  useEffect(() => {
    const checkedItems = cartItems.filter(item => item.checked);
    const subtotal = checkedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const total = subtotal + orderSummary.shipping + orderSummary.taxes + orderSummary.discount;

    setOrderSummary(prev => ({
      ...prev,
      subtotal,
      total
    }));
  }, [cartItems]);

  
  useEffect(() => {
  const fetchUserData = async () => {
    if (!user?.id) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/userdata/${user.id}`);
      setShippingAddress(res.data.address || 'Alamat belum tersedia');
    } catch (err) {
      console.error('Gagal mengambil alamat pengguna:', err);
      setShippingAddress('Alamat belum tersedia');
    }
  };

  fetchUserData();
}, [user?.id]);

  const updateCartQuantity = async (cartId, newQty) => {
    try {
      await axios.put(`http://localhost:5000/api/carts/${cartId}`, { quantity: newQty });
    } catch (err) {
      console.error('Gagal update quantity:', err);
    }
  };

  const handleQuantityChange = (id, change) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + change);
          updateCartQuantity(id, newQty);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleCheckboxChange = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleClearCart = async () => {
    if (window.confirm('Kosongkan keranjang belanja?')) {
      try {
        await axios.delete(`http://localhost:5000/api/carts/user/${user.id}`);
        setCartItems([]);
      } catch (err) {
        console.error('Gagal menghapus keranjang:', err);
      }
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/dashboard');
  };

  const [paymentMethod, setPaymentMethod] = useState('DANA'); // default metode pembayaran
  const [userData, setUserData] = useState({});
useEffect(() => {
  const fetchUserData = async () => {
    if (!user?.id) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/users/${user.id}`);
      setUserData(res.data);
    } catch (err) {
      console.error('Gagal mengambil data user:', err);
    }
  };

  fetchUserData();
}, [user?.id]);


const handleCheckout = async (e) => {
  e.preventDefault();

  const checkedItems = cartItems.filter(item => item.checked);
  if (checkedItems.length === 0) {
    alert('Pilih setidaknya satu produk untuk checkout.');
    return;
  }

  try {
    const res = await axios.post('http://localhost:5000/api/carts/checkout', {
      user_id: user.id,
      items: checkedItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        size: item.size,
        price: item.price
      })),
      total_price: orderSummary.total,
      address: userData.address,
      payment_method: paymentMethod
    });

    if (res.status === 200) {
      setShowCheckoutModal(false);
      navigate('/order'); // redirect ke halaman orders
    }
  } catch (error) {
    console.error('Gagal checkout:', error);
    alert('Gagal melakukan checkout. Coba lagi.');
  }
};



  const checkedItemsCount = cartItems.filter(item => item.checked).length;

  return (
    <div className="cart-container">
      {showSidebar && (
        <div className="sidebar-overlay" onClick={() => setShowSidebar(false)}>
          <div className="sidebar-modal" onClick={e => e.stopPropagation()}>
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

      {showCheckoutModal && (
  <div className="checkout-modal-overlay" onClick={() => setShowCheckoutModal(false)}>
    <div className="checkout-modal" onClick={e => e.stopPropagation()}>
      <h3>Shipping address</h3>
      <p>{shippingAddress}</p>
      <h3>Payment Information</h3>
      <div className="payment-methods">
  {['DANA', 'Gopay', 'OVO', 'ShopeePay', 'BNI', 'BRI', 'BCA', 'Mandiri'].map(method => (
    <img
      key={method}
      src={`/icons/${method.toLowerCase()}.png`}
      alt={method}
      onClick={() => setPaymentMethod(method)}
      style={{ border: paymentMethod === method ? '2px solid blue' : 'none', cursor: 'pointer' }}
    />
  ))}
</div>


      <form className="payment-form" onSubmit={handleCheckout}>
        <label>Name on card</label>
        <input type="text" placeholder="" />

        <label>Card number</label>
        <input type="text" placeholder="" />

        <div className="card-info-row">
          <div>
            <label>Expiration</label>
            <input type="text" placeholder="MM/YY" />
          </div>
          <div>
            <label>CVV</label>
            <input type="text" placeholder="XXX" />
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="back-btn" onClick={() => setShowCheckoutModal(false)}>Back</button>
          <button type="submit" className="confirm-btn">
            Confirm Payment ({formatPrice(orderSummary.total)} IDR)
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      <header className="header">
        <div className="header-left">
          <button className="menu-btn" onClick={() => setShowSidebar(true)}>Menu</button>
          <div className="search-bar"><input type="text" placeholder="Search" /></div>
        </div>
        <div className="header-right">
          <Link to="/account"><button className="icon-btn user-btn">👤</button></Link>
          <Link to="/cart"><button className="icon-btn cart-btn">🛒</button></Link>
        </div>
      </header>

      <div className="cart-content">
        <div className="cart-grid">
          <div className="cart-items">
            <div className="cart-header">
              <div className="cart-header-checkbox"></div>
              <div className="cart-header-product">Product</div>
              <div className="cart-header-price">Price</div>
              <div className="cart-header-qty">Qty</div>
              <div className="cart-header-subtotal">Subtotal</div>
            </div>

            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-checkbox">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </div>
                <div className="cart-item-product">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Size {item.size}</p>
                  </div>
                </div>
                <div className="cart-item-price">{formatPrice(item.price)} IDR</div>
                <div className="cart-item-qty">
                  <button className="qty-btn" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                </div>
                <div className="cart-item-subtotal">{formatPrice(item.price * item.quantity)} IDR</div>
              </div>
            ))}

            <div className="cart-footer">
              <button className="clear-cart-btn" onClick={handleClearCart}>
                Clear Shopping Cart
              </button>
            </div>
          </div>

          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row"><span>Items</span><span>{checkedItemsCount}</span></div>
            <div className="summary-row"><span>Subtotal</span><span>{formatPrice(orderSummary.subtotal)}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{formatPrice(orderSummary.shipping)}</span></div>
            <div className="summary-row"><span>Taxes</span><span>{orderSummary.taxes}</span></div>
            <div className="summary-row discount"><span>Discount</span><span>{formatPrice(orderSummary.discount)}</span></div>
            <div className="summary-divider"></div>
            <div className="summary-row total"><span>Total</span><span>{formatPrice(orderSummary.total)}</span></div>
            <button className="checkout-btn" onClick={() => setShowCheckoutModal(true)}>Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
