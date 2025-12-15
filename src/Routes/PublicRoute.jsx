import { Routes, Route } from "react-router-dom";

// Public components
import Login from "../Containers/Employee_Portal/Login";
import Headers from "../Components/Layout/Header";
import SidebarMenu from "../Components/Common/Dashboard";

// Employee pages
import EmployeeDashboard from "../Containers/Employee_Portal/Dashboard";
import Attendence from "../Containers/Employee_Portal/Attendence";
import Prerformence from "../Containers/Employee_Portal/Performence";
import Common from "../Components/Common/common";
import Empdailyreport from "../Containers/Employee_Portal/emp_daily_report";
import EmpleaveRequest from "../Containers/Employee_Portal/emp_leave_request";

// Admin components/pages
import AminLogin from "../Containers/Admin_Portal/admin_login";
import AdminSidebarMenu from "../Components/Common/admin_sidebarmenu";
import Admindashboard from "../Containers/Admin_Portal/admin_dashboard";
import Staff from "../Containers/Admin_Portal/staff_page";
import TechTeamEmployess from "../Containers/Admin_Portal/Tech_team";
import Teams from "../Containers/Admin_Portal/teams";
import Clients from "../Containers/Admin_Portal/clients";
import Projects from "../Containers/Admin_Portal/projects";
import LeaveRequests from "../Containers/Admin_Portal/leave_requests";
import TimeSheet from "../Containers/Admin_Portal/time_sheet";
import PendingTask from "../Containers/Admin_Portal/pending_task";
import EmpRegestrationForm from "../Containers/Admin_Portal/emply_registration_form";
import TodaysAbsentEmp from "../Containers/Admin_Portal/Todays_absent_emp";
import TodaysPresentEmp from "../Containers/Admin_Portal/Todays_Present_emp";
import AdminDailyReport from "../Containers/Admin_Portal/admin_daily_report";
import AdminMonthlyReport from "../Containers/Admin_Portal/admin_monthly_report";
import ClientView from "../Containers/Admin_Portal/client_view";
import ProjectCategory from "../Containers/Admin_Portal/project_category";
import ProjectList from "../Containers/Admin_Portal/project_list";
import AddNewProject from "../Containers/Admin_Portal/add_new_project";
import ProjectView from "../Containers/Admin_Portal/project_view";
import ApproveEmployees from "../Containers/Admin_Portal/approve_employees";
import ActiveEmployees from "../Containers/Admin_Portal/active_employees";
import InactiveEmployees from "../Containers/Admin_Portal/inactive_employees";
import ChangePassword from "../Containers/Admin_Portal/change_password";
import PaySlips from "../Containers/Admin_Portal/pay_slips";
import HolidayList from "../Containers/Admin_Portal/holiday_list";
import LeaveRequestList from "../Containers/Admin_Portal/leave_request_list";
import LeaveApproveList from "../Containers/Admin_Portal/leave_approve_list";
import LeaveRejectList from "../Containers/Admin_Portal/leave_reject_list";

// Protected route component
import ProtectedRoute from "./PrivateRoute";
import ProtectedEmployeeRoute from "./PrivateEmpRoute";

