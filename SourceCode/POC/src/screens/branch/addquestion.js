
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useJobQuestions } from "../data/hooks/useJobQuestions";
import HRlogo from "../HRlogo.png";
import { Paperclip } from "lucide-react";
import { ToastContainer, toast } from "react-toastify"; // Added toast imports
import "react-toastify/dist/ReactToastify.css"; // Added toast CSS import

const AddQuestion = () => {
  const navigate = useNavigate();
  const { questions, loading, error } = useJobQuestions();
  const currentDate = new Date().toLocaleDateString("en-GB");

  const [currentUser, setCurrentUser] = useState(null);
  const [branchInfo, setBranchInfo] = useState({
    branchCode: "N/A",
    branchName: "N/A",
  });
  const [jobInfo, setJobInfo] = useState({ jobCode: "N/A", jobName: "N/A" });
  const [attachedFile, setAttachedFile] = useState(null);

  const getNextClNo = (questions) => {
    if (!questions || questions.length === 0) return "CL001";
    const clNumbers = questions.map((q) =>
      parseInt(q.clNo.replace("CL", ""), 10)
    );
    const maxClNo = Math.max(...clNumbers);
    const nextClNo = maxClNo + 1;
    return `CL${String(nextClNo).padStart(3, "0")}`;
  };

  const [formData, setFormData] = useState({
    clNo: "",
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
    workDoneBy: "",
  });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user) {
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
    }

    const selectedJob = JSON.parse(sessionStorage.getItem("selectedJob"));
    if (selectedJob) {
      setJobInfo({
        jobCode: selectedJob.jobNo,
        jobName: selectedJob.jobName,
      });
    }
  }, [navigate]);

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
        clNo: "CL001",
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

  const handleFileAttach = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAttachedFile({
        name: file.name,
        uploaded: true,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      attachedFile: attachedFile ? attachedFile.name : null,
    });

    // Show success toast
    toast.success("Question submitted successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => {
        setAttachedFile(null); // Clear attachment after submission
        navigate("/brhomepage"); // Navigate after toast closes
      },
    });
  };

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Error loading questions: {error}</div>;
  if (!currentUser) return null;

  return (
    <div className="home-container">
      <ToastContainer /> {/* Added ToastContainer */}
      <div className="home-header">
        <div className="company-logo">
          <div className="logo-home">
            <img src={HRlogo} alt="H&R Detailing Logo" className="logo-image" />
          </div>
        </div>
        <div className="employee-info">
          <div><h4>Branch Code:</h4></div>
          <div className="profile-int"><h4>{branchInfo.branchCode}</h4></div>
          <div><h4>Branch Name:</h4></div>
          <div className="profile-int"><h4>{branchInfo.branchName}</h4></div>
          <div><h4>Job Code:</h4></div>
          <div className="profile-int"><h4>{jobInfo.jobCode}</h4></div>
          <div><h4>Job Name:</h4></div>
          <div className="profile-int"><h4>{jobInfo.jobName}</h4></div>
          <div><h4>Logged in as:</h4></div>
          <div className="profile-int"><h4>{currentUser.username}</h4></div>
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
              <label htmlFor="hrdDetailerInitials">HRD Detailer Initials:</label>
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
                name="workDoneBy"
                value={formData.workDoneBy}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="question">Question:</label>
            <div className="question-input-container">
              <textarea
                id="question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                className="input-field textarea"
                required
                rows="6"
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
                    <span className="attachment-filename">{attachedFile.name}</span>
                    <span className="attachment-status">Uploaded</span>
                  </div>
                )}
              </div>
            </div>
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