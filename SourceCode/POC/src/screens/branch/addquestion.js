
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddQuestion = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString("en-GB");

  const [formData, setFormData] = useState({
    clNo: "CL008", // Hardcoded to CL008
    hrRfiNumber: "",
    hrdDetailerInitials: "",
    designReference: "",
    sequence: "",
    zone: "",
    area: "",
    stage: "",
    hrSketchNumber: "",
    additionalNotes: "",
    question: "",
    status: "Open",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
    console.log(formData); // clNo will be "CL008"
    navigate("/homepage");
  };

  return (
    <div className="home-container">
      {/* Header */}
      <div className="home-header">
        <div className="company-logo">
          <h1>H&R Detailing</h1>
        </div>
        <button className="logout-button" onClick={() => navigate("/")}>
          Log Out
        </button>
      </div>

      <div className="home-content-box">
        <form onSubmit={handleSubmit} className="question-form">
          <div className="form-header">
            <h2>Add Question</h2>
            <div className="status-badge open">Status: Open</div>
          </div>

          <div className="form-grid">
            {/* Display CL No as static text instead of input */}
            <div className="form-group">
              <label htmlFor="clNo">CL No:</label>
              <div className="input-field static-text">{formData.clNo}</div>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="text"
                id="date"
                value={currentDate}
                className="input-field"
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="hrRfiNumber">H&R RFI No: (Optional)</label>
              <input
                type="text"
                id="hrRfiNumber"
                name="hrRfiNumber"
                value={formData.hrRfiNumber}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="hrdDetailerInitials">
                HRD Detailer Initials:
              </label>
              <input
                type="text"
                id="hrdDetailerInitials"
                name="hrdDetailerInitials"
                value={formData.hrdDetailerInitials}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="designReference">Design Reference:</label>
              <input
                type="text"
                id="designReference"
                name="designReference"
                value={formData.designReference}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="sequence">Sequence:</label>
              <input
                type="text"
                id="sequence"
                name="sequence"
                value={formData.sequence}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="zone">Zone:</label>
              <input
                type="text"
                id="zone"
                name="zone"
                value={formData.zone}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="area">Area:</label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stage">Stage:</label>
              <input
                type="text"
                id="stage"
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hrSketchNumber">HR Sketch Number:</label>
              <input
                type="text"
                id="hrSketchNumber"
                name="hrSketchNumber"
                value={formData.hrSketchNumber}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="hrSketchNumber">Work Done By:</label>
              <input
                type="text"
                id="hrSketchNumber"
                name="hrSketchNumber"
                value={formData.hrSketchNumber}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="question">Question:</label>
            <textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="input-field textarea"
              required
              rows="6"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Send
            </button>
          </div>
        </form>
      </div>
      <div className="back-button-div">
        <Link to="/brhomepage" className="back-button">
          {" "}
          ⬅︎ Back{" "}
        </Link>
      </div>
    </div>
  );
};

export default AddQuestion;