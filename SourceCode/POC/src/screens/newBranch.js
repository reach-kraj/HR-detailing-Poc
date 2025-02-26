import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css"; // Assuming you have a global stylesheet; adjust as needed

const NewBranch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    branchCode: "",
    branchName: "",
  });
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for submission logic (e.g., save to branchData)
    console.log("New Branch Data:", formData);
    setShowToast(true); // Show toast
    setTimeout(() => {
      setShowToast(false); // Hide toast after 2 seconds
      navigate("/selection"); // Navigate back to Selection page
    }, 2000);
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="company-logo">
          <h1>H&R Detailing</h1>
        </div>
        <button className="logout-button" onClick={() => navigate("/")}>
          Log Out
        </button>
      </div>

      <div className="back-button-div">
        <button className="back-button" onClick={() => navigate("/selection")}>
          Back
        </button>
      </div>

      <div className="home-content-box">
        <form onSubmit={handleSubmit} className="question-form">
          <div className="form-header">
            <h2>Add New Branch</h2>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="branchCode">Branch Code:</label>
              <input
                type="text"
                id="branchCode"
                name="branchCode"
                value={formData.branchCode}
                onChange={handleChange}
                className="input-field"
                required
                placeholder="e.g., B001"
              />
            </div>

            <div className="form-group">
              <label htmlFor="branchName">Branch Name:</label>
              <input
                type="text"
                id="branchName"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                className="input-field"
                required
                placeholder="e.g., Chennai"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>

        {/* Toast Notification */}
        {showToast && (
          <div className="toast">New branch added successfully</div>
        )}
      </div>
    </div>
  );
};

export default NewBranch;
