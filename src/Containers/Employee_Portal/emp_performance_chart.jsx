import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const PerformanceChart = ({ present, late, absent }) => {
  const total = present + late + absent;

  const data = [
    { name: "Completed Tasks", value: 24, color: "#FFBB28" }, // Blue  #FF4444
{ name: "Pending Tasks", value: 6, color: "#FF4444" }, // Orange  
{ name: "Late Submissions", value: 2, color: "#C0392B" }, // Dark Red  

    { name: "Performance Score", value: 85, color: "#4B0082" }, // Indigo
    { name: "Efficiency Growth", value: 12, color: "#00C49F" }, // Gold
    { name: "Work Hours Logged", value: 160, color: "#0088FE" } // Blue
  ];


  const data2 = [
    { name: "Completed Tasks", value: 24, color: "#00C49F" }, // Green
    { name: "Pending Tasks", value: 6, color: "#FFBB28" }, // Yellow
    { name: "Late Submissions", value: 2, color: "#FF4444" } // Red
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      {/* ✅ Left Side: Attendance Legend with Numbers in Order */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {data.map((entry, index) => (
          <div key={entry.name} style={{ display: "flex", alignItems: "center" }}>
            {/* Color Indicator */}
            <div style={{
              width: "12px",
              height: "12px",
              backgroundColor: entry.color,
              borderRadius: "50%",
              marginRight: "10px"
            }}></div>
            {/* Label */}
            <span style={{ fontSize: "14px", fontWeight: "500" }}>{entry.name}:</span>
            {/* Value */}
            &nbsp;  &nbsp;  &nbsp; 
            <span style={{ fontSize: "14px", fontWeight: "bold", marginLeft: "5px" }}>{entry.value}</span>
            &nbsp;   
          </div>
        ))}
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

export default PerformanceChart;
