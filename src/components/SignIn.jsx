import React, { useState } from 'react';
import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/signin', {
      email,
      password,
    });

    const user = res.data.user;
    alert(res.data.message);

    localStorage.setItem('user', JSON.stringify(user));

    if (user.role === 'admin') {
      navigate('/dashboard_admin');
    } else {
      navigate('/home');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Login gagal');
  }
};

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-left-panel">
          <img className="signin-image" src="/images/img1.png" alt="Left Panel Image" />
        </div>
        <div className="signin-right-panel">
          <h1 className="signin-title">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
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
            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <div className="forgot-password">
                <a href="#">Forgot password?</a>
              </div>
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
          <div className="signup-link">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;