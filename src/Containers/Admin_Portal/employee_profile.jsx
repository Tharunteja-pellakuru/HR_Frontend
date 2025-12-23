import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/employee_profile.module.css";
import dashboardStyles from "../../Styles/dashboard.module.css";
import { MdEmail, MdPhone, MdLocationOn, MdCalendarToday, MdWork, MdEdit, MdArrowBack } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const EmployeeProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("personal");

    // Mock Data - In real app, fetch based on ID
    const employee = {
        id: id || "EMP001",
        name: "Shyam Sunder Rao",
        designation: "Senior Frontend Developer",
        department: "Tech Team",
        status: "Active",
        email: "shyam.s@parivartan.com",
        phone: "+91 98765 43210",
        location: "Hyderabad, India",
        joiningDate: "15 Jan, 2022",
        dob: "12 Aug, 1995",
        experience: "4 Years",
        projects: 12,
        image: "https://i.pravatar.cc/150?img=11",
        manager: "Ramesh Legala",
        skills: ["React", "Node.js", "CSS Modules", "Redux"],
        about: "Passionate frontend developer with 4 years of experience in building responsive web applications. Specialized in React ecosystem and UI/UX implementation."
    };

    return (
        <div className={dashboardStyles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={dashboardStyles.admin_dashboard_main}>
                <HeaderDashboard />
                
                <div className={dashboardStyles.dashboard_content}>
                    <h2 className={dashboardStyles.pageTitleWithLine}>Employee Details</h2>
                    
                    <div className={styles.profile_container}>
                        {/* Header Section */}
                        <div className={styles.profile_header}>
                            <div className={styles.cover_photo}>
                                <div className={styles.profile_nav}>
                                    <button className={styles.back_btn} onClick={() => navigate(-1)}>
                                        <MdArrowBack /> Back
                                    </button>
                                    <button className={styles.edit_btn}>
                                        <MdEdit /> Edit Profile
                                    </button>
                                </div>
                            </div>
                            
                            <div className={styles.profile_main_info}>
                                <div className={styles.avatar_wrapper}>
                                    <img src={employee.image} alt={employee.name} className={styles.avatar_img} />
                                    <div className={`${styles.status_indicator} ${styles.status_active}`}></div>
                                </div>
                                <div className={styles.info_text}>
                                    <h2>{employee.name}</h2>
                                    <div className={styles.designation_row}>
                                        <MdWork /> {employee.designation}
                                        <span className={`${styles.badge} ${styles.badge_tech}`}>{employee.department}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className={styles.content_grid}>
                            
                            {/* Left Column: Contact & Overview */}
                            <div className={styles.left_column}>
                                <div className={styles.card}>
                                    <div className={styles.card_header}>Contact Info</div>
                                    <div className={styles.card_body}>
                                        <div className={styles.contact_list}>
                                            <div className={styles.contact_item}>
                                                <div className={styles.icon_box}><MdEmail /></div>
                                                <div className={styles.contact_details}>
                                                    <h4>Email Address</h4>
                                                    <p>{employee.email}</p>
                                                </div>
                                            </div>
                                            <div className={styles.contact_item}>
                                                <div className={styles.icon_box}><MdPhone /></div>
                                                <div className={styles.contact_details}>
                                                    <h4>Phone Number</h4>
                                                    <p>{employee.phone}</p>
                                                </div>
                                            </div>
                                            <div className={styles.contact_item}>
                                                <div className={styles.icon_box}><MdLocationOn /></div>
                                                <div className={styles.contact_details}>
                                                    <h4>Location</h4>
                                                    <p>{employee.location}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                                            <div className={styles.contact_details}>
                                                 <h4>Social Profiles</h4>
                                                 <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                                                     <FaLinkedin size={24} color="#0077b5" cursor="pointer" />
                                                     <FaGithub size={24} color="#333" cursor="pointer" />
                                                 </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.card}>
                                    <div className={styles.card_header}>Work Stats</div>
                                    <div className={styles.card_body}>
                                        <div className={styles.stats_grid}>
                                            <div className={styles.stat_box}>
                                                <span className={styles.stat_value}>{employee.projects}</span>
                                                <span className={styles.stat_label}>Projects Completed</span>
                                            </div>
                                            <div className={styles.stat_box}>
                                                <span className={styles.stat_value}>{employee.experience}</span>
                                                <span className={styles.stat_label}>Experience</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Details Tabs */}
                            <div className={styles.right_column}>
                                <div className={styles.card}>
                                    <div className={styles.card_body}>
                                        <div className={styles.tabs_header}>
                                            <button 
                                                className={`${styles.tab_btn} ${activeTab === "personal" ? styles.tab_active : ""}`}
                                                onClick={() => setActiveTab("personal")}
                                            >
                                                Personal Information
                                            </button>
                                            <button 
                                                className={`${styles.tab_btn} ${activeTab === "job" ? styles.tab_active : ""}`}
                                                onClick={() => setActiveTab("job")}
                                            >
                                                Job Details
                                            </button>
                                            <button 
                                                className={`${styles.tab_btn} ${activeTab === "documents" ? styles.tab_active : ""}`}
                                                onClick={() => setActiveTab("documents")}
                                            >
                                                Documents
                                            </button>
                                        </div>

                                        {activeTab === "personal" && (
                                            <div className={styles.tab_content}>
                                                <div className={styles.detail_grid}>
                                                    <div className={styles.detail_group}>
                                                        <label>Full Name</label>
                                                        <p>{employee.name}</p>
                                                    </div>
                                                    <div className={styles.detail_group}>
                                                        <label>Date of Birth</label>
                                                        <p>{employee.dob}</p>
                                                    </div>
                                                    <div className={styles.detail_group}>
                                                        <label>Gender</label>
                                                        <p>Male</p>
                                                    </div>
                                                    <div className={styles.detail_group}>
                                                        <label>Marital Status</label>
                                                        <p>Single</p>
                                                    </div>
                                                    <div className={styles.detail_group} style={{ gridColumn: "1 / -1" }}>
                                                        <label>About Me</label>
                                                        <p style={{ lineHeight: '1.6' }}>{employee.about}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "job" && (
                                            <div className={styles.tab_content}>
                                                <div className={styles.detail_grid}>
                                                    <div className={styles.detail_group}>
                                                        <label>Employee ID</label>
                                                        <p>{employee.id}</p>
                                                    </div>
                                                    <div className={styles.detail_group}>
                                                        <label>Reporting Manager</label>
                                                        <p>{employee.manager}</p>
                                                    </div>
                                                    <div className={styles.detail_group}>
                                                        <label>Date of Joining</label>
                                                        <p>{employee.joiningDate}</p>
                                                    </div>
                                                    <div className={styles.detail_group}>
                                                        <label>Department</label>
                                                        <p>{employee.department}</p>
                                                    </div>
                                                    <div className={styles.detail_group} style={{ gridColumn: "1 / -1" }}>
                                                        <label>Skills</label>
                                                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '5px' }}>
                                                            {employee.skills.map((skill, idx) => (
                                                                <span key={idx} style={{ background: '#f0f0f0', padding: '5px 12px', borderRadius: '15px', fontSize: '13px', color: '#555' }}>
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;
