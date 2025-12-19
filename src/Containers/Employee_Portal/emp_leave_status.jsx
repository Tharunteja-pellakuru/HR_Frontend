import React, { useEffect, useState } from "react";
import "../../Styles/style.css";
import Common from "../../Components/Common/common";
import SidebarMenu from "../../Components/Common/Dashboard";
import styles from "../../Styles/dashboard.module.css";
import EmployeeAuth from "../../Hooks/useAuth";
import { useParams } from "react-router-dom";

// Mock Data matching the image exactly
const MOCK_DATA = [
    { id: 1, sNo: "1", startDate: "28-01-2025", endDate: "29-01-2025", days: "02", status: "Pending", reason: "" },
    { id: 2, sNo: "2", startDate: "30-01-2025", endDate: "31-01-2025", days: "02", status: "Approved", reason: "" },
    { id: 3, sNo: "3", startDate: "28-01-2025", endDate: "28-01-2025", days: "02", status: "Approved", reason: "" },
    { id: 4, sNo: "4", startDate: "28-01-2025", endDate: "28-01-2025", days: "02", status: "Rejected", reason: "" },
    { id: 5, sNo: "5", startDate: "28-01-2025", endDate: "28-01-2025", days: "02", status: "Pending", reason: "" },
    { id: 6, sNo: "6", startDate: "28-01-2025", endDate: "28-01-2025", days: "02", status: "Approved", reason: "" },
    { id: 7, sNo: "7", startDate: "28-01-2025", endDate: "28-01-2025", days: "02", status: "Approved", reason: "" },
    { id: 8, sNo: "8", startDate: "28-01-2025", endDate: "28-01-2025", days: "02", status: "Pending", reason: "" },
    { id: 9, sNo: "9", startDate: "28-01-2025", endDate: "28-01-2025", days: "02", status: "Pending", reason: "" },
    { id: 10, sNo: "10", startDate: "28-01-2025", endDate: "28-01-2025", days: "02", status: "Rejected", reason: "" },
];

const EmpleaveStatus = () => {
    const { empId } = useParams();
    // In real scenario, fetching logic would go here. 
    // For now, using mock data as per "build exactly shown in image" request.
    const [data, setData] = useState(MOCK_DATA);

    // Helpers for status class
    const getStatusClass = (status) => {
        switch (status) {
            case "Pending": return styles.leave_status_pending;
            case "Approved": return styles.leave_status_approved;
            case "Rejected": return styles.leave_status_rejected;
            default: return "";
        }
    };

    // Pagination Logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="emp_wrapper">
            <SidebarMenu />
            <div className={styles.emp_dashboard_main}>
                <Common />
                <div className={styles.dashboard_content}> 
                    {/* Header */}
                    <div style={{ marginBottom: '30px' }}>
                        <h2 className={styles.leave_page_title}>Leave Status</h2>
                    </div>

                    {/* Status Card (Table + Pagination) */}
                    <div className={styles.status_card}>
                        {/* Table Container */}
                        <div className={styles.status_table_container}>
                            <table className={styles.status_table}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>No.Of Days</th>
                                        <th>Status</th>
                                        <th>Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((row, index) => (
                                        <tr key={row.id}>
                                            <td>{row.sNo}</td>
                                            <td>{row.startDate}</td>
                                            <td>{row.endDate}</td>
                                            <td>{row.days}</td>
                                            <td className={getStatusClass(row.status)}>{row.status}</td>
                                            <td>{row.reason}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className={styles.pagination_container}>
                            <button 
                                className={styles.pagination_btn} 
                                disabled={currentPage === 1} 
                                onClick={() => paginate(currentPage - 1)}
                            >
                                Previous
                            </button>
                            
                            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
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
                                disabled={currentPage === Math.ceil(data.length / itemsPerPage)} 
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

export default EmpleaveStatus;
