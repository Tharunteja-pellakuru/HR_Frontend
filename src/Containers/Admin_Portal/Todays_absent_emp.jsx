import React, { useState, useEffect } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/staff.module.css";
import EmployeeAuth from "../../Hooks/useAuth";
import { FaSearch } from "react-icons/fa"
import { TbTopologyStar3 } from "react-icons/tb";
import { GiHieroglyphY } from "react-icons/gi";
import { MdShowChart } from "react-icons/md"; // line/pulse chart
import { BiBriefcaseAlt } from "react-icons/bi";
import { Link, useParams, useNavigate } from "react-router-dom";


const TodaysAbsentEmp = () => {
    const [greetings, setGreetings] = useState("");
    const [Emply, SetEmply] = useState(null);
    const { fetchemployeeDetails } = EmployeeAuth();
    const [SelectedTeam, SetSelectedTeam] = useState("")
    const [SelectedStatus, SetSelectedStatus] = useState("")
    const [SelectedRole, SetSelectedRole] = useState("")
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

    const departments = ["Social Media", "Tech Team"];
    const Status = ["Active", "InActive"];
    const Role = ["Desginer", "Developer", "Junior Developer", "Programmer", "Junior Programmer", "Fullter Developer", "Content Writers", "Video Editor", "Post Desginer"];

    const leaveRequests = [
        {
            id: "EMP010",
            name: "Minal Kaur",
            image: "https://i.pravatar.cc/40?img=10",
            designation: "Business Analyst",
            team: "Product",
            reason: "Need to attend a family emergency\nWill be traveling to my hometown\nWill resume work by next week",
            startDate: "2025-05-10",
            endDate: "2025-05-14",
            numberOfDays: 5,
            status: "Rejected"
        },
        {
            id: "EMP003",
            name: "Kunal Mehta",
            image: "https://i.pravatar.cc/40?img=3",
            designation: "Backend Developer",
            team: "Tech",
            reason: "Invited to a wedding in the family\nNeed time for travel and function\nWon’t be available during this time",
            startDate: "2025-05-05",
            endDate: "2025-05-07",
            numberOfDays: 3,
            status: "Pending"
        },
        {
            id: "EMP001",
            name: "Shyam Sunder Rao",
            image: "https://i.pravatar.cc/40?img=1",
            designation: "Frontend Developer",
            team: "Tech",
            reason: "Down with fever and advised rest\nDoctor recommended 4 days off\nWill return after full recovery",
            startDate: "2025-05-01",
            endDate: "2025-05-04",
            numberOfDays: 4,
            status: "Accepted"
        },
        {
            id: "EMP007",
            name: "Srikanth Rao",
            image: "https://i.pravatar.cc/40?img=7",
            designation: "DevOps Engineer",
            team: "Tech",
            reason: "Scheduled to appear for a certification\nNeed time to study and attend exam\nWill be back right after completion",
            startDate: "2025-05-12",
            endDate: "2025-05-13",
            numberOfDays: 2,
            status: "Pending"
        },
        {
            id: "EMP004",
            name: "Soumya Jain",
            image: "https://i.pravatar.cc/40?img=4",
            designation: "HR Executive",
            team: "HR",
            reason: "Urgent personal matter at home\nNeed to take care of some paperwork\nBack in office after resolving it",
            startDate: "2025-05-08",
            endDate: "2025-05-09",
            numberOfDays: 2,
            status: "Accepted"
        }
    ];



    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <div className={styles.admin_dashboard_header_card}>
                    <HeaderDashboard />
                    <h1 className={styles.admin_greeting}>
                        {greetings}, <span>{Emply?.emp_name || "Loading..."}</span>!
                    </h1>
                </div>
                <h1 style={{ marginTop: "0px", fontWeight: "500" }}>Todays Absent Employees</h1>
                {/* <div className={styles.emp_main_section_contianer}>
                    <div className={styles.total_and_leave_card}>
                        <div className={styles.total_emp_card}>
                            <p className={styles.emp_active}>Leave Requests </p>
                            <p className={styles.emp_count}>20</p>
                        </div>

                        <div className={styles.leave_pen_card}>
                            <p className={styles.emp_active}>Leave Pending</p>
                            <p className={styles.emp_count}>10</p>
                        </div>


                        <div className={styles.leave_rej_card}>
                            <p className={styles.emp_active}>Leave Rejected</p>
                            <p className={styles.emp_count}>15</p>
                        </div>


                    </div>

                    {/* <div className={styles.total_and_leave_card}>
                        <div className={styles.total_emp_card} >
                            <p className={styles.emp_active}>Tech Team </p>
                            <p className={styles.emp_count}>30</p>
                        </div>

                        <div className={styles.total_emp_card}>
                            <p className={styles.emp_active}>Social Media Team</p>
                            <p className={styles.emp_count}>20</p>
                        </div>
                    </div> 
                </div> */}



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
                                <th>Reason</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Days</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveRequests.map((emp, index) => (
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
                                    <td style={{
                                        maxWidth: "120px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}>
                                        {emp.reason}
                                    </td>

                                    {/* <td style={{ whiteSpace: "pre-wrap", maxWidth: 180 }}>{emp.reason}</td> */}
                                    <td>{emp.startDate}</td>
                                    <td>{emp.endDate}</td>
                                    <td>{emp.numberOfDays}</td>
                                    <td>
                                        <span
                                            style={{
                                                padding: "4px 10px",
                                                borderRadius: "12px",
                                                fontWeight: "600",
                                                backgroundColor:
                                                    emp.status === "Accepted"
                                                        ? "#e6f5ea"
                                                        : emp.status === "Pending"
                                                            ? "#fff8e1"
                                                            : "#ffebee",
                                                color:
                                                    emp.status === "Accepted"
                                                        ? "#2e7d32"
                                                        : emp.status === "Pending"
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

export default TodaysAbsentEmp


