import axios from "axios";

// Base URLs
const BASE_URL = "http://localhost:3003/api";
const ADMIN_BASE_URL = "http://localhost:3003/api/admin";

// Utility: Get tokens from localStorage
const getEmpToken = () => localStorage.getItem("emp_token");
const getAdminToken = () => localStorage.getItem("admin_token");

// ------------------- EMPLOYEE ROUTES ------------------- //

// ✅ Employee Login (No Auth Header Required)
const Loginemployee = async (empCode, password) => {
  const response = await axios.post(`${BASE_URL}/employee_login`, {
    email: empCode,
    password, 
  });
  return response.data;
};

// ✅ Record Login Time (Optional: Add token if protected)
const RecordLoginTime = async (emp_id) => {
  const token = getEmpToken();
  const response = await axios.post(
    `${BASE_URL}/employee/login-time`,
    { emp_id },
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response.data;
};

// ✅ Get Employee Details
const Getemployeedetails = async (emp_id) => {
  const token = getEmpToken();
  const response = await axios.get(`${BASE_URL}/employee/details/${emp_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ✅ Logout Employee
const Logooutemployee = async (login_id) => {
  const token = getEmpToken();
  const response = await axios.post(
    `${BASE_URL}/employee_logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// ✅ Submit Leave Request
const SubmitLeaveRequest = async (leaveData) => {
  const token = getEmpToken();
  const response = await axios.post(`${BASE_URL}/submit-leave`, leaveData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ✅ Get Reporting Managers
const GetReportingManagers = async () => {
  const token = getEmpToken();
  const response = await axios.get(`${BASE_URL}/managers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ✅ Get Employee Leave Requests
const EmplyLeaveRequestList = async (emp_id) => {
  const token = getEmpToken();
  const response = await axios.get(`${BASE_URL}/employee/leave-request/list/${emp_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ✅ Get Daily Reports for Employee
const GetEmployeeDailyReports = async (emp_id) => {
  const token = getEmpToken();
  const response = await axios.get(`${BASE_URL}/employee-daily-reports/${emp_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ✅ Get Employee Payslip List
const GetEmployeePayslipList = async (emp_id) => {
  const token = getEmpToken();
  const response = await axios.get(`${BASE_URL}/employee/payslip/list/${emp_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ✅ Get Employee Payslip Details
const GetEmployeePayslipDetails = async (emp_id, month, year) => {
  const token = getEmpToken();
  const response = await axios.get(`${BASE_URL}/employee/payslip/details/${emp_id}?month=${month}&year=${year}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ------------------- ADMIN ROUTES ------------------- //

// ✅ Admin Login (No Auth Header Required)
const AdminLogin = async (email, password) => {
  const response = await axios.post(`${ADMIN_BASE_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

// ✅ Admin Logout
const AdminLogout = async () => {
  const token = getAdminToken();
  const response = await axios.post(`${ADMIN_BASE_URL}/logout`, {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// ✅ Fetch All Leave Requests for Manager/Admin
const fetchLeaveRequestsForManager = async (admin_id) => {
  const token = getAdminToken();
  const response = await axios.get(`${ADMIN_BASE_URL}/leave-requests-page/${admin_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ✅ Update Leave Request Status
const updateLeaveStatus = async (leaveId, status) => {
  const token = getAdminToken();
  const response = await axios.put(
    `${ADMIN_BASE_URL}/update-leave-status/${leaveId}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// ------------------- EXPORT ------------------- //

export default {
  // Employee APIs
  Loginemployee,
  RecordLoginTime,
  Getemployeedetails,
  Logooutemployee,
  SubmitLeaveRequest,
  GetReportingManagers,
  EmplyLeaveRequestList,
  GetEmployeeDailyReports,
  GetEmployeePayslipList,
  GetEmployeePayslipDetails,

  // Admin APIs
  AdminLogin,
  AdminLogout,
  fetchLeaveRequestsForManager,
  updateLeaveStatus,
};
