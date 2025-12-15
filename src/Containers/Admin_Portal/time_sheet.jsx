import React, { useState, useEffect } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/staff.module.css";
import "../../Styles/timesheet.css"
import EmployeeAuth from "../../Hooks/useAuth";
import { FaSearch } from "react-icons/fa"
import { TbTopologyStar3 } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiHieroglyphY } from "react-icons/gi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdShowChart } from "react-icons/md"; // line/pulse chart
import { BiBriefcaseAlt } from "react-icons/bi";
import { MdDateRange } from 'react-icons/md'
import { Link, useParams, useNavigate } from "react-router-dom";


const TimeSheet = () => {
    const [greetings, setGreetings] = useState("");
    const [Emply, SetEmply] = useState(null);
    const { fetchemployeeDetails } = EmployeeAuth();
    const [SelectedTeam, SetSelectedTeam] = useState("")
    const [SelectedStatus, SetSelectedStatus] = useState("")
    const [SelectedRole, SetSelectedRole] = useState("")
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [dates, setDates] = useState([]);

    const naviagte = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchemployeeDetails();
            if (response) {
                SetEmply(response);
            }
        };
        fetchData();

        const currenttimestatus = new Date().getHours();
        if (currenttimestatus >= 1 && currenttimestatus < 12) {
            setGreetings("Good Morning");
        } else if (currenttimestatus >= 12 && currenttimestatus < 17) {
            setGreetings("Good Afternoon");
        } else {
            setGreetings("Good Evening");
        }
    }, []);

    const taskdate = new Date();
    const formattedDate = taskdate.toLocaleDateString("en-GB", {
        weekday: "long", // Tuesday
        day: "2-digit", // 18
        month: "long", // March
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    const generatePastDates = (days = 30) => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < days; i++) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            const formatted = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            dates.push(formatted);
        }
        return dates;
    };

    // const dates = generatePastDates(30); // last 30 days
    useEffect(() => {
        if (selectedYear) {
            const allDates = [];
            for (let month = 0; month < 12; month++) {
                const daysInMonth = new Date(selectedYear, month + 1, 0).getDate();
                for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(selectedYear, month, day);
                    const formatted = date.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                    });
                    allDates.push(formatted);
                }
            }
            setDates(allDates);
        } else {
            setDates([]);
        }
    }, [selectedYear]);

    const departments = ["Social Media", "Tech Team"];
    const Status = ["Active", "InActive"];
    const Role = ["Desginer", "Developer", "Junior Developer", "Programmer", "Junior Programmer", "Fullter Developer", "Content Writers", "Video Editor", "Post Desginer"];

    const attendanceRecords = [
        {
            id: "EMP010",
            name: "Minal Kaur",
            image: "https://i.pravatar.cc/40?img=10",
            designation: "Business Analyst",
            team: "Product",
            logintime: "09:03 AM",
            logouttime: "06:15 PM",
            date: "2025-05-10",
            status: "late"
        },
        {
            id: "EMP003",
            name: "Kunal Mehta",
            image: "https://i.pravatar.cc/40?img=3",
            designation: "Backend Developer",
            logintime: "09:00 AM",
            logouttime: "06:10 PM",
            date: "2025-05-05",
            status: "ontime"
        },
        {
            id: "EMP001",
            name: "Shyam Sunder Rao",
            image: "https://i.pravatar.cc/40?img=1",
            designation: "Frontend Developer",
            logintime: "Not Marked",
            logouttime: "Not Marked",
            date: "2025-05-01",
            status: "not marked"
        },
        {
            id: "EMP007",
            name: "Srikanth Rao",
            image: "https://i.pravatar.cc/40?img=7",
            designation: "DevOps Engineer",
            logintime: "08:55 AM",
            logouttime: "06:05 PM",
            date: "2025-05-12",
            status: "ontime"
        },
        {
            id: "EMP004",
            name: "Soumya Jain",
            image: "https://i.pravatar.cc/40?img=4",
            designation: "HR Executive",
            team: "HR",
            logintime: "09:10 AM",
            logouttime: "06:20 PM",
            date: "2025-05-08",
            status: "late"
        }
    ];




    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <div className={styles.admin_dashboard_header_card}>
                    <HeaderDashboard />
                    <h1 className={styles.admin_greeting}>
                        {greetings}, <span>{Emply?.emp_name || "Super Admin"}</span>!
                    </h1>
                </div>
                <div className="emp_time_sheet_container">
                    <h1 style={{ marginTop: "0px", fontWeight: "500" }}>Employees Time Sheet</h1>
                    <span className="task_date">{formattedDate}</span>
                </div>
                <div className={styles.emp_main_section_contianer}>
                    <div className={styles.total_and_leave_card}>
                        <div className={styles.total_emp_card}>
                            <p className={styles.emp_active}>On-Time Logins</p>
                            <p className={styles.emp_count}>20</p>
                        </div>

                        <div className={styles.leave_pen_card}>
                            <p className={styles.emp_active}>Late Logins</p>
                            <p className={styles.emp_count}>10</p>
                        </div>


                        <div className={styles.leave_rej_card}>
                            <p className={styles.emp_active}>Missed Logins  </p>
                            <p className={styles.emp_count}>15</p>
                        </div>


                    </div>


                </div>

                <div className={styles.search_fillter_container}>
                    <div className={styles.search_card}>
                        <FaSearch style={{ color: "#555", fontSize: "14px", margin: "0px 0px 13px 0px" }} />
                        <input
                            type="search"
                            name="search"
                            placeholder="Search Employee"
                            className={styles.input_search}
                        />
                    </div>
                    {/* select for team type */}
                    <div className={styles.select_option_card}>
                        <FaRegCalendarAlt />
                        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                            <option value="">Year</option>
                            {years.map((year, i) => (
                                <option key={i} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    {/* select for role */}
                    <div className={styles.select_option_card}>
                        <MdDateRange />
                        <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                            <option value="">Select Date</option>
                            {dates.map((dateStr, i) => (
                                <option key={i} value={dateStr}>
                                    {dateStr}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* select for prohject assgined status */}
                    <div className={styles.select_option_card}>
                        <HiOutlineClipboardList />
                        <select
                            value={SelectedStatus}
                            onChange={(e) => SetSelectedStatus(e.target.value)}
                        >
                            <option value="">Login type</option>
                            {Status.map((opt, i) => (
                                <option key={i} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* search fillter button */}
                    <div>
                        <button type="button" className={styles.search_flter_btn}>
                            Search
                        </button>
                    </div>
                </div>

                {/* employess list  */}
                <div className={styles.empl_list_container}>
                    <table border={0} cellPadding={8} style={{ borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Emp ID</th>
                                <th>Employee</th>
                                <th>Designation</th>
                                {/* <th>Team</th>
                                <th>Phone</th> */}
                                {/* <th>Email</th> */}
                                <th>Login Time</th>
                                <th>Logout Time</th>
                                <th>Date
                                </th>
                                {/* <th>Days</th> */}
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceRecords.map((emp, index) => (
                                <tr key={emp.id}>
                                    <td>{index + 1}</td>
                                    <td>{emp.id}</td>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <img
                                                src={emp.image}
                                                alt={emp.name}
                                                style={{
                                                    width: "35px",
                                                    height: "35px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover"
                                                }}
                                            />
                                            <span>{emp.name}</span>
                                        </div>
                                    </td>
                                    <td>{emp.designation}</td>
                                    {/* <td>{emp.team}</td> */}
                                    {/* <td>{emp.phone || "--"}</td>
                                    <td>{emp.email || "--"}</td> */}
                                    {/* <td style={{
                                        maxWidth: "120px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}>
                                        {emp.reason}
                                    </td> */}

                                    {/* <td style={{ whiteSpace: "pre-wrap", maxWidth: 180 }}>{emp.reason}</td> */}
                                    <td>{emp.logintime}</td>
                                    <td>{emp.logouttime}</td>
                                    <td>{emp.date}</td>
                                    {/* <td>{emp.numberOfDays}</td> */}
                                    <td>
                                        <span
                                            style={{
                                                padding: "4px 10px",
                                                borderRadius: "12px",
                                                fontWeight: "600",
                                                backgroundColor:
                                                    emp.status === "ontime"
                                                        ? "#e6f5ea"
                                                        : emp.status === "late"
                                                            ? "#fff8e1"
                                                            : "#ffebee",
                                                color:
                                                    emp.status === "ontime"
                                                        ? "#2e7d32"
                                                        : emp.status === "late"
                                                            ? "#ff9800"
                                                            : "#c62828"
                                            }}
                                        >
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default TimeSheet;


