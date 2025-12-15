import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

// 👇 Attendance Data for All Employees by Month
const AttendenceByMonth = {
  January: [
    { name: "Shahiti", progress: 7 },
    { name: "Mouli", progress: 6 },
    { name: "shyam", progress: 8 },
    { name: "Surya", progress: 9 },
    { name: "Rani", progress: 5 },
    { name: "Srikanth", progress: 6 },
    { name: "Kunal", progress: 8 },
    { name: "Soumya", progress: 7 },
    { name: "Prashant", progress: 8 },
    { name: "XYZ2", progress: 6 },
    { name: "Vishal", progress: 7 },
    { name: "Arshita", progress: 9 },
    { name: "Jagadeesh", progress: 5 },
    { name: "Sliva", progress: 6 },
    { name: "Minal", progress: 10 },
    { name: "Sandeep", progress: 7 },
    { name: "Lokesh", progress: 5 },
    { name: "pradeep", progress: 8 }
  ],
  February: [
    { name: "Shahiti", progress: 9 },
    { name: "Mouli", progress: 5 },
    { name: "shyam", progress: 8 },
    { name: "Surya", progress: 7 },
    { name: "Rani", progress: 6 },
    { name: "Srikanth", progress: 7 },
    { name: "Kunal", progress: 9 },
    { name: "Soumya", progress: 6 },
    { name: "Prashant", progress: 10 },
    { name: "XYZ2", progress: 6 },
    { name: "Vishal", progress: 9 },
    { name: "Arshita", progress: 8 },
    { name: "Jagadeesh", progress: 6 },
    { name: "Sliva", progress: 7 },
    { name: "Minal", progress: 10 },
    { name: "Sandeep", progress: 8 },
    { name: "Lokesh", progress: 6 },
    { name: "pradeep", progress: 7 }
  ],
  March: [
    { name: "Shahiti", progress: 10 },
    { name: "Mouli", progress: 12 },
    { name: "shyam", progress: 9 },
    { name: "Surya", progress: 6 },
    { name: "Rani", progress: 5 },
    { name: "Srikanth", progress: 8 },
    { name: "Kunal", progress: 9 },
    { name: "Soumya", progress: 7 },
    { name: "Prashant", progress: 6 },
    { name: "XYZ2", progress: 5 },
    { name: "Vishal", progress: 10 },
    { name: "Arshita", progress: 9 },
    { name: "Jagadeesh", progress: 8 },
    { name: "Sliva", progress: 7 },
    { name: "Minal", progress: 10 },
    { name: "Sandeep", progress: 8 },
    { name: "Lokesh", progress: 7 },
    { name: "pradeep", progress: 9 }
  ]
};

const EmpDailyAttendenceGraph = () => {
  const employeeNames = [
    "Shahiti", "Mouli","shyam", "Surya", "Rani", "Srikanth",
    "Kunal", "Soumya", "Prashant", "XYZ2", "Vishal", "Arshita", "Jagadeesh", "Sliva", "Minal",
    "Sandeep", "Lokesh", "pradeep"
  ];

  const [selectedMonth, setSelectedMonth] = useState("February");
  const employeeData = AttendenceByMonth[selectedMonth];

  const series = [
    {
      name: "Working Hours",
      data: employeeNames.map(name => {
        const emp = employeeData.find(e => e.name === name);
        return emp ? emp.progress : 0;
      })
    }
  ];

  const maxWorkingHours = Math.max(...series[0].data, 10);
  const stepSize = maxWorkingHours > 10 ? 2 : 1;

  const options = {
    chart: { id: "attendance-bar" },
    xaxis: {
      categories: employeeNames,
      title: { text: "Employees" },
      labels: {
        rotate: -45,
        style: { fontSize: "12px" }
      }
    },
    yaxis: {
      title: { text: "Working Hours" },
      min: 0,
      max: maxWorkingHours,
      tickAmount: Math.ceil(maxWorkingHours / stepSize),
      labels: {
        formatter: value => Math.round(value)
      }
    },
    plotOptions: {
      bar: {
        distributed: true,
        colors: {
          ranges: [
            { from: 0, to: 7, color: "#FF4444" },
            { from: 8, to: 24, color: "#00C49F" }
          ]
        }
      }
    },
    tooltip: { enabled: true }
  };

  const today = new Date();
  const monthLabel = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>{`Employees Attendance Sheet - ${selectedMonth} ${year}`}</h2>
      <div style={{ textAlign: "right", marginBottom: "0px" , paddingRight : "60px"}}>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{
            padding: "8px 12px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            backgroundColor: "#fff",
            color: "#333",
            cursor: "pointer",
            outline: "none",
            transition: "border-color 0.2s ease",
          }}
        >
          {Object.keys(AttendenceByMonth).map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <Chart type="bar" height={330} options={options} series={series} style={{ width: "100%" }} />
    </div>
  );
};

export default EmpDailyAttendenceGraph;
