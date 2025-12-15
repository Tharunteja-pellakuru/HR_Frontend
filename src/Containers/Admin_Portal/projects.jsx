import React, { useState, useEffect } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/staff.module.css";
import EmployeeAuth from "../../Hooks/useAuth";
import { FaSearch } from "react-icons/fa"
import { TbTopologyStar3 } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiHieroglyphY } from "react-icons/gi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiBriefcaseAlt } from "react-icons/bi";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../Styles/projects.css";
import testlogo from "../../Assets/images/test_logo.jpg"


const Projects = () => {
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

    const departments = ["2025", "2024", "2023", "2022", "2021", "2020"];
    const Status = ["Completed", "Active", "On Hold", "Terminated", "Not Yet Started"];
    const Role = ["Desgining", "WordPress", "Development", "Application", "App", "Video Editing", "Photoshop"];

    const projects = [
        {
            projectId: "PJ001",
            projectName: "TechNova Website Redesign",
            projectStartDate: "2023-01-15",
            projectEndDate: "2023-07-15",
            projectDescription: "Complete redesign of corporate website with CMS integration",
            projectTechnologies: ["React", "Node.js", "MongoDB", "Stripe API", "PHP", "Stripe API", "PHP"],
            projectAssignedTo: "Shyam Sunder Rao ",  // EMP001
            status: "Active",
            clientId: "CL001"  // Optional: Retain client reference
        },
        {
            projectId: "PJ002",
            projectName: "GreenEarth E-commerce Platform",
            projectStartDate: "2023-03-10",
            projectEndDate: "2023-09-10",
            projectDescription: "Build organic products marketplace with payment gateway",
            projectTechnologies: ["Shopify", "Stripe API", "PHP"],
            projectAssignedTo: "Rani Sharma ",  // EMP002
            status: "Active",
            clientId: "CL002"
        },
        {
            projectId: "PJ003",
            projectName: "MediCare Patient Portal",
            projectStartDate: "2023-02-20",
            projectEndDate: "2023-08-20",
            projectDescription: "Secure portal for patient records and appointments",
            projectTechnologies: ["Java", "Spring Boot", "PostgreSQL"],
            projectAssignedTo: "Kunal Mehta ",  // EMP003
            status: "On Hold",
            clientId: "CL003"
        },
        {
            projectId: "PJ004",
            projectName: "EduTech LMS Platform",
            projectStartDate: "2023-04-05",
            projectEndDate: "2023-12-05",
            projectDescription: "Custom learning management system for online courses",
            projectTechnologies: ["Python", "Django", "AWS"],
            projectAssignedTo: "Soumya Jain",  // EMP004
            status: "On Hold",
            clientId: "CL004"
        },
        {
            projectId: "PJ005",
            projectName: "FinSecure Mobile Banking",
            projectStartDate: "2023-01-30",
            projectEndDate: "2023-06-30",
            projectDescription: "iOS/Android app with biometric authentication",
            projectTechnologies: ["Flutter", "Firebase", "Node.js"],
            projectAssignedTo: "Mouli Das ",  // EMP005
            status: "Completed",
            clientId: "CL005"
        },
        {
            projectId: "PJ006",
            projectName: "TravelScape Booking Engine",
            projectStartDate: "2023-05-15",
            projectEndDate: "2024-05-15",
            projectDescription: "Multi-vendor travel booking platform",
            projectTechnologies: ["Angular", "NestJS", "MySQL"],
            projectAssignedTo: "Surya Nair ",  // EMP006
            status: "Active",
            clientId: "CL006"
        },
        {
            projectId: "PJ007",
            projectName: "Foodie's POS System",
            projectStartDate: "2023-03-25",
            projectEndDate: "2023-09-25",
            projectDescription: "Restaurant management with inventory tracking",
            projectTechnologies: ["C#", ".NET", "SQL Server"],
            projectAssignedTo: "Srikanth Rao",  // EMP007
            status: "Terminated",
            clientId: "CL007"
        },
        {
            projectId: "PJ008",
            projectName: "AutoMech Inventory System",
            projectStartDate: "2023-02-10",
            projectEndDate: "2023-08-10",
            projectDescription: "Automated parts inventory with barcode scanning",
            projectTechnologies: ["Vue.js", "Laravel", "MySQL"],
            projectAssignedTo: "Silva Anthony",  // EMP008
            status: "Completed",
            clientId: "CL008"
        },
        {
            projectId: "PJ009",
            projectName: "StyleHub Online Store",
            projectStartDate: "2023-06-01",
            projectEndDate: "2024-06-01",
            projectDescription: "Fashion e-commerce with AR try-on feature",
            projectTechnologies: ["React", "Three.js", "Magento"],
            projectAssignedTo: "Pradeep Varma ",  // EMP009
            status: "Not Yet Started",
            clientId: "CL009"
        },
        {
            projectId: "PJ010",
            projectName: "BuildRight Project Tracker",
            projectStartDate: "2023-04-20",
            projectEndDate: "2023-10-20",
            projectDescription: "Construction project management with Gantt charts",
            projectTechnologies: ["TypeScript", "Next.js", "PostgreSQL"],
            projectAssignedTo: "Minal Kaur ",  // EMP010
            status: "Active",
            clientId: "CL010"
        }
    ];


    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

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
                <h1 style={{ marginTop: "0px", fontWeight: "500" }}>Projects</h1>
                <div className={styles.emp_main_section_contianer}>
                    <div className={styles.total_and_leave_card}>
                        <div className={styles.total_proj_card}>
                            <p className={styles.emp_active}>Total Projects </p>
                            <p className={styles.emp_count}>10000</p>
                        </div>

                        <div className={styles.total_year_projects_card}>
                            <p className={styles.emp_active}>Completed  <br />
                            <span> </span> &nbsp;
                                {/* <span>View Yearly Projects Progress</span> */}
                            </p>
                            <p className={styles.emp_count}>500</p>

                        </div>
                    </div>

                    <div className={styles.total_and_leave_card}>
                        <div className={styles.total_proj_card} >
                            <p className={styles.emp_active}>Tech Projects </p>
                            <p className={styles.emp_count}>300</p>
                        </div>

                        <div className={styles.total_proj_card}>
                            <p className={styles.emp_active}>Social Media Projects</p>
                            <p className={styles.emp_count}>200</p>
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
                            placeholder="Search Projects"
                            className={styles.input_search}
                        />
                    </div>
                    {/* select for team type */}
                    <div className={styles.select_option_card}>
                        <FaRegCalendarAlt />
                        <select
                            value={SelectedTeam}
                            onChange={(e) => SetSelectedTeam(e.target.value)}
                        >
                            <option value="">Year</option>
                            {departments.map((opt, i) => (
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
                            <option value="">Project type</option>
                            {Role.map((opt, i) => (
                                <option key={i} value={opt}>
                                    {opt}
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
                            <option value="">Project Assigned to</option>
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

                {/* add client button */}
                <div className={styles.add_client_contianer}>
                    <button type="button" className={styles.add_project_btn}>
                        + Add New Project
                    </button>
                </div>

                {/* projects list  */}
                <div className="empl_list_container">
                    {projects.map((project) => (
                        <div key={project.projectId} className="project-card">
                            <div className="project-header">
                                <span className={`project-status status-${project.status.toLowerCase().replace(' ', '-')}`}>
                                    {project.status}
                                </span>
                                <div className="project-id"># ID: {project.projectId}</div>
                                {/* <h2 className="project-title">{project.projectName}</h2>
                                <div className="project-id">ID: {project.projectId}</div> */}
                            </div >

                            <div className="project_logo_and_name">
                                <img src={testlogo} alt="proejectname" className="company_logo" />
                                <h2 className="project-title">{project.projectName}</h2>
                            </div>

                            {/* <div className="project_logo_and_name">
                                <img src={testlogo} alt = "proejectname" className="company_logo" />
                                <h2 className="project-title">{project.projectName}</h2>
                            </div>

                            <div className="project-dates">
                                {project.projectStartDate} to {project.projectEndDate}
                            </div>

                            <div className="project-assigned">
                                <a href="#" className="assigned-link">
                                    {project.projectAssignedTo}
                                </a>
                            </div>

                            <div className="tech-stack">
                                {project.projectTechnologies.map((tech, i) => (
                                    <span key={i} className="tech-pill">{tech}</span>
                                ))}
                            </div>

                            <div className="project-description">
                                <strong>{project.projectDescription}</strong>
                            </div> */}

                            <div className="project_details_card">
                                <div className="project-assigned">
                                    <span>Assigned To : </span>
                                    {project.projectAssignedTo}
                                </div>
                                <div className="tech-stack">
                                    <span>Technology {"   "} : </span>
                                    {project.projectTechnologies.slice(0, 3).map((tech, i) => (
                                        <span key={i} className="tech-pill">{tech}</span>
                                    ))}
                                    {project.projectTechnologies.length > 3 && (
                                        <span className="tech-pill">+{project.projectTechnologies.length - 3} more</span>
                                    )}
                                </div>


                                <div className="project-description">
                                  <span>Description :  </span>
                                  {project.projectDescription}
                                </div>
                            </div>

                            <div className="project-footer">
                                <span className="join-date">Started at {formatDate(project.projectStartDate)}</span>
                                <a href="#" className="view-link">View details &gt;</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Projects


