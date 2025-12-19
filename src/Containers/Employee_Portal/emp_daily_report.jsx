import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "../../Styles/dashboard.module.css";
import SidebarMenu from "../../Components/Common/Dashboard";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import EmployeeAuth from "../../Hooks/useAuth";
import { IoClose, IoChevronDown } from "react-icons/io5";

// Import utilities
import { getCurrentDate, formatDuration } from "../../utils/dateHelpers";

// Constants
const PROJECT_OPTIONS = ["SSPL", "Hr Portal Pages", "Chick Spaces", "R Firms"];
const STATUS_OPTIONS = ["Pending", "In Progress", "Completed"];
const INITIAL_FORM_DATA = {
    projectName: '',
    hours: '',
    minutes: '',
    description: '',
    status: ''
};
const INITIAL_DAILY_REPORTS = [
    { id: "01", project: "SSPL", date: "27-01-2025", duration: "3Hrs", description: "Republic day posters desgined", status: "Completed" },
    { id: "02", project: "Hr Portal Pages", date: "27-01-2025", duration: "1Hrs", description: "Hr Portal Pages UX/UI Designs", status: "In Progress" },
    { id: "03", project: "Chick Spaces", date: "27-01-2025", duration: "2Hrs", description: "Republic day posters desgined", status: "Completed" },
    { id: "04", project: "R Firms", date: "27-01-2025", duration: "2Hrs", description: "Republic day posters desgined", status: "Pending" },
];

