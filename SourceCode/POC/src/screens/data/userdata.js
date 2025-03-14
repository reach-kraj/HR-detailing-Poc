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
    branchCode: "C001",
    jobs: ["C25001", "C25002", "C25003", "C25004"],
    redirectPath: "/brhomepage",
  },
  {
    username: "BA0202",
    password: "password123",
    role: "BRANCH_ADMIN",
    name: "Branch Admin 2",
    branch: "Mumbai",
    branchCode: "M001",
    jobs: ["M25001", "M25002", "M25003", "M25004"],
    redirectPath: "/brhomepage",
  },
  {
    username: "BA0203",
    password: "password123",
    role: "BRANCH_ADMIN",
    name: "Branch Admin 3",
    branch: "Nellai",
    branchCode: "N001",
    jobs: ["N25001", "N25002", "N25003", "N25004"],
    redirectPath: "/brhomepage",
  },
  {
    username: "BA0204",
    password: "password123",
    role: "BRANCH_ADMIN",
    name: "Branch Admin 3",
    branch: "Avadi",
    branchCode: "A001",
    jobs: ["A25001", "A25002", "A25003", "A25004"],
    redirectPath: "/brhomepage",
  },
  {
    username: "BU0301",
    password: "password123",
    role: "BRANCH_USER",
    name: "Branch User 1",
    branch: "Chennai",
    branchCode: "C001",
    jobs: ["C25001", "C25002"],
    redirectPath: "/brhomepage",
  },
  {
    username: "BU0302",
    password: "password123",
    role: "BRANCH_USER",
    name: "Branch User 2",
    branch: "Chennai",
    branchCode: "C001",
    jobs: ["C25003", "C25004"],
    redirectPath: "/brhomepage",
  },
];

const branchData = [
  {
    branchCode: "C001",
    branchName: "Chennai",
    jobs: [
      {
        jobNo: "C25001",
        jobName: "Chennai Project 01",
        fabricatorJobNo: "F2501",
        fabricatorName: "FAB01",
      },
      {
        jobNo: "C25002",
        jobName: "Chennai Project 02",
        fabricatorJobNo: "F2502",
        fabricatorName: "FAB02",
      },
      {
        jobNo: "C25003",
        jobName: "Chennai Project 03",
        fabricatorJobNo: "F2503",
        fabricatorName: "FAB03",
      },
      {
        jobNo: "C25004",
        jobName: "Chennai Project 04",
        fabricatorJobNo: "F2504",
        fabricatorName: "FAB04",
      },
    ],
  },
  {
    branchCode: "M001",
    branchName: "Mumbai",
    jobs: [
      {
        jobNo: "M25001",
        jobName: "Mumbai Project 01",
        fabricatorJobNo: "F2501",
        fabricatorName: "FAB01",
      },
      {
        jobNo: "M25002",
        jobName: "Mumbai Project 02",
        fabricatorJobNo: "F2502",
        fabricatorName: "FAB02",
      },
      {
        jobNo: "M25003",
        jobName: "Mumbai Project 03",
        fabricatorJobNo: "F2503",
        fabricatorName: "FAB03",
      },
      {
        jobNo: "M25004",
        jobName: "Mumbai Project 04",
        fabricatorJobNo: "F2504",
        fabricatorName: "FAB04",
      },
    ],
  },
  {
    branchCode: "N001",
    branchName: "Nellai",
    jobs: [
      {
        jobNo: "N25001",
        jobName: "Nellai Project 01",
        fabricatorJobNo: "F2501",
        fabricatorName: "FAB01",
      },
      {
        jobNo: "N25002",
        jobName: "Nellai Project 02",
        fabricatorJobNo: "F2502",
        fabricatorName: "FAB02",
      },
      {
        jobNo: "N25003",
        jobName: "Nellai Project 03",
        fabricatorJobNo: "F2503",
        fabricatorName: "FAB03",
      },
      {
        jobNo: "N25004",
        jobName: "Nellai Project 04",
        fabricatorJobNo: "F2504",
        fabricatorName: "FAB04",
      },
    ],
  },
  {
    branchCode: "A001",
    branchName: "Avadi",
    jobs: [
      {
        jobNo: "A25001",
        jobName: "Avadi Project 01",
        fabricatorJobNo: "F2501",
        fabricatorName: "FAB01",
      },
      {
        jobNo: "A25002",
        jobName: "Avadi Project 02",
        fabricatorJobNo: "F2502",
        fabricatorName: "FAB02",
      },
      {
        jobNo: "A25003",
        jobName: "Avadi Project 03",
        fabricatorJobNo: "F2503",
        fabricatorName: "FAB03",
      },
      {
        jobNo: "A25004",
        jobName: "Avadi Project 04",
        fabricatorJobNo: "F2504",
        fabricatorName: "FAB04",
      },
    ],
  },
  {
    branchCode: "L001",
    branchName: "Colombo",
    jobs: [
      {
        jobNo: "C25001",
        jobName: "Colombo Project 01",
        fabricatorJobNo: "F2501",
        fabricatorName: "FAB01",
      },
      {
        jobNo: "C25002",
        jobName: "Colombo Project 02",
        fabricatorJobNo: "F2502",
        fabricatorName: "FAB02",
      },
      {
        jobNo: "C25003",
        jobName: "Colombo Project 03",
        fabricatorJobNo: "F2503",
        fabricatorName: "FAB03",
      },
      {
        jobNo: "C25004",
        jobName: "Colombo Project 04",
        fabricatorJobNo: "F2504",
        fabricatorName: "FAB04",
      },
    ],
  },
  {
    branchCode: "K001",
    branchName: "Kandy",
    jobs: [
      {
        jobNo: "K25001",
        jobName: "Kandy Project 01",
        fabricatorJobNo: "F2501",
        fabricatorName: "FAB01",
      },
      {
        jobNo: "K25002",
        jobName: "Kandy Project 02",
        fabricatorJobNo: "F2502",
        fabricatorName: "FAB02",
      },
      {
        jobNo: "K25003",
        jobName: "Kandy Project 03",
        fabricatorJobNo: "F2503",
        fabricatorName: "FAB03",
      },
      {
        jobNo: "K25004",
        jobName: "Kandy Project 04",
        fabricatorJobNo: "F2504",
        fabricatorName: "FAB04",
      },
    ],
  },
];

// Job data is now part of branchData, so we remove the standalone jobData array.

export { userData, branchData };
