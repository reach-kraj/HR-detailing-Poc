
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import questionsData from "./data/template";
import { branchData, jobData } from "./data/userdata"; // Import userdata for branch and job info
import HRlogo from "./HRlogo.png"; // Import the logo
import "./questionview.css";

const QuestionView = () => {
  const { clNo } = useParams();
  const navigate = useNavigate();

  // State for user, branch, and job info
  const [currentUser, setCurrentUser] = useState(null);
  const [branchInfo, setBranchInfo] = useState({
    branchCode: "N/A",
    branchName: "N/A",
  });
  const [jobInfo, setJobInfo] = useState({ jobCode: "N/A", jobName: "N/A" });

  // Find the question data based on clNo
  const questionData = questionsData.find((q) => q.clNo === clNo);

  // Fetch user, branch, and job info on mount
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

    const selectedJob = sessionStorage.getItem("selectedJob")
      ? JSON.parse(sessionStorage.getItem("selectedJob"))
      : user.jobs && user.jobs.length > 0
      ? jobData.find((j) => j.jobNo === user.jobs[0])
      : null;

    if (selectedJob) {
      setJobInfo({
        jobCode: selectedJob.jobNo,
        jobName: selectedJob.jobName,
      });
    }
  }, [navigate]);

  // Function to handle navigation to response view
  const handleAddResponse = () => {
    navigate(`/resquestion/${clNo}`);
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
      </div>
    );
  }

  return (
    <div className="home-container">
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
                <span className="detail-label">H&R RFI No:</span>
                <span className="detail-value">{questionData.HR_RFI}</span>
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
                <span className="detail-label">Sequence:</span>
                <span className="detail-value">
                  {questionData.Seq_area_zone?.split("/")[0]}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Zone:</span>
                <span className="detail-value">
                  {questionData.Seq_area_zone?.split("/")[1]}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Area:</span>
                <span className="detail-value">
                  {questionData.Seq_area_zone?.split("/")[2]}
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
              <div className="detail-row">
                <span className="detail-label">Response Date:</span>
                <span className="detail-value">
                  {questionData.Response_Date}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Respond By:</span>
                <span className="detail-value">{questionData.Resp_by}</span>
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
            <h3>Response</h3>
            <div className="response-text">
              <p>{questionData.Response}</p>
              {/* Conditionally render the "Add your Response" button */}
              {currentUser.username === "SA0101" && (
                <button
                  className="add-response-button"
                  onClick={handleAddResponse}
                >
                  Add your Response
                </button>
              )}
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
    </div>
  );
};

export default QuestionView;