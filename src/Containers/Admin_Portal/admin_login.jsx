import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Headers from "../../Components/Layout/Header"; // Commented out to match Employee Login consistency
import styles from "../../Styles/login.module.css";
import EmployeeAuth from "../../Hooks/useAuth";
import { AiOutlineWarning } from "react-icons/ai";
// import adminImage from "../../Assets/images/admin_portal_image.jpg"; // Not needed in new layout
// import logo from "../../Assets/images/P_Logo.jpg"; // Not needed in new layout

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("superadmin@parivratan.com");
  const [password, setPassword] = useState("Password@12345");

  // Use the same hook source as EmployeeLogin
  const { handleAdminLogin, AdminAuthData, loading, error, setError } = EmployeeAuth();

  const onSubmitAdminLogin = async (e) => {
    e.preventDefault();
    await handleAdminLogin(adminName, password);
  };

  useEffect(() => {
    if (AdminAuthData?.token && (AdminAuthData?.admin?.id || AdminAuthData?.admin?.admin_id)) {
      const adminId = AdminAuthData.admin.id || AdminAuthData.admin.admin_id;
      navigate(`/admin/dashboard`);
    }
  }, [AdminAuthData, navigate]);

  return (
    <>
      {/* <Headers /> */}
      <div className={styles.container}>
        <div className={styles.loginCard}>
          
          {/* Left Side: Login Form */}
          <div className={styles.leftSide}>
            <div className={styles.loginContent}>
              <h2 className={styles.headerTitle}>Admin Portal</h2>
              <p className={styles.headerSubtitle}>Please enter your credentials to access the dashboard.</p>

              <form onSubmit={onSubmitAdminLogin}>
                <div className={styles.formGroup}>
                  <label>Admin Name</label>
                  <input
                    className={styles.inputField}
                    type="text"
                    value={adminName}
                    onChange={(e) => {
                      setAdminName(e.target.value);
                      if (error) setError("");
                    }}
                    name="admin_name"
                    placeholder="Enter admin name"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Password</label>
                  <input
                    className={styles.inputField}
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    name="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className={styles.forgotPassword}>
                  <a href="#">Forgot Password?</a>
                </div>

                <button type="submit" className={styles.loginButton} disabled={loading}>
                  {loading ? "Signing In..." : "SIGN IN"}
                </button>

                {error && (
                  <div className={styles.errorMessage}>
                    <AiOutlineWarning className={styles.errorIcon} />
                    <span>{error}</span>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right Side: Branding */}
          <div className={styles.rightSide}>
            <h1 className={styles.welcomeTitle}>Parivartan HR</h1>
            <p className={styles.welcomeText}>
              Administrative Control Panel
            </p>
            <div className={styles.decorationCircle}></div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminLogin;
