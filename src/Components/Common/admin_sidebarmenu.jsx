import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./dashboard.module.css";
import EmployeeAuth from "../../Hooks/useAuth";
import { AiOutlineMenu } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// Import custom SVGs
import dashboardIcon from "../../Assets/images/dashboard.svg";
import reportsIcon from "../../Assets/images/reports.svg";
import projectsIcon from "../../Assets/images/projects.svg";
import employeesIcon from "../../Assets/images/employees.svg";
// Note: User said 'leaves.svg' but file system shows 'leave.svg' based on list_dir output (or checking both). 
// Validated name: leave.svg seems to exist in list, but user said leaves.svg. I will try leave.svg based on list.
import leavesIcon from "../../Assets/images/leave.svg"; 
import payslipsIcon from "../../Assets/images/payslips.svg";
import holidaysIcon from "../../Assets/images/holidays.svg";
import changePasswordIcon from "../../Assets/images/eye.svg";
import logoutIcon from "../../Assets/images/log-out.svg"; // Keeping existing logout svg if needed or use custom

const AdminSidebarMenu = () => {
    const { fetchemployeeDetails, handleAdminLogout,  AdminAuthData} = EmployeeAuth();
    const [Emply, SetEmply] = useState(null);
    const { empId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedMenu, setSelectedMenu] = useState("Dashboard");
    const [openMenus, setOpenMenus] = useState({}); // State for expandable menus
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 991); // Default collapsed on smaller screens
    console.log(AdminAuthData)

    // Auto-collapse sidebar on medium and smaller screens (only when resizing down, not when toggling manually)
    useEffect(() => {
        let previousWidth = window.innerWidth;
        
        const handleResize = () => {
            const currentWidth = window.innerWidth;
            
            // Only auto-collapse when resizing DOWN to a smaller breakpoint
            if (currentWidth <= 991 && previousWidth > 991) {
                setIsCollapsed(true);
                setOpenMenus({}); // Close all submenus
            }
            
            previousWidth = currentWidth;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Menu items definition (moved up for use in useEffect)
    const menuItems = [
        { name: "Dashboard", icon: dashboardIcon, route: `/admin/dashboard` },
        { 
            name: "Reports", 
            icon: reportsIcon, 
            subItems: [
                { name: "Daily Report List", route: "/admin/reports/daily" },
                { name: "Monthly Report", route: "/admin/reports/monthly" }
            ]
        },
        { 
            name: "Projects", 
            icon: projectsIcon,
            subItems: [
                { name: "Client list", route: "/admin/clients" },
                { name: "Project Category", route: "/admin/project-category" },
                { name: "Project List", route: "/admin/projects" },
                { name: "Project Management", route: "/admin/dashboard/" }
            ]
        },
        { 
            name: "Employees", 
            icon: employeesIcon,
            subItems: [
                { name: "Approve Employees", route: "/approve-employees" },
                { name: "Active Employees", route: "/active-employees" },
                { name: "Inactive Employess", route: "/inactive-employees" }
            ]
        },
        { 
            name: "Leaves", 
            icon: leavesIcon,
            subItems: [
                { name: "Leave Request", route: "/leave-request" },
                { name: "Leave Approve", route: "/leave-approve" },
                { name: "Leave Reject", route: "/leave-reject" }
            ]
        },
        { name: "Pay Slips", icon: payslipsIcon, route: "/payslips" },
        { name: "Holiday List", icon: holidaysIcon, route: "/holidays" },
        { name: "Change Password", icon: changePasswordIcon, route: "/change-password" },
        { name: "LogOut", icon: logoutIcon }, 
    ];

    // Set active menu based on current route
    useEffect(() => {
        const currentPath = location.pathname;
        
        // Check top-level menu items
        for (const item of menuItems) {
            if (item.route && currentPath === item.route) {
                setSelectedMenu(item.name);
                return;
            }
            
            // Check subitems
            if (item.subItems) {
                for (const subItem of item.subItems) {
                    if (subItem.route && currentPath.startsWith(subItem.route)) {
                        setSelectedMenu(subItem.name);
                        // Auto-expand parent menu
                        setOpenMenus(prev => ({ ...prev, [item.name]: true }));
                        return;
                    }
                }
            }
        }
    }, [location.pathname]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchemployeeDetails();
            if (response) {
                SetEmply(response);
            }
        };
        fetchData();
    }, []);

    const toggleMenu = (menuName) => {
        if (isCollapsed) return; // Don't toggle submenus if collapsed
        setOpenMenus((prev) => ({
            ...prev,
            [menuName]: !prev[menuName],
        }));
    };

    // Helper function to get sidebar width based on window size and collapsed state
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
        return '260px';
    };

    // Update CSS variable when sidebar state or window size changes
    useEffect(() => {
        const updateSidebarWidth = () => {
            const sidebarWidth = getSidebarWidth(isCollapsed);
            document.documentElement.style.setProperty('--sidebar-width', sidebarWidth);
        };
        
        updateSidebarWidth();
        window.addEventListener('resize', updateSidebarWidth);
        return () => window.removeEventListener('resize', updateSidebarWidth);
    }, [isCollapsed]);

    const toggleSidebar = () => {
        const newCollapsedState = !isCollapsed;
        setIsCollapsed(newCollapsedState);
        if (newCollapsedState) {
            setOpenMenus({}); // Close all submenus when collapsing
        }
    };

    const handleMenuClick = (menuItem, isParent = false) => {
        if (menuItem.name === "LogOut") {
            handleAdminLogout();
            return;
        }

        // Toggle submenu if it's a parent item
        if (isParent && menuItem.subItems) {
            if (isCollapsed) {
                // If collapsed and clicked a parent, expand sidebar and open submenu
                setIsCollapsed(false);
                // Open the submenu immediately
                setOpenMenus(prev => ({
                    ...prev,
                    [menuItem.name]: true
                }));
            } else {
                toggleMenu(menuItem.name);
            }
            return;
        }

        setSelectedMenu(menuItem.name);

        if (menuItem.route) {
            navigate(menuItem.route);
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
                                className={`${selectedMenu === item.name ? styles.activeMenu : ""} ${item.subItems ? styles.parentItem : ""} ${item.subItems && openMenus[item.name] ? styles.expandedMenu : ""}`}
                                onClick={() => handleMenuClick(item, !!item.subItems)}
                                title={isCollapsed ? item.name : ""}
                            >
                                <div className={styles.menuItemContent}>
                                    <span className={selectedMenu === item.name ? styles.activeMenu_logo : styles.inactiveMenu_logo}>
                                        <img src={item.icon} alt={`${item.name} icon`} width={20} height={20} />
                                    </span> 
                                    <span className={styles.menuText}>{item.name}</span>
                                </div>
                                {item.subItems && (
                                    <span className={`${styles.chevron} ${openMenus[item.name] ? styles.chevronExpanded : ""}`}>
                                        {openMenus[item.name] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                    </span>
                                )}
                            </li>
                            
                            {/* Render Submenu */}
                            {item.subItems && openMenus[item.name] && !isCollapsed && (
                                <ul className={styles.subMenu}>
                                    {item.subItems.map((subItem) => (
                                        <li 
                                            key={subItem.name} 
                                            className={`${styles.subMenuItem} ${selectedMenu === subItem.name ? styles.activeSubMenu : ""}`}
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

export default AdminSidebarMenu;


