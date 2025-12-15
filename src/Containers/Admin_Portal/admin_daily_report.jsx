import React, { useState } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";

const AdminDailyReport = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock Data matching reference image
  const dailyReports = [
    {
      employeeName: "Veera babu",
      projects: [
        { name: "SSPL", duration: "4Hrs", description: "Republic day posters desgined", status: "Completed" },
        { name: "HR Portal Pages", duration: "3Hrs", description: "Hr Portal Pages UX/UI Designs", status: "In Progress" },
      ],
    },
    {
      employeeName: "Lokesh",
      projects: [
        { name: "Hemanth Enterprises", duration: "6Hrs", description: "App Development", status: "In Progress" },
        { name: "Chick Spaces", duration: "6Hrs", description: "Web Development", status: "Pending" },
      ],
    },
    {
      employeeName: "Sai",
      projects: [
        { name: "Tandoori Flames", duration: "4Hrs", description: "Poster and Borcher Design", status: "Completed" },
        { name: "Rostro", duration: "4Hrs", description: "Poster Design", status: "Completed" },
      ],
    },
    {
      employeeName: "Mouli",
      projects: [
        { name: "Tandoori Flames", duration: "2Hrs", description: "Social Media Reels", status: "Pending" },
        { name: "Rostro", duration: "6Hrs", description: "Video editing", status: "In Progress" },
      ],
    },
  ];

  const employees = ["All Employees", "Veera babu", "Lokesh", "Sai", "Mouli"];
  const totalPages = 150;

  return (
    <div className={styles.emp_dashboard_wrapper}>
      <AdminSidebarMenu />
      <div className={styles.admin_dashboard_main}>
        <HeaderDashboard />

        <div className={styles.dashboard_content}>
          {/* Page Header with Filters */}
          <div className={styles.daily_report_header}>
            <h2 className={styles.pageTitle}>Daily Report List</h2>
            <div className={styles.daily_report_filters}>
              <div className={styles.date_picker}>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className={styles.employee_select}>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp, idx) => (
                    <option key={idx} value={emp}>{emp}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Main Table */}
          <div className={styles.daily_report_table_wrapper}>
            <table className={styles.daily_report_table}>
              <colgroup>
                <col style={{width: '15%'}} />
                <col style={{width: '20%'}} />
                <col style={{width: '10%'}} />
                <col style={{width: '40%'}} />
                <col style={{width: '15%'}} />
              </colgroup>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Project Name</th>
                  <th>Duration</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody> 
                {dailyReports.map((report, index) => (  
                  report.projects.map((project, pIdx) => (
                    <tr key={`${index}-${pIdx}`} className={`m-4 ${styles.data_row}`}>
                      {pIdx === 0 ? (
                        <td rowSpan={report.projects.length} className={styles.employee_name_cell} style={{width: '15%'}}>
                          {report.employeeName}
                        </td>
                      ) : null}
                      <td style={{width: '20%'}}>{project.name}</td>
                      <td className={styles.duration_cell} style={{width: '10%'}}>{project.duration}</td>
                      <td className={styles.description_cell} style={{width: '40%'}}>{project.description}</td>
                      <td className={styles.status_cell} style={{width: '15%'}}>
                        <span className={`${styles.status_badge} ${styles[`status_${project.status.toLowerCase().replace(' ', '_')}`]}`}>
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={currentPage === page ? styles.active_page : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <span>...</span>
            <button onClick={() => setCurrentPage(150)}>150</button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDailyReport;
