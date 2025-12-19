import React, { useState } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
import { FaSearch, FaTimes } from "react-icons/fa";

const LeaveRequestList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showReasonModal, setShowReasonModal] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [openStatusDropdownIndex, setOpenStatusDropdownIndex] = useState(null);
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                 // Logic to close dropdown if click is outside of the table or specifically the dropdowns
                 // Since we have multiple dropdowns, and they are inside the table, 
                 // checking a single ref might be tricky if we don't wrap the whole table or manage refs per row.
                 // A simple way is to close if click is outside the specific open dropdown, but we don't have separate refs.
                 // We can use a global click listener that closes if target is not a dropdown toggle.
                 // However, for simplicity and effectiveness in lists, we often just check if valid dropdown click.
                 setOpenStatusDropdownIndex(null);
            }
        };
        // Adding event listener only when a dropdown is open can be more efficient, but here global is fine.
        // Actually, we need to be careful not to close immediately on click. 
        // Better approach: wrap the whole table or listen to document and check class names.
        // For now, let's implement a simple document listener that closes all.
        // But we need to exclude the click on the toggle itself. 
        // The toggle onClick handles the toggle logic.
        
         document.addEventListener("mousedown", handleClickOutside);
         return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const [leaveRequests, setLeaveRequests] = useState([
        { sno: "0001", name: "Vishal", startDate: "25-01-2025", endDate: "28-01-2025", days: "4.0", status: "Pending" },
        { sno: "0002", name: "Veera", startDate: "16-02-2025", endDate: "17-02-2025", days: "2.0", status: "Pending" },
        { sno: "0003", name: "Sandeep", startDate: "20-01-2025", endDate: "22-01-2025", days: "3.0", status: "Pending" },
        { sno: "0004", name: "Lokesh", startDate: "31-02-2025", endDate: "02-02-2025", days: "3.0", status: "Pending" },
        { sno: "0005", name: "Jagadeesh", startDate: "18-01-2025", endDate: "19-01-2025", days: "1.0", status: "Pending" },
        { sno: "0006", name: "Shayam", startDate: "17-01-2025", endDate: "17-01-2025", days: "1.0", status: "Pending" },
    ]);


    const handleStatusChange = (sno, newStatus) => {
        setLeaveRequests(prev => prev.map(l => 
            l.sno === sno ? {...l, status: newStatus} : l
        ));
        setOpenStatusDropdownIndex(null);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = leaveRequests.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleReasonClick = (leave) => {
        setSelectedLeave(leave);
        setShowReasonModal(true);
    };

    const handleCloseModal = () => {
        setShowReasonModal(false);
        setSelectedLeave(null);
    };

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />
                <div className={styles.dashboard_content}>
                    
                    <div className={styles.leave_header_row}>
                        <h2 className={styles.pageTitleWithLine}>Leave Request List</h2>
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
                                <col style={{ width: '8%', minWidth: '70px' }} />
                                <col style={{ width: '18%', minWidth: '140px' }} />
                                <col style={{ width: '14%', minWidth: '110px' }} />
                                <col style={{ width: '14%', minWidth: '110px' }} />
                                <col style={{ width: '12%', minWidth: '100px' }} />
                                <col style={{ width: '16%', minWidth: '130px' }} />
                                <col style={{ width: '18%', minWidth: '100px' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Employee Name</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>No.Of.Days</th>
                                    <th>Status</th>
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
                                            <div className={styles.custom_dropdown} style={{ minWidth: '110px' }}>
                                                <div 
                                                    className={styles.dropdown_toggle} 
                                                    onClick={() => setOpenStatusDropdownIndex(openStatusDropdownIndex === idx ? null : idx)}
                                                >
                                                    <span>{leave.status}</span>
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        width="12" height="12" viewBox="0 0 24 24" 
                                                        fill="none" stroke="currentColor" strokeWidth="2.5" 
                                                        strokeLinecap="round" strokeLinejoin="round"
                                                        className={openStatusDropdownIndex === idx ? styles.arrow_up : styles.arrow_down}
                                                    >
                                                        <path d="M6 9l6 6 6-6"/>
                                                    </svg>
                                                </div>
                                                {openStatusDropdownIndex === idx && (
                                                    <div className={styles.dropdown_menu} style={{ zIndex: 10 }}>
                                                        <div 
                                                            className={`${styles.dropdown_item} ${leave.status === "Pending" ? styles.dropdown_item_active : ''}`}
                                                            onClick={() => handleStatusChange(leave.sno, "Pending")}
                                                        >
                                                            Pending
                                                        </div>
                                                        <div 
                                                            className={`${styles.dropdown_item} ${leave.status === "Approved" ? styles.dropdown_item_active : ''}`}
                                                            onClick={() => handleStatusChange(leave.sno, "Approved")}
                                                        >
                                                            Approved
                                                        </div>
                                                        <div 
                                                            className={`${styles.dropdown_item} ${leave.status === "Rejected" ? styles.dropdown_item_active : ''}`}
                                                            onClick={() => handleStatusChange(leave.sno, "Rejected")}
                                                        >
                                                            Rejected
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <button 
                                                onClick={() => handleReasonClick(leave)}
                                                className={styles.reason_btn_yellow}
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
                                ></textarea>
                            </div>
                        </div>
                        <div className={styles.modal_footer}>
                            <button className={styles.save_btn}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaveRequestList;
