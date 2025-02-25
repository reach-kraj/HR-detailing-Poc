import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "./data/userdata";

const RoleSelectionPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Find user in userData
    const user = userData.find((user) => user.username === username);

    if (user && user.password === password) {
      // Set user data in session storage for access across components
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({
          username: user.username,
          role: user.role,
          name: user.name,
          branch: user.branch || null,
          branchCode: user.branchCode || null,
          jobs: user.jobs || null,
        })
      );

      // Navigate to selection page for all users
      navigate("/selection");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <h1>H&R Detailing</h1>
          <h2>Clarity List</h2>
        </div>
        <div className="login-form">
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <div className="divider">
            <h5>Available Users</h5>
          </div>

          <div className="available-users">
            <p>
              <strong>Super Admin:</strong> SA0101
            </p>
            <p>
              <strong>Branch Admin (Chennai):</strong> BA0201
            </p>
            <p>
              <strong>Branch Admin (Mumbai):</strong> BA0202
            </p>
            <p>
              <strong>Branch Admin (Delhi):</strong> BA0203
            </p>
            <p>
              <strong>Branch Admin (Bangalore):</strong> BA0204
            </p>
            <p>
              <strong>Branch User (Jobs J001, J002):</strong> BU0301
            </p>
            <p>
              <strong>Branch User (Jobs J003, J004):</strong> BU0302
            </p>
            <p>
              <strong>Password for all users:</strong> password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
