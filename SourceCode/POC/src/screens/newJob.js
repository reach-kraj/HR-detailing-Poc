import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation
import "../style.css";

const NewJob = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To access selectedBranch from state
  const selectedBranch = location.state?.selectedBranch; // Get selectedBranch

  const [formData, setFormData] = useState({
    jobNo: "",
    jobName: "",
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
    console.log("New Job Data:", { ...formData, branch: selectedBranch }); // Include branch context
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      // Navigate back with selectedBranch to stay on job selection
      navigate("/selection", { state: { selectedBranch } });
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
        <button
          className="back-button"
          onClick={() => navigate("/selection", { state: { selectedBranch } })}
        >
          Back
        </button>
      </div>

      <div className="home-content-box">
        <form onSubmit={handleSubmit} className="question-form">
          <div className="form-header">
            <h2>Add New Job</h2>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="jobNo">Job Number:</label>
              <input
                type="text"
                id="jobNo"
                name="jobNo"
                value={formData.jobNo}
                onChange={handleChange}
                className="input-field"
                required
                placeholder="e.g., J005"
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobName">Job Name:</label>
              <input
                type="text"
                id="jobName"
                name="jobName"
                value={formData.jobName}
                onChange={handleChange}
                className="input-field"
                required
                placeholder="e.g., Project Alpha"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>

        {showToast && <div className="toast">New job added successfully</div>}
      </div>
    </div>
  );
};

export default NewJob;
