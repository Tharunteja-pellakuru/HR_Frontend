import React , {useState} from "react";
import styles from "./dashboard.module.css";
import HeaderDashboard from "../Layout/Header_dashboard";
import dashboard from "../../Assets/images/dashboard.svg"


const SidebarMenu = () => {
    const [isOpen , SetIsOpen] = useState(true);
    const ontogglemenu = () => {
        SetIsOpen(!isOpen)
    }
    return (
        <div className={styles.dashboard_wrapper}>
            {/* Sidebar Menu */}
            {/* <span className={styles.menu_icon} onClick={ontogglemenu} >☰</span>  */}
            <div className={`${styles.dashboard_container} ${isOpen ? styles.open : " "}`}>
               
            <span className={styles.menu_icon}  >☰</span> 
                    {/* <h2>ndjbk</h2> */}
                    <ul className={styles.dash_board_menu}>
                        <li>
                           <span>
                            <img src={dashboard} alt="logo"/>
                            </span> Dashboard
                        </li>
                        <li>
                            Dashboard
                        </li>
                        <li>
                            Dashboard
                        </li>
                        <li>
                            Dashboard
                        </li>
                        <li>
                            Timeout
                        </li>

                    </ul>
               
            </div>
           

            {/* Header Next to Sidebar */}
            {/* <div className={styles.header_container}>
            <HeaderDashboard/>
            </div> */}
        </div>
    );
}

export default SidebarMenu;