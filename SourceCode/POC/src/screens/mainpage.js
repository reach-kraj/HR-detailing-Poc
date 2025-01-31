// RoleSelectionPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  const handleHeadquartersLogin = () => {
    navigate('/hqlogin');
  };

  const handleBranchLogin = () => {
    navigate('/brlogin');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <h1>H&R Detailing</h1>
          <h2>Clarity List</h2>
        </div>
        <div className="role-selection">
          <h2>Select Login Type</h2>
          <button 
            className="role-button headquarters"
            onClick={handleHeadquartersLogin}
          >
            Login as Headquarters
          </button>
          <button 
            className="role-button branch"
            onClick={handleBranchLogin}
          >
            Login as Branch
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;