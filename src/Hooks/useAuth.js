import { useState } from "react";
import authServices from "../Services/authService";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

const EmployeeAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();

  const { empId } = useParams();

  const [authData, setAuthData] = useState({
    emp: null,
    emp_token: null,
    empleaverequestslsit: [],
  });

  const [AdminAuthData, setAdminAuthData] = useState({
    admin: null,
    token: null,
    managersrequestleaves: [],
  });


  // ✅ LOGIN - store employee ID and token
  // const handleLogin = async (empCode, password) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await authServices.Loginemployee(empCode, password);
  //     console.log("Login Response:", response);

  //     if (response.message === "Login successful" && response.emp_details) {
  //       setUser(response.emp_details);
  //       localStorage.setItem("employee_id", response.emp_details.id);
  //       localStorage.setItem("emp_token", response.token); // ✅ store token
  //     } else {
  //       setError("Invalid credentials");
  //     }
  //   } catch (err) {
  //     console.error("Login Error:", err);
  //     setError("Something went wrong during login.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleEmpLogin = async (empCode, password) => {
  setLoading(true);
  setError("");

  try {
    const data = await authServices.Loginemployee(empCode, password);

    // ✅ Map response fields to your expected format
    const emp = {
      emp_id: data.emp_details.id,
      emp_name: data.emp_details.empName,
      emp_code: data.emp_details.empCode,
    };

    setAuthData({
      emp,
      emp_token: data.token,
      empleaverequestslsit: [],
    });
    setUser(emp.emp_id);

    // ✅ Save in localStorage
    localStorage.setItem("emp_token", data.token);
    localStorage.setItem("emp_id", emp.emp_id);
    localStorage.setItem("emp_name", emp.emp_name);
  } catch (err) {
    setError(err?.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};
  

  // ✅ FETCH EMPLOYEE DETAILS (token required)
  const fetchemployeeDetails = async (empIdFromParams) => {
    const empId = empIdFromParams || localStorage.getItem("employee_id");
    setLoading(true);
    setError(null);

    if (!empId) {
      setError("No Employee ID found in storage.");
      return null;
    }

    try {
      const response = await authServices.Getemployeedetails(empId);
      setUser(response.employee); // optionally set again
      return response;
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch employee details.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGOUT - remove token & employee ID
  const handleLogout = async (login_id) => {
    setLoading(true);
    setError(null);
    try {
      await authServices.Logooutemployee(login_id);
      localStorage.removeItem("employee_id");
      localStorage.removeItem("emp_token"); // ✅ clear token
      setUser(null);
      navigate("/");
    } catch (err) {
      setError("Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SUBMIT LEAVE
  const SubmitEmpLeaveRequest = async (leaveData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authServices.SubmitLeaveRequest(leaveData);
      console.log("Leave Submitted:", res);
      return res;
    } catch (err) {
      console.error("Leave Submit Error:", err);
      setError("Failed to submit leave request.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ FETCH REPORTING MANAGERS
  const fetchReportingManagers = async () => {
    setLoading(true);
    try {
      const data = await authServices.GetReportingManagers();
      setManagers(data);
    } catch (err) {
      console.error("Fetching managers failed", err);
      setError("Unable to fetch managers.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FETCH EMPLOYEE LEAVE REQUEST LIST
  const fetchemplleaverequestlist = async (emp_id) => {
    setLoading(true);
    try {
      const response = await authServices.EmplyLeaveRequestList(emp_id);
      console.log("📦 Leave API Response:", response);

      const list = Array.isArray(response) ? response : response?.data || [];

      setAuthData((prev) => ({
        ...prev,
        empleaverequestslsit: list,
      }));
    } catch (err) {
      console.error("Fetching employee leave request list failed", err);
      setError("Unable to fetch employee leave request list.");
    } finally {
      setLoading(false);
    }
  };


  // Adin login 

  const handleAdminLogin = async (admin_name, password) => {
    setLoading(true);
    setError("");

    try {
      const data = await authServices.AdminLogin(admin_name, password);
      setAdminAuthData({
        admin: data.admin,
        token: data.token,
      });


      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_name", data.admin.admin_name);
      localStorage.setItem("admin_details", JSON.stringify(data.admin));
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogout = async () => {
    setLoading(true);
    try {
      await authServices.AdminLogout();
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_name");
      localStorage.removeItem("admin_details");
      setAdminAuthData({
        admin: null,
        token: null,
        managersrequestleaves: [],
      });
      navigate("/admin-login");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLoading(false);
    }
  };

  // leaquerequests for managers 
  const fetchemployesrequestleavelist = async (admin_id) => {
    console.log("🚀 Calling API with admin_id:", admin_id);

    try {
      const response = await authServices.fetchLeaveRequestsForManager(admin_id);
      console.log("✅ API Raw Response:", response);

      // Check if it's response.data or response.data.data
      const list = Array.isArray(response)
        ? response
        : response?.data
          ? response.data
          : [];

      console.log("📦 Final Parsed List:", list);

      setAdminAuthData((prev) => ({
        ...prev,
        managersrequestleaves: list,
      }));
    } catch (err) {
      console.error("❌ Fetching employee leave request list failed", err);
    }
  };


  const updateLeaveRequestStatus = async (leaveId, newStatus, adminId) => {
    try {
      const response = await authServices.updateLeaveStatus(leaveId, newStatus);
      console.log("✅ Status Update Response:", response);

      // Refetch latest list after update
      await fetchemployesrequestleavelist(adminId);
    } catch (err) {
      console.error("❌ Error updating leave status:", err);
    }
  };


  return {
    ...authData,
     empAuthData: authData,
    user,
    loading,
    error,
    managers,
handleEmpLogin,
    fetchemployeeDetails,
    handleLogout,
    SubmitEmpLeaveRequest,
    fetchReportingManagers,
    fetchemplleaverequestlist,
    handleAdminLogin, // ✅ not LoginAdmin
    handleAdminLogout, // ✅ Added handleAdminLogout
    AdminAuthData, fetchemployesrequestleavelist, updateLeaveRequestStatus
  };
};

export default EmployeeAuth;
