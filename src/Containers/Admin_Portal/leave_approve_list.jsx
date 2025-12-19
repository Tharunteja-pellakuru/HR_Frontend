import React, { useState } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
import { FaSearch, FaTimes } from "react-icons/fa";

const LeaveApproveList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showReasonModal, setShowReasonModal] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);

    const leaveRequests = [
        { sno: "0001", name: "Sai", startDate: "25-01-2025", endDate: "28-01-2025", days: "4.0" },
        { sno: "0002", name: "Bhargav", startDate: "16-02-2025", endDate: "17-02-2025", days: "2.0" },
        { sno: "0003", name: "Surya", startDate: "20-01-2025", endDate: "22-01-2025", days: "3.0" },
        { sno: "0004", name: "Nikitha", startDate: "31-02-2025", endDate: "02-02-2025", days: "3.0" },
        { sno: "0005", name: "Ali Priya", startDate: "18-01-2025", endDate: "19-01-2025", days: "1.0" },
        { sno: "0006", name: "Mouli", startDate: "17-01-2025", endDate: "17-01-2025", days: "1.0" },
    ];


    const handleReasonClick = (leave) => {
        setSelectedLeave(leave);
        setShowReasonModal(true);
    };

    const handleCloseModal = () => {
        setShowReasonModal(false);
        setSelectedLeave(null);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = leaveRequests.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />
                <div className={styles.dashboard_content}>
                    
                    <div className={styles.leave_header_row}>
                        <h2 className={styles.pageTitleWithLine}>Leave Approve List</h2>
                        <div className={styles.search_box}>
                            <FaSearch className={styles.search_icon} />
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.search_input}
                            />
                        </div>
                    </div>

                    <div className={styles.daily_report_table_wrapper}>
                        <table className={styles.daily_report_table}>
                            <colgroup>
                                <col style={{ width: '10%', minWidth: '70px' }} />
                                <col style={{ width: '25%', minWidth: '150px' }} />
                                <col style={{ width: '15%', minWidth: '120px' }} />
                                <col style={{ width: '15%', minWidth: '120px' }} />
                                <col style={{ width: '15%', minWidth: '100px' }} />
                                <col style={{ width: '20%', minWidth: '100px' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Employee Name</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>No.Of.Days</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((leave, idx) => (
                                    <tr key={idx} className={styles.data_row}>
                                        <td>{leave.sno}</td>
                                        <td>{leave.name}</td>
                                        <td>{leave.startDate}</td>
                                        <td>{leave.endDate}</td>
                                        <td>{leave.days}</td>
                                        <td>
                                            <button 
                                                onClick={() => handleReasonClick(leave)}
                                                className={styles.reason_btn_green}
                                            >
                                                Reason
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        <div className={styles.pagination_container}>
                            <button 
                                className={styles.pagination_btn} 
                                disabled={currentPage === 1} 
                                onClick={() => paginate(currentPage - 1)}
                            >
                                Previous
                            </button>
                            
                            {Array.from({ length: Math.ceil(leaveRequests.length / itemsPerPage) }, (_, i) => (
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
                                disabled={currentPage === Math.ceil(leaveRequests.length / itemsPerPage)} 
                                onClick={() => paginate(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reason Modal */}
            {showReasonModal && selectedLeave && (
                <div className={styles.modal_overlay}>
                    <div className={styles.modal_container}>
                        <div className={styles.modal_header}>
                            <h3 className={styles.modal_title}>Reason</h3>
                            <button onClick={handleCloseModal} className={styles.modal_close_btn}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.modal_body}>
                            <div className={styles.modal_form_group}>
                                <label className={styles.modal_label}>Start Date :</label>
                                <input 
                                    type="text" 
                                    value={selectedLeave.startDate}
                                    className={styles.modal_input}
                                    readOnly
                                />
                            </div>
                            <div className={styles.modal_form_group}>
                                <label className={styles.modal_label}>End Date :</label>
                                <input 
                                    type="text" 
                                    value={selectedLeave.endDate}
                                    className={styles.modal_input}
                                    readOnly
                                />
                            </div>
                            <div className={styles.modal_form_group}>
                                <label className={styles.modal_label}>No.Of.Days :</label>
                                <input 
                                    type="text" 
                                    value={selectedLeave.days}
                                    className={styles.modal_input}
                                    readOnly
                                />
                            </div>
                            <div className={styles.modal_form_group}>
                                <label className={styles.modal_label}>Reason :</label>
                                <textarea 
                                    className={styles.modal_textarea}
                                    rows="5"
                                    placeholder=""
                                    readOnly
                                ></textarea>
                            </div>
                        </div>
                        <div className={styles.modal_footer}>
                            <button className={styles.save_btn}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaveApproveList;
