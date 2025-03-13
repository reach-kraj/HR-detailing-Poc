import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { branchData, jobData } from "../data/userdata";
import { useJobQuestions } from "../data/hooks/useJobQuestions";
import HRlogo from "../HRlogo.png";

// Import all filter components
import Clno from "../filter/clno";
import Open from "../filter/open";
import Close from "../filter/close";
import Stage from "../filter/stage";
import Sketch from "../filter/sketch";
import HrdInitials from "../filter/hrd_int";
import Seq from "../filter/Seq";
import RFI from "../filter/rfi";
import DesRef from "../filter/des_ref";
import WorkDoneBy from "../filter/workdoneby";
import DateSent from "../filter/datesent";
import Response from "../filter/response";
import ResDate from "../filter/resdate";

const Homepage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [branchInfo, setBranchInfo] = useState({
    branchCode: "N/A",
    branchName: "N/A",
  });
  const [jobInfo, setJobInfo] = useState({ jobCode: "N/A", jobName: "N/A" });
  const [selectedFilter, setSelectedFilter] = useState(null);

  const { questions, loading, error } = useJobQuestions();

  const filters = [
    { name: "CL No", route: "/filter/clno", component: Clno },
    { name: "Open", route: "/filter/open", component: Open },
    { name: "Close", route: "/filter/close", component: Close },
    { name: "Stage", route: "/filter/stage", component: Stage },
    { name: "Sketch", route: "/filter/sketch", component: Sketch },
    {
      name: "HRD Detailer Initials",
      route: "/filter/hrd-initials",
      component: HrdInitials,
    },
    { name: "Seq/Zone/Area", route: "/filter/sequence", component: Seq },
    { name: "RFI No", route: "/filter/rfi-no", component: RFI },
    {
      name: "Design Reference",
      route: "/filter/design-ref",
      component: DesRef,
    },
    {
      name: "Work Done By",
      route: "/filter/workdoneby",
      component: WorkDoneBy,
    },
    { name: "Date sent", route: "/filter/datesent", component: DateSent },
    { name: "Response", route: "/filter/Response", component: Response },
    { name: "Response Date", route: "/filter/Resdate", component: ResDate },
    { name: "View All", route: "/brview-all", component: null }, // Added View All filter
  ];

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user) {
      console.log("No user found in sessionStorage, redirecting to login");
      navigate("/");
      return;
    }
    console.log("Current User:", user);
    setCurrentUser(user);

    const selectedBranch = JSON.parse(sessionStorage.getItem("selectedBranch"));
    if (selectedBranch) {
      console.log("Selected Branch from sessionStorage:", selectedBranch);
      setBranchInfo({
        branchCode: selectedBranch.branchCode,
        branchName: selectedBranch.branchName,
      });
    } else {
      const branch = branchData.find((b) => b.branchCode === user.branchCode);
      if (branch) {
        console.log("Branch Found:", branch);
        setBranchInfo({
          branchCode: branch.branchCode,
          branchName: branch.branchName,
        });
      } else {
        console.log(
          "No matching branch found for branchCode:",
          user.branchCode
        );
        setBranchInfo({ branchCode: "N/A", branchName: "N/A" });
      }
    }

    const selectedJob = sessionStorage.getItem("selectedJob")
      ? JSON.parse(sessionStorage.getItem("selectedJob"))
      : user.jobs && user.jobs.length > 0
      ? jobData.find((j) => j.jobNo === user.jobs[0])
      : null;

    if (selectedJob) {
      console.log("Selected Job:", selectedJob);
      setJobInfo({
        jobCode: selectedJob.jobNo,
        jobName: selectedJob.jobName,
      });
    } else {
      console.log("No selected job found");
      setJobInfo({ jobCode: "N/A", jobName: "N/A" });
    }
  }, [navigate]);

  const highlightMatch = useCallback((text, query) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return (
          <span key={index} className="highlight">
            {part}
          </span>
        );
      }
      return part;
    });
  }, []);

  const filteredButtons = filters.filter((filter) =>
    filter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCount = questions.filter((q) => q.status === "open").length;
  const closedCount = questions.filter((q) => q.status === "closed").length;

  const handleQuestionClick = (clNo) => {
    navigate(`/question/${clNo}`);
  };

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>{error}</div>;
  if (!currentUser) return null;

  const handleFilterClick = (filter) => {
    if (filter.name === "View All") {
      navigate("/brview-all");
    } else {
      setSelectedFilter(filter);
    }
  };

  return (
    <div className="home-container">
      {/* Header Section */}
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

      {/* Main Layout */}
      <div className="mail-app-container">
        {/* Top Section: Action Buttons and Summary */}
        <div className="top-section">
          <div
            className="button-container"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button
              className="action-button"
              onClick={() => navigate("/bradd-question")}
            >
              <span className="button-icon">+</span>
              Add Question
            </button>
          </div>

          <div className="summary-block">
            <h3 className="summary-title">Clarification Summary</h3>
            <div className="summary-content">
              <div className="summary-item">
                <span className="summary-label">Open</span>
                <span className="summary-value">{openCount}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Closed</span>
                <span className="summary-value">{closedCount}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total Clarity List</span>
                <span className="summary-value">{openCount + closedCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Split Panel Section */}
        <div className="split-panel">
          {/* Left Panel: Filters */}
          <div className="left-panel">
            <div className="filter-header">
              <h2 className="filter-heading">Filters</h2>
            </div>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search filters..."
                className="search-inputs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <div className="filter-list">
              {filteredButtons.map((filter, index) => (
                <button
                  key={index}
                  className={`filter-item ${
                    selectedFilter?.name === filter.name ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick(filter)}
                >
                  {highlightMatch(filter.name, searchQuery)}
                </button>
              ))}
              {filteredButtons.length === 0 && (
                <div className="no-results">No matching filters found</div>
              )}
            </div>
          </div>

          {/* Right Panel: Content */}
          <div className="right-panel">
            {selectedFilter && selectedFilter.component ? (
              <selectedFilter.component />
            ) : (
              <div className="questions-list">
                {questions.length > 0 ? (
                  questions.map((question, index) => (
                    <div
                      key={`${question.clNo}-${index}`}
                      className="question-cards"
                      onClick={() => handleQuestionClick(question.clNo)}
                    >
                      <div className="question-date">{question.date}</div>
                      <div className="question-content">
                        <p>{question.q}</p>
                      </div>
                      <div className="question-meta">
                        <div className="cl-number">{question.clNo}</div>
                        <div className={`status-badge ${question.status}`}>
                          {question.status}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-results">No questions available</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;