import React, { useState, useEffect } from "react";
import "../../Styles/style.css";
import Common from "../../Components/Common/common";
import SidebarMenu from "../../Components/Common/Dashboard";
import styles from "../../Styles/leaverequest.module.css";
import EmployeeAuth from "../../Hooks/useAuth";
import { useParams } from "react-router-dom";
import DatePicker from "react-multi-date-picker";

const EmpleaveRequest = () => {
  const [showPopup, setShowPopup] = useState(false);
  const {
    managers,
    fetchReportingManagers,
    SubmitEmpLeaveRequest,
    fetchemplleaverequestlist,
    empleaverequestslsit,
    loading,
  } = EmployeeAuth();
  const { empId } = useParams();
  const [selectedDates, setSelectedDates] = useState([]);

  const [leaveData, setLeaveData] = useState({
    startDate: "",
    endDate: "",
    days: "",
    reason: "",
    // manager: "",
    admin_id: "",
    leaveType: "Leave",
    customLeaveType: "",
    fromDayType: "",
    toDayType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prev) => ({
      ...prev,
      [name]: value,
      // optional: force refresh if needed
      temp: Date.now()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      employee_id: empId,
      // admin_id: leaveData.manager,
      admin_id: leaveData.admin_id, // ✅ instead of leaveData.manager

      leave_type:
        leaveData.leaveType === "Other Type Leave"
          ? leaveData.customLeaveType
          : leaveData.leaveType,
      other_leave_type:
        leaveData.leaveType === "Other Type Leave"
          ? leaveData.customLeaveType
          : null,
      start_date: leaveData.startDate,
      end_date: leaveData.endDate,
      from_day_type: leaveData.fromDayType,
      to_day_type: leaveData.fromDayType,
      total_days: leaveData.days,
      reason: leaveData.reason,
    };

    try {
      await SubmitEmpLeaveRequest(payload);
      alert("Leave Request Submitted Successfully!");
      setShowPopup(false);
      setLeaveData({
        startDate: "",
        endDate: "",
        days: "",
        reason: "",
        manager: "",
        leaveType: "Leave",
        customLeaveType: "",
        fromDayType: "",
        toDayType: "",
      });
      setSelectedDates([]);
    } catch (error) {
      console.error("Submit failed", error);
      alert("Failed to submit leave request.");
    }
  };

  useEffect(() => {
    const getManagers = async () => {
      await fetchReportingManagers();
    };
    getManagers();
  }, []);

  //fetching the emply leave request
  useEffect(() => {
    fetchReportingManagers();
  }, []);

  useEffect(() => {
    if (empId) {
      console.log("Fetching for empId", empId);
      fetchemplleaverequestlist(empId);
    }
  }, [empId]);

  useEffect(() => {
    console.log("📄 empleaverequestslsit in component:", empleaverequestslsit);
  }, [empleaverequestslsit]);



  return (
    <>
      <div className="emp_wrapper">
        <SidebarMenu />
        <div className="emp_main_wrapper">
          <Common />
          <div className="emp_content_section">
            <p>Employee Leave Request</p>
            <div className={styles.leave_btn_container}>
              <button
                type="button"
                className={styles.create_leave_btn}
                onClick={() => setShowPopup(true)}
              >
                <span>+</span> Create Leave Request
              </button>
            </div>

            <div className={styles.table_container}>
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>No. of Days</th>

                    <th>Reason</th>
                    <th>Applied Date     </th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {empleaverequestslsit && empleaverequestslsit.length > 0 ? (
                    empleaverequestslsit.map((item, index) => (
                      <tr key={item.id || index}>
                        <td>{index + 1}</td>
                        <td>{item.start_date ? new Date(item.start_date).toISOString().split("T")[0] : "-"}</td>
                        <td>{item.end_date ? new Date(item.end_date).toISOString().split("T")[0] : "-"}</td>
                        <td>{item.total_days ?? "-"}</td>
                        <td>{item.reason || item.leave_type || "-"}</td>
                        <td>{item.created_at ? item.created_at.split("T")[0] : "-"}</td>

                        <td
                          className={
                            item.status === "Approved"
                              ? styles.status_approved
                              : item.status === "Rejected"
                                ? styles.status_rejected
                                : styles.status_pending
                          }
                        >
                          {item.status || "Pending"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        No leave requests found.
                      </td>
                    </tr>
                  )}
                </tbody>



              </table>

            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className={styles.popup_overlay}>
          <div className={styles.leave_card}>
            <h1>Apply Leave</h1>
            <form onSubmit={handleSubmit} className={styles.leave_form}>
              <div className={styles.row}>
                <div className={styles.col}>
                  <label>Reporting Manager</label>
                  <select
                    name="admin_id"
                    value={leaveData.admin_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Manager</option>
                    {managers.map((manager) => (
                      <option key={manager.admin_id} value={manager.admin_id}>
                        {manager.manager_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.col}>
                  <label>Leave Left</label>
                  <div className={styles.leave_left}>
                    You <span>6.5 leave</span> in your account
                  </div>
                </div>
              </div>

              <div className={styles.leave_type_row}>
                <label>Leave Type</label>
                <div className={styles.radio_group}>
                  <label>
                    <input
                      type="radio"
                      name="leaveType"
                      value="Leave"
                      checked={leaveData.leaveType === "Leave"}
                      onChange={handleChange}
                    />
                    Leave
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="leaveType"
                      value="Medical Leave"
                      checked={leaveData.leaveType === "Medical Leave"}
                      onChange={handleChange}
                    />
                    Medical Leave
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="leaveType"
                      value="Other Type Leave"
                      checked={leaveData.leaveType === "Other Type Leave"}
                      onChange={handleChange}
                    />
                    Other Type Leave
                  </label>
                </div>
                {leaveData.leaveType === "Other Type Leave" && (
                  <input
                    type="text"
                    name="customLeaveType"
                    placeholder="Enter leave type"
                    value={leaveData.customLeaveType || ""}
                    onChange={handleChange}
                    className={styles.custom_input}
                  />
                )}
              </div>

              <div className={styles.row}>
                <div className={styles.col}>
                  <label>Select Date(s):</label>
                  <DatePicker style={{ height: "40px" }}
                    multiple
                    value={selectedDates}
                    onChange={(dates) => {
                      const sorted = [...dates].sort(
                        (a, b) => new Date(a) - new Date(b)
                      );
                      setSelectedDates(sorted);

                      const startDate = sorted[0]?.format("YYYY-MM-DD");
                      const endDate = sorted[sorted.length - 1]?.format("YYYY-MM-DD");

                      setLeaveData((prev) => ({
                        ...prev,
                        startDate,
                        endDate,
                        days: sorted.length,
                      }));
                    }}
                    format="YYYY-MM-DD"
                    required
                  />

                </div>
                <div className={styles.col}>
                  <label>Day Type</label>
                  <div className={styles.radio_group}>
                    <label>
                      <input
                        type="radio"
                        name="fromDayType"
                        value="Full"
                        checked={leaveData.fromDayType === "Full"}
                        onChange={handleChange}
                      />
                      Full
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="fromDayType"
                        value="Half"
                        checked={leaveData.fromDayType === "Half"}
                        onChange={handleChange}
                      />
                      Half
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="fromDayType"
                        value="Work From Home"
                        checked={leaveData.fromDayType === "Work From Home"}
                        onChange={handleChange}
                      />
                      Work From Home
                    </label>
                  </div>
                </div>
              </div>
              {leaveData.days && (
                <div className={styles.days_strip}>
                  📝 <span className={styles.label}>No. of Days:</span>
                  <span className={styles.days}> {leaveData.days} </span>
                  <span className={styles.type}> {leaveData.fromDayType} </span>
                </div>
              )}


              <div className={styles.reason_for_leave}>
                <label>Reason For Leave</label>
                <textarea
                  name="reason"
                  value={leaveData.reason}
                  onChange={handleChange}
                  placeholder="Type here Reason for leave"
                  required
                ></textarea>
              </div>

              <div className={styles.button_row}>
                <button type="button" onClick={() => setShowPopup(false)} className={styles.cancelbtn}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitbtn}>
                  Apply Leave
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EmpleaveRequest;
