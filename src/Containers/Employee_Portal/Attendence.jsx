import React, { useState } from "react";
import Common from "../../Components/Common/common";
import styles from "../../Styles/attendence.module.css";
import SidebarMenu from "../../Components/Common/Dashboard";
import ReactApexChart from "react-apexcharts";

const Attendence = () => {
  const [state, setState] = React.useState({
    series: [
      {
        name: "On-Time Logins",
        data: [5, 6, 8, 10, 7, 9, 12, 11, 13, 6, 8, 10], // Example data for on-time logins
      },
      {
        name: "Late Logins",
        data: [2, 3, 4, 1, 3, 2, 5, 6, 3, 2, 1, 3], // Example data for late logins
      },
      {
        name: "Absent",
        data: [1, 2, 1, 3, 2, 1, 0, 2, 1, 3, 2, 1], // Example data for absents
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: {
        width: [5, 5, 5], // Make all lines straight and solid
        curve: "straight",
      },
      // title: { text: "Employee Attendance Overview", align: "left" },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        },
      },
      markers: { size: 4, hover: { sizeOffset: 6 } },
      xaxis: {
        categories: [
          "01 Jan",
          "02 Jan",
          "03 Jan",
          "04 Jan",
          "05 Jan",
          "06 Jan",
          "07 Jan",
          "08 Jan",
          "09 Jan",
          "10 Jan",
          "11 Jan",
          "12 Jan",
        ],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " Employees";
          },
        },
      },
      grid: { borderColor: "#f1f1f1" },
    },
  });
  return (
    <div>
      <div className={styles.emp_att_wrapper}>
        {/* <Common />
            <div className={styles.attendanceContainer}>
                <p className={styles.attendanceMessage}>
                    Welcome to the Attendance Section. Here you can track your attendance records.
                </p>
            </div> */}
        
        <SidebarMenu />
        <div className={styles.emp_att_main}>
          <Common />
          <div className={styles.emp_content_section}>
            <p>Employee Attendance Trends</p>
            <div>
              <div id="chart">
                <ReactApexChart
                  options={state.options}
                  series={state.series}
                  type="line"
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendence;
