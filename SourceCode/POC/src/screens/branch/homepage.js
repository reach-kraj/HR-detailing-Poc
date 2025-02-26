
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { branchData, jobData } from "../data/userdata"; // Import userdata
import { useJobQuestions } from "../data/hooks/useJobQuestions"; // Import the custom hook

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const Homepage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [branchInfo, setBranchInfo] = useState({
    branchCode: "N/A",
    branchName: "N/A",
  });
  const [jobInfo, setJobInfo] = useState({ jobCode: "N/A", jobName: "N/A" });

  // Use the custom hook to fetch job-specific questions
  const { questions, loading, error } = useJobQuestions();

  // Filters array remains unchanged
  const filters = [
    { name: "CL No", route: "/filter/clno" },
    { name: "Open", route: "/filter/open" },
    { name: "Close", route: "/filter/close" },
    { name: "Stage", route: "/filter/stage" },
    { name: "Sketch", route: "/filter/sketch" },
    { name: "HRD Detailer Initials", route: "/filter/hrd-initials" },
    { name: "Seq/Zone/Area", route: "/filter/sequence" },
    { name: "RFI No", route: "/filter/rfi-no" },
    { name: "Design Reference", route: "/filter/design-ref" },
    { name: "Work Done By", route: "/filter/workdoneby" },
    { name: "Date sent", route: "/filter/datesent" },
    { name: "Response", route: "/filter/Response" },
    { name: "Response Date", route: "/filter/Resdate" },
  ];

  // Fetch user data and set branch/job info on mount
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user) {
      console.log("No user found in sessionStorage, redirecting to login");
      navigate("/"); // Redirect to login if no user
      return;
    }
    console.log("Current User:", user);
    setCurrentUser(user);

    // Get branch info
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

    // Get job info
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

  // Function to highlight matched text
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

  // Filter buttons based on search query
  const filteredButtons = filters.filter((filter) =>
    filter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle loading and error states
  if (loading) return <div>Loading data...</div>;
  if (error) return <div>{error}</div>;
  if (!currentUser) return null; // Prevent rendering until user is loaded

  // Calculate counts for open and closed questions using dynamic questions data
  const openCount = questions.filter((q) => q.status === "open").length;
  const closedCount = questions.filter((q) => q.status === "closed").length;

  // Data for the first pie chart (Open vs Closed)
  const pieChartData = {
    labels: ["Open", "Closed"],
    datasets: [
      {
        data: [openCount, closedCount],
        backgroundColor: ["#FF6384", "#36A2EB"], // Red for Open, Blue for Closed
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  // Calculate counts for stages: Approval, Review, Fabrication
  const approvalCount = questions.filter((q) => q.Stage === "Approval").length;
  const reviewCount = questions.filter((q) => q.Stage === "Review").length;
  const fabricationCount = questions.filter(
    (q) => q.Stage === "Fabrication"
  ).length;

  // Data for the second pie chart (Stages)
  const stageChartData = {
    labels: ["Approval", "Review", "Fabrication"],
    datasets: [
      {
        data: [approvalCount, reviewCount, fabricationCount],
        backgroundColor: ["#FFCD56", "#4BC0C0", "#9966FF"], // Yellow, Green, Purple
        hoverBackgroundColor: ["#FFCD56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  // Chart options to reduce size
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom sizing
    plugins: {
      legend: {
        position: "bottom", // Move legend below the chart
      },
    },
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <div className="home-header">
        <div className="company-logo">
          <h1>H&R Detailing</h1>
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

      {/* Content Section */}
      <div className="home-content-box">
        {/* Action Buttons */}
        <div className="button-container">
          <button
            className="action-button"
            onClick={() => navigate("/bradd-question")}
          >
            <span className="button-icon">+</span>
            Add Question
          </button>
          <button
            className="action-button"
            onClick={() => navigate("/brview-all")}
          >
            View All
          </button>
        </div>

        {/* New Summary Block */}
        <div className="summary-block">
          <h3 className="summary-title">Clarity List Summary</h3>
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

        {/* Filters Section */}
        <div className="content-box">
          <div className="filter-header">
            <h2 className="filter-heading">Filters</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search filters..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <div className="filter-grid">
            {filteredButtons.map((filter, index) => (
              <button
                key={index}
                className={`filter-button ${
                  searchQuery &&
                  filter.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ? "matched"
                    : ""
                }`}
                onClick={() => navigate(filter.route)}
              >
                {highlightMatch(filter.name, searchQuery)}
              </button>
            ))}
            {filteredButtons.length === 0 && (
              <div className="no-results">No matching filters found</div>
            )}
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-container">
          {/* First Chart: Open vs Closed */}
          <div className="chart-section">
            <h3 className="chart-title">Clarity List Overview</h3>
            <div
              className="chart-box"
              style={{ width: "300px", height: "300px" }}
            >
              <Pie data={pieChartData} options={chartOptions} />
            </div>
          </div>

          {/* Second Chart: Stages */}
          <div className="chart-section">
            <h3 className="chart-title">Stage Distribution</h3>
            <div
              className="chart-box"
              style={{ width: "300px", height: "300px" }}
            >
              <Pie data={stageChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;