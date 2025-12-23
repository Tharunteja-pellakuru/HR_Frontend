import React, { useState, useEffect } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
import EmployeeAuth from "../../Hooks/useAuth";
import { Link, useParams, useNavigate } from "react-router-dom";
import TechTeamEmployess from "./Tech_team";
import SocialTeamEmployess from "./social_media_team";

const Teams = () => {
    const [activeTeam, setActiveTeam] = useState("Tech Team");
    // Removed unused Greetings and Auth logic as standard pages don't show greetings

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />
                <div className={styles.dashboard_content}>
                    
                    <div className={styles.daily_report_header}>
                        <h2 className={styles.pageTitleWithLine}>Teams</h2>
                        <div className={styles.team_toggle_container}>
                            <button 
                                onClick={() => setActiveTeam("Tech Team")}
                                className={`${styles.team_toggle_btn} ${activeTeam === "Tech Team" ? styles.team_toggle_btn_active : ''}`}
                            >
                                Tech Team
                            </button>
                            <button 
                                onClick={() => setActiveTeam("Media Team")}
                                className={`${styles.team_toggle_btn} ${activeTeam === "Media Team" ? styles.team_toggle_btn_active : ''}`}
                            >
                                Media Team
                            </button>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        {activeTeam === "Tech Team" && <TechTeamEmployess />}
                        {activeTeam === "Media Team" && <SocialTeamEmployess />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Teams;





