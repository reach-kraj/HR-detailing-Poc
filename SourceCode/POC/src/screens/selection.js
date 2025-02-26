
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./filter/filter.css"; // Reusing the provided CSS
// import { branchData, jobData } from "./data/userdata";

// const Selection = () => {
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [branches, setBranches] = useState([]);
//   const [selectedBranch, setSelectedBranch] = useState(null);
//   const [jobs, setJobs] = useState([]);

//   // Fetch current user from sessionStorage on mount
//   useEffect(() => {
//     const user = JSON.parse(sessionStorage.getItem("currentUser"));
//     if (!user) {
//       navigate("/"); // Redirect to login if no user is found
//       return;
//     }
//     setCurrentUser(user);

//     // Set branch and job data based on user role
//     if (user.role === "SUPER_ADMIN") {
//       setBranches(branchData); // Super Admin sees all branches
//     } else {
//       const userBranch = branchData.find(
//         (b) => b.branchCode === user.branchCode
//       );
//       if (userBranch) {
//         setBranches([userBranch]); // Branch Admins/Users see only their branch
//         setSelectedBranch(userBranch); // Auto-select branch for non-Super Admins
//         setJobs(
//           user.jobs.map((jobNo) => jobData.find((j) => j.jobNo === jobNo))
//         );
//       }
//     }
//   }, [navigate]);

//   // Handle branch selection for Super Admin
//   const handleBranchClick = (branch) => {
//     setSelectedBranch(branch);
//     setJobs(branch.jobs.map((jobNo) => jobData.find((j) => j.jobNo === jobNo)));
//     sessionStorage.setItem(
//       "selectedBranch",
//       JSON.stringify({
//         branchCode: branch.branchCode,
//         branchName: branch.branchName,
//       })
//     );
//   };

//   // Handle job selection and navigation
//   const handleJobClick = (job) => {
//     sessionStorage.setItem(
//       "selectedJob",
//       JSON.stringify({
//         jobNo: job.jobNo,
//         jobName: job.jobName,
//       })
//     );

//     if (currentUser.role === "SUPER_ADMIN") {
//       navigate("/hqhomepage");
//     } else {
//       navigate("/brhomepage");
//     }
//   };

//   // Logout function
//   const handleLogout = () => {
//     sessionStorage.removeItem("currentUser");
//     navigate("/");
//   };

//   // Handle back button functionality
//   const handleBack = () => {
//     if (currentUser.role === "SUPER_ADMIN" && selectedBranch) {
//       setSelectedBranch(null); // Go back to branch list
//       setJobs([]); // Clear job list
//     } else {
//       navigate("/"); // Go back to login page
//     }
//   };

//   // Placeholder functions for Add New buttons (for future use)
//   const handleAddNewBranch = () => {
//     navigate("/new-branch"); // Navigate to the new branch page
//   };

//   const handleAddNewJob = () => {
//   navigate("/new-job");
//   };

//   if (!currentUser) return null; // Prevent rendering until user is loaded

//   const isSuperAdminSA0101 =
//     currentUser.role === "SUPER_ADMIN" && currentUser.username === "SA0101";

//   return (
//     <div className="home-container">
//       <div className="home-header">
//         <div className="company-logo">
//           <h1>H&R Detailing</h1>
//         </div>
//         <button className="logout-button" onClick={handleLogout}>
//           Log Out
//         </button>
//       </div>

//       <div className="back-button-div">
//         <button className="back-button" onClick={handleBack}>
//           Back
//         </button>
//       </div>

//       <div className="home-content-box">
//         <div className="questions-header">
//           <h2>
//             {currentUser.role === "SUPER_ADMIN"
//               ? "Select Branch and Job"
//               : `${currentUser.branch} Jobs`}
//           </h2>
//           {/* Add New Branch Button (Only for SA0101, branch list view) */}
//           {isSuperAdminSA0101 && !selectedBranch && (
//             <button className="filter-button" onClick={handleAddNewBranch}>
//               Add New Branch
//             </button>
//           )}
//           {/* Add New Job Button (Shown only on job list view for all users) */}
//           {selectedBranch && (
//             <button className="filter-button" onClick={handleAddNewJob}>
//               Add New Job
//             </button>
//           )}
//         </div>

//         <div className="questions-list">
//           {/* Branch List for Super Admin */}
//           {currentUser.role === "SUPER_ADMIN" &&
//             !selectedBranch &&
//             branches.map((branch, index) => (
//               <div
//                 key={`${branch.branchCode}-${index}`}
//                 className="question-card"
//                 onClick={() => handleBranchClick(branch)}
//               >
//                 <div className="question-date">{branch.branchCode}</div>
//                 <div className="question-content">
//                   <p>{branch.branchName}</p>
//                 </div>
//                 <div className="question-meta">
//                   <div className="status-badge open">Open</div>
//                 </div>
//               </div>
//             ))}

//           {/* Job List */}
//           {selectedBranch &&
//             jobs.length > 0 &&
//             jobs.map((job, index) => (
//               <div
//                 key={`${job.jobNo}-${index}`}
//                 className="question-card"
//                 onClick={() => handleJobClick(job)}
//               >
//                 <div className="question-date">{job.jobNo}</div>
//                 <div className="question-content">
//                   <p>{job.jobName}</p>
//                 </div>
//                 <div className="question-meta">
//                   <div className="status-badge open">Open</div>
//                 </div>
//               </div>
//             ))}

//           {/* No Jobs Available */}
//           {selectedBranch && jobs.length === 0 && (
//             <p className="no-results">No jobs available for this branch</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Selection;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation
import "./filter/filter.css";
import { branchData, jobData } from "./data/userdata";

const Selection = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To access navigation state
  const [currentUser, setCurrentUser] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user) {
      navigate("/");
      return;
    }
    setCurrentUser(user);

    // Check if returning from NewJob with a selected branch
    const stateBranch = location.state?.selectedBranch;
    if (stateBranch) {
      setSelectedBranch(stateBranch);
      setJobs(
        stateBranch.jobs.map((jobNo) => jobData.find((j) => j.jobNo === jobNo))
      );
      sessionStorage.setItem("selectedBranch", JSON.stringify(stateBranch));
    } else if (user.role === "SUPER_ADMIN") {
      setBranches(branchData);
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
      }
    }
  }, [navigate, location]);

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
    setJobs(branch.jobs.map((jobNo) => jobData.find((j) => j.jobNo === jobNo)));
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
    if (currentUser.role === "SUPER_ADMIN") {
      navigate("/hqhomepage");
    } else {
      navigate("/brhomepage");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleBack = () => {
    if (currentUser.role === "SUPER_ADMIN" && selectedBranch) {
      setSelectedBranch(null);
      setJobs([]);
    } else {
      navigate("/");
    }
  };

  const handleAddNewBranch = () => {
    navigate("/new-branch");
  };

  const handleAddNewJob = () => {
    navigate("/new-job", { state: { selectedBranch } }); // Pass selectedBranch
  };

  if (!currentUser) return null;

  const isSuperAdminSA0101 =
    currentUser.role === "SUPER_ADMIN" && currentUser.username === "SA0101";

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="company-logo">
          <h1>H&R Detailing</h1>
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
              ? "Select Branch and Job"
              : `${currentUser.branch} Jobs`}
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
                key={`${branch.branchCode}-${index}`}
                className="question-card"
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
                key={`${job.jobNo}-${index}`}
                className="question-card"
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