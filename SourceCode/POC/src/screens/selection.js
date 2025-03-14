
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./filter/filter.css";
import { branchData } from "./data/userdata";
import HRlogo from "./HRlogo.png";

const Selection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [branchInfo, setBranchInfo] = useState({
    branchCode: "N/A",
    branchName: "N/A",
  });
  const [jobInfo, setJobInfo] = useState({ jobCode: "N/A", jobName: "N/A" });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user) {
      navigate("/");
      return;
    }
    setCurrentUser(user);

    // Reset jobInfo when on "Select Branch" page
    if (!selectedBranch) {
      setJobInfo({ jobCode: "N/A", jobName: "N/A" });
      sessionStorage.removeItem("selectedJob"); // Clear selectedJob from sessionStorage
    }

    const stateBranch = location.state?.selectedBranch;
    if (stateBranch) {
      setSelectedBranch(stateBranch);
      setJobs(stateBranch.jobs);
      setBranchInfo({
        branchCode: stateBranch.branchCode,
        branchName: stateBranch.branchName,
      });
      sessionStorage.setItem("selectedBranch", JSON.stringify(stateBranch));
    } else if (user.role === "SUPER_ADMIN") {
      setBranches(branchData);
      const storedBranch = JSON.parse(sessionStorage.getItem("selectedBranch"));
      if (storedBranch) {
        setBranchInfo({
          branchCode: storedBranch.branchCode,
          branchName: storedBranch.branchName,
        });
      } else {
        setBranchInfo({ branchCode: "N/A", branchName: "N/A" });
      }
    } else {
      const userBranch = branchData.find(
        (b) => b.branchCode === user.branchCode
      );
      if (userBranch) {
        setBranches([userBranch]);
        setSelectedBranch(userBranch);
        setJobs(userBranch.jobs.filter((job) => user.jobs.includes(job.jobNo)));
        setBranchInfo({
          branchCode: userBranch.branchCode,
          branchName: userBranch.branchName,
        });
      }
    }

    // Only set jobInfo if a job is selected and we're on the "Select Job" page
    const storedJob = JSON.parse(sessionStorage.getItem("selectedJob"));
    if (storedJob && selectedBranch) {
      setJobInfo({
        jobCode: storedJob.jobNo,
        jobName: storedJob.jobName,
      });
    } else {
      setJobInfo({ jobCode: "N/A", jobName: "N/A" });
    }
  }, [navigate, location, selectedBranch]);

  // Cleanup on component unmount or page change
  useEffect(() => {
    return () => {
      // Reset jobInfo when leaving the page
      if (!selectedBranch) {
        setJobInfo({ jobCode: "N/A", jobName: "N/A" });
        sessionStorage.removeItem("selectedJob");
      }
    };
  }, [selectedBranch]);

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
    setJobs(branch.jobs);
    setBranchInfo({
      branchCode: branch.branchCode,
      branchName: branch.branchName,
    });
    // Reset jobInfo when selecting a new branch
    setJobInfo({ jobCode: "N/A", jobName: "N/A" });
    sessionStorage.setItem(
      "selectedBranch",
      JSON.stringify({
        branchCode: branch.branchCode,
        branchName: branch.branchName,
      })
    );
    sessionStorage.removeItem("selectedJob"); // Clear selectedJob when changing branch
  };

  const handleJobClick = (job) => {
    sessionStorage.setItem("selectedJob", JSON.stringify(job));
    setJobInfo({
      jobCode: job.jobNo,
      jobName: job.jobName,
    });
    if (currentUser.role === "SUPER_ADMIN") {
      navigate("/hqhomepage");
    } else {
      navigate("/brhomepage");
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setJobInfo({ jobCode: "N/A", jobName: "N/A" });
    setBranchInfo({ branchCode: "N/A", branchName: "N/A" });
    navigate("/");
  };

  const handleBack = () => {
    if (currentUser.role === "SUPER_ADMIN" && selectedBranch) {
      setSelectedBranch(null);
      setJobs([]);
      setBranchInfo({ branchCode: "N/A", branchName: "N/A" });
      setJobInfo({ jobCode: "N/A", jobName: "N/A" });
      sessionStorage.removeItem("selectedBranch");
      sessionStorage.removeItem("selectedJob");
    } else {
      navigate("/");
    }
  };

  const handleAddNewBranch = () => {
    navigate("/new-branch");
  };

  const handleAddNewJob = () => {
    navigate("/new-job", { state: { selectedBranch } });
  };

  if (!currentUser) return null;

  const isSuperAdminSA0101 =
    currentUser.role === "SUPER_ADMIN" && currentUser.username === "SA0101";

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
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <div className="back-button-div">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
      </div>

      <div className="home-content-box">
        <div className="questions-header">
          <h2>
            {currentUser.role === "SUPER_ADMIN"
              ? selectedBranch
                ? "Select Job"
                : "Select Branch"
              : `${
                  selectedBranch
                    ? selectedBranch.branchName
                    : currentUser.branch
                } Jobs`}
          </h2>
          {isSuperAdminSA0101 && !selectedBranch && (
            <button className="filter-button" onClick={handleAddNewBranch}>
              Add New Branch
            </button>
          )}
          {selectedBranch && (
            <button className="filter-button" onClick={handleAddNewJob}>
              Add New Job
            </button>
          )}
        </div>

        {/* Header Row for Branch Selection */}
        {!selectedBranch && branches.length > 0 && (
          <div className="branch-header-row">
            <div className="branch-header-item">Branch No</div>
            <div className="branch-header-item">Branch Name</div>
            <div className="branch-header-item">Status</div>
          </div>
        )}

        {/* Header Row for Job Selection */}
        {selectedBranch && jobs.length > 0 && (
          <div className="job-header-row">
            <div className="job-header-item">Project No</div>
            <div className="job-header-item">Project Name</div>
            <div className="job-header-item">Fabricator Job No</div>
            <div className="job-header-item">Fabricator Name</div>
          </div>
        )}

        <div className="questions-list">
          {/* Branch Selection Cards */}
          {currentUser.role === "SUPER_ADMIN" &&
            !selectedBranch &&
            branches.map((branch, index) => (
              <div
                className="question-cards branch-card"
                key={`${branch.branchCode}-${index}`}
                onClick={() => handleBranchClick(branch)}
              >
                <div className="question-date">{branch.branchCode}</div>
                <div className="question-content">
                  <p>{branch.branchName}</p>
                </div>
                <div className="question-meta">
                  <div className="status-badge open">Open</div>
                </div>
              </div>
            ))}

          {/* Job Selection Cards */}
          {selectedBranch &&
            jobs.length > 0 &&
            jobs.map((job, index) => (
              <div
                className="question-cards job-card"
                key={`${job.jobNo}-${index}`}
                onClick={() => handleJobClick(job)}
              >
                <div className="question-date">{job.jobNo}</div>
                <div className="question-content-p">
                  <p>
                    {job.jobName}
                    <span className="job-meta-info">
                      <span className="job-meta-item">
                        {job.fabricatorJobNo}
                      </span>
                      <span className="job-meta-item">
                        {job.fabricatorName}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            ))}

          {selectedBranch && jobs.length === 0 && (
            <p className="no-results">No jobs available for this branch</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Selection;