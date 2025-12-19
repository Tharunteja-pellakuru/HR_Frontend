import React, { useState } from "react";
import "../../Styles/style.css";
import Common from "../../Components/Common/common";
import SidebarMenu from "../../Components/Common/Dashboard";
import styles from "../../Styles/dashboard.module.css";
import { useParams } from "react-router-dom";

const PaySlip = () => {
    const { empId } = useParams();

    // Mock Data matching the image
    const PAY_SLIP_DATA = [
        { id: 1, month: "September 2024", document: "Download" },
        { id: 2, month: "November 2024", document: "Download" },
        { id: 3, month: "January 2025", document: "Download" },
    ];

    // Filter Logic
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    
    const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
    
    const monthDropdownRef = React.useRef(null);
    const yearDropdownRef = React.useRef(null);

    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const YEARS = ["2024", "2025", "2026"];

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target)) {
                setIsMonthDropdownOpen(false);
            }
            if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
                setIsYearDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="emp_wrapper">
            <SidebarMenu />
            <div className={styles.emp_dashboard_main}>
                <Common />
                <div className={styles.dashboard_content}> 
                    {/* Header */}
                    <div style={{ marginBottom: '30px' }}>
                        <h2 className={styles.leave_page_title}>PAY SLIP</h2>
                    </div>

                    {/* Details and Filters Container */}
                    <div className={styles.pay_slip_header_row}>
                        {/* Details Section */}
                        <div className={styles.pay_slip_details}>
                            <p><strong>Employee Name :</strong> Veera babu Kurapati</p>
                            <p><strong>Designation :</strong> Design intern</p>
                            <p><strong>Date of Joining :</strong> 02/01/2025</p>
                        </div>

                        {/* Filters */}
                        <div className={styles.pay_slip_filter_group}>
                            {/* Month Dropdown */}
                            <div className={styles.custom_dropdown_container} ref={monthDropdownRef} style={{ width: '180px' }}>
                                <div 
                                    className={styles.custom_dropdown_trigger}
                                    onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
                                    style={{ color: '#555', borderColor: '#ccc', height: '40px' }} 
                                >
                                    <span>{selectedMonth || 'Select Month'}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isMonthDropdownOpen ? styles.arrow_up : styles.arrow_down}>
                                        <path d="M6 9l6 6 6-6"/>
                                    </svg>
                                </div>
                                {isMonthDropdownOpen && (
                                    <div className={styles.custom_dropdown_menu}>
                                        {MONTHS.map((month, idx) => (
                                            <div 
                                                key={idx}
                                                className={`${styles.custom_dropdown_item} ${selectedMonth === month ? styles.custom_dropdown_item_selected : ''}`}
                                                onClick={() => {
                                                    setSelectedMonth(month);
                                                    setIsMonthDropdownOpen(false);
                                                }}
                                            >
                                                {month}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Year Dropdown */}
                            <div className={styles.custom_dropdown_container} ref={yearDropdownRef} style={{ width: '150px' }}>
                                <div 
                                    className={styles.custom_dropdown_trigger}
                                    onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                                    style={{ color: '#555', borderColor: '#ccc', height: '40px' }} 
                                >
                                    <span>{selectedYear || 'Select Year'}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isYearDropdownOpen ? styles.arrow_up : styles.arrow_down}>
                                        <path d="M6 9l6 6 6-6"/>
                                    </svg>
                                </div>
                                {isYearDropdownOpen && (
                                    <div className={styles.custom_dropdown_menu}>
                                        {YEARS.map((year, idx) => (
                                            <div 
                                                key={idx}
                                                className={`${styles.custom_dropdown_item} ${selectedYear === year ? styles.custom_dropdown_item_selected : ''}`}
                                                onClick={() => {
                                                    setSelectedYear(year);
                                                    setIsYearDropdownOpen(false);
                                                }}
                                            >
                                                {year}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Table Container - Custom bordered card for table only */}
                    <div className={styles.pay_slip_table_wrapper}>
                        <table className={styles.status_table}>
                            <thead>
                                <tr>
                                    <th style={{ width: '70%', borderBottom: '1px solid #EAEAEA' }}>Month</th>
                                    <th style={{ width: '30%', borderBottom: '1px solid #EAEAEA' }}>Document</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PAY_SLIP_DATA.map((row, index) => (
                                    <tr key={row.id}>
                                        <td>{row.month}</td>
                                        <td>
                                            <button className={styles.download_btn}>
                                                {row.document}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PaySlip;
