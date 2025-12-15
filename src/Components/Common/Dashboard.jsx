import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./dashboard.module.css";
import EmployeeAuth from "../../Hooks/useAuth";

// Icons
import { FiChevronDown, FiChevronUp, FiMenu } from "react-icons/fi"; // Added FiMenu for Hamburger
import { MdDashboard, MdDescription } from "react-icons/md"; // Dashboard, Docs
import { TbReportAnalytics } from "react-icons/tb"; // Reports
import { FaCalendarAlt, FaSignOutAlt, FaClock } from "react-icons/fa"; // Calendar/Leaves, Logout, TimeOut

const SidebarMenu = () => {
  const { fetchemployeeDetails, handleLogout } = EmployeeAuth();
  const [Emply, SetEmply] = useState(null);
  const { empId } = useParams();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false); // New State

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchemployeeDetails(empId);
      if (response?.employee) {
        SetEmply(response.employee);
      }
    };
    fetchData();
  }, [empId]);

  // Set active menu based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("dashboard")) setSelectedMenu("Dashboard");
    else if (path.includes("daily-report")) setSelectedMenu("Daily Reports");
    else if (path.includes("leave-request")) { 
        setSelectedMenu("Leaves"); // Or handle submenu state if needed
        setExpandedMenus(prev => ({ ...prev, "Leaves": true }));
    }
    // Add logic for other paths as they are implemented
  }, [location.pathname]);

  const toggleSubMenu = (menuName) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard size={20} />, path: `/employee-dashboard/${empId}` },
    { name: "Daily Reports", icon: <TbReportAnalytics size={20} />, path: `/employee-daily-report/${empId}` },
    {
      name: "Leaves",
      icon: <FaCalendarAlt size={18} />,
      children: [
        { name: "Leave Request", path: `/employee-leave-request/${empId}` },
        { name: "Status", path: "#" },
      ],
    },
    {
      name: "HR Doc's",
      icon: <MdDescription size={20} />,
      children: [
        { name: "Pay Slip", path: "#" },
        { name: "Offer Letter", path: "#" },
      ],
    },
    { name: "Time Out", icon: <FaClock size={18} />, path: "#" },
    { name: "Log Out", icon: <FaSignOutAlt size={18} />, action: "logout" },
  ];

  return (
    <div className={styles.dashboard_wrapper}>
      <div className={`${styles.dashboard_container} ${isCollapsed ? styles.collapsed : ""}`}>
        {/* Hamburger Icon at the top of Sidebar */}
        <div className={styles.sidebarHeader}>
             <FiMenu 
                className={styles.hamburgerIcon} 
                onClick={() => setIsCollapsed(!isCollapsed)} // Toggle logic
             />
        </div>
        
        <ul className={styles.dash_board_menu}>
          {menuItems.map((item) => (
            <React.Fragment key={item.name}>
              <li
                className={`${selectedMenu === item.name ? styles.activeMenu : ""} ${styles.menuItem}`}
                onClick={() => {
                  if (item.children) {
                    toggleSubMenu(item.name);
                    setSelectedMenu(item.name); // Optional: keep parent active if expanded
                  } else {
                    setSelectedMenu(item.name);
                    if (item.action === "logout") {
                        handleLogout(Emply?.id);
                    } else if (item.path) {
                        navigate(item.path);
                    }
                  }
                }}
              >
                <div className={styles.menuItemContent}>
                    <span className={selectedMenu === item.name ? styles.activeMenu_logo : styles.inactiveMenu_logo}>
                       {item.icon}
                    </span>
                    <span className={styles.menuText}>{item.name}</span>
                </div>
                 {item.children && (
                  <span className={styles.chevron}>
                    {expandedMenus[item.name] ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                )}
              </li>
              
              {/* Render Submenu */}
              {item.children && expandedMenus[item.name] && (
                <ul className={styles.subMenu}>
                  {item.children.map((subItem) => (
                    <li
                      key={subItem.name}
                      className={styles.subMenuItem}
                      onClick={(e) => {
                          e.stopPropagation(); // Prevent parent click
                          // setSelectedMenu(subItem.name); // Optional: make subitem active
                          if(subItem.path && subItem.path !== "#") navigate(subItem.path);
                      }}
                    >
                      {subItem.name}
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;
