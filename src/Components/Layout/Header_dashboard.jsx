import React from "react";
// import logo from "../../Assets/images/parivartn_logo.svg"
import styles from "./Header.module.css";
import parivartan_logo from "../../Assets/images/ParivartanLogo.svg"

const HeaderDashboard = () => {
    return(
        <>
       <header className={styles.header}>
        <div className={styles.leftSection}>
            <h1 className={styles.title}>Parivartan HR Portal</h1>
        </div>
        <img src = {parivartan_logo} alt = "logo" className={styles.logo2} />
       </header>
        </>
    )
}


export default HeaderDashboard

