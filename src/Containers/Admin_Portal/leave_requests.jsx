import React, { useState, useEffect } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/staff.module.css";
import useAuth from "../../Hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";

const LeaveRequests = () => {
  const [greetings, setGreetings] = useState("");
  const [Emply, SetEmply] = useState(null);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { fetchemployeeDetails, fetchemployesrequestleavelist, AdminAuthData } = useAuth();
  const navigate = useNavigate();
  const { adminId } = useParams();

  const updateLeaveStatus = async (newStatus) => {
  try {
    const token = localStorage.getItem("admin_token");
    const res = await fetch(`http://localhost:3000/admin/update-leave-status/${selectedLeave.id}`, {
      method: "PUT",  // <-- Use PUT here
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Failed to update status", error);
  }
};


  useEffect(() => {
    const fetchData = async () => {
      if (adminId) {
        await fetchemployesrequestleavelist(adminId);
      }
    };

    fetchData();

    const currentHour = new Date().getHours();
    if (currentHour >= 1 && currentHour < 12) setGreetings("Good Morning");
    else if (currentHour >= 12 && currentHour < 17) setGreetings("Good Afternoon");
    else setGreetings("Good Evening");
  }, [adminId]);

  const leaveRequests = AdminAuthData?.managersrequestleaves || [];

  const handleStatusChange = async (newStatus) => {
    if (!selectedLeave) return;
    const response = await updateLeaveStatus(newStatus);
    console.log("fjdfidbidf" , response)
    if (response?.success) {
      await fetchemployesrequestleavelist(adminId);
      setShowModal(false);
    } else {
      alert("Failed to update leave status");
    }
  };

  return (
    <div className={styles.emp_dashboard_wrapper}>
      <AdminSidebarMenu />
      <div className={styles.admin_dashboard_main}>
        <div className={styles.admin_dashboard_header_card}>
          <HeaderDashboard />
          <h1 className={styles.admin_greeting}>
            {greetings}, <span>{Emply?.emp_name || "Loading..."}</span>!
          </h1>
        </div>

        <h1 style={{ marginTop: "0px", fontWeight: "500" }}>Leave Request Panel</h1>

        <div className={styles.emp_main_section_contianer}>
          <div className={styles.total_and_leave_card}>
            <div className={styles.total_emp_card}>
              <p className={styles.emp_active}>Leave Requests </p>
              <p className={styles.emp_count}>{leaveRequests.length}</p>
            </div>
            <div className={styles.leave_pen_card}>
              <p className={styles.emp_active}>Leave Pending</p>
              <p className={styles.emp_count}>{leaveRequests.filter(req => req.status === "Pending").length}</p>
            </div>
            <div className={styles.leave_rej_card}>
              <p className={styles.emp_active}>Leave Rejected</p>
              <p className={styles.emp_count}>{leaveRequests.filter(req => req.status === "Rejected").length}</p>
            </div>
          </div>
        </div>

        <div className={styles.empl_list_container}>
          <table border={0} cellPadding={8} style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Emp ID</th>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>Reason</th>
                <th>Start</th>
                <th>End</th>
                <th>Days</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((emp, index) => (
                <tr key={emp.id}>
                  <td>{index + 1}</td>
                  <td>{emp.employee_id}</td>
                  <td>{emp.employee_name}</td>
                  <td>{emp.leave_type === "Others" ? emp.other_leave_type : emp.leave_type}</td>
                  <td style={{ maxWidth: "120px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{emp.reason}</td>
                  <td>{emp.start_date}</td>
                  <td>{emp.end_date}</td>
                  <td>{emp.total_days}</td>
                  <td>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontWeight: "600",
                      backgroundColor:
                        emp.status === "Accepted"
                          ? "#e6f5ea"
                          : emp.status === "Pending"
                            ? "#fff8e1"
                            : "#ffebee",
                      color:
                        emp.status === "Accepted"
                          ? "#2e7d32"
                          : emp.status === "Pending"
                            ? "#ff9800"
                            : "#c62828"
                    }}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => { setSelectedLeave(emp); setShowModal(true); }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leaveRequests.length === 0 && <p style={{ marginTop: 20 }}>No leave requests found for this manager.</p>}
        </div>

        {showModal && selectedLeave && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ backgroundColor: "white", padding: 20, borderRadius: 10, maxWidth: "600px", width: "100%" }}>
              <h3>Leave Request Details</h3>
              <p><strong>Employee ID:</strong> {selectedLeave.employee_id}</p>
              <p><strong>Leave Type:</strong> {selectedLeave.leave_type}</p>
              <p><strong>Reason:</strong> {selectedLeave.reason}</p>
              <p><strong>Start Date:</strong> {selectedLeave.start_date}</p>
              <p><strong>End Date:</strong> {selectedLeave.end_date}</p>
              <p><strong>Total Days:</strong> {selectedLeave.total_days}</p>
              <p><strong>Status:</strong> {selectedLeave.status}</p>

              <div style={{ marginTop: 20 }}>
               <button onClick={() => handleStatusChange("Approved")} style={{ marginRight: 10 }}>Approve</button>

                <button onClick={() => handleStatusChange("Pending")} style={{ marginRight: 10 }}>Mark Pending</button>
                <button onClick={() => handleStatusChange("Rejected")} style={{ marginRight: 10 }}>Reject</button>
                <button onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequests;
