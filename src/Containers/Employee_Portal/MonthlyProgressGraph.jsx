import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

const monthlyData = [
  { month: "Jan", progress: 78 },
  { month: "Feb", progress: 82 },
  { month: "Mar", progress: 95 },
  { month: "Apr", progress: 88 },
  { month: "May", progress: 76 },
  { month: "Jun", progress: 85 },
  { month: "Jul", progress: 92 },
  { month: "Aug", progress: 79 },
  { month: "Sep", progress: 83 },
  { month: "Oct", progress: 85 },
  { month: "Nov", progress: 75 },
  { month: "Dec", progress: 90 },
];

const MonthlyProgressGraph = () => {
  return (
    <div style={{ width: "100%", height: 350 }}>
      {/* <h2>Monthly Report Progress</h2> */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: -5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="progress" fill="#2196f3" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyProgressGraph;
