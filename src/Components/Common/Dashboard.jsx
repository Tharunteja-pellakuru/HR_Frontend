import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./employee_sidebar.module.css";
import EmployeeAuth from "../../Hooks/useAuth";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// Icons
// Using SVGs to match Admin style where possible or keeping react-icons if SVGs typical aren't available, 
// but wrapping them to look consistent.
import { MdDashboard, MdDescription } from "react-icons/md"; 
import { TbReportAnalytics } from "react-icons/tb"; 
import { FaCalendarAlt, FaSignOutAlt, FaClock, FaEye } from "react-icons/fa"; 

// Debugging
// console.log("Styles imported:", styles); 

const SidebarMenu = () => {
    const { fetchemployeeDetails, handleLogout } = EmployeeAuth();
    const [Emply, SetEmply] = useState(null);
    const { empId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    // State
    const [selectedMenu, setSelectedMenu] = useState("Dashboard");
    const [openMenus, setOpenMenus] = useState({}); // Matches Admin 'openMenus'
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 991); // Responsive default

    // Helper: Width Calculation
    const getSidebarWidth = (collapsed) => {
        const width = window.innerWidth;
        if (collapsed) {
            if (width <= 575) return '50px';
            if (width <= 767) return '60px';
            return '70px';
        }
        // Responsive expanded widths
        if (width <= 575) return '200px';
        if (width <= 767) return '210px';
        if (width <= 991) return '230px';
        return '260px'; // Default
    };

    // Responsive Effect
    useEffect(() => {
        let previousWidth = window.innerWidth;
        
        const handleResize = () => {
            const currentWidth = window.innerWidth;
            const sidebarWidth = getSidebarWidth(isCollapsed);
            document.documentElement.style.setProperty('--sidebar-width', sidebarWidth);

            // Auto-collapse logic
            if (currentWidth <= 991 && previousWidth > 991) {
                setIsCollapsed(true);
                setOpenMenus({});
            }
            previousWidth = currentWidth;
        };

        // Initial set
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isCollapsed]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchemployeeDetails(empId);
            if (response?.employee) {
                SetEmply(response.employee);
            }
        };
        fetchData();
    }, [empId]);

    // Menu Definitions
    const menuItems = [
        { 
            name: "Dashboard", 
            icon: <MdDashboard size={20} />, 
            path: `/employee/dashboard` 
        },
        { 
            name: "Daily Reports", 
            icon: <TbReportAnalytics size={20} />, 
            path: `/employee/daily-reports` 
        },
        {
            name: "Leaves",
            icon: <FaCalendarAlt size={18} />,
            children: [
                { name: "Leave Request", path: `/employee/leave-request` },
                { name: "Leave Status", path: `/employee/leave-status` },
            ],
        },
        {
            name: "HR Doc's",
            icon: <MdDescription size={20} />,
            children: [
                { name: "Pay Slip", path: `/employee/pay-slip` },
                { name: "Offer Letter", path: `/employee/offer-letter` },
            ],
        },
        { 
            name: "Time Out", 
            icon: <FaClock size={18} />, 
            path: "#" 
        },
        { 
            name: "Change Password", 
            icon: <FaEye size={18} />, 
            path: "/employee/change-password" 
        },
        { 
            name: "Log Out", 
            icon: <FaSignOutAlt size={18} />, 
            action: "logout" 
        },
    ];

    // Route matching
    useEffect(() => {
        const currentPath = location.pathname;
        for (const item of menuItems) {
            if (item.path && currentPath === item.path) {
                setSelectedMenu(item.name);
                return;
            }
            if (item.children) {
                for (const subItem of item.children) {
                    if (subItem.path && currentPath === subItem.path) {
                        setSelectedMenu(subItem.name); // Or parent name? Admin selects parent usually
                        setOpenMenus(prev => ({ ...prev, [item.name]: true }));
                        return;
                    }
                }
            }
        }
    }, [location.pathname]);

    const toggleSidebar = () => {
        const newCollapsed = !isCollapsed;
        setIsCollapsed(newCollapsed);
        if (newCollapsed) setOpenMenus({});
    };

    const toggleMenu = (menuName) => {
        if (isCollapsed) return;
        setOpenMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));
    };

    const handleMenuClick = (item, isParent = false) => {
        if (item.action === "logout") {
            handleLogout(Emply?.id);
            return;
        }

        if (isParent) {
            if (isCollapsed) {
                setIsCollapsed(false);
                setOpenMenus(prev => ({ ...prev, [item.name]: true }));
            } else {
                toggleMenu(item.name);
            }
            return;
        }

        setSelectedMenu(item.name);
        if (item.path && item.path !== "#") {
            navigate(item.path);
        }
    };

    return (
        <div className={styles.dashboard_wrapper}>
            <div className={`${styles.dashboard_container} ${isCollapsed ? styles.collapsed : ""}`}>
                
                {/* Sidebar Header with Hamburger */}
                <div className={`${styles.sidebar_header} ${isCollapsed ? styles.sidebar_header_collapsed : ""}`}>
                    <div 
                        onClick={toggleSidebar} 
                        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                        className={styles.hamburger_btn}
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#202020"/>
                        </svg>
                    </div>
                </div>

                <ul className={styles.dash_board_menu}>
                    {menuItems.map((item) => (
                        <React.Fragment key={item.name}>
                            <li 
                                className={`${selectedMenu === item.name && !item.children ? styles.activeMenu : ""} ${item.children ? styles.parentItem : ""} ${item.children && openMenus[item.name] ? styles.expandedMenu : ""}`}
                                onClick={() => handleMenuClick(item, !!item.children)}
                                title={isCollapsed ? item.name : ""}
                            >
                                <div className={styles.menuItemContent}>
                                    <span className={selectedMenu === item.name ? styles.activeMenu_logo : styles.inactiveMenu_logo}>
                                        {/* Using cloneElement to pass props if it were an Icon component, but simple render is fine */}
                                        {item.icon}
                                    </span> 
                                    <span className={styles.menuText}>{item.name}</span>
                                </div>
                                {item.children && (
                                    <span className={`${styles.chevron} ${openMenus[item.name] ? styles.chevronExpanded : ""}`}>
                                        {openMenus[item.name] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                    </span>
                                )}
                            </li>
                            
                            {/* Render Submenu */}
                            {item.children && openMenus[item.name] && !isCollapsed && (
                                <ul className={styles.subMenu}>
                                    {item.children.map((subItem) => (
                                        <li 
                                            key={subItem.name} 
                                            className={`${styles.subMenuItem} ${location.pathname === subItem.path ? styles.activeSubMenu : ""}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleMenuClick(subItem);
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
