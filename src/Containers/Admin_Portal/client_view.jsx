import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";

const ClientView = () => {
    const navigate = useNavigate();
    const { clientId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 150;

    // Mock client data - replace with API call
    const clientData = {
        id: 1,
        name: "Chetan Reddy",
        projects: [
            { id: 1, name: "Project Name 1", url: "project1.com" },
            { id: 2, name: "Project Name 2", url: "project2.com" },
            { id: 3, name: "Project Name 3", url: "project3.com" },
            { id: 4, name: "Project Name 4", url: "project4.com" },
            { id: 5, name: "Project Name 5", url: "project5.com" },
            { id: 6, name: "Project Name 6", url: "project6.com" },
            { id: 7, name: "Project Name 7", url: "project7.com" },
            { id: 8, name: "Project Name 8", url: "project8.com" },
            { id: 9, name: "Project Name 9", url: "project9.com" },
            { id: 10, name: "Project Name 10", url: "project10.com" },
        ]
    };

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />

                <div className={styles.dashboard_content}>
                    {/* Page Header */}
                    <div className={styles.daily_report_header}>
                        <h2 className={styles.pageTitle}>Client - {clientData.name}</h2>
                        <button 
                            className={styles.go_back_btn}
                            onClick={() => navigate('/admin/clients')}
                        >
                            Go Back
                        </button>
                    </div>

                    {/* Projects Table */}
                    <div className={styles.daily_report_table_wrapper}>
                        <table className={styles.daily_report_table}>
                            <colgroup>
                                <col style={{ width: '40%' }} />
                                <col style={{ width: '60%' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientData.projects.map((project) => (
                                    <tr key={project.id} className={styles.data_row}>
                                        <td>{project.name}</td>
                                        <td>
                                            <a 
                                                href={`https://${project.url}`} 
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: '#4B8BF5', textDecoration: 'none' }}
                                            >
                                                {project.url}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

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
        </div>
    );
};

export default ClientView;
