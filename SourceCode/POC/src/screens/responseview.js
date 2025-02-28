import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import questionsData from "./data/template";

const ResponseView = () => {
  const { clNo } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [respondBy, setRespondBy] = useState("");
  const [error, setError] = useState("");
  const [showRFIModal, setShowRFIModal] = useState(false);
  const [rfiNumber, setRFINumber] = useState("");

  // Find the question data based on clNo
  const questionData = questionsData.find((q) => q.clNo === clNo);

  const handleRespond = () => {
    if (!response.trim()) {
      setError("Response cannot be empty");
      return;
    }

    // Handle response submission logic here
    setError("");
    console.log("Response submitted:", {
      response,
      respondBy,
    });

    // Show success toast
    toast.success("Response submitted successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => navigate("/hqhomepage"),
    });

    // Clear form after successful submission
    setResponse("");
    setRespondBy("");
  };

  const handleTransferToRFI = () => {
    if (!rfiNumber.trim()) {
      return;
    }
    // Handle RFI transfer logic here
    console.log("Transferred to RFI:", rfiNumber);
    setShowRFIModal(false);
    setRFINumber("");

    // Show success toast for RFI transfer
    toast.success("Successfully transferred to RFI!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => navigate("/hqhomepage"),
    });
  };

  if (!questionData) {
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
          <button className="back-button" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
        <div className="home-content-box">
          <p>Question not found</p>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="home-container">
      <ToastContainer />
      <div className="home-header">
        <div className="company-logo">
          <h1>H&R Detailing</h1>
        </div>
        <button className="logout-button" onClick={() => navigate("/")}>
          Log Out
        </button>
      </div>

      <div className="back-button-div">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      <div className="home-content-box">
        <div className="question-detail-card">
          <div className="question-header">
            <div className="header-left">
              <div className="detail-row">
                <span className="detail-label">CL No:</span>
                <span className="detail-value">{questionData.clNo}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">HRD Detailer Initials:</span>
                <span className="detail-value">
                  {questionData.HRD_Detailer_Initials}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Design Reference:</span>
                <span className="detail-value">
                  {questionData.Design_reference}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Sequence/Zone/Area:</span>
                <span className="detail-value">
                  {questionData.Seq_area_zone?.split("/")[0]}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Stage:</span>
                <span className="detail-value">{questionData.Stage}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Sketch:</span>
                <span className="detail-value">{questionData.HR_SK}</span>
              </div>
            </div>
            <div className="header-right">
              <div className="detail-row">
                <span className="detail-label">Sent Date:</span>
                <span className="detail-value">{questionData.DateSent}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`status-badge ${questionData.status}`}>
                  {questionData.status}
                </span>
              </div>
            </div>
          </div>

          <div className="question-content-section">
            <h3>Question</h3>
            <div className="question-text">
              <p>{questionData.q}</p>
              <span className="sent-datetime">
                Sent date and time: {questionData.date}
              </span>
            </div>
          </div>

          <div className="response-section">
            <h3>Your Response</h3>
            <textarea
              className="response-textarea"
              value={response}
              onChange={(e) => {
                setResponse(e.target.value);
                if (e.target.value.trim()) {
                  setError("");
                }
              }}
              placeholder="Type your response here..."
              rows={6}
            />

            <div className="response-details">
              <div className="input-group">
                <label>Respond By:</label>
                <input
                  type="text"
                  className="detail-input"
                  value={respondBy}
                  onChange={(e) => setRespondBy(e.target.value)}
                  placeholder="Enter name"
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="response-actions">
              <button
                className="transfer-button"
                onClick={() => setShowRFIModal(true)}
              >
                Transfer to RFI
              </button>
              <button className="respond-button" onClick={handleRespond}>
                Respond
              </button>
            </div>
          </div>

          <div className="additional-notes">
            <span className="detail-label">Additional Notes:</span>
            <span className="detail-value">
              {questionData.Additional_Notes}
            </span>
          </div>
        </div>
      </div>

      {showRFIModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Transfer to RFI</h2>
            <p>Please enter the RFI number:</p>
            <input
              type="text"
              value={rfiNumber}
              onChange={(e) => setRFINumber(e.target.value)}
              className="rfi-input"
              placeholder="Enter RFI number"
            />
            <div className="modal-actions">
              <button
                className="modal-cancel-button"
                onClick={() => {
                  setShowRFIModal(false);
                  setRFINumber("");
                }}
              >
                Cancel
              </button>
              <button
                className="modal-transfer-button"
                onClick={handleTransferToRFI}
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponseView;
