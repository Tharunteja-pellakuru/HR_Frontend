    import React, { useState } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";

const PaySlips = () => {
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");

    const [isYearOpen, setIsYearOpen] = useState(false);
    const [isMonthOpen, setIsMonthOpen] = useState(false);
    
    const yearRef = React.useRef(null);
    const monthRef = React.useRef(null);
    
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (yearRef.current && !yearRef.current.contains(event.target)) setIsYearOpen(false);
            if (monthRef.current && !monthRef.current.contains(event.target)) setIsMonthOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

                            {/* Year Dropdown */}
                            <div className={styles.custom_dropdown} ref={yearRef}>
                                <div 
                                    className={styles.dropdown_toggle} 
                                    onClick={() => setIsYearOpen(!isYearOpen)}
                                >
                                    <span>{selectedYear || "Select Year"}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isYearOpen ? styles.arrow_up : styles.arrow_down}>
                                        <path d="M6 9l6 6 6-6"/>
                                    </svg>
                                </div>
                                {isYearOpen && (
                                    <div className={styles.dropdown_menu}>
                                        <div 
                                            className={`${styles.dropdown_item} ${selectedYear === "" ? styles.dropdown_item_active : ''}`}
                                            onClick={() => { setSelectedYear(""); setIsYearOpen(false); }}
                                        >
                                            Select Year
                                        </div>
                                        {years.map((year, idx) => (
                                            <div 
                                                key={idx}
                                                className={`${styles.dropdown_item} ${selectedYear === year ? styles.dropdown_item_active : ''}`}
                                                onClick={() => { setSelectedYear(year); setIsYearOpen(false); }}
                                            >
                                                {year}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Month Dropdown */}
                            <div className={styles.custom_dropdown} ref={monthRef}>
                                <div 
                                    className={styles.dropdown_toggle} 
                                    onClick={() => setIsMonthOpen(!isMonthOpen)}
                                >
                                    <span>{selectedMonth || "Select Month"}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isMonthOpen ? styles.arrow_up : styles.arrow_down}>
                                        <path d="M6 9l6 6 6-6"/>
                                    </svg>
                                </div>
                                {isMonthOpen && (
                                    <div className={styles.dropdown_menu}>
                                        <div 
                                            className={`${styles.dropdown_item} ${selectedMonth === "" ? styles.dropdown_item_active : ''}`}
                                            onClick={() => { setSelectedMonth(""); setIsMonthOpen(false); }}
                                        >
                                            Select Month
                                        </div>
                                        {months.map((month, idx) => (
                                            <div 
                                                key={idx}
                                                className={`${styles.dropdown_item} ${selectedMonth === month ? styles.dropdown_item_active : ''}`}
                                                onClick={() => { setSelectedMonth(month); setIsMonthOpen(false); }}
                                            >
                                                {month}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
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
