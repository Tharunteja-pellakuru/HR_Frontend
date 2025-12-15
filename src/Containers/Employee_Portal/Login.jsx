import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "../../Components/Layout/Header";
import styles from "../../Styles/login.module.css";
import EmployeeAuth from "../../Hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [emp_id, setEmpId] = useState("test@example.com");
  const [password, setPassword] = useState("123456");
  const { loading, error, user , handleEmpLogin , empAuthData } = EmployeeAuth();

  const emp_toekn = localStorage.getItem("emp_token")

  console.log("userdata" , empAuthData)

  const onSubmitEmployeLogin = async (e) => {
    e.preventDefault();
    await handleEmpLogin(emp_id, password);
  };


   useEffect(() => {
    // alert("hjvjh")
    if (empAuthData?.emp_token && empAuthData?.emp?.emp_id) {
      navigate(`/employee-dashboard/${empAuthData.emp.emp_id}`);
    }
  }, [empAuthData, navigate]);



  return (
    <>
      {/* <Headers />  Old header removed for a cleaner full-screen login page, or keep if strictly required. Keeping commented in case. */}
      {/* If global header is mandatory, uncomment above. But usually login pages are standalone. */}
      
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <div className={styles.leftSide}>
            <div className={styles.loginContent}>
              <h2 className={styles.headerTitle}>Employee Login</h2>
              <p className={styles.headerSubtitle}>Please enter your details to sign in.</p>

              <form onSubmit={onSubmitEmployeLogin}>
                <div className={styles.formGroup}>
                  <label>Employee ID</label>
                  <input
                    className={styles.inputField}
                    type="text"
                    value={emp_id}
                    onChange={(e) => setEmpId(e.target.value)}
                    name="emp_id"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Password</label>
                  <input
                    className={styles.inputField}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className={styles.forgotPassword}>
                  <a href="#">Forgot Password?</a>
                </div>

                <button type="submit" className={styles.loginButton} disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </button>

                {error && <div className={styles.errorMessage}>{error}</div>}
              </form>
            </div>
          </div>

          <div className={styles.rightSide}>
            <h1 className={styles.welcomeTitle}>Parivartan HR</h1>
            <p className={styles.welcomeText}>
              Empowering your professional journey with seamless management.
            </p>
            <div className={styles.decorationCircle}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
