import React, { useState, useRef, useEffect } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";

const AdminDailyReport = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dateInputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mock Data matching reference image with Dates added for filtering
  const dailyReports = [
    {
      date: "2024-01-26",
      employeeName: "Veera babu",
      projects: [
        { name: "SSPL", duration: "4Hrs", description: "Republic day posters desgined", status: "Completed" },
        { name: "HR Portal Pages", duration: "3Hrs", description: "Hr Portal Pages UX/UI Designs", status: "In Progress" },
      ],
    },
    {
      date: "2024-01-26",
      employeeName: "Lokesh",
      projects: [
        { name: "Hemanth Enterprises", duration: "6Hrs", description: "App Development", status: "In Progress" },
        { name: "Chick Spaces", duration: "6Hrs", description: "Web Development", status: "Pending" },
      ],
    },
    {
      date: "2024-01-25",
      employeeName: "Sai",
      projects: [
        { name: "Tandoori Flames", duration: "4Hrs", description: "Poster and Borcher Design", status: "Completed" },
        { name: "Rostro", duration: "4Hrs", description: "Poster Design", status: "Completed" },
      ],
    },
    {
      date: "2024-01-25",
      employeeName: "Mouli",
      projects: [
        { name: "Tandoori Flames", duration: "2Hrs", description: "Social Media Reels", status: "Pending" },
        { name: "Rostro", duration: "6Hrs", description: "Video editing", status: "In Progress" },
      ],
    },
  ];

  const employees = ["All Employees", "Veera babu", "Lokesh", "Sai", "Mouli"];
  
  // Filtering Logic
  const filteredReports = dailyReports.filter(report => {
      const matchesEmployee = selectedEmployee === "" || selectedEmployee === "All Employees" || report.employeeName === selectedEmployee;
      const matchesDate = selectedDate === "" || report.date === selectedDate;
      return matchesEmployee && matchesDate;
  });

  // Pagination Logic
  const itemsPerPage = 10; 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.emp_dashboard_wrapper}>
      <AdminSidebarMenu />
      <div className={styles.admin_dashboard_main}>
        <HeaderDashboard />

        <div className={styles.dashboard_content}>
          {/* Page Header with Filters */}
          <div className={styles.daily_report_header}>
            <h2 className={styles.pageTitle}>Daily Report List</h2>
            <div className={`${styles.daily_report_filters} ${styles.monthly_responsive_filters}`} ref={dropdownRef}>
              <div className={styles.date_picker}>
                <div className={styles.custom_dropdown}>
                   <div 
                     className={styles.monthly_report_toggle} 
                     style={{cursor: 'pointer'}}
                     onClick={() => dateInputRef.current?.showPicker()}
                   >
                      <span>{selectedDate || "dd-mm-yyyy"}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <input
                        ref={dateInputRef}
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '1px',
                          height: '1px',
                          opacity: 0,
                          pointerEvents: 'none'
                        }}
                      />
                   </div>
                </div>
              </div>

              {/* Employee Dropdown */}
              <div className={styles.custom_dropdown}>
                <div 
                  className={styles.monthly_report_toggle}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{selectedEmployee || "Select Employee"}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={isDropdownOpen ? styles.arrow_up : styles.arrow_down}
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
                {isDropdownOpen && (
                  <div className={styles.dropdown_menu}>
                    <div 
                      className={styles.dropdown_item} 
                      onClick={() => { setSelectedEmployee(""); setIsDropdownOpen(false); }}
                    >
                      Select Employee
                    </div>
                    {employees.filter(e => e !== "All Employees").map((emp, idx) => (
                      <div 
                        key={idx} 
                        className={`${styles.dropdown_item} ${selectedEmployee === emp ? styles.dropdown_item_active : ''}`}
                        onClick={() => { setSelectedEmployee(emp); setIsDropdownOpen(false); }}
                      >
                        {emp}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Table */}
          <div className={styles.daily_report_table_wrapper}>
            <table className={styles.daily_report_table}>
              <colgroup>
                <col className={styles.col_emp_name} />
                <col className={styles.col_proj_name} />
                <col className={styles.col_duration} />
                <col className={styles.col_desc} />
                <col className={styles.col_status} />
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
                {currentItems.length > 0 ? (
                    currentItems.map((report, index) => (  
                    report.projects.map((project, pIdx) => (
                        <tr key={`${index}-${pIdx}`} className={`m-4 ${styles.data_row}`}>
                        {pIdx === 0 ? (
                            <td rowSpan={report.projects.length} className={styles.employee_name_cell}>
                            {report.employeeName}
                            </td>
                        ) : null}
                        <td>{project.name}</td>
                        <td className={styles.duration_cell}>{project.duration}</td>
                        <td className={styles.description_cell}>{project.description}</td>
                        <td className={styles.status_cell}>
                            <span className={`${styles.status_badge} ${styles[`status_${project.status.toLowerCase().replace(' ', '_')}`]}`}>
                            {project.status}
                            </span>
                        </td>
                        </tr>
                    ))
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" style={{textAlign: "center", padding: "20px"}}>No reports found.</td>
                    </tr>
                )}
              </tbody>
            </table>
            
            {/* Pagination */}
            <div className={styles.pagination_container}>
              <button 
                  className={styles.pagination_btn} 
                  disabled={currentPage === 1} 
                  onClick={() => paginate(currentPage - 1)}
              >
                  Previous
              </button>
              
              {Array.from({ length: Math.ceil(filteredReports.length / itemsPerPage) }, (_, i) => (
                  <button
                      key={i + 1}
                      className={`${styles.pagination_btn} ${currentPage === i + 1 ? styles.pagination_btn_active : ''}`}
                      onClick={() => paginate(i + 1)}
                  >
                      {i + 1}
                  </button>
              ))}

              <button 
                  className={styles.pagination_btn} 
                  disabled={currentPage >= Math.ceil(filteredReports.length / itemsPerPage)} 
                  onClick={() => paginate(currentPage + 1)}
              >
                  Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDailyReport;