const PublicRoute = () => {
  return (
    <Routes>
      {/* 🔓 Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/admin-login" element={<AminLogin />} />
      <Route path="/headers" element={<Headers />} />
      <Route path="/side-bar-menu" element={<SidebarMenu />} />
      <Route path="/admin_side_bar_menu" element={<AdminSidebarMenu />} />

      {/* 👨‍💼 Employee routes */}
      <Route path="/employee-dashboard/:empId" element={
        <ProtectedEmployeeRoute>
          <EmployeeDashboard />
         </ProtectedEmployeeRoute>
      } />

      <Route path="/employee-attendence/:empId" element={
        <ProtectedEmployeeRoute>
          <Attendence />
        </ProtectedEmployeeRoute>
      } />

      <Route path="/employee-performence/:empId" element={
        <ProtectedEmployeeRoute>
          <Prerformence />
        </ProtectedEmployeeRoute>
      } />

      <Route path="/employee-daily-report/:empId" element={
        <ProtectedEmployeeRoute>
          <Empdailyreport />
        </ProtectedEmployeeRoute>
      } />

      <Route path="/employee-leave-request/:empId" element={
        <ProtectedEmployeeRoute>
          <EmpleaveRequest />
        </ProtectedEmployeeRoute>
      } />

      <Route path="/common" element={<Common />} />

      {/* 🔒 Protected Admin routes */}
      <Route path="/admin/dashboard" element={

        <ProtectedRoute>  <Admindashboard /></ProtectedRoute>
      } />
      <Route path="/admin/staff" element={
        <ProtectedRoute><Staff /></ProtectedRoute>
      } />
      <Route path="/tech-team" element={
        <ProtectedRoute><TechTeamEmployess /></ProtectedRoute>
      } />
      <Route path="/admin/teams" element={
        <ProtectedRoute><Teams /></ProtectedRoute>
      } />
      <Route path="/admin/clients" element={
        <ProtectedRoute><Clients /></ProtectedRoute>
      } />
      <Route path="/admin/projects" element={
        <ProtectedRoute><ProjectList /></ProtectedRoute>
      } />
      <Route path="/admin/leave-schedule/:adminId" element={
        <ProtectedRoute><LeaveRequests /></ProtectedRoute>
      } />
      <Route path="/admin/timesheet" element={
        <ProtectedRoute><TimeSheet /></ProtectedRoute>
      } />
      <Route path="/admin/pending-task" element={
        <ProtectedRoute><PendingTask /></ProtectedRoute>
      } />
      <Route path="/emp-registration-form" element={
        <ProtectedRoute><EmpRegestrationForm /></ProtectedRoute>
      } />
      <Route path="/todays-emp-absent" element={
        <ProtectedRoute><TodaysAbsentEmp /></ProtectedRoute>
      } />
      <Route path="/todays-emp-present" element={
        <ProtectedRoute><TodaysPresentEmp /></ProtectedRoute>
      } />
      <Route path="/admin/reports/daily" element={
        <ProtectedRoute><AdminDailyReport /></ProtectedRoute>
      } />
      <Route path="/admin/reports/monthly" element={
        <ProtectedRoute><AdminMonthlyReport /></ProtectedRoute>
      } />
      <Route path="/admin/clients/:clientId" element={
        <ProtectedRoute><ClientView /></ProtectedRoute>
      } />
      <Route path="/admin/project-category" element={
        <ProtectedRoute><ProjectCategory /></ProtectedRoute>
      } />
      <Route path="/admin/projects/add" element={
        <ProtectedRoute><AddNewProject /></ProtectedRoute>
      } />
      <Route path="/admin/projects/:projectId" element={
        <ProtectedRoute><ProjectView /></ProtectedRoute>
      } />
      <Route path="/approve-employees" element={
        <ProtectedRoute><ApproveEmployees /></ProtectedRoute>
      } />
      <Route path="/active-employees" element={
        <ProtectedRoute><ActiveEmployees /></ProtectedRoute>
      } />
      <Route path="/inactive-employees" element={
        <ProtectedRoute><InactiveEmployees /></ProtectedRoute>
      } />
      <Route path="/change-password" element={
        <ProtectedRoute><ChangePassword /></ProtectedRoute>
      } />
      <Route path="/payslips" element={
        <ProtectedRoute><PaySlips /></ProtectedRoute>
      } />
      <Route path="/holidays" element={
        <ProtectedRoute><HolidayList /></ProtectedRoute>
      } />
      <Route path="/leave-request" element={
        <ProtectedRoute><LeaveRequestList /></ProtectedRoute>
      } />
      <Route path="/leave-approve" element={
        <ProtectedRoute><LeaveApproveList /></ProtectedRoute>
      } />
      <Route path="/leave-reject" element={
        <ProtectedRoute><LeaveRejectList /></ProtectedRoute>
      } />
    </Routes>
  );
};

export default PublicRoute;
