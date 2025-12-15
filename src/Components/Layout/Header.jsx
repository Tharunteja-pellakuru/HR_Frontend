import React from "react";
// import logo from "../../Assets/images/parivartn_logo.svg"
import styles from "./Header.module.css";
import parivartan_logo from "../../Assets/images/parivartan_logo.png"



const Headers = () => {
    return (
        <>
            <header className={styles.header}>
                <><img src={parivartan_logo} alt="logo" className={styles.logo} /></>
                {/* <img className={styles.logo} src = {logo} alt = "logo"/> */}
            </header>
        </>
    )
}


export default Headers










