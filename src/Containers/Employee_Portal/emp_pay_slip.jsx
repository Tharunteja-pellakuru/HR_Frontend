import React, { useState } from "react";
import "../../Styles/style.css";
import Common from "../../Components/Common/common";
import SidebarMenu from "../../Components/Common/Dashboard";
import styles from "../../Styles/dashboard.module.css";
import payslipStyles from "../../Styles/payslip.module.css";
import { useParams } from "react-router-dom";
import Logo from "../../Assets/images/ParivartanLogo.svg";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import EmployeeAuth from "../../Hooks/useAuth";

const PaySlip = () => {
    const { empId } = useParams();
    const { fetchEmployeePayslipList, fetchEmployeePayslipDetails } = EmployeeAuth();

    const [payslipList, setPayslipList] = useState([]);
    const [loadingList, setLoadingList] = useState(false);
    
    // Mock Data matching the image - Fallback or Initial State
    // const PAY_SLIP_DATA = [
    //     { id: 1, month: "September 2024", document: "View Payslip" },
    //     { id: 2, month: "November 2024", document: "View Payslip" },
    //     { id: 3, month: "January 2025", document: "View Payslip" },
    // ];

    // Filter Logic
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    
    const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
    
    // State to handle viewing a specific payslip
    const [viewingPayslip, setViewingPayslip] = useState(null);

    const monthDropdownRef = React.useRef(null);
    const yearDropdownRef = React.useRef(null);
    const payslipRef = React.useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);

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
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch Payslip List on Mount
    React.useEffect(() => {
        const loadPayslips = async () => {
            setLoadingList(true);
            let data = [];
            
            if (empId) {
                try {
                    data = await fetchEmployeePayslipList(empId);
                } catch (e) {
                    console.error("Failed to fetch payslips", e);
                }
            }

            // If API returns data, use it. Otherwise fall back to mock.
            if (data && data.length > 0) {
                 setPayslipList(data);
            } else {
                 // Keep mock data for demonstration if API fails/empty or empId missing
                 setPayslipList([
                    { id: 1, month: "September 2024", document: "View Payslip" },
                    { id: 2, month: "November 2024", document: "View Payslip" },
                    { id: 3, month: "January 2025", document: "View Payslip" },
                    { id: 4, month: "February 2025", document: "View Payslip" },
                ]);
            }
            setLoadingList(false);
        };
        loadPayslips();
    }, [empId]);

    const handleViewPayslip = (data) => {
        setViewingPayslip(data);
    };

    const handleDownloadPDF = async () => {
        const element = payslipRef.current;
        if (!element) return;

        setIsDownloading(true);
        try {
            const canvas = await html2canvas(element, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            
            // Adjust imgWidth and imgHeight directly for fitting into PDF based on ratio if needed, or just standard A4 fit
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 10; // Top margin

            const finalWidth = pdfWidth - 20; // 10mm margin each side
            const finalHeight = (imgHeight * finalWidth) / imgWidth;

            pdf.addImage(imgData, 'PNG', 10, 10, finalWidth, finalHeight);
            pdf.save(`Payslip_${viewingPayslip.month}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
        setIsDownloading(false);
    };

    const handleBack = () => {
        setViewingPayslip(null);
    };

    // Detailed Payslip Component
    const DetailedPayslip = ({ data }) => {
        return (
            <div className={payslipStyles.payslip_container} ref={payslipRef}>
                {/* Header */}
                <div className={payslipStyles.header}>
                    <div className={payslipStyles.logo_section}>
                        <img src={Logo} alt="Company Logo" className={payslipStyles.logo} />
                        <div className={payslipStyles.company_details}>
                            <h2>Parivartan</h2>
                            <p>Flat no 201, Vasudha Avenue,<br/>Road Number 10, Kavuri Hills,<br/>Hyderabad - 500033<br/>Telangana State</p>
                        </div>
                    </div>
                    <div className={payslipStyles.payslip_title}>
                        <h3>Payslip</h3>
                        <p>For the month of {data.month}</p>
                    </div>
                </div>

                {/* Employee Details */}
                <div className={payslipStyles.employee_details}>
                    <div>
                        <div className={payslipStyles.detail_group}>
                            <span className={payslipStyles.detail_label}>Employee Name</span>
                            <span className={payslipStyles.detail_value}>Veera babu Kurapati</span>
                        </div>
                        <div className={payslipStyles.detail_group}>
                            <span className={payslipStyles.detail_label}>Employee ID</span>
                            <span className={payslipStyles.detail_value}>EMP001</span>
                        </div>
                        <div className={payslipStyles.detail_group}>
                            <span className={payslipStyles.detail_label}>Designation</span>
                            <span className={payslipStyles.detail_value}>Design Intern</span>
                        </div>
                        <div className={payslipStyles.detail_group}>
                            <span className={payslipStyles.detail_label}>No of Working Days</span>
                            <span className={payslipStyles.detail_value}>28</span>
                        </div>
                    </div>
                    <div>
                        <div className={payslipStyles.detail_group}>
                            <span className={payslipStyles.detail_label}>Department</span>
                            <span className={payslipStyles.detail_value}>Design</span>
                        </div>
                        <div className={payslipStyles.detail_group}>
                            <span className={payslipStyles.detail_label}>Date of Joining</span>
                            <span className={payslipStyles.detail_value}>02/01/2025</span>
                        </div>
                        <div className={payslipStyles.detail_group}>
                            <span className={payslipStyles.detail_label}>Bank Org Name</span>
                            <span className={payslipStyles.detail_value}>HDFC Bank</span>
                        </div>

                    </div>
                </div>

                {/* Salary Details Table */}
                <div className={payslipStyles.table_responsive_wrapper}>
                    <table className={payslipStyles.salary_table}>
                        <thead>
                            <tr>
                                <th>Earnings</th>
                                <th className={payslipStyles.amount_col}>Amount (₹)</th>
                                <th>Deductions</th>
                                <th className={payslipStyles.amount_col}>Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Basic Salary</td>
                                <td className={payslipStyles.amount_col}>10,000.00</td>
                                <td>Provident Fund</td>
                                <td className={payslipStyles.amount_col}>1,200.00</td>
                            </tr>
                            <tr>
                                <td>House Rent Allowance (HRA)</td>
                                <td className={payslipStyles.amount_col}>4,800.00</td>
                                <td>Professional Tax</td>
                                <td className={payslipStyles.amount_col}>200.00</td>
                            </tr>
                            <tr>
                                <td>Conveyance Allowance</td>
                                <td className={payslipStyles.amount_col}>800.00</td>
                                <td>TDS</td>
                                <td className={payslipStyles.amount_col}>0.00</td>
                            </tr>
                            <tr>
                                <td>Medical Allowance</td>
                                <td className={payslipStyles.amount_col}>1,250.00</td>
                                <td>Other Deductions</td>
                                <td className={payslipStyles.amount_col}>0.00</td>
                            </tr>
                            <tr>
                                <td>Special Allowance</td>
                                <td className={payslipStyles.amount_col}>3,950.00</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>PF Employer Share</td>
                                <td className={payslipStyles.amount_col}>1,200.00</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className={payslipStyles.total_row}>
                                <td>Total Earnings</td>
                                <td className={payslipStyles.amount_col}>22,000.00</td>
                                <td>Total Deductions</td>
                                <td className={payslipStyles.amount_col}>1,400.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Net Pay Section */}
                <div className={payslipStyles.net_pay_section}>
                    <div>
                        <div className={payslipStyles.net_pay_label}>NET PAY</div>
                        <div className={payslipStyles.amount_words}>Twenty Thousand Six Hundred Rupees Only</div>
                    </div>
                    <div className={payslipStyles.net_pay_amount}>₹ 20,600.00</div>
                </div>



                <div className={payslipStyles.note}>
                    Note: This is a system-generated payslip and does not require a physical signature.
                </div>
            </div>
        );
    };

    return (
        <div className="emp_wrapper">
            <SidebarMenu />
            <div className={styles.emp_dashboard_main}>
                <Common />
                <div className={styles.dashboard_content}> 
                    
                    {!viewingPayslip ? (
                        <>
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
                                            style={{ color: '#555', borderColor: '#ccc', height: '35px' }} 
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
                                            style={{ color: '#555', borderColor: '#ccc', height: '35px' }} 
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
                                        {loadingList ? (
                                             <tr><td colSpan="2" style={{textAlign: 'center', padding: '20px'}}>Loading...</td></tr>
                                        ) : (
                                            payslipList.map((row, index) => (
                                                <tr key={row.id}>
                                                    <td>{row.month}</td>
                                                    <td>
                                                        <button 
                                                            className={styles.download_btn}
                                                            onClick={async () => {
                                                                // If we need to fetch details, we can do it here. 
                                                                // For now, assuming 'row' contains enough info or we fetch details based on month/year
                                                                // const details = await fetchEmployeePayslipDetails(empId, row.month, row.year);
                                                                // setViewingPayslip(details || row);
                                                                setViewingPayslip(row);
                                                            }}
                                                        >
                                                            {row.document}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div>
                            <div className={payslipStyles.print_btn_container}>
                                <button onClick={handleBack} className={payslipStyles.back_btn}>
                                    &larr; Back to List
                                </button>
                                <button onClick={handleDownloadPDF} className={payslipStyles.print_btn} disabled={isDownloading}>
                                    {isDownloading ? (
                                        <span>Generating...</span>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="7 10 12 15 17 10"></polyline>
                                                <line x1="12" y1="15" x2="12" y2="3"></line>
                                            </svg>
                                            Download Payslip
                                        </>
                                    )}
                                </button>
                            </div>
                            <DetailedPayslip data={viewingPayslip} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaySlip;
