import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EmployeeAuth from "../../Hooks/useAuth";
import SidebarMenu from "../../Components/Common/Dashboard";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
import time from "../../Assets/images/time.png";
import timer from "../../Assets/images/timer.png";
import AttendanceChart from "./emp_att_pie_chart";
import PerformanceChart from "./emp_performance_chart";
import EmpWokringHrsBarGraph from "./emp_attendence_bar_graph";
import dummy from "../../Assets/images/dummy.png"

const EmployeeDashboard = () => {
  const { empId } = useParams();
  const [Emply, SetEmply] = useState(null);
  const { fetchemployeeDetails } = EmployeeAuth();
  const [greetings, setGreetings] = useState("");
  const [currentTime, setcurrentTime] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [taskStatus, setTaskStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [reason, setReason] = useState("");

  const taskdate = new Date();
  const formattedDate = taskdate.toLocaleDateString("en-GB", {
    weekday: "long", // Tuesday
    day: "2-digit", // 18
    month: "long", // March
  });

  const handleCheckboxClick = () => {
    setShowPopup(true); // Show the popup
  };

  // Handle status selection
  const handleStatusSelection = (status) => {
    setTaskStatus(status);
    if (status === "completed") {
      setShowPopup(false);
    }

    // setShowPopup(false);
  };

  const onClickSubmitReview = () => {
    setShowPopup(false);
    setReason("")
  };

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
    if (currenttimestatus >= 1 && currenttimestatus < 12) {
      setGreetings("Good Morning");
    } else if (currenttimestatus >= 12 && currenttimestatus < 17) {
      setGreetings("Good Afternoon");
    } else {
      setGreetings("Good Evening");
    }
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

  //task dummy data 
  const assignwork = [
    { id: 1, assignWork: "Complete frontend UI", time: "10:00 AM - 12:00 PM", assignby: "Manager" },
    { id: 2, assignWork: "API integration", time: "1:00 PM - 3:00 PM", assignby: "Team Lead" },
    { id: 3, assignWork: "Database optimization", time: "3:30 PM - 5:30 PM", assignby: "Senior Developer" }
  ];
  

  return (
    <div className={styles.emp_dashboard_wrapper}>
      <SidebarMenu />
      <div className={styles.emp_dashboard_main}>
        <HeaderDashboard />
        <div className={styles.emp_dashboard_content}>
          <h1 className={styles.greeting}>
            {greetings}, <span>{Emply?.emp_name || "Loading..."}</span>!
          </h1>

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
            {/* <button onClick={handleStopTimer} className={styles.stopButton}>
              Stop Timer
            </button> */}
          </div>
        </div>
        {/* attendence and performace calculator */}
        <div className={styles.emp_content_section}>
          <div className={styles.emp_attendence_container}>
          <div className={styles.emp_att_card}>
          <p>Attendence</p>
          <Link to ={ `/employee_Hr_portal/employee_attendence/${empId}`} className={styles.link}>View Status</Link>
          </div>
            {/* <br/> */}
            <hr />
            <AttendanceChart present={20} late={5} absent={3} />
          </div>
          <div className={styles.emp_performance_container}>
            {/* <p>Performence</p> */}
            <div className={styles.emp_att_card}>
            <p>Performence</p>
          <Link  to ={ `/employee_Hr_portal/employee_performence/${empId}`}  className={styles.link}>View Status</Link>
          </div>
            <hr />
            <PerformanceChart />
          </div>
          <div className={styles.evnt_container}>
            <p>Events</p>
            <hr />
          </div>
        </div>

        <div className={styles.emp_graphs_contianer}>
          <>
            <EmpWokringHrsBarGraph />
          </>
          <div className={styles.task_assign_container}>
            <p>Today's Task</p>
            <div className={styles.task_assign}>
              <span className={styles.task_date}>{formattedDate}</span>
              <span className={styles.asign}>
                Total Task Assign &nbsp;
                <span className={styles.no}>10</span>
              </span>
            </div>
            <hr />



            {
              assignwork.map((each , item) => (
                      <div className={styles.task_container}>
                              <div className={styles.task_and_comple_container}>
                                <p className={styles.work_assign}>
                                  {each.assignWork}
                                  {/* Work on BigBonanza and admin work */}
                                </p>
                                <input
                                  type="checkbox"
                                  checked={taskStatus === "completed"}
                                  className={styles.checkbox}
                                  onClick={handleCheckboxClick}
                                />
                              </div>
                              <hr style={{ border: "1px solid #ccc", width: "100%" }} />
                              <div className={styles.time_and_assing_by_continer}>
                                <p className={styles.comple_time}>
                                  <span style={{ fontWeight: 500, color: "#515151" }}> 
                                    Today :   {" "}
                                  </span>
                                  {/* 11:00 AM - 2:00 PM */}
                                  {each.time}
                                </p>
                                <img className={styles.assin_logo} src={dummy} alt = "assign by" width={35} height={35} />
                              </div> 
                            </div>
              ))
            }
           

            {showPopup && (
              <div className={styles.popup_overlay}>
                <div className={styles.popup}>
                  <p>Select Task Status:</p>
                  <button onClick={() => handleStatusSelection("completed")}>
                    ✅ Completed
                  </button>
                  <button onClick={() => handleStatusSelection("working")}>
                    🟡 Working
                  </button>
                  <button onClick={() => handleStatusSelection("not started")}>
                    ❌ Not Started
                  </button>
                  <div className={styles.container}>
                    {(taskStatus === "working" ||
                      taskStatus === "not started") && (
                      <div>
                        <textarea
                          placeholder="Enter reason and estimated time..."
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                        />
                        <div className={styles.buttonWrapper}>
                          <button type="button" onClick={onClickSubmitReview}>
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
