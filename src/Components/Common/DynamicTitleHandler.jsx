import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DynamicTitleHandler = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        // Admin Paths according to PublicRoute.jsx
        const isAdminPath = 
            path.startsWith("/admin") || 
            path === "/admin-login" || 
            path === "/admin_side_bar_menu" ||
            path === "/tech-team" ||
            path === "/emp-registration-form" ||
            path === "/todays-emp-absent" ||
            path === "/todays-emp-present" ||
            path === "/approve-employees" ||
            path === "/active-employees" ||
            path === "/inactive-employees" ||
            path === "/leave-request" ||
            path === "/leave-approve" ||
            path === "/leave-reject";

        // Employee Paths according to PublicRoute.jsx
        const isEmployeePath = 
            path.startsWith("/employee") || 
            path.includes("employee-") || 
            path === "/" || 
            path === "/headers" || 
            path === "/side-bar-menu" ||
            path === "/common";

        if (isAdminPath) {
            document.title = "HR Portal | Parivartan";
        } else if (isEmployeePath) {
            document.title = "Employee Portal | Parivartan";
        } else {
            // Default title or fallback
            document.title = "HR Portal | Parivartan";
        }
    }, [location]);

    return null;
};

export default DynamicTitleHandler;
