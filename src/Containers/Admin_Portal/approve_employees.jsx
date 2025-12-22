import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
import { FaSearch } from "react-icons/fa";

const ApproveEmployees = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const employees = [
        { id: "99495901", name: "Employee 1", designation: "Designer", phone: "9949594508", joinDate: "11-08-2020", type: "Resignation" },
        { id: "99495902", name: "Employee 2", designation: "Developer", phone: "9949545508", joinDate: "18-07-2022", type: "Enroll" },
        { id: "99495903", name: "Employee 3", designation: "Client Management", phone: "6300594508", joinDate: "16-11-2024", type: "Enroll" },
        { id: "99495904", name: "Employee 4", designation: "Manger", phone: "7998653210", joinDate: "19-10-2015", type: "Enroll" },
        { id: "99495905", name: "Employee 5", designation: "Team Leader", phone: "9876543210", joinDate: "20-12-2019", type: "Resignation" },
        { id: "99495906", name: "Employee 6", designation: "Team Head", phone: "7654321098", joinDate: "30-01-2022", type: "Enroll" },
        { id: "99495907", name: "Employee 7", designation: "Video Editor", phone: "8765432198", joinDate: "22-02-2024", type: "Enroll" },
        { id: "99495908", name: "Employee 8", designation: "Ux/Ui Desginer", phone: "6543219876", joinDate: "16-04-2024", type: "Enroll" },
        { id: "99495909", name: "Employee 9", designation: "Developer", phone: "6300125789", joinDate: "24-05-2017", type: "Enroll" },
        { id: "99495910", name: "Employee 10", designation: "Project Lead", phone: "7998752301", joinDate: "22-06-2022", type: "Enroll" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredEmployees = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />
                <div className={styles.dashboard_content}>
                    
                    <div className={styles.approve_header_row}>
                        <h2 className={styles.pageTitleWithLine}>Approve Employees</h2>
                        <div className={styles.approve_actions}>
                            <div className={styles.search_box}>
                                <FaSearch className={styles.search_icon} />
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className={styles.search_input}
                                />
                            </div>
                            <button className={styles.add_new_btn}>Add New</button>
                        </div>
                    </div>

                    <div className={styles.daily_report_table_wrapper}>
                        <table className={styles.daily_report_table}>
                            <colgroup>
                                <col style={{ width: '12%', minWidth: '100px' }} />
                                <col style={{ width: '12%', minWidth: '100px' }} />
                                <col style={{ width: '15%', minWidth: '120px' }} />
                                <col style={{ width: '13%', minWidth: '110px' }} />
                                <col style={{ width: '12%', minWidth: '100px' }} />
                                <col style={{ width: '12%', minWidth: '90px' }} />
                                <col style={{ width: '14%', minWidth: '150px' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>Designation</th>
                                    <th>Phone number</th>
                                    <th>Joining Date</th>
                                    <th>Request Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((emp, idx) => (
                                    <tr key={idx} className={styles.data_row}>
                                        <td>{emp.id}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.designation}</td>
                                        <td>{emp.phone}</td>
                                        <td>{emp.joinDate}</td>
                                        <td className={emp.type === 'Resignation' ? styles.status_resignation : styles.status_enroll}>{emp.type}</td>
                                        <td>
                                            <div className={styles.action_buttons}>
                                                <button className={styles.approve_btn}>Approve</button>
                                                <button className={styles.reject_btn}>Reject</button>
                                            </div>
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
                            
                            {Array.from({ length: Math.ceil(filteredEmployees.length / itemsPerPage) }, (_, i) => (
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
                                disabled={currentPage === Math.ceil(filteredEmployees.length / itemsPerPage) || filteredEmployees.length === 0} 
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

export default ApproveEmployees;
