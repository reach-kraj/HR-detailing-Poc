import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";
import "./allquestions.css";
import { useJobQuestions } from "../data/hooks/useJobQuestions";
import { branchData, jobData } from "../data/userdata";
import HRlogo from "../HRlogo.png"; // Added logo import

const AllQuestions = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const { questions, loading, error } = useJobQuestions();

  // Added state for header information
  const [currentUser, setCurrentUser] = useState(null);
  const [branchInfo, setBranchInfo] = useState({
    branchCode: "N/A",
    branchName: "N/A",
  });
  const [jobInfo, setJobInfo] = useState({ jobCode: "N/A", jobName: "N/A" });

  // Added useEffect for fetching user/branch/job info
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

  const handleQuestionClick = (clNo) => {
    navigate(`/question/${clNo}`);
  };

  // Sorting function
  const getSortedQuestions = (questionsToSort) => {
    try {
      const sorted = [...questionsToSort].sort((a, b) => {
        const numA = parseInt(a.clNo.replace(/[^0-9]/g, ""), 10) || 0;
        const numB = parseInt(b.clNo.replace(/[^0-9]/g, ""), 10) || 0;
        return sortOrder === "asc" ? numA - numB : numB - numA;
      });
      return sorted;
    } catch (error) {
      console.error("Error sorting questions:", error);
      return questionsToSort;
    }
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Filter questions based on search query
  const getFilteredQuestions = () => {
    try {
      if (!searchQuery.trim()) return getSortedQuestions(questions);

      const query = searchQuery.toLowerCase().trim();
      const filtered = questions.filter((question) =>
        [question.clNo, question.q, question.date, question.status].some(
          (field) => field && field.toLowerCase().includes(query)
        )
      );
      return getSortedQuestions(filtered);
    } catch (error) {
      console.error("Error filtering questions:", error);
      return questions;
    }
  };

  const filteredQuestions = getFilteredQuestions();

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>{error}</div>;
  if (!currentUser) return null;

  return (
    <div className="home-container">
      {/* Updated Header */}
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
        <div className="questions-header">
          <h2>All Questions ({filteredQuestions.length})</h2>
          <div className="header-controls">
            <button className="filter-button" onClick={handleSort}>
              <span>Sort {sortOrder === "asc" ? "Asc" : "Desc"}</span>
              <ArrowUpDown className="h-4 w-4" />
            </button>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="questions-list">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question, index) => (
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
            <p className="no-results">
              {searchQuery
                ? `No results found for "${searchQuery}"`
                : "No questions available"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
