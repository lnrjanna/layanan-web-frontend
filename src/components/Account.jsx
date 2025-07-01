import React, { useEffect, useState } from 'react';
import './Account.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

const Account = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get(`http://localhost:5000/api/userdata/${user.id}`)
      .then(res => {
        if (res.data) {
          setUserData(res.data);
        } else {
          navigate('/form_account');
        }
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
        navigate('/form_account'); 
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/dashboard');
  };

  if (userData === null) {
  return <Loading />; 
}
if (Object.keys(userData).length === 0) {
  return (
    <div className="account-container">
      <p>Data akun belum tersedia.</p>
      <Link to="/form_account">
        <button className="save-btn">Isi Data Akun</button>
      </Link>
    </div>
  );
}
  return (
    <div className="account-container">
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

      {}
      <div className="account-content">
        <div className="account-profile">
          <div className="profile-left">
            <button className="back-button" onClick={() => navigate(-1)}>←</button>
            <div className="profile-image">
              <img
                src={userData.profile_photo 
                  ? `http://localhost:5000/uploads/${userData.profile_photo}` 
                  : '/default.png'}
                alt="Profile"
              />
            </div>
            <h2 className="profile-name">{userData.first_name} {userData.last_name}</h2>
            <p>{userData.email}</p>
            <div className="action-buttons">
              <Link to="/form_account">
                <button className="save-btn">Edit Akun</button>
              </Link>
            </div>
          </div>

          <div className="profile-right">
            <h3>Personal Information</h3><br></br>
            <table>
              <tr>
                <td><label>Gender</label></td>
                <td>:</td>
                <td>{userData.gender === 'male'? 'Male': userData.gender === 'female'? 'Female': ''}</td>
              </tr>
              <tr>
                <td><label>First Name</label></td>
                <td>:</td>
                <td>{userData.first_name}</td>
              </tr>
              <tr>
                <td><label>Last Name</label></td>
                <td>:</td>
                <td>{userData.last_name}</td>
              </tr>
              <tr>
                <td><label>Address</label></td>
                <td>:</td>
                <td>{userData.address}</td>
              </tr>
              <tr>
                <td><label>Phone Number</label></td>
                <td>:</td>
                <td>{userData.phone_number}</td>
              </tr>
              <tr>
                <td><label>Date of Birth</label></td>
                <td>:</td>
                <td>{userData.date_of_birth? new Date(userData.date_of_birth).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }): ''}
                </td>
              </tr>
              <tr>
                <td><label>Location</label></td>
                <td>:</td>
                <td>{userData.location}</td>
              </tr>
              <tr>
                <td><label>Postal Code:</label></td>
                <td>:</td>
                <td>{userData.postal_code}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
