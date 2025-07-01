import React, { useState, useEffect } from 'react';
import './Account.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FormAccount = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone_number: '',
    date_of_birth: '',
    location: '',
    postal_code: '',
    gender: '',
    profile_photo: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/userdata/${userId}`)
        .then(res => {
          const data = res.data;
          setFormData({
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            email: data.email || '',
            address: data.address || '',
            phone_number: data.phone_number || '',
            date_of_birth: data.date_of_birth || '',
            location: data.location || '',
            postal_code: data.postal_code || '',
            gender: data.gender || '',
            profile_photo: null,
          });
          if (data.profile_photo) {
            setPreview(`http://localhost:5000/uploads/${data.profile_photo}`);
          }
        })
        .catch(() => {
          // data belum ada, biarkan kosong
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, profile_photo: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("User tidak ditemukan");

    try {
      const data = new FormData();
      data.append('user_id', userId);
      Object.entries(formData).forEach(([key, value]) => {
  if (value !== null && (key !== 'profile_photo' || value instanceof File)) {
    data.append(key, value);
  }
});


      // Cek apakah data sudah ada
      const check = await axios.get(`http://localhost:5000/api/userdata/${userId}`);

      if (check?.data?.id) {
        // Gunakan POST dengan override method ke PUT (trik)
        await axios({
          method: 'post',
          url: `http://localhost:5000/api/userdata/${userId}?_method=PUT`,
          data,
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Insert baru
        await axios.post(`http://localhost:5000/api/userdata`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      alert("Data berhasil disimpan");
      navigate('/account');
    } catch (err) {
      console.error("Gagal menyimpan data:", err?.response?.data || err);
      alert("Gagal menyimpan data: " + (err?.response?.data?.message || "Internal Server Error"));
    }
  };
  const [showSidebar, setShowSidebar] = useState(false);
    const handleLogout = () => {
      localStorage.removeItem('user'); // Hapus data user dari localStorage
      navigate('/dashboard'); // Arahkan ke dashboard
    };

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
      {/* Main Content */}
      <div className="account-content">
        <div className="account-profile">
          <div className="profile-left">
            <h2>Photo Profile</h2><br></br>
            <div className="profile-image">
              {preview && <img src={preview} alt="Preview" width="100" />}
            </div>
            <label className="custom-file-upload">
              <input type="file" name="profile_photo" accept="image/*" onChange={handleFileChange} />
              Choose Photo Profile
            </label>
          </div>
          <div className="profile-rightt">
      <form className="account-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Personal Information</h2><br></br>
        
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input name="first_name" value={formData.first_name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input name="last_name" value={formData.last_name} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone Number</label>
            <input name="phone_number" value={formData.phone_number} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <input name="location" value={formData.location} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input name="postal_code" value={formData.postal_code} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">-- Pilih --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button type="submit" className="save-btn">Simpan</button>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default FormAccount;
