import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

const dailyData = [
  { day: "Mon", progress: 80 },
  { day: "Tue", progress: 65 },
  { day: "Wed", progress: 90 },
  { day: "Thu", progress: 75 },
  { day: "Fri", progress: 85 },
  { day: "Sat", progress: 60 },
  { day: "Sun", progress: 95 },
];

const DailyProgressGraph = () => {
  return (
    <div style={{ width: "100%", height: "350px" }}>
      {/* <h2>Daily Report Progress</h2> */} 
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dailyData} margin={{ top: 10, right: 15, left: -20, bottom: -5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="progress" fill="#455A64" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyProgressGraph;
