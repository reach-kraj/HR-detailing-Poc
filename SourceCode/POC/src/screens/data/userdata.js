// data/userdata.js
const userData = [
  {
    username: "SA0101",
    password: "password123",
    role: "SUPER_ADMIN",
    name: "Super Admin",
    accessLevel: "all",
    redirectPath: "/hqhomepage",
  },
  {
    username: "BA0201",
    password: "password123",
    role: "BRANCH_ADMIN",
    name: "Branch Admin 1",
    branch: "Chennai",
    branchCode: "B001",
    jobs: ["J001", "J002", "J003", "J004"],
    redirectPath: "/brhomepage",
  },
  {
    username: "BA0202",
    password: "password123",
    role: "BRANCH_ADMIN",
    name: "Branch Admin 2",
    branch: "Mumbai",
    branchCode: "B002",
    jobs: ["J001", "J002", "J003", "J004"],
    redirectPath: "/brhomepage",
  },
  {
    username: "BA0203",
    password: "password123",
    role: "BRANCH_ADMIN",
    name: "Branch Admin 3",
    branch: "Delhi",
    branchCode: "B003",
    jobs: ["J001", "J002", "J003", "J004"],
    redirectPath: "/brhomepage",
  },
  {
    username: "BA0204",
    password: "password123",
    role: "BRANCH_ADMIN",
    name: "Branch Admin 4",
    branch: "Bangalore",
    branchCode: "B004",
    jobs: ["J001", "J002", "J003", "J004"],
    redirectPath: "/brhomepage",
  },
  {
    username: "BU0301",
    password: "password123",
    role: "BRANCH_USER",
    name: "Branch User 1",
    branch: "Chennai",
    branchCode: "B001",
    jobs: ["J001", "J002"],
    redirectPath: "/brhomepage",
  },
  {
    username: "BU0302",
    password: "password123",
    role: "BRANCH_USER",
    name: "Branch User 2",
    branch: "Chennai",
    branchCode: "B001",
    jobs: ["J003", "J004"],
    redirectPath: "/brhomepage",
  },
];

// Branch data structure
const branchData = [
  {
    branchCode: "B001",
    branchName: "Chennai",
    jobs: ["J001", "J002", "J003", "J004"],
  },
  {
    branchCode: "B002",
    branchName: "Mumbai",
    jobs: ["J001", "J002", "J003", "J004"],
  },
  {
    branchCode: "B003",
    branchName: "Delhi",
    jobs: ["J001", "J002", "J003", "J004"],
  },
  {
    branchCode: "B004",
    branchName: "Bangalore",
    jobs: ["J001", "J002", "J003", "J004"],
  },
];

// Job data structure
const jobData = [
  {
    jobNo: "J001",
    jobName: "Steel Structure Design",
  },
  {
    jobNo: "J002",
    jobName: "Foundation Construction",
  },
  {
    jobNo: "J003",
    jobName: "Electrical Installation",
  },
  {
    jobNo: "J004",
    jobName: "HVAC System Setup",
  },
];

export { userData, branchData, jobData };
