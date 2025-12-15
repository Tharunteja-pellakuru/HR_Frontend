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


const Staff = () => {
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
    const Status = ["Active", "InActive" , "Today Leaves"];
    const Role = ["Desginer", "Developer", "Junior Developer", "Programmer", "Junior Programmer", "Fullter Developer", "Content Writers", "Video Editor", "Post Desginer"];

    const employees = [
        {
            id: "EMP001",
            name: "Shyam Sunder Rao",
            image: "https://i.pravatar.cc/40?img=1",
            designation: "Frontend Developer",
            team: "Tech",
            email: "shyam@example.com",
            phone: "9876543210",
            status: "Active",
            joiningDate: "2022-01-15"
        },
        {
            id: "EMP002",
            name: "Rani Sharma",
            image: "https://i.pravatar.cc/40?img=2",
            designation: "UI Designer",
            team: "Design",
            email: "rani@example.com",
            phone: "9876501123",
            status: "Active",
            joiningDate: "2021-10-10"
        },
        {
            id: "EMP003",
            name: "Kunal Mehta",
            image: "https://i.pravatar.cc/40?img=3",
            designation: "Backend Developer",
            team: "Tech",
            email: "kunal@example.com",
            phone: "9876543212",
            status: "On Leave",
            joiningDate: "2020-03-21"
        },
        {
            id: "EMP004",
            name: "Soumya Jain",
            image: "https://i.pravatar.cc/40?img=4",
            designation: "HR Executive",
            team: "HR",
            email: "soumya@example.com",
            phone: "9876547890",
            status: "Active",
            joiningDate: "2019-07-19"
        },
        {
            id: "EMP005",
            name: "Mouli Das",
            image: "https://i.pravatar.cc/40?img=5",
            designation: "Content Writer",
            team: "Marketing",
            email: "mouli@example.com",
            phone: "9876549999",
            status: "Resigned",
            joiningDate: "2021-11-01"
        },
        {
            id: "EMP006",
            name: "Surya Nair",
            image: "https://i.pravatar.cc/40?img=6",
            designation: "QA Engineer",
            team: "Tech",
            email: "surya@example.com",
            phone: "9876543111",
            status: "Active",
            joiningDate: "2022-06-05"
        },
        {
            id: "EMP007",
            name: "Srikanth Rao",
            image: "https://i.pravatar.cc/40?img=7",
            designation: "DevOps Engineer",
            team: "Tech",
            email: "srikanth@example.com",
            phone: "9876542222",
            status: "Active",
            joiningDate: "2020-12-15"
        },
        {
            id: "EMP008",
            name: "Silva Anthony",
            image: "https://i.pravatar.cc/40?img=8",
            designation: "Marketing Head",
            team: "Marketing",
            email: "silva@example.com",
            phone: "9876509876",
            status: "Active",
            joiningDate: "2018-04-20"
        },
        {
            id: "EMP009",
            name: "Pradeep Varma",
            image: "https://i.pravatar.cc/40?img=9",
            designation: "Sales Lead",
            team: "Sales",
            email: "pradeep@example.com",
            phone: "9876543000",
            status: "Active",
            joiningDate: "2019-09-09"
        },
        {
            id: "EMP010",
            name: "Minal Kaur",
            image: "https://i.pravatar.cc/40?img=10",
            designation: "Business Analyst",
            team: "Product",
            email: "minal@example.com",
            phone: "9876501111",
            status: "Active",
            joiningDate: "2023-01-01"
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
                <h1 style={{ marginTop: "0px", marginBottom:"10px" ,fontWeight: "500" }}>Employees</h1>
                <div className={styles.emp_main_section_contianer}>
                    <div className={styles.total_and_leave_card}>
                        <div className={styles.total_emp_card}>
                            <p className={styles.emp_active}>Total Active </p>
                            <p className={styles.emp_count}>50</p>
                        </div>

                        <div className={styles.total_emp_card}>
                            <p className={styles.emp_active}>Leave Request</p>
                            <p className={styles.emp_count}>10</p>
                        </div>
                    </div>

                    <div className={styles.total_and_leave_card}>
                        <div className={styles.total_emp_card} >
                            <p className={styles.emp_active}>Tech Team </p>
                            <p className={styles.emp_count}>30</p>
                        </div>

                        <div className={styles.total_emp_card}>
                            <p className={styles.emp_active}>Social Media Team</p>
                            <p className={styles.emp_count}>20</p>
                        </div>
                    </div>
                </div>

                {/* search filter contianert */}
                <div className={styles.search_fillter_container}>
                    <div className={styles.search_card}>
                        <FaSearch style={{ color: "#555", fontSize: "14px", margin: "0px 0px 13px 0px" }} />
                        <input
                            type="search"
                            name="search"
                            placeholder="Search"
                            className={styles.input_search}
                        />
                    </div>
                    {/* select for team type */}
                    {/* <div className={styles.select_option_card}>
                        <GiHieroglyphY />
                        <select
                            value={SelectedTeam}
                            onChange={(e) => SetSelectedTeam(e.target.value)}
                        >
                            <option value="">Select team</option>
                            {departments.map((opt, i) => (
                                <option key={i} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div> */}

                    {/* select for employe status */}
                    <div className={styles.select_option_card}>
                        <MdShowChart />
                        <select
                            value={SelectedStatus}
                            onChange={(e) => SetSelectedStatus(e.target.value)}
                        >
                            <option value="">Status</option>
                            {Status.map((opt, i) => (
                                <option key={i} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* select for role */}
                    <div className={styles.select_option_card}>
                        <BiBriefcaseAlt />
                        <select
                            value={SelectedRole}
                            onChange={(e) => SetSelectedRole(e.target.value)}
                        >
                            <option value="">Role</option>
                            {Role.map((opt, i) => (
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
                        <thead border={0}>
                            <tr>
                                <th>S.No</th>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Designation</th>
                                {/* <th>Department</th> */}
                                <th>Team</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                {/* <th>Joining Date</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp, index) => (
                                <tr key={emp.id}>
                                    <td>{index + 1}</td>
                                    <td>{emp.id}</td>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <img src={emp.image} alt={emp.name} style={{ width: "35px", height: "35px", borderRadius: "50%", objectFit: "cover" }} />
                                            <span>{emp.name}</span>
                                        </div>
                                    </td>

                                    <td>{emp.designation}</td>
                                    <td>{emp.team}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.phone}</td>
                                    <td>
                                        <span style={{
                                            padding: "4px 10px",
                                            borderRadius: "12px",
                                            fontWeight: "600",
                                            backgroundColor: emp.status === "Active" ? "#e6f5ea"
                                                : emp.status === "On Leave" ? "#fff4cc"
                                                    : emp.status === "Resigned" ? "#ffe6e6"
                                                        : "#f0f0f0",
                                            color: emp.status === "Active" ? "#2e7d32"
                                                : emp.status === "On Leave" ? "#996c00"
                                                    : emp.status === "Resigned" ? "#b71c1c"
                                                        : "#333"
                                        }}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    {/* <td>{emp.joiningDate}</td> */}
                                    <td>
                                        <button>View </button>
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

export default Staff


