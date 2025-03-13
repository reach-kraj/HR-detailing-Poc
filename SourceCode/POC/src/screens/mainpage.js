
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "./data/userdata";
import "../style.css"; // Assuming your CSS is in this file
import HRlogo from "./HRlogo.png"; // Import the logo image (adjust the path as needed)

const RoleSelectionPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = userData.find((user) => user.username === username);

    if (user && user.password === password) {
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
      navigate("/selection");
    } else {
      setError("Invalid username or password");
    }
  };

  const availableUsers = [
    { role: "Super Admin", username: "SA0101" },
    { role: "Branch Admin (Chennai)", username: "BA0201" },
    { role: "Branch Admin (Mumbai)", username: "BA0202" },
    { role: "Branch Admin (Delhi)", username: "BA0203" },
    { role: "Branch Admin (Bangalore)", username: "BA0204" },
    { role: "Branch User (Chennai)", username: "BU0301" },
    { role: "Branch User (Chennai)", username: "BU0302" },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    const isValidUsername = availableUsers.some(
      (user) => user.username === newUsername
    );
    if (isValidUsername) {
      setPassword("password123");
    } else {
      setPassword("");
    }
  };

  const handleUsernameClick = (selectedUsername) => {
    setUsername(selectedUsername);
    setPassword("password123");
    setIsDropdownOpen(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src={HRlogo} alt="H&R Detailing Logo" className="company-logo-main" />
          <h2>Clarification List</h2>
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
                onChange={handleUsernameChange}
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
        </div>

        <div className="user-dropdown-container">
          <button className="user-dropdown-button" onClick={toggleDropdown}>
            Show Available Users
          </button>
          {isDropdownOpen && (
            <div className="user-dropdown-content">
              <div className="user-role">Click the Username to login</div>
              <br />
              {availableUsers.map((user, index) => (
                <div key={index} className="user-item">
                  <span
                    className="user-username"
                    onClick={() => handleUsernameClick(user.username)}
                  >
                    {user.username}
                  </span>
                  <span className="user-role">{user.role}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;