import React, { useState, useEffect, useRef } from "react";
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

    // Dropdown States
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);
    
    // Refs for click outside
    const yearDropdownRef = useRef(null);
    const monthDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
                setShowYearDropdown(false);
            }
            if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target)) {
                setShowMonthDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // State for Holidays Data
    const [holidays, setHolidays] = useState([
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
    ]);

    const [openStatusDropdownIndex, setOpenStatusDropdownIndex] = useState(null);

    const handleStatusSelect = (index, status) => {
        const updatedHolidays = [...holidays];
        updatedHolidays[index].status = status;
        setHolidays(updatedHolidays);
        setOpenStatusDropdownIndex(null);
    };

    const years = ["2025", "2024", "2023", "2022", "2021"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [isEditMode, setIsEditMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [editIndex, setEditIndex] = useState(null);


    const handleAddNew = () => {
        setIsEditMode(false);
        setEditIndex(null);
        setHolidayDate("");
        setHolidayName("");
        setShowModal(true);
    };

    const handleEdit = (index) => {
        const holidayToEdit = holidays[index];
        setIsEditMode(true);
        setEditIndex(index);
        
        // Convert DD-MM-YYYY to YYYY-MM-DD for input
        const [day, month, year] = holidayToEdit.date.split('-');
        setHolidayDate(`${year}-${month}-${day}`);
        
        setHolidayName(holidayToEdit.name);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setHolidayDate("");
        setHolidayName("");
        setIsEditMode(false);
        setEditIndex(null);
    };

    const handleSave = () => {
        if (!holidayDate || !holidayName) {
            alert("Please fill in both Date and Holiday Name");
            return;
        }

        // Format Date: YYYY-MM-DD -> DD-MM-YYYY
        const [year, month, day] = holidayDate.split('-');
        const formattedDate = `${day}-${month}-${year}`;

        if (isEditMode && editIndex !== null) {
            // Update existing holiday
            const updatedHolidays = [...holidays];
            updatedHolidays[editIndex] = {
                ...updatedHolidays[editIndex],
                date: formattedDate,
                name: holidayName
            };
            setHolidays(updatedHolidays);
        } else {
            // Add new holiday
            // Generate S.No (e.g., 0011)
            const nextSno = (holidays.length + 1).toString().padStart(4, '0');

            const newHoliday = {
                sno: nextSno,
                date: formattedDate,
                name: holidayName,
                status: "Active"
            };
            setHolidays([...holidays, newHoliday]);
        }

        handleCloseModal();
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setShowYearDropdown(false);
    };

    const handleMonthSelect = (month) => {
        setSelectedMonth(month);
        setShowMonthDropdown(false);
    };

    // Filter Logic
    const filteredHolidays = holidays.filter(holiday => {
        const [day, month, year] = holiday.date.split('-');
        
        // Convert month number to month name for comparison (e.g. "01" -> "January")
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const holidayMonthName = monthNames[parseInt(month, 10) - 1];

        const matchYear = selectedYear ? year === selectedYear : true;
        const matchMonth = selectedMonth ? holidayMonthName === selectedMonth : true;

        return matchYear && matchMonth;
    });

    // Pagination Logic
    const indexOfLastHoliday = currentPage * itemsPerPage;
    const indexOfFirstHoliday = indexOfLastHoliday - itemsPerPage;
    const currentHolidays = filteredHolidays.slice(indexOfFirstHoliday, indexOfLastHoliday);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [holidayToDelete, setHolidayToDelete] = useState(null);

    const handleDelete = (index) => {
        setHolidayToDelete(index);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (holidayToDelete !== null) {
            const updatedHolidays = holidays.filter((_, index) => index !== holidayToDelete);
            setHolidays(updatedHolidays);
            setShowDeleteModal(false);
            setHolidayToDelete(null);
        }
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setHolidayToDelete(null);
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
                            
                            {/* Year Dropdown */}
                            <div className={styles.custom_dropdown} ref={yearDropdownRef} style={{ width: '150px' }}>
                                <div 
                                    className={styles.dropdown_toggle} 
                                    onClick={() => setShowYearDropdown(!showYearDropdown)}
                                >
                                    <span>{selectedYear || "Select Year"}</span>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="12" height="12" viewBox="0 0 24 24" 
                                        fill="none" stroke="currentColor" strokeWidth="2.5" 
                                        strokeLinecap="round" strokeLinejoin="round"
                                        className={showYearDropdown ? styles.arrow_up : styles.arrow_down}
                                    >
                                        <path d="M6 9l6 6 6-6"/>
                                    </svg>
                                </div>
                                {showYearDropdown && (
                                    <div className={styles.dropdown_menu}>
                                        <div 
                                            className={`${styles.dropdown_item} ${selectedYear === "" ? styles.dropdown_item_active : ''}`}
                                            onClick={() => handleYearSelect("")}
                                        >
                                            Select Year
                                        </div>
                                        {years.map((year, idx) => (
                                            <div 
                                                key={idx}
                                                className={`${styles.dropdown_item} ${selectedYear === year ? styles.dropdown_item_active : ''}`}
                                                onClick={() => handleYearSelect(year)}
                                            >
                                                {year}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Month Dropdown */}
                            <div className={styles.custom_dropdown} ref={monthDropdownRef} style={{ width: '160px' }}>
                                <div 
                                    className={styles.dropdown_toggle} 
                                    onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                                >
                                    <span>{selectedMonth || "Select Month"}</span>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="12" height="12" viewBox="0 0 24 24" 
                                        fill="none" stroke="currentColor" strokeWidth="2.5" 
                                        strokeLinecap="round" strokeLinejoin="round"
                                        className={showMonthDropdown ? styles.arrow_up : styles.arrow_down}
                                    >
                                        <path d="M6 9l6 6 6-6"/>
                                    </svg>
                                </div>
                                {showMonthDropdown && (
                                    <div className={styles.dropdown_menu} style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                        <div 
                                            className={`${styles.dropdown_item} ${selectedMonth === "" ? styles.dropdown_item_active : ''}`}
                                            onClick={() => handleMonthSelect("")}
                                        >
                                            Select Month
                                        </div>
                                        {months.map((month, idx) => (
                                            <div 
                                                key={idx}
                                                className={`${styles.dropdown_item} ${selectedMonth === month ? styles.dropdown_item_active : ''}`}
                                                onClick={() => handleMonthSelect(month)}
                                            >
                                                {month}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

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
                                {currentHolidays.length > 0 ? (
                                    currentHolidays.map((holiday, idx) => (
                                    <tr key={idx}>
                                        <td>{holiday.sno}</td>
                                        <td>{holiday.date}</td>
                                        <td>{holiday.name}</td>
                                        <td>
                                            <div className={styles.custom_dropdown} style={{ minWidth: '110px' }}>
                                                <div 
                                                    className={styles.dropdown_toggle} 
                                                    onClick={() => setOpenStatusDropdownIndex(openStatusDropdownIndex === idx ? null : idx)}
                                                >
                                                    <span>{holiday.status}</span>
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
                                                            className={`${styles.dropdown_item} ${holiday.status === "Active" ? styles.dropdown_item_active : ''}`}
                                                            onClick={() => handleStatusSelect(idx, "Active")}
                                                        >
                                                            Active
                                                        </div>
                                                        <div 
                                                            className={`${styles.dropdown_item} ${holiday.status === "Inactive" ? styles.dropdown_item_active : ''}`}
                                                            onClick={() => handleStatusSelect(idx, "Inactive")}
                                                        >
                                                            Inactive
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.action_icons}>
                                                <button 
                                                    className={styles.action_icon_btn}
                                                    onClick={() => handleEdit(indexOfFirstHoliday + idx)}
                                                >
                                                    <FaRegEdit />
                                                </button>
                                                <button 
                                                    className={styles.action_icon_btn_delete}
                                                    onClick={() => handleDelete(indexOfFirstHoliday + idx)}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>No holidays found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        
                        <div className={styles.pagination_container}>
                            <button 
                                className={styles.pagination_btn}
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            
                            {Array.from({ length: Math.ceil(filteredHolidays.length / itemsPerPage) }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`${styles.pagination_btn} ${currentPage === i + 1 ? styles.pagination_btn_active : ''}`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button 
                                className={styles.pagination_btn}
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(filteredHolidays.length / itemsPerPage)}
                            >
                                Next
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Add/Edit Holiday Modal */}
            {showModal && (
                <div className={styles.modal_overlay}>
                    <div className={styles.modal_container} style={{ width: '512px' }}>
                        <div className={styles.modal_header}>
                            <h3 className={styles.modal_title}>
                                {isEditMode ? "Edit Holiday" : "Add Holiday"}
                            </h3>
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
                            <button onClick={handleSave} className={styles.save_btn}>
                                {isEditMode ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className={styles.modal_overlay}>
                    <div className={styles.modal_container} style={{ width: '400px', padding: '20px' }}>
                        <div className={styles.modal_header} style={{ justifyContent: 'center', marginBottom: '10px' }}>
                            <h3 className={styles.modal_title} style={{ color: '#E85C5C' }}>Confirm Delete</h3>
                        </div>
                        <div className={styles.modal_body} style={{ textAlign: 'center', padding: '10px 0 20px 0' }}>
                            <p style={{ color: '#333', fontSize: '14px' }}>Are you sure you want to delete this holiday?</p>
                        </div>
                        <div className={styles.modal_footer} style={{ justifyContent: 'center', gap: '15px' }}>
                            <button 
                                onClick={closeDeleteModal} 
                                style={{ 
                                    padding: '8px 20px', 
                                    border: '1px solid #DCDCDC', 
                                    background: '#FFF', 
                                    borderRadius: '5px', 
                                    cursor: 'pointer' 
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDelete} 
                                style={{ 
                                    padding: '8px 20px', 
                                    border: 'none', 
                                    background: '#E85C5C', 
                                    color: '#FFF', 
                                    borderRadius: '5px', 
                                    cursor: 'pointer' 
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default HolidayList;
