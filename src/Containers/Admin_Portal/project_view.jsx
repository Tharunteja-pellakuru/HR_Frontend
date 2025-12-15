import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
import { FaRegClock } from "react-icons/fa";

const ProjectView = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [status, setStatus] = useState("In Development");

    // Mock project data
    const projectData = {
        name: "Project Name",
        status: "In Development",
        startDate: "20 November 2024",
        dueDate: "25 March 2024",
        totalHours: 102,
        individualHours: [
            { name: "Vishal", hours: "30 Hrs" },
            { name: "Veera", hours: "05 Hrs" },
            { name: "Sandeep", hours: "10 Hrs" },
            { name: "Jagadeesh", hours: "10 Hrs" },
            { name: "Lokesh", hours: "10 Hrs" },
            { name: "Shayam", hours: "20 Hrs" },
            { name: "Ashritha", hours: "15 Hrs" },
            { name: "Bhargav", hours: "02 Hrs" },
        ]
    };

    const statusOptions = ["In Development", "Completed", "On Hold", "Cancelled"];

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />

                <div className={styles.dashboard_content}>
                    {/* Page Header */}
                    <div className={styles.daily_report_header}>
                        <h2 className={styles.pageTitle}>{projectData.name}</h2>
                        <button 
                            className={styles.go_back_btn_grey}
                            onClick={() => navigate('/admin/projects')}
                        >
                            Go Back
                        </button>
                    </div>
                    {/* Main Content Container with Border */}
                    <div className={styles.project_content_container}>
                        {/* Project Status and Dates Row */}
                        <div className={styles.project_info_row}>
                            <div className={styles.status_text}>
                                <span className={styles.status_label}>Project Status : </span>
                                <span className={styles.status_value}>{projectData.status}</span>
                            </div>
                            <div className={styles.dates_wrapper}>
                                <div className={styles.date_box}>
                                    <span className={styles.date_label}>Start Date : </span>
                                    <span className={styles.date_value}>{projectData.startDate}</span>
                                </div>
                                <div className={styles.date_box}>
                                    <span className={styles.date_label}>Due Date : </span>
                                    <span className={styles.date_value}>{projectData.dueDate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Hours Section */}
                        <div className={styles.project_hours_section}>
                            {/* Total Hours Card */}
                            <div className={styles.total_hours_card}>
                                <div className={styles.hours_icon}>
                                    <FaRegClock />
                                </div>
                                <div className={styles.hours_content}>
                                    <span className={styles.hours_value}>{projectData.totalHours}</span>
                                    <span className={styles.hours_label}>Total hours worked</span>
                                </div>
                            </div>

                            {/* Individual Hours Table */}
                            <div className={styles.individual_hours_table}>
                                <div className={styles.individual_hours_header}>
                                    Individual worked hours
                                </div>
                                <div className={styles.individual_hours_list}>
                                    {projectData.individualHours.map((emp, idx) => (
                                        <div 
                                            key={idx} 
                                            className={`${styles.individual_hours_row} ${idx % 2 === 1 ? styles.alt_row : ''}`}
                                        >
                                            <span className={styles.emp_name}>{emp.name}</span>
                                            <span className={styles.emp_hours}>{emp.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectView;
