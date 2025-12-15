import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EmployeeAuth from "../../Hooks/useAuth";
import SidebarMenu from "../../Components/Common/Dashboard";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
import ReactApexChart from "react-apexcharts"; // For Gauge/RadialBar
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { FaCalendarTimes, FaUserTimes } from "react-icons/fa"; // Icons for cards

const EmployeeDashboard = () => {
  const { empId } = useParams();
  const [Emply, SetEmply] = useState(null);
  const { fetchemployeeDetails } = EmployeeAuth();
  const [currentTime, setcurrentTime] = useState("");
  const [seconds, setSeconds] = useState(0);

  // --- Clock Logic (retained) ---
  useEffect(() => {
    const updateTime = () => {
      const time = new Date();
      /* const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }); */
      // setcurrentTime(formattedTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- Timer Logic (retained simlified for display) ---
  // --- Timer Logic ---
  useEffect(() => {
     const savedTime = localStorage.getItem("timer_seconds");
     if (savedTime) setSeconds(parseInt(savedTime, 10));

     const interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
     }, 1000);
     return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const min = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${hours} hrs : ${min} min : ${secs} sec`;
  };


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchemployeeDetails(empId);
      if (response?.employee) {
        SetEmply(response.employee);
      }
    };
    fetchData();
  }, [empId]);

  // --- Chart Data configuration ---

  // Gauge Charts (RadialBar)
  const attendanceRateSeries = [76.27];
  const avgHoursSeries = [85]; // example 6.01/7 approx

  const gaugeOptions = (label, color) => ({
    chart: { type: "radialBar", height: 200 },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: { background: "#e7e7e7", strokeWidth: "97%", margin: 5 },
        dataLabels: {
          name: { show: true, fontSize: "14px", color: "#888", offsetY: 20 },
          value: {
            offsetY: -20,
            fontSize: "22px",
            fontWeight: "bold",
            color: "#111",
            formatter: function (val) {
                if(label.includes("Hours")) return "6.01 hrs";
                return val + "%";
            }
          },
        },
      },
    },
    fill: { colors: [color] },
    labels: [label],
    stroke: { lineCap: "round" },
  });

  // Bar Chart Data (Simulating days 1-31)
  const filteredAttendanceData = Array.from({ length: 31 }, (_, i) => {
     const day = i + 1;
     // Exclude specific "weekend" days to match pattern
     const weekends = [4,5, 11,12, 18,19, 25,26];
     if(weekends.includes(day)) return null;

     // Hardcoded-ish values to resemble image distribution
     let hours = 8;
     // Pattern logic
     if([3,9,28].includes(day)) hours = 2; // Red bars
     else if([1, 21, 30].includes(day)) hours = 5; // Yellow bars
     else if([7, 17].includes(day)) hours = 6;
     else if([2, 8, 14, 15].includes(day)) hours = 7;
     
     return { day, hours };
  }).filter(Boolean);


  const getBarColor = (hours) => {
      if(hours <= 3) return "#F5707A"; // Reddish
      if(hours <= 5) return "#FFC107"; // Yellow
      return "#73BF44"; // Green
  }

const Needle = ({ value, cx, cy, color }) => {
  // Conversions for chart size assumptions (ResponsiveContainer makes this tricky without fixed pixel values, 
  // but Recharts Pie passes cx/cy as numbers if we use the customized Cell/Label, but as '50%' string here.
  // We need pixel awareness or percentage approximation.
  // For safety and "exactness", hardcoded % based geometric path is safer if viewing strictly in center.
  
  // Actually, standard SVG rotation is easier.
  const percentage = value / 100;
  const ang = 180 * (1 - percentage); // 0% = 180deg (left), 100% = 0deg (right)? No. 
  // Recharts: 180 is left. 0 is right.
  // We want 0% at left (180deg) and 100% at right (0deg).
  // So Angle = 180 - (180 * percentage).
  // at 0%, 180. at 100%, 0.
  // at 50%, 90 (top). Correct.

  const length = 80; // approximate needle length relative to container
  
  // We cannot easily get 'pixel' cx/cy from '50%' string inside this isolated component without chart context.
  // HACK: Use a fixed SVG overlay in the statCard instead of inside PieChart if we want pure CSS control, 
  // -OR- use specific Recharts Customization.
  
  // Better approach: Since 'statCard' is used, and ResponsiveContainer is widely variable, 
  // let's assume the chart is roughly square content.
  
  // Let's use a simpler approach: The needle is just a line rotated from the center.
  // We can render a pure SVG needle with `transform`.
  
  const rotation = -90 + (180 * percentage); // -90 is left? No.
  // CSS Rotation: 0 is up. 
  // We want start (0%) to point left (-90deg).
  // End (100%) to point right (90deg).
  // So -90 + (180 * val/100).
  
  return (
    <g>
       {/* Circle Pivot */}
       <circle cx="50%" cy="70%" r="5" fill={color} stroke="none" />
       {/* Needle Line - using absolute coordinates assuming 200x200 viewBox effective space? No. 
           We can use 'transform' on a path defined at center.
           But 'cx="50%"' works for circle, not for path coordinates easily.
           
           Wait, there is a cleaner way using Recharts composed elements.
           Actually, simply overlaying a div needle is easiest for "perfect" alignment if chart geometry is known.
           
           Let's stick to the inline Needle component but use Context if available, OR simple hardcoded needle component assumes standard size.
           
           Let's Try: Using a "Sector" (Pie Slice) as needle? Too thick.
       */}
    </g>
  );
};
// Scratch that. I will inject the needle drawing logic directly into the new 'GaugeChart' structure using standard Recharts composition if I can get usage of props.
// Changing strategy slightly: I will put the needle as a simple absolute positioned div on top of the chart with rotation. It is MUCH easier to style "Exactly" like a needle than plotting SVG paths without distinct dimensions.


  return (
    <div className={styles.emp_dashboard_wrapper}>
      {/* Sidebar - Already Refactored */}
      <SidebarMenu />

      <div className={styles.emp_dashboard_main}>
        {/* Header - Already Refactored */}
        <HeaderDashboard />

        <div className={styles.dashboard_content}>
          <h2 className={styles.pageTitle}>Dashboard</h2>

          {/* Top Row: Upcoming Event & Timer */}
          <div className={styles.topRow}>
            <div className={styles.eventCard}>
              <span className={styles.eventLabel}>Upcoming Event : </span>
              <span className={styles.eventValue}>xxxx Birthday</span>
            </div>
            <div className={styles.timerCard}>
             <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M12.5 0C10.8585 0 9.23303 0.323322 7.71646 0.951506C6.19989 1.57969 4.8219 2.50043 3.66117 3.66117C1.31696 6.00537 0 9.18479 0 12.5C0 15.8152 1.31696 18.9946 3.66117 21.3388C4.8219 22.4996 6.19989 23.4203 7.71646 24.0485C9.23303 24.6767 10.8585 25 12.5 25C15.8152 25 18.9946 23.683 21.3388 21.3388C23.683 18.9946 25 15.8152 25 12.5C25 10.8585 24.6767 9.23303 24.0485 7.71646C23.4203 6.19989 22.4996 4.8219 21.3388 3.66117C20.1781 2.50043 18.8001 1.57969 17.2835 0.951506C15.767 0.323322 14.1415 0 12.5 0ZM17.75 17.75L11.25 13.75V6.25H13.125V12.75L18.75 16.125L17.75 17.75Z" fill="black"/>
             </svg>
             {formatTime(seconds || 23580)}
            </div>
          </div>

          {/* Month Dashboard Section Wrapper */}
          <div className={styles.monthDashboard}>
              <div className={styles.sectionHeader}>
                Month : <span className={styles.monthName}>January</span>
              </div>

              {/* Stats Cards Row */}
              <div className={styles.statsGrid}>
                {/* Card 1: Attendance Rate */}
                {/* Card 1: Attendance Rate */}
                <div className={styles.statCard} style={{position: 'relative', overflow: 'hidden', margin: '0', padding: '20px 8px' }}>
                  <div style={{ width: '100%', height: '140px', position: 'relative', marginTop: '-15px' }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={[{ value: 76.27 }, { value: 100 - 76.27 }]}
                          dataKey="value"
                          cx="50%"
                          cy="80%"
                          startAngle={180}
                          endAngle={0}
                          innerRadius="50%"
                          outerRadius="125%"
                          paddingAngle={0}
                          stroke="none"
                        >
                          <Cell fill="#008CFB" />
                          <Cell fill="#E7E7E7" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    
                    {/* Needle & Pivot */}
                    <div style={{
                        position: 'absolute',
                        bottom: '20%', /* Matches cy="80%" */
                        left: '50%',
                        width: '0',
                        height: '0',
                    }}>
                        {/* Needle Body */}
                        <div style={{
                            width: '85px', /* Needle Length */
                            height: '6px', /* Thickness at base */
                            background: '#202020',
                            position: 'absolute',
                            top: '-3px', /* Center vertically (half of height) */
                            left: '0',
                            transformOrigin: 'left center',
                            transform: `rotate(${ -180 + (180 * 76.27 / 100) }deg)`,
                            clipPath: 'polygon(0 0, 100% 50%, 0 100%)', /* Triangle pointing right */
                            zIndex: 5
                        }}></div>
                        {/* Pivot Circle */}
                        <div style={{
                            width: '12px',
                            height: '12px',
                            background: '#202020',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '-6px',
                            left: '-6px',
                            zIndex: 6
                        }}></div>
                    </div>

                    {/* 0/100 Labels */}
                    <div style={{ position: 'absolute', bottom: '5px', left: '26%', fontSize: '12px', fontWeight: 'bold', color: '#909090' }}>0</div>
                    <div style={{ position: 'absolute', bottom: '5px', right: '26%', fontSize: '12px', fontWeight: 'bold', color: '#909090' }}>100</div>
                  </div>

                  {/* Text */}
                  <div style={{ marginTop: '-20px', width: '100%' }}>
                      <div style={{ 
                          color: '#202020',
                           zIndex: 10,
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontWeight: '400',
                          lineHeight: 'normal',
                           textAlign: 'center'
                      }}>76.27 %</div>
                      <div style={{ 
                          color: '#202020',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: '600',
                          marginTop: '10px', 
                          lineHeight: 'normal',
                          textAlign: 'start',
                          paddingLeft: '25%'
                      }}>Attendance Rate</div>
                  </div>
                </div>

                {/* Card 2: Avg Hours */}
                {/* Card 2: Avg Hours */}
                <div className={styles.statCard} style={{position: 'relative', overflow: 'hidden', margin: '0', padding: '20px 8px' }}>
                  <div style={{ width: '100%', height: '140px', position: 'relative', marginTop: '-15px' }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={[{ value: 6.01 }, { value: 7 - 6.01 }]}
                          dataKey="value"
                          cx="50%"
                          cy="80%"
                          startAngle={180}
                          endAngle={0}
                          innerRadius="50%"
                          outerRadius="125%"
                          paddingAngle={0}
                          stroke="none"
                        >
                          <Cell fill="#008C75" />
                          <Cell fill="#E7E7E7" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    
                    {/* Needle & Pivot */}
                    <div style={{
                        position: 'absolute',
                        bottom: '20%', /* Matches cy="80%" */
                        left: '50%',
                        width: '0',
                        height: '0',
                    }}>
                        {/* Needle Body */}
                        <div style={{
                            width: '85px', /* Needle Length */
                            height: '6px', /* Thickness at base */
                            background: '#202020',
                            position: 'absolute',
                            top: '-3px', /* Center vertically (half of height) */
                            left: '0',
                            transformOrigin: 'left center',
                            transform: `rotate(${ -180 + (180 * 6.01 / 7) }deg)`,
                            clipPath: 'polygon(0 0, 100% 50%, 0 100%)', /* Triangle pointing right */
                            zIndex: 5
                        }}></div>
                        {/* Pivot Circle */}
                        <div style={{
                            width: '12px',
                            height: '12px',
                            background: '#202020',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '-6px',
                            left: '-6px',
                            zIndex: 6
                        }}></div>
                    </div>

                    {/* 0/7 Labels */}
                    <div style={{ position: 'absolute', bottom: '5px', left: '26%', fontSize: '12px', fontWeight: 'bold', color: '#909090' }}>0</div>
                    <div style={{ position: 'absolute', bottom: '5px', right: '26%', fontSize: '12px', fontWeight: 'bold', color: '#909090' }}>7</div>
                  </div>

                  {/* Text */}
                  <div style={{ marginTop: '-20px', width: '100%' }}>
                      <div style={{ 
                          color: '#202020',
                           zIndex: 10,
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontWeight: '400',
                          lineHeight: 'normal',
                           textAlign: 'center'
                      }}>6.01 hrs</div>
                      <div style={{ 
                          color: '#202020',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: '600',
                          marginTop: '10px', 
                          lineHeight: 'normal',
                          textAlign: 'start',
                          paddingLeft: '25%'
                      }}>Avg. Hours Worked</div>
                  </div>
                </div>

                {/* Card 3: Unapproved Leaves */}
                <div className={styles.statCard} style={{ 
                    position: 'relative', overflow: 'hidden', margin: '0', padding: '20px 20px',
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' 
                }}>
                  <div style={{ marginBottom: '15px', backgroundColor: 'rgba(233, 180, 0, 0.30)', borderRadius: '5px', width: '71px', height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                      <path d="M28.55 34.5L35.5 27.6L33.4 25.5L28.55 30.25L26.6 28.3L24.5 30.45L28.55 34.5ZM6 12H30V8H6V12ZM30 40C27.2333 40 24.8753 39.0247 22.926 37.074C20.9767 35.1233 20.0013 32.7653 20 30C19.9987 27.2347 20.974 24.8767 22.926 22.926C24.878 20.9753 27.236 20 30 20C32.764 20 35.1227 20.9753 37.076 22.926C39.0293 24.8767 40.004 27.2347 40 30C39.996 32.7653 39.0207 35.124 37.074 37.076C35.1273 39.028 32.7693 40.0027 30 40ZM0 38V4C0 2.9 0.392 1.95867 1.176 1.176C1.96 0.393333 2.90133 0.00133333 4 0H32C33.1 0 34.042 0.392 34.826 1.176C35.61 1.96 36.0013 2.90133 36 4V17.35C35.3667 17.05 34.7167 16.8 34.05 16.6C33.3833 16.4 32.7 16.25 32 16.15V4H4V32.1H16.15C16.3167 33.1333 16.5753 34.1167 16.926 35.05C17.2767 35.9833 17.7347 36.8667 18.3 37.7L18 38L15 35L12 38L9 35L6 38L3 35L0 38ZM6 28H16.15C16.25 27.3 16.4 26.6167 16.6 25.95C16.8 25.2833 17.05 24.6333 17.35 24H6V28ZM6 20H20.2C21.4667 18.7667 22.942 17.7913 24.626 17.074C26.31 16.3567 28.1013 15.9987 30 16H6V20Z" fill="#E9B400"/>
                      <circle cx="29.6689" cy="30.1656" r="10" fill="#E9B400"/>
                      <rect width="2.53047" height="15.5861" rx="1.26523" transform="matrix(0.677695 -0.735343 0.627216 0.778846 23.644 25.0077)" fill="white"/>
                      <rect width="2.55299" height="15.4489" rx="1.27649" transform="matrix(0.63296 0.774185 -0.672139 0.740425 34.0283 23.147)" fill="white"/>
                    </svg>
                  </div>
                  <div className={styles.statInfo} style={{ textAlign: 'left', marginLeft: '0', width: '100%' }}>
                    <span style={{ 
                        display: 'block',
                        fontSize: '14px',
                        color: '#202020',
                        fontWeight: '700',
                        fontFamily: 'Inter',
                        marginBottom: '8px'
                    }}>Unapproved Leaves</span>
                    <span style={{ 
                        display: 'block',
                        fontSize: '32px',
                        fontWeight: '700',
                        color: '#202020',
                        fontFamily: 'Inter',
                        lineHeight: '1'
                    }}>05</span>
                  </div>
                </div>

                {/* Card 4: Absent Days */}
                <div className={styles.statCard} style={{ 
                    position: 'relative', overflow: 'hidden', margin: '0', padding: '20px 20px',
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' 
                }}>
                  <div style={{ marginBottom: '15px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="71" height="66" viewBox="0 0 71 66" fill="none">
                      <rect width="71" height="66" rx="5" fill="#FA4548" fillOpacity="0.3"/>
                      <path d="M33.2179 41.1716C31.8206 41.1545 30.4588 40.6567 29.3041 39.7407C28.1494 38.8248 27.2534 37.5318 26.7288 36.0244C26.2043 34.5171 26.0746 32.8628 26.3562 31.2699C26.6378 29.677 27.3181 28.2167 28.3113 27.0727C29.3046 25.9288 30.5665 25.1525 31.9381 24.8415C33.3097 24.5304 34.7297 24.6986 36.0193 25.3249C37.309 25.9511 38.4106 27.0074 39.1854 28.3607C39.9603 29.7141 40.3738 31.304 40.3739 32.9303C40.3608 35.1263 39.6002 37.2268 38.2589 38.7715C36.9176 40.3163 35.1049 41.1793 33.2179 41.1716ZM33.2179 27.5806C32.312 27.5977 31.4307 27.9259 30.6847 28.524C29.9386 29.1222 29.3611 29.9635 29.0246 30.9424C28.688 31.9213 28.6076 32.9941 28.7933 34.0261C28.979 35.058 29.4225 36.0031 30.0683 36.7426C30.714 37.4821 31.5331 37.9831 32.4227 38.1826C33.3123 38.3821 34.2327 38.2712 35.0683 37.8639C35.9039 37.4565 36.6175 36.7709 37.1194 35.8932C37.6212 35.0154 37.889 33.9846 37.8892 32.9303C37.8761 31.5011 37.3773 30.1361 36.502 29.1337C35.6267 28.1313 34.4459 27.5729 33.2179 27.5806Z" fill="#D5090D"/>
                      <path d="M33.2179 41.1716C31.8206 41.1545 30.4589 40.6566 29.3042 39.7407C28.1495 38.8248 27.2534 37.5317 26.7289 36.0244C26.2043 34.517 26.0747 32.8628 26.3563 31.2699C26.6379 29.6769 27.3181 28.2166 28.3114 27.0727C29.3047 25.9288 30.5665 25.1524 31.9381 24.8414C33.3097 24.5304 34.7297 24.6986 36.0194 25.3248C37.309 25.951 38.4106 27.0073 39.1855 28.3607C39.9604 29.714 40.3739 31.3039 40.3739 32.9302C40.3608 35.1263 39.6003 37.2267 38.259 38.7715C36.9177 40.3162 35.1049 41.1793 33.2179 41.1716ZM33.2179 27.5805C32.3121 27.5976 31.4308 27.9259 30.6847 28.524C29.9387 29.1221 29.3611 29.9635 29.0246 30.9424C28.6881 31.9213 28.6076 32.9941 28.7933 34.026C28.979 35.058 29.4226 36.0031 30.0683 36.7426C30.7141 37.4821 31.5332 37.983 32.4227 38.1825C33.3123 38.382 34.2327 38.2711 35.0683 37.8638C35.904 37.4565 36.6175 36.7709 37.1194 35.8931C37.6213 35.0153 37.8891 33.9845 37.8892 32.9302C37.8761 31.5011 37.3774 30.1361 36.502 29.1336C35.6267 28.1312 34.446 27.5728 33.2179 27.5805ZM37.5538 43.109C32.0433 41.9931 26.3705 43.0088 21.403 46.0007C21.0504 46.2286 20.7584 46.5649 20.559 46.9729C20.3596 47.3809 20.2605 47.8449 20.2725 48.3141V53.4613C20.2725 53.8448 20.4034 54.2126 20.6364 54.4837C20.8693 54.7549 21.1853 54.9072 21.5148 54.9072C21.8443 54.9072 22.1603 54.7549 22.3933 54.4837C22.6263 54.2126 22.7572 53.8448 22.7572 53.4613V48.5021C27.3635 45.8122 32.6017 44.9588 37.6656 46.073L37.5538 43.109Z" fill="#D5090D"/>
                      <path d="M33.4164 41.1492C34.8137 41.1321 36.1754 40.6342 37.3301 39.7183C38.4848 38.8024 39.3808 37.5093 39.9054 36.002C40.43 34.4947 40.5596 32.8404 40.278 31.2475C39.9964 29.6546 39.3162 28.1942 38.3229 27.0503C37.3296 25.9064 36.0678 25.13 34.6962 24.819C33.3245 24.508 31.9046 24.6762 30.6149 25.3024C29.3252 25.9287 28.2237 26.9849 27.4488 28.3383C26.6739 29.6916 26.2604 31.2815 26.2603 32.9078C26.2735 35.1039 27.034 37.2044 28.3753 38.7491C29.7167 40.2938 31.5293 41.1569 33.4164 41.1492ZM33.4164 27.5581C34.3222 27.5752 35.2035 27.9035 35.9496 28.5016C36.6956 29.0997 37.2732 29.9411 37.6097 30.92C37.9462 31.8989 38.0267 32.9717 37.841 34.0036C37.6553 35.0356 37.2117 35.9807 36.566 36.7202C35.9202 37.4597 35.1012 37.9607 34.2115 38.1601C34.2115 38.1601 32.4016 38.2487 31.5659 37.8414C30.7303 37.4341 30.0168 36.7485 29.5149 35.8707C29.013 34.9929 28.7452 33.9621 28.7451 32.9078C28.7582 31.4787 29.2569 30.1137 30.1323 29.1113C31.0076 28.1088 32.1883 27.5504 33.4164 27.5581ZM29.0805 43.0866C34.5912 41.9707 40.2637 42.9864 45.2313 45.9783C45.5839 46.2062 45.8758 46.5425 46.0752 46.9505C46.2747 47.3585 46.3738 47.8225 46.3618 48.2917V53.4389C46.3618 53.8224 46.2309 54.1902 45.9979 54.4613C45.7649 54.7325 45.449 54.8848 45.1194 54.8848C44.7899 54.8848 44.474 54.7325 44.241 54.4613C44.008 54.1902 43.8771 53.8224 43.8771 53.4389V48.4797C39.2706 45.7899 34.0328 44.9364 28.9687 46.0506L29.0805 43.0866Z" fill="#D5090D"/>
                      <path d="M23.8004 35.287C20.3608 35.354 16.9809 36.3435 13.9236 38.1787C13.5911 38.3831 13.3126 38.6888 13.1178 39.0632C12.923 39.4376 12.8194 39.8665 12.8179 40.3041V44.7863C12.8179 45.1697 12.9488 45.5375 13.1818 45.8087C13.4147 46.0798 13.7307 46.2321 14.0602 46.2321C14.3897 46.2321 14.7057 46.0798 14.9387 45.8087C15.1717 45.5375 15.3026 45.1697 15.3026 44.7863V40.5933C18.2238 38.9011 21.458 38.0718 24.7197 38.1787C24.2933 37.2724 23.8004 35.287 23.8004 35.287ZM51.4678 38.1643C48.7258 36.4903 45.7122 35.5051 42.6222 35.2726C42.4396 36.2817 42.1342 37.2555 41.7153 38.1643C44.6262 38.2458 47.4856 39.0753 50.0888 40.5933V44.7863C50.0888 45.1697 50.2197 45.5375 50.4527 45.8087C50.6857 46.0798 51.0017 46.2321 51.3312 46.2321C51.6607 46.2321 51.9767 46.0798 52.2097 45.8087C52.4427 45.5375 52.5735 45.1697 52.5735 44.7863V40.3041C52.5743 39.864 52.4717 39.4321 52.2768 39.0549C52.0819 38.6778 51.8022 38.3698 51.4678 38.1643ZM23.5767 32.9303V31.9615C22.6035 31.81 21.718 31.2274 21.1045 30.3351C20.4911 29.4428 20.197 28.3095 20.2834 27.1712C20.3699 26.0329 20.8302 24.9772 21.5686 24.224C22.307 23.4707 23.2666 23.0779 24.2476 23.1274C25.268 23.1252 26.2487 23.587 26.9808 24.4142C27.627 23.7946 28.3364 23.2702 29.0928 22.8527C28.2476 21.7215 27.1276 20.915 25.8806 20.5394C24.6335 20.1638 23.318 20.2368 22.1073 20.7487C20.8967 21.2606 19.8477 22.1875 19.0987 23.4071C18.3497 24.6267 17.9358 26.0818 17.9116 27.5806C17.9376 29.415 18.5504 31.1723 19.6301 32.5091C20.7099 33.8459 22.179 34.6662 23.7507 34.8099C23.6452 34.1905 23.587 33.5615 23.5767 32.9303ZM41.1065 20.2357C40.2528 20.2359 39.4076 20.4342 38.6205 20.819C37.8333 21.2038 37.12 21.7673 36.5222 22.4767C37.3613 22.8331 38.1553 23.3194 38.8827 23.9226C39.4627 23.454 40.1411 23.1774 40.8455 23.1223C41.55 23.0672 42.2541 23.2356 42.8827 23.6096C43.5114 23.9836 44.0411 24.5491 44.4153 25.2459C44.7895 25.9427 44.9942 26.7446 45.0075 27.5661C44.9997 28.41 44.7867 29.234 44.3931 29.9428C43.9996 30.6516 43.4416 31.2162 42.7837 31.5712C42.8342 32.017 42.8591 32.4662 42.8583 32.9158C42.8544 33.497 42.8128 34.0769 42.734 34.6508C44.0874 34.2459 45.2879 33.3316 46.1484 32.0503C47.009 30.7689 47.4815 29.1924 47.4923 27.5661C47.4759 25.6103 46.7951 23.7416 45.5986 22.3681C44.4021 20.9945 42.7871 20.2279 41.1065 20.2357Z" fill="#D5090D"/>
                      <rect x="50.0996" y="12.6848" width="2.34509" height="14.3011" rx="1.17255" transform="rotate(-43.0694 50.0996 12.6848)" fill="#D5090D"/>
                      <rect x="60.4736" y="11.0834" width="2.34509" height="14.3011" rx="1.17255" transform="rotate(46.4982 60.4736 11.0834)" fill="#D5090D"/>
                    </svg>
                  </div>
                  <div className={styles.statInfo} style={{ textAlign: 'left', marginLeft: '0', width: '100%' }}>
                    <span style={{ 
                        display: 'block',
                        fontSize: '14px',
                        color: '#202020',
                        fontWeight: '700',
                        fontFamily: 'Inter',
                        marginBottom: '8px'
                    }}>Absent Days</span>
                    <span style={{ 
                        display: 'block',
                        fontSize: '32px',
                        fontWeight: '700',
                        color: '#202020',
                        fontFamily: 'Inter',
                        lineHeight: '1'
                    }}>02</span>
                  </div>
                </div>
              </div>

              {/* Attendance Graph Section */}
              <div className={styles.graphSection} style={{ marginTop: '40px' }}>
                 <h3>Attendance Statistics</h3>
                 <div className={styles.chartContainer}>
                     <ResponsiveContainer width="100%" height={300}>
                         <BarChart data={filteredAttendanceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} barCategoryGap={10}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#000', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#000', fontSize: 12}} tickFormatter={(val) => `${val} ${val <= 1 ? 'hr' : 'hrs'}`} domain={[0, 8]} ticks={[0,1,2,3,4,5,6,7,8]} />
                            <Tooltip cursor={{fill: 'transparent'}} />
                            <Bar dataKey="hours" barSize={12} radius={[2, 2, 0, 0]}>
                                {filteredAttendanceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getBarColor(entry.hours)} />
                                ))}
                            </Bar>
                         </BarChart>
                     </ResponsiveContainer>
                 </div>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