const Empdailyreport = () => {
    const { empId } = useParams();
    const { fetchemployeeDetails } = EmployeeAuth();
    const [Emply, SetEmply] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [dailyReports, setDailyReports] = useState(INITIAL_DAILY_REPORTS);
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
    const statusDropdownRef = useRef(null);
    const projectDropdownRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
                setIsStatusDropdownOpen(false);
            }
            if (projectDropdownRef.current && !projectDropdownRef.current.contains(event.target)) {
                setIsProjectDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchemployeeDetails(empId);
            if (response?.employee) {
                SetEmply(response.employee);
            }
        };
        fetchData();
    }, [empId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        // Validate form
        if (!formData.projectName || !formData.hours || !formData.description || !formData.status) {
            alert("Please fill all required fields");
            return;
        }

        // Create new report
        const newReport = {
            id: String(dailyReports.length + 1).padStart(2, '0'),
            project: formData.projectName,
            date: getCurrentDate(),
            duration: formatDuration(formData.hours, formData.minutes),
            description: formData.description,
            status: formData.status
        };

        // Add to list
        setDailyReports(prev => [...prev, newReport]);
        
        // Reset form and close modal
        setShowModal(false);
        setFormData(INITIAL_FORM_DATA);
    };

    // Pagination Logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dailyReports.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.emp_dashboard_wrapper}>
             <SidebarMenu />

             <div className={styles.emp_dashboard_main}>
                <HeaderDashboard />

                <div className={styles.dashboard_content}>
                    
                    <div className={styles.daily_report_header}>
                        <h2 className={styles.pageTitle} style={{ marginBottom: 0 }}>
                            Daily Reports
                        </h2>
                        
                        <button className={styles.add_new_btn} onClick={() => setShowModal(true)}>
                            Add New
                        </button>
                    </div>

                    <div className={styles.emp_daily_report_container}>
                        <div className={styles.table_scroll_wrapper}>
                            <table className={styles.emp_daily_report_table}>
                                <colgroup>
                                    <col style={{ width: '6%' }} />
                                    <col style={{ width: '18%' }} />
                                    <col style={{ width: '12%' }} />
                                    <col style={{ width: '10%' }} />
                                    <col style={{ width: '40%' }} />
                                    <col style={{ width: '14%' }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Project Name</th>
                                        <th>Date</th>
                                        <th>Duration</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((report, index) => (
                                        <tr key={report.id}>
                                            <td>{report.id}</td>
                                            <td>{report.project}</td>
                                            <td>{report.date}</td>
                                            <td>{report.duration}</td>
                                            <td>{report.description}</td>
                                            <td>{report.status}</td>
                                        </tr>
                                    ))}
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
                                
                                {Array.from({ length: Math.ceil(dailyReports.length / itemsPerPage) }, (_, i) => (
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
                                    disabled={currentPage === Math.ceil(dailyReports.length / itemsPerPage)} 
                                    onClick={() => paginate(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
             </div>

             {/* Add New Modal */}
             {showModal && (
                <div className={styles.modal_overlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
                        
                        {/* Modal Header */}
                        <div className={styles.modal_header}>
                            <h2 className={styles.modal_title}>Add Daily Report</h2>
                            <button className={styles.modal_close_btn} onClick={() => setShowModal(false)}>
                                <IoClose size={24} />
                            </button>
                        </div>
                        
                        {/* Project Name */}
                        <div className={styles.modal_form_row}>
                            <label className={styles.modal_label}>
                                Project Name :
                            </label>
                            <div className={styles.custom_dropdown} ref={projectDropdownRef}>
                                <div 
                                    className={`${styles.dropdown_toggle} ${styles.status_dropdown_active}`}
                                    onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                                    style={{ width: '100%', padding: '8px 10px', height: '40px', justifyContent: 'space-between' }}
                                >
                                    <span>{formData.projectName || 'Select Project'}</span>
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
                                        className={isProjectDropdownOpen ? styles.arrow_up : styles.arrow_down}
                                    >
                                        <path d="M6 9l6 6 6-6"/>
                                    </svg>
                                </div>
                                {isProjectDropdownOpen && (
                                    <div className={styles.dropdown_menu}>
                                        {PROJECT_OPTIONS.map((project, idx) => (
                                            <div 
                                                key={idx}
                                                className={`${styles.dropdown_item} ${formData.projectName === project ? styles.dropdown_item_active : ''}`}
                                                onClick={() => {
                                                    setFormData(prev => ({ ...prev, projectName: project }));
                                                    setIsProjectDropdownOpen(false);
                                                }}
                                            >
                                                {project}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Duration */}
                        <div className={styles.modal_form_row}>
                            <label className={styles.modal_label}>
                                Duration :
                            </label>
                            <div style={{ display: 'flex', gap: '10px', flex: 1, width: '100%' }}>
                                <input
                                    type="number"
                                    name="hours"
                                    value={formData.hours}
                                    onChange={handleInputChange}
                                    placeholder="Hours"
                                    min="0"
                                    max="24"
                                    className={styles.modal_input}
                                    style={{ flex: 1, minWidth: 0 }}
                                />
                                <input
                                    type="number"
                                    name="minutes"
                                    value={formData.minutes}
                                    onChange={handleInputChange}
                                    placeholder="Minutes"
                                    min="0"
                                    max="59"
                                    className={styles.modal_input}
                                    style={{ flex: 1, minWidth: 0 }}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className={styles.modal_form_row_textarea}>
                            <label className={styles.modal_label_textarea}>
                                Description :
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={5}
                                className={styles.modal_textarea}
                            />
                        </div>
                                
                        {/* Status */}
                        <div className={styles.modal_form_row}>
                            <label className={styles.modal_label}>
                                Status :
                            </label>
                            <div className={styles.custom_dropdown} ref={statusDropdownRef}>
                                <div 
                                    className={`${styles.dropdown_toggle} ${styles.status_dropdown_active}`}
                                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                                    style={{ width: '100%', padding: '8px 10px', height: '40px', justifyContent: 'space-between' }}
                                >
                                    <span>{formData.status || 'Select Status'}</span>
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
                                        className={isStatusDropdownOpen ? styles.arrow_up : styles.arrow_down}
                                    >
                                        <path d="M6 9l6 6 6-6"/>
                                    </svg>
                                </div>
                                {isStatusDropdownOpen && (
                                    <div className={styles.dropdown_menu}>
                                        {STATUS_OPTIONS.map((status, idx) => (
                                            <div 
                                                key={idx}
                                                className={`${styles.dropdown_item} ${formData.status === status ? styles.dropdown_item_active : ''}`}
                                                onClick={() => {
                                                    setFormData(prev => ({ ...prev, status }));
                                                    setIsStatusDropdownOpen(false);
                                                }}
                                            >
                                                {status}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className={styles.modal_submit_container}>
                            <button
                                onClick={handleSubmit}
                                className={styles.modal_submit_btn}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
             )}
        </div>
    );
};

export default Empdailyreport;

