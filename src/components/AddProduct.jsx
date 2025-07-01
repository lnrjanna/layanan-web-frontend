import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
   const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/dashboard');
  };

  const [showSidebar, setShowSidebar] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    stock: '',
    price: '',
    weight: '',
    description: '',
    sizes: [],
    images: []
  });
  const [imagePreview, setImagePreview] = useState([]);
  const availableSizes = [36, 37, 38, 39, 40, 41, 42, 43];
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.role !== 'admin') {
    return <Navigate to="/signin" />;
  }

  const handleInputChange = (e) => {
    setProductData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSizeToggle = (size) => {
    setProductData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 6 - imagePreview.length);
    const previews = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
    setImagePreview(prev => [...prev, ...previews]);
    setProductData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removePreview = (idx) => {
    URL.revokeObjectURL(imagePreview[idx].preview);
    setImagePreview(prev => prev.filter((_, i) => i !== idx));
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append('name', productData.name);
      form.append('category', productData.category);
      form.append('stock', productData.stock);
      form.append('price', productData.price);
      form.append('weight', productData.weight);
      form.append('description', productData.description);
      form.append('sizes', JSON.stringify(productData.sizes));
      productData.images.forEach((file) => form.append('images', file));

      await axios.post('http://localhost:5000/api/products', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Produk berhasil ditambahkan!');
      navigate('/productpage');
    } catch (err) {
      console.error('Tambah produk gagal:', err.response || err);
      alert('Gagal menambahkan produk. Periksa kembali input.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
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
      <header className="product-header">
        <button className="menu-toggle" onClick={() => setShowSidebar(true)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="store-name">D'SAPATUAN</h1>
      </header>

      <div className="add-product-content">
        <button className="menu-btn-pro" onClick={() => navigate('/productpage')}>←</button>
        <h2>Form Tambah Produk</h2><br></br>
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label htmlFor="name">Nama Produk</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Kelompok Produk</label>
            <input
              type="text"
              id="category"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Foto Produk (max 6)</label>
            <div className="image-upload-container">
              {imagePreview.map((img, idx) => (
                <div key={idx} className="image-preview-item">
                  <img src={img.preview} alt={`Preview ${idx}`} />
                  <button type="button" className="remove-image-btn" onClick={() => removePreview(idx)}>×</button>
                </div>
              ))}
              {imagePreview.length < 6 && (
                <label className="image-upload-btn">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    hidden
                  />
                  +
                </label>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stok</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={productData.stock}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Harga</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Ukuran</label>
            <div className="size-options">
              {availableSizes.map(size => (
                <button
                  key={size}
                  type="button"
                  className={`size-option ${productData.sizes.includes(size) ? 'selected' : ''}`}
                  onClick={() => handleSizeToggle(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="weight">Berat (gram)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={productData.weight}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Deskripsi</label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              className="form-control description-input"
              rows="5"
            />
          </div>

          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;