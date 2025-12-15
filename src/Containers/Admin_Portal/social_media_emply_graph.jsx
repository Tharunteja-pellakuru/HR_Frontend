import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Cell
} from "recharts";

// Employee progress data by month
const progressByMonth = {
    January: [
      { name: "Shahiti", progress: 70 },
      { name: "Mouli", progress: 55 },
      { name: "surya", progress: 80 },
      { name: "Rani", progress: 65 },
      { name: "srikanth", progress: 75 },
      { name: "kunal", progress: 50 },
      { name: "soumya", progress: 85 },
      { name: "xyz1", progress: 60 },
      { name: "xyz2", progress: 78 },
    ],
    February: [
      { name: "Shahiti", progress: 80 },
      { name: "Mouli", progress: 65 },
      { name: "surya", progress: 90 },
      { name: "Rani", progress: 75 },
      { name: "srikanth", progress: 85 },
      { name: "kunal", progress: 60 },
      { name: "soumya", progress: 95 },
      { name: "xyz1", progress: 70 },
      { name: "xyz2", progress: 88 },
    ],
    March: [
      { name: "Shahiti", progress: 85 },
      { name: "Mouli", progress: 70 },
      { name: "surya", progress: 95 },
      { name: "Rani", progress: 80 },
      { name: "srikanth", progress: 90 },
      { name: "kunal", progress: 65 },
      { name: "soumya", progress: 98 },
      { name: "xyz1", progress: 75 },
      { name: "xyz2", progress: 92 },
    ]
  };
  

// Distinct colors
const barColors = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
  "#9966FF", "#FF9F40", "#00C49F", "#FF8042", "#A28BE0"
];

const SocialMediaEmpProgressGraph = () => {
  const [selectedMonth, setSelectedMonth] = useState("February");
  const employeeData = progressByMonth[selectedMonth];

  return (
    <div style={{ width: "120%", height: "400px", padding: "10px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
        Social Media Employees Progress
      </h2>
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <select
          id="month-select"
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
          onMouseOver={(e) => (e.target.style.borderColor = "#888")}
          onMouseOut={(e) => (e.target.style.borderColor = "#ccc")}
          onFocus={(e) => {
            e.target.style.borderColor = "#36A2EB";
            e.target.style.boxShadow = "0 0 0 2px rgba(54, 162, 235, 0.2)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#ccc";
            e.target.style.boxShadow = "none";
          }}
        >
          {Object.keys(progressByMonth).map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={employeeData}
          margin={{ top: 10, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            style={{ fontSize: "11px" }}
            dataKey="name"
            angle={-20}
            textAnchor="end"
            interval={0}
            dy={5}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="progress" barSize={40}>
            {employeeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SocialMediaEmpProgressGraph;
