import React, { useState, useEffect } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/pendingtask.module.css"
import EmployeeAuth from "../../Hooks/useAuth";

const PendingTask = () => {
       const [greetings, setGreetings] = useState("");
        const [Emply, SetEmply] = useState(null);
        const { fetchemployeeDetails } = EmployeeAuth();

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


    return(
         <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
            <div className={styles.admin_dashboard_header_card}>
                    <HeaderDashboard />
                    <h1 className={styles.admin_greeting}>
                        {greetings}, <span>{Emply?.emp_name || "Loading..."}</span>!
                    </h1>
                </div>
            </div>
            </div>
    )
}

export default PendingTask




