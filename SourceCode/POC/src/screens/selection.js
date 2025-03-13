

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./filter/filter.css";
import { branchData, jobData } from "./data/userdata";
import HRlogo from "./HRlogo.png"; // Import the logo

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

    // Set branch info based on user or selected branch
    const stateBranch = location.state?.selectedBranch;
    if (stateBranch) {
      setSelectedBranch(stateBranch);
      setJobs(
        stateBranch.jobs.map((jobNo) => jobData.find((j) => j.jobNo === jobNo))
      );
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
      }
    } else {
      const userBranch = branchData.find(
        (b) => b.branchCode === user.branchCode
      );
      if (userBranch) {
        setBranches([userBranch]);
        setSelectedBranch(userBranch);
        setJobs(
          user.jobs.map((jobNo) => jobData.find((j) => j.jobNo === jobNo))
        );
        setBranchInfo({
          branchCode: userBranch.branchCode,
          branchName: userBranch.branchName,
        });
      }
    }

    // Set job info if a job is already selected
    const storedJob = JSON.parse(sessionStorage.getItem("selectedJob"));
    if (storedJob) {
      setJobInfo({
        jobCode: storedJob.jobNo,
        jobName: storedJob.jobName,
      });
    }
  }, [navigate, location]);

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
    setJobs(branch.jobs.map((jobNo) => jobData.find((j) => j.jobNo === jobNo)));
    setBranchInfo({
      branchCode: branch.branchCode,
      branchName: branch.branchName,
    });
    sessionStorage.setItem(
      "selectedBranch",
      JSON.stringify({
        branchCode: branch.branchCode,
        branchName: branch.branchName,
      })
    );
  };

  const handleJobClick = (job) => {
    sessionStorage.setItem(
      "selectedJob",
      JSON.stringify({
        jobNo: job.jobNo,
        jobName: job.jobName,
      })
    );
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
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("selectedBranch");
    sessionStorage.removeItem("selectedJob");
    navigate("/");
  };

  const handleBack = () => {
    if (currentUser.role === "SUPER_ADMIN" && selectedBranch) {
      setSelectedBranch(null);
      setJobs([]);
      setBranchInfo({ branchCode: "N/A", branchName: "N/A" });
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

        <div className="questions-list">
          {currentUser.role === "SUPER_ADMIN" &&
            !selectedBranch &&
            branches.map((branch, index) => (
              <div
                className="question-cards"
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

          {selectedBranch &&
            jobs.length > 0 &&
            jobs.map((job, index) => (
              <div
                className="question-cards"
                key={`${job.jobNo}-${index}`}
                onClick={() => handleJobClick(job)}
              >
                <div className="question-date">{job.jobNo}</div>
                <div className="question-content">
                  <p>{job.jobName}</p>
                </div>
                <div className="question-meta">
                  <div className="status-badge open">Open</div>
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