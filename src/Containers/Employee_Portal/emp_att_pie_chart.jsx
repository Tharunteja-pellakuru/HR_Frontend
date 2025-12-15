import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const AttendanceChart = ({ present, late, absent }) => {
  const total = present + late + absent;

  const data = [
    { name: "on time", value: present, color: "#00C49F" }, // Green
    { name: "late attendence", value: late, color: "#FF4444" }, // Red
    { name: "absent", value: absent, color: "#FFBB28" } // Yellow
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      {/* ✅ Left Side: Attendance Legend with Numbers in Order */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Legend Labels */}
        <div style={{ textAlign: "left" }}>
          {data.map((entry) => (
            <div key={entry.name} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <div style={{
                width: "12px",
                height: "12px",
                backgroundColor: entry.color,
                borderRadius: "50%",
                marginRight: "10px"
              }}></div>
              <span style={{ fontSize: "16px", fontWeight: "500" }}>{entry.name}</span>
              &nbsp;   &nbsp;   &nbsp;  
            </div>
          ))}
        </div>

        {/* Numbers in Order (Vertically) */}
        <div style={{ textAlign: "right", fontSize: "16px", fontWeight: "bold", display: "flex", flexDirection: "column" }}>
          {data.map((entry) => (
            <div key={entry.name} style={{ marginBottom: "8px" }}>
              {entry.value}
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Right Side: Small Pie Chart */}
      <div style={{ position: "relative", width: "120px", height: "120px" }}>
        <PieChart width={120} height={120}>
          <Pie
            data={data}
            cx="50%" 
            cy="50%" 
            innerRadius={35}  // ✅ Reduced size
            outerRadius={50}  // ✅ Adjusted size
            fill="#8884d8"
            paddingAngle={1}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>

        {/* ✅ Total Count in Center */}
        {/* <h2 
          style={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            fontSize: "14px", 
            fontWeight: "bold",
            color: "#333"
          }}
        >
          {total}
        </h2> */}
      </div>
    </div>
  );
};

export default AttendanceChart;
