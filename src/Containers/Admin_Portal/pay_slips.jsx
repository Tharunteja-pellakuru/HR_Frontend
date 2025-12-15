    import React, { useState } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";

const PaySlips = () => {
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");

    const employees = [
        { name: "Vishal", file: null },
        { name: "Veera", file: null },
        { name: "Sandeep", file: null },
        { name: "Lokesh", file: null },
        { name: "Jagadeesh", file: null },
        { name: "Shayam", file: null },
        { name: "Sai", file: null },
        { name: "Satish", file: null },
        { name: "Mouli", file: null },
        { name: "Arpita", file: null },
        { name: "Harshita", file: null },
        { name: "Chaitanya", file: null },
        { name: "Ali Priya", file: null },
        { name: "Surya", file: null },
    ];

    const leftColumn = employees.slice(0, 7);
    const rightColumn = employees.slice(7);

    const years = ["2024", "2023", "2022", "2021", "2020"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleSave = () => {
        console.log("Saving pay slips...");
    };

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />
                <div className={styles.dashboard_content}>
                    
                    <div className={styles.payslip_header_row}>
                        <h2 className={styles.pageTitleWithLine}>Pay Slip List</h2>
                        <div className={styles.payslip_filters}>
                            <select 
                                value={selectedYear} 
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className={styles.filter_select}
                            >
                                <option value="">Select Year</option>
                                {years.map((year, idx) => (
                                    <option key={idx} value={year}>{year}</option>
                                ))}
                            </select>
                            <select 
                                value={selectedMonth} 
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className={styles.filter_select}
                            >
                                <option value="">Select Month</option>
                                {months.map((month, idx) => (
                                    <option key={idx} value={month}>{month}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.payslip_container}>
                        {/* Single Header Row */}
                        <div className={styles.payslip_header_single}>
                            <div className={styles.payslip_header_col}>
                                <span className={styles.payslip_label}>Employee Name</span>
                                <span className={styles.payslip_label}>Document</span>
                            </div>
                            <div className={styles.payslip_header_col}>
                                <span className={styles.payslip_label}>Employee Name</span>
                                <span className={styles.payslip_label}>Document</span>
                            </div>
                        </div>

                        <div className={styles.payslip_grid}>
                            {/* Left Column */}
                            <div className={styles.payslip_column}>
                                {leftColumn.map((emp, idx) => (
                                    <div key={idx} className={styles.payslip_row}>
                                        <span className={styles.employee_name}>{emp.name}</span>
                                        <div className={styles.file_input_wrapper}>
                                            <input type="file" id={`file-left-${idx}`} className={styles.file_input_hidden} />
                                            <label htmlFor={`file-left-${idx}`} className={styles.file_input_label}>
                                                Choose File
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Column */}
                            <div className={styles.payslip_column}>
                                {rightColumn.map((emp, idx) => (
                                    <div key={idx} className={styles.payslip_row}>
                                        <span className={styles.employee_name}>{emp.name}</span>
                                        <div className={styles.file_input_wrapper}>
                                            <input type="file" id={`file-right-${idx}`} className={styles.file_input_hidden} />
                                            <label htmlFor={`file-right-${idx}`} className={styles.file_input_label}>
                                                Choose File
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.payslip_actions}>
                            <button onClick={handleSave} className={styles.save_btn}>Save</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PaySlips;
