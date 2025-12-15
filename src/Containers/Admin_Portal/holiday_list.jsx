import React, { useState } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
import { FaRegEdit, FaTrashAlt, FaTimes, FaCalendarAlt } from "react-icons/fa";

const HolidayList = () => {
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [holidayDate, setHolidayDate] = useState("");
    const [holidayName, setHolidayName] = useState("");

    const holidays = [
        { sno: "0001", date: "26-01-2025", name: "Republic Day", status: "Active" },
        { sno: "0002", date: "14-04-2025", name: "Holi", status: "Active" },
        { sno: "0003", date: "06-04-2025", name: "Sri Rama Navam", status: "Active" },
        { sno: "0004", date: "14-04-2025", name: "Ambedkar Jayanti", status: "Active" },
        { sno: "0005", date: "15-08-2025", name: "Independence Day", status: "Active" },
        { sno: "0006", date: "27-08-2025", name: "Ganesh Chaturthi", status: "Active" },
        { sno: "0007", date: "21-09-2025", name: "Bathukamma", status: "Active" },
        { sno: "0008", date: "02-10-2025", name: "Gandhi Jayanti", status: "Active" },
        { sno: "0009", date: "02-10-2025", name: "Vijayadashami", status: "Active" },
        { sno: "0010", date: "18-10-2025", name: "Diwali", status: "Active" },
    ];

    const years = ["2025", "2024", "2023", "2022", "2021"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleAddNew = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setHolidayDate("");
        setHolidayName("");
    };

    const handleSave = () => {
        console.log("Saving holiday:", { date: holidayDate, name: holidayName });
        handleCloseModal();
    };

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />
                <div className={styles.dashboard_content}>
                    
                    <div className={styles.holiday_header_row}>
                        <h2 className={styles.pageTitleWithLine}>Holiday List</h2>
                        <div className={styles.holiday_actions}>
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
                            <button onClick={handleAddNew} className={styles.add_new_btn_green}>Add New</button>
                        </div>
                    </div>

                    <div className={styles.table_container_white}>
                        <table className={styles.holiday_table}>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Date</th>
                                    <th>Holiday Name</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {holidays.map((holiday, idx) => (
                                    <tr key={idx}>
                                        <td>{holiday.sno}</td>
                                        <td>{holiday.date}</td>
                                        <td>{holiday.name}</td>
                                        <td>
                                            <select className={styles.status_dropdown_active}>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div className={styles.action_icons}>
                                                <button className={styles.action_icon_btn}>
                                                    <FaRegEdit />
                                                </button>
                                                <button className={styles.action_icon_btn_delete}>
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </td>
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

            {/* Add Holiday Modal */}
            {showModal && (
                <div className={styles.modal_overlay}>
                    <div className={styles.modal_container}>
                        <div className={styles.modal_header}>
                            <h3 className={styles.modal_title}>Add Holiday</h3>
                            <button onClick={handleCloseModal} className={styles.modal_close_btn}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.modal_body}>
                            <div className={styles.modal_form_group}>
                                <label className={styles.modal_label}>Holiday Date :</label>
                                <div className={styles.date_input_wrapper}>
                                    <input 
                                        type="date" 
                                        value={holidayDate}
                                        onChange={(e) => setHolidayDate(e.target.value)}
                                        className={styles.modal_input}
                                    />
                                    <FaCalendarAlt className={styles.date_icon} />
                                </div>
                            </div>
                            <div className={styles.modal_form_group}>
                                <label className={styles.modal_label}>Holiday Name :</label>
                                <input 
                                    type="text" 
                                    value={holidayName}
                                    onChange={(e) => setHolidayName(e.target.value)}
                                    className={styles.modal_input}
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <div className={styles.modal_footer}>
                            <button onClick={handleSave} className={styles.save_btn}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HolidayList;
