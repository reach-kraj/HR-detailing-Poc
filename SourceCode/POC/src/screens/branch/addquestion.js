
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useJobQuestions } from "../data/hooks/useJobQuestions"; // Import the hook

const AddQuestion = () => {
  const navigate = useNavigate();
  const { questions, loading, error } = useJobQuestions(); // Fetch questions data
  const currentDate = new Date().toLocaleDateString("en-GB");

  // Function to generate the next clNo based on fetched questions
  const getNextClNo = (questions) => {
    if (!questions || questions.length === 0) return "CL001"; // Default if no questions exist

    // Extract numeric part from clNo (e.g., "005" from "CL005")
    const clNumbers = questions.map((q) =>
      parseInt(q.clNo.replace("CL", ""), 10)
    );
    const maxClNo = Math.max(...clNumbers); // Find the highest number
    const nextClNo = maxClNo + 1; // Increment it

    // Format as "CLXXX" with leading zeros (e.g., "CL006")
    return `CL${String(nextClNo).padStart(3, "0")}`;
  };

  const [formData, setFormData] = useState({
    clNo: "", // Will be set dynamically after data loads
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

  // Set the initial clNo once questions data is fetched
  useEffect(() => {
    if (!loading && !error && questions.length > 0) {
      const nextClNo = getNextClNo(questions);
      setFormData((prevState) => ({
        ...prevState,
        clNo: nextClNo,
      }));
    } else if (!loading && (!questions || questions.length === 0)) {
      setFormData((prevState) => ({
        ...prevState,
        clNo: "CL001", // Fallback if no questions exist
      }));
    }
  }, [loading, error, questions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Log the form data with dynamic clNo
    navigate("/brhomepage"); // Adjust to your route
  };

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Error loading questions: {error}</div>;

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
            {/* Display CL No as static text */}
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
              <label htmlFor="workDoneBy">Work Done By:</label>
              <input
                type="text"
                id="workDoneBy"
                name="workDoneBy" // Fixed name to match field
                value={formData.workDoneBy || ""} // Use a unique field name
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
          {" ⬅︎ Back "}
        </Link>
      </div>
    </div>
  );
};

export default AddQuestion;