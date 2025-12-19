import React, { useState } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
import { FaSearch } from "react-icons/fa";

const ActiveEmployees = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const employees = [
        { id: "99495901", name: "Employee 45", designation: "Designer", phone: "9949594508", joinDate: "11-08-2020", status: "Active" },
        { id: "99495902", name: "Employee 46", designation: "Developer", phone: "9949545508", joinDate: "18-07-2022", status: "Active" },
        { id: "99495903", name: "Employee 47", designation: "Client Management", phone: "6300594508", joinDate: "16-11-2024", status: "Active" },
        { id: "99495904", name: "Employee 48", designation: "Manger", phone: "7998653210", joinDate: "19-10-2015", status: "Active" },
        { id: "99495905", name: "Employee 49", designation: "Team Leader", phone: "9876543210", joinDate: "20-12-2019", status: "Active" },
        { id: "99495906", name: "Employee 50", designation: "Team Head", phone: "7654321098", joinDate: "30-01-2022", status: "Active" },
        { id: "99495907", name: "Employee 51", designation: "Video Editor", phone: "8765432198", joinDate: "22-02-2024", status: "Active" },
        { id: "99495908", name: "Employee 52", designation: "Ux/Ui Desginer", phone: "6543219876", joinDate: "16-04-2024", status: "Active" },
        { id: "99495909", name: "Employee 53", designation: "Developer", phone: "6300125789", joinDate: "24-05-2017", status: "Active" },
        { id: "99495910", name: "Employee 54", designation: "Project Lead", phone: "7998752301", joinDate: "22-06-2022", status: "Active" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />
                <div className={styles.dashboard_content}>
                    
                    <div className={styles.approve_header_row}>
                        <h2 className={styles.pageTitleWithLine}>Active Employees</h2>
                        <div className={styles.approve_actions}>
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
                            <button className={styles.add_new_btn}>Add New</button>
                        </div>
                    </div>

                    <div className={styles.daily_report_table_wrapper}>
                        <table className={styles.daily_report_table}>
                            <colgroup>
                                <col style={{ width: '15%', minWidth: '100px' }} />
                                <col style={{ width: '18%', minWidth: '110px' }} />
                                <col style={{ width: '20%', minWidth: '130px' }} />
                                <col style={{ width: '17%', minWidth: '110px' }} />
                                <col style={{ width: '15%', minWidth: '100px' }} />
                                <col style={{ width: '15%', minWidth: '80px' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>Designation</th>
                                    <th>Phone number</th>
                                    <th>Joining Date</th>
                                    <th>Status</th>
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
                                        <td className={styles.status_active}>{emp.status}</td>
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
                            
                            {Array.from({ length: Math.ceil(employees.length / itemsPerPage) }, (_, i) => (
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
                                disabled={currentPage === Math.ceil(employees.length / itemsPerPage)} 
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

export default ActiveEmployees;
