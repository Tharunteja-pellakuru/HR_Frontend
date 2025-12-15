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

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />
                <div className={styles.dashboard_content}>
                    
                    <div className={styles.approve_header_row}>
                        <h2 className={styles.pageTitleWithLine}>Active Employees</h2>
                        <div className={styles.approve_actions}>
                            <div className={styles.search_bar_wrapper}>
                                <FaSearch className={styles.search_icon} />
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={styles.search_input}
                                />
                            </div>
                            <button className={styles.add_new_btn_green}>Add New</button>
                        </div>
                    </div>

                    <div className={styles.table_container_white}>
                        <table className={styles.approve_table}>
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
                                {employees.map((emp, idx) => (
                                    <tr key={idx} className={idx % 2 === 1 ? styles.alt_row : ''}>
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
                            <div className={styles.pagination}>
                                <span className={styles.page_item}>Previous</span>
                                <span className={`${styles.page_item} ${styles.active_page}`}>1</span>
                                <span className={styles.page_item}>2</span>
                                <span className={styles.page_item}>3</span>
                                <span className={styles.page_item}>4</span>
                                <span className={styles.page_item}>5</span>
                                <span className={styles.page_item}>...</span>
                                <span className={styles.page_item}>150</span>
                                <span className={styles.page_item}>Next</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ActiveEmployees;
