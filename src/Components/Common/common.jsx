import React, { useState, useEffect } from "react";
import SidebarMenu from "./Dashboard";
import HeaderDashboard from "../Layout/Header_dashboard";
import EmployeeAuth from "../../Hooks/useAuth";
import time from "../../Assets/images/time.png";
import timer from "../../Assets/images/timer.png";
import styles from "../../Styles/dashboard.module.css"



const Common = () => {
    // const { empId } = useParams();
    const [Emply, SetEmply] = useState(null);
    const { fetchemployeeDetails } = EmployeeAuth();
    const [greetings, setGreetings] = useState("");
    const [currentTime, setcurrentTime] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
  

    const taskdate = new Date();
      const formattedDate = taskdate.toLocaleDateString("en-GB", {
        weekday: "long", // Tuesday
        day: "2-digit", // 18
        month: "long", // March
      });
    

      useEffect(() => {
        const updateTime = () => {
          const time = new Date();
          const formattedTime = time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          setcurrentTime(formattedTime);
        };
    
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
      }, []);
    
      useEffect(() => {
        const fetchData = async () => {
          const response = await fetchemployeeDetails();
          if (response) {
            SetEmply(response);
          }
        };
        fetchData();
    
        const currenttimestatus = new Date().getHours();
        // if (currenttimestatus >= 1 && currenttimestatus < 12) {
        //   setGreetings("Good Morning");
        // } else if (currenttimestatus >= 12 && currenttimestatus < 17) {
        //   setGreetings("Good Afternoon");
        // } else {
        //   setGreetings("Good Evening");
        // }
      }, []);
    
      // Retrieve the stored timer value when the page loads
      useEffect(() => {
        const savedTime = localStorage.getItem("timer_seconds");
        if (savedTime) {
          setSeconds(parseInt(savedTime, 10));
        }
    
        let interval;
        if (isRunning) {
          interval = setInterval(() => {
            setSeconds((prev) => {
              const newTime = prev + 1;
              localStorage.setItem("timer_seconds", newTime); // Save updated time
              return newTime;
            });
          }, 1000);
        }
    
        return () => clearInterval(interval);
      }, [isRunning]);
    
      const handleStopTimer = () => {
        setIsRunning(false);
        localStorage.setItem("timer_seconds", seconds); // Store the current time when stopped
      };
    
      const formatTime = (totalSeconds) => {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const min = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const secs = String(totalSeconds % 60).padStart(2, "0");
        return `${hours}:${min}:${secs}`;
      };


  return (
    <>
      <HeaderDashboard />
      {/* <div className={styles.dashboard_content}> */}
        {/* <h1 className={styles.greeting}>
          {greetings}, <span>{Emply?.emp_name || "Loading..."}</span>!
        </h1> */}
        {/* 
          <div className={styles.emp_details_wrapper}>
            <div className={styles.current_time_card}>
              <img className={styles.time_logo} src={time} alt="Time" />
              <div className={styles.time_display}>
                <span className={styles.time_text}>{currentTime}</span>
              </div>
              |
              <img
                style={{ marginLeft: "10px" }}
                className={styles.time_logo}
                src={timer}
                alt="timer"
              />
              <span style={{ marginLeft: "10px" }} className={styles.time_text}>
                {formatTime(seconds)}
              </span>
            </div>
            <button onClick={handleStopTimer} className={styles.stopButton}>
                           Stop Timer
                         </button>
          </div> */}
      {/* </div> */}
    </>
  );
};

export default Common;
