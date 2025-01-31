// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const HqLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    navigate('/hqhomepage');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <h1>H&R Detailing</h1>
          <h2>Headquaters Login</h2>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <h2>Sign In</h2>
          
          <div className="form-group">
            <label htmlFor="username">Employee ID</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>

          <div className="divider">
            <h5>New to H&R Detailing?</h5>
          </div>

          <Link to="/hqsignup" className="signup-link">
            Create your H&R Detailing account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default HqLoginPage;