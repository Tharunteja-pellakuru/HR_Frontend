import React, { useState } from "react";
import Common from "../../Components/Common/common";
import SidebarMenu from "../../Components/Common/Dashboard";
import "../../Styles/style.css";
import styles from "../../Styles/dailyreport.module.css";
import DailyProgressGraph from "./DailyProgressGraph";
import MonthlyProgressGraph from "./MonthlyProgressGraph";

const Empdailyreport = () => {
  const [showPopup, setShowPopup] = useState(false);
  const OnaddnewReport = () => {
    setShowPopup(true);
  };

  const onClickSubmitReview = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="emp_wrapper">
        <SidebarMenu />
        <div className="emp_main_wrapper">
          <Common />
          <div className="emp_content_section">
            <p>Employee Daily Report </p>
            <div className={styles.daily_report_container}>
              <div className={styles.report_card}>
                <div className={styles.button_wrapper}>
                  <button
                    type="button"
                    className={styles.report_btn}
                    onClick={OnaddnewReport}
                  >
                   + Add New Report
                  </button>
                </div>
                <div className={styles.table_container}>
                  <table>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Project Name</th>
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>Project A</td>
                        <td>2024-03-25</td>
                        <td>3 months</td>
                        <td>
                          Developing a web application for internal task
                          management.
                        </td>
                      </tr>
                      <tr>
                        <td>02</td>
                        <td>Project B</td>
                        <td>2024-02-15</td>
                        <td>6 months</td>
                        <td>
                          Creating an e-commerce platform with secure payment
                          integration.
                        </td>
                      </tr>
                      <tr>
                        <td>03</td>
                        <td>Project C</td>
                        <td>2024-01-10</td>
                        <td>4 months</td>
                        <td>
                          Building a mobile app for fitness tracking and workout
                          plans.
                        </td>
                      </tr>
                      <tr>
                        <td>04</td>
                        <td>Project D</td>
                        <td>2023-12-05</td>
                        <td>5 months</td>
                        <td>
                          Developing a CRM system for sales and customer
                          management.
                        </td>
                      </tr>
                      <tr>
                        <td>05</td>
                        <td>Project E</td>
                        <td>2023-11-20</td>
                        <td>7 months</td>
                        <td>
                          Designing an AI-powered chatbot for customer support
                          automation.
                        </td>
                      </tr>
                      <tr>
                        <td>06</td>
                        <td>Project F</td>
                        <td>2023-10-15</td>
                        <td>8 months</td>
                        <td>
                          Building a cloud-based file storage and sharing
                          platform.
                        </td>
                      </tr>
                      <tr>
                        <td>07</td>
                        <td>Project G</td>
                        <td>2023-09-10</td>
                        <td>6 months</td>
                        <td>
                          Developing an advanced analytics dashboard for
                          business insights.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={styles.daily_report_chart_container}>
                <div className={styles.daily_report_chart_card}>
                  <p className={styles.text}>Daily Report Progress</p>
                  <DailyProgressGraph />
                </div>
                <div className={styles.monthly_report_chart_card}>
                  <p className={styles.text}>Monthly Report Progress</p>
                  <MonthlyProgressGraph />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className={styles.popup_overlay}>
          <div className={styles.popup}>
            <div className={styles.report_form}>
              {/* Project Name Dropdown */}
              <div className={styles.form_input}>
                <label htmlFor="projectname">Project Name :</label>
                <select id="projectname">
                  <option value="">Select Project</option>
                  <option value="project1">Project 1</option>
                  <option value="project2">Project 2</option>
                </select>
              </div>

              {/* Enter Duration Input */}
              <div className={styles.form_input}>
                <label htmlFor="duration">Enter Duration :</label>
                <input type="text" id="duration" placeholder="" />
              </div>

              {/* Description Textarea */}
              <div className={styles.form_input}>
                <label htmlFor="description">Description :</label>
                <textarea id="description"></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className={styles.buttonWrapper}>
              <button type="button" onClick={onClickSubmitReview}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Empdailyreport;
