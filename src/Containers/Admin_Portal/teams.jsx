import React, { useState, useEffect } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/team.module.css";
import EmployeeAuth from "../../Hooks/useAuth";
import { Link, useParams, useNavigate } from "react-router-dom";
import TechTeamEmployess from "./Tech_team";
import SocialTeamEmployess from "./social_media_team";

const Teams = () => {
    const [greetings, setGreetings] = useState("");
    const [Emply, SetEmply] = useState(null);
    const { fetchemployeeDetails } = EmployeeAuth();
    const [activeTeam, setActiveTeam] = useState("Tech Team");

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
                <h1 style={{ marginTop: "0px", marginBottom:"10px", fontWeight: "500" }}>Teams</h1>
                <div className={styles.emp_main_section_contianer}>
                    <div className={styles.total_and_leave_card}>
                        <div
                            className={`${styles.total_emp_card} ${activeTeam === "Tech Team" ? styles.activeCard : ""}`}
                            onClick={() => setActiveTeam("Tech Team")}
                        >
                            <p className={styles.emp_active}>Tech Team</p>
                            <p className={styles.emp_count}>30</p>
                        </div>
                        <div
                            className={`${styles.total_emp_card} ${activeTeam === "Social Media Team" ? styles.activeCard : ""}`}
                            onClick={() => setActiveTeam("Social Media Team")}
                        >
                            <p className={styles.emp_active}>Social Media Team</p>
                            <p className={styles.emp_count}>20</p>
                        </div>
                    </div>
                </div>

                {activeTeam === "Tech Team" && <TechTeamEmployess />}
                {activeTeam === "Social Media Team" && <SocialTeamEmployess />}
            </div>
        </div>
    )
}

export default Teams





