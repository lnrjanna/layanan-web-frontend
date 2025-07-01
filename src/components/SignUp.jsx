import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/api/signup', {
      name: fullName,
      email,
      password
    });

    if (response.status === 200 && response.data.user) {
      // simpan data user ke localStorage agar halaman lain bisa mengakses
      localStorage.setItem('user', JSON.stringify(response.data.user));
      alert('Signup berhasil!');
      navigate('/home'); // arahkan ke halaman form_account
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert('Signup gagal. Coba lagi.');
  }
};

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-left-panel">
          <img className="signin-image" src="/images/img1.png" alt="Left Panel Image" />
        </div>
        <div className="signup-right-panel">
          <h1 className="signup-title">Sign Up</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="terms-agreement">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <label htmlFor="agree-terms">I agree</label>
            </div>
            
            <button type="submit" className="create-account-btn">Create Account</button>
          </form>
          
          <div className="signin-link">
            <p>Already have an account? <Link to="/signin">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;