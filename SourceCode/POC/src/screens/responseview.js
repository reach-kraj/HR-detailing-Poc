
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import questionsData from "./data/template";
import { branchData} from "./data/userdata";
import HRlogo from "./HRlogo.png";
import { Paperclip } from "lucide-react"; // Added Paperclip icon from lucide-react

const ResponseView = () => {
  const { clNo } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [respondBy, setRespondBy] = useState("");
  const [error, setError] = useState("");
  const [showRFIModal, setShowRFIModal] = useState(false);
  const [rfiNumber, setRFINumber] = useState("");
  const [attachedFile, setAttachedFile] = useState(null); // Added state for mock attachment

  const [currentUser, setCurrentUser] = useState(null);
  const [branchInfo, setBranchInfo] = useState({
    branchCode: "N/A",
    branchName: "N/A",
  });
  const [jobInfo, setJobInfo] = useState({ jobCode: "N/A", jobName: "N/A" });

  const questionData = questionsData.find((q) => q.clNo === clNo);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user) {
      console.log("No user found in sessionStorage, redirecting to login");
      navigate("/");
      return;
    }
    setCurrentUser(user);

    const selectedBranch = JSON.parse(sessionStorage.getItem("selectedBranch"));
    if (selectedBranch) {
      setBranchInfo({
        branchCode: selectedBranch.branchCode,
        branchName: selectedBranch.branchName,
      });
    } else {
      const branch = branchData.find((b) => b.branchCode === user.branchCode);
      if (branch) {
        setBranchInfo({
          branchCode: branch.branchCode,
          branchName: branch.branchName,
        });
      }
    }

    const selectedJob = JSON.parse(sessionStorage.getItem("selectedJob"));
    if (selectedJob) {
      const branch = branchData.find(
        (b) => b.branchCode === selectedBranch.branchCode
      );
      const job = branch?.jobs.find((j) => j.jobNo === selectedJob.jobNo);
      if (job) {
        setJobInfo({
          jobCode: job.jobNo,
          jobName: job.jobName,
        });
      }
    } else if (user.jobs && user.jobs.length > 0) {
      const branch = branchData.find((b) => b.branchCode === user.branchCode);
      const firstJob = branch?.jobs.find((j) => j.jobNo === user.jobs[0]);
      if (firstJob) {
        setJobInfo({
          jobCode: firstJob.jobNo,
          jobName: firstJob.jobName,
        });
      }
    }

    if (selectedJob) {
      setJobInfo({
        jobCode: selectedJob.jobNo,
        jobName: selectedJob.jobName,
      });
    }
  }, [navigate]);

  // Mock file attachment handler
  const handleFileAttach = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAttachedFile({
        name: file.name,
        uploaded: true,
      });
    }
  };

  const handleRespond = () => {
    if (!response.trim()) {
      setError("Response cannot be empty");
      return;
    }

    setError("");
    console.log("Response submitted:", {
      response,
      respondBy,
      attachedFile: attachedFile ? attachedFile.name : null,
    });

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

    setResponse("");
    setRespondBy("");
    setAttachedFile(null); // Clear attachment after submission
  };

  const handleTransferToRFI = () => {
    if (!rfiNumber.trim()) {
      return;
    }
    console.log("Transferred to RFI:", rfiNumber);
    setShowRFIModal(false);
    setRFINumber("");

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

  if (!questionData || !currentUser) {
    return (
      <div className="home-container">
        <div className="home-header">
          <div className="company-logo">
            <div className="logo-home">
              <img
                src={HRlogo}
                alt="H&R Detailing Logo"
                className="logo-image"
              />
            </div>
          </div>
          <div className="employee-info">
            <div>
              <h4>Branch Code:</h4>
            </div>
            <div className="profile-int">
              <h4>{branchInfo.branchCode}</h4>
            </div>
            <div>
              <h4>Branch Name:</h4>
            </div>
            <div className="profile-int">
              <h4>{branchInfo.branchName}</h4>
            </div>
            <div>
              <h4>Job Code:</h4>
            </div>
            <div className="profile-int">
              <h4>{jobInfo.jobCode}</h4>
            </div>
            <div>
              <h4>Job Name:</h4>
            </div>
            <div className="profile-int">
              <h4>{jobInfo.jobName}</h4>
            </div>
            <div>
              <h4>Logged in as:</h4>
            </div>
            <div className="profile-int">
              <h4>{currentUser ? currentUser.username : "N/A"}</h4>
            </div>
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
          <div className="logo-home">
            <img src={HRlogo} alt="H&R Detailing Logo" className="logo-image" />
          </div>
        </div>
        <div className="employee-info">
          <div>
            <h4>Branch Code:</h4>
          </div>
          <div className="profile-int">
            <h4>{branchInfo.branchCode}</h4>
          </div>
          <div>
            <h4>Branch Name:</h4>
          </div>
          <div className="profile-int">
            <h4>{branchInfo.branchName}</h4>
          </div>
          <div>
            <h4>Job Code:</h4>
          </div>
          <div className="profile-int">
            <h4>{jobInfo.jobCode}</h4>
          </div>
          <div>
            <h4>Job Name:</h4>
          </div>
          <div className="profile-int">
            <h4>{jobInfo.jobName}</h4>
          </div>
          <div>
            <h4>Logged in as:</h4>
          </div>
          <div className="profile-int">
            <h4>{currentUser.username}</h4>
          </div>
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
            <div className="response-input-container">
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
              <div className="attachment-section">
                <label htmlFor="file-upload" className="attachment-label">
                  <Paperclip className="attachment-icon" size={20} />
                  Attach File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileAttach}
                  style={{ display: "none" }}
                />
                {attachedFile && (
                  <div className="attachment-info">
                    <span className="attachment-filename">
                      {attachedFile.name}
                    </span>
                    <span className="attachment-status">Uploaded</span>
                  </div>
                )}
              </div>
            </div>

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