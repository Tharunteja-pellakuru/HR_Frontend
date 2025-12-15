import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const EmpWorkingHrsBarGraph = () => {
    const [workingHours, setWorkingHours] = useState({});
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth(); // 0-based index (Jan = 0)
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Initialize working hours for each day if not already stored
        const storedHours = JSON.parse(localStorage.getItem("workingHours")) || {};
        let initialHours = {};
        for (let day = 1; day <= daysInMonth; day++) {
            initialHours[day] = storedHours[day] || Math.floor(Math.random() * 10) + 4; // Random demo data
        }
        setWorkingHours(initialHours);
    }, []);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                const today = new Date().getDate();
                setWorkingHours((prev) => {
                    const newHours = { ...prev, [today]: (prev[today] || 0) + 1 };
                    localStorage.setItem("workingHours", JSON.stringify(newHours));
                    return newHours;
                });
            }, 3600000); // Increases by 1 hour every hour
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleTimeOut = () => {
        setIsRunning(false);
    };

    const today = new Date();
    const month = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();
    const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();

    const series = [
        {
            name: "Working Hours",
            data: Array.from({ length: daysInMonth }, (_, i) => workingHours[i + 1] || 0)
        }
    ];

    const maxWorkingHours = Math.max(...Object.values(workingHours), 10); // Ensure dynamic max limit

    // Calculate step size dynamically
    const stepSize = maxWorkingHours > 10 ? 2 : 1; // Auto-adjusts the interval
    
    const options = {
        chart: { id: "attendance-bar" },
        xaxis: {
            categories: Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`), // Days of the month
            title: { text: "Days of the Month" },
            labels: { style: { fontSize: "12px" } }
        },
        yaxis: {
            title: { text: "Working Hours" },
            min: 0,
            max: maxWorkingHours, // Auto-adjust based on employee hours
            tickAmount: Math.ceil(maxWorkingHours / stepSize), // Ensure correct number of ticks
            labels: {
                formatter: (value) => Math.round(value) // 🔥 Fix: Ensure proper interval display
            }
        },
        plotOptions: {
            bar: {
                distributed: false,
                colors: {
                    ranges: [
                        { from: 0, to: 7, color: "#FF4444" }, // Red for <8 hours
                        { from: 8, to: 24, color: "#00C49F" } // Green for >=8 hours
                    ]
                }
            }
        },
        tooltip: { enabled: true }
    };
    
    

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>{`Employee Working Hours - ${month} ${year}`}</h2>
            <Chart type="bar" height={330} width={820} options={options} series={series} />
            {/* <button onClick={handleTimeOut} style={{ display: "block", margin: "20px auto", padding: "10px 20px", fontSize: "16px" }}>
                Time Out
            </button> */}
        </div>
    );
};

export default EmpWorkingHrsBarGraph;
