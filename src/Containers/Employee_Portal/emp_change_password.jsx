import React, { useState } from "react";
import axios from "axios";
import SidebarMenu from "../../Components/Common/Dashboard";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EmpChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: "error", text: "New password and confirm password do not match!" });
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("emp_token") || document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
            
            const response = await axios.post("http://localhost:3003/api/change-password", {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            if (response.data.success) {
                setMessage({ type: "success", text: "Password updated successfully!" });
                setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "An error occurred while updating the password.";
            setMessage({ type: "error", text: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <SidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />
                <div className={styles.dashboard_content}>
                    
                    <div className={styles.approve_header_row}>
                        <h2 className={styles.pageTitleWithLine}>Change Password</h2>
                    </div>

                    {message.text && (
                        <div className={`${styles.alert} ${message.type === "success" ? styles.alert_success : styles.alert_error}`}>
                            {message.text}
                        </div>
                    )}

                    <div className={styles.password_form_container}>
                        <form onSubmit={handleSubmit} className={styles.password_form}>
                            
                            <div className={styles.form_group}>
                                <label className={styles.form_label}>Current Password</label>
                                <div className={styles.password_input_wrapper}>
                                    <input 
                                        type={showCurrentPassword ? "text" : "password"}
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        placeholder="Enter current password"
                                        className={styles.form_input}
                                        required
                                    />
                                    <button 
                                        type="button"
                                        className={styles.password_toggle}
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                        {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div className={styles.form_group}>
                                <label className={styles.form_label}>New Password</label>
                                <div className={styles.password_input_wrapper}>
                                    <input 
                                        type={showNewPassword ? "text" : "password"}
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        placeholder="Enter new password"
                                        className={styles.form_input}
                                        required
                                    />
                                    <button 
                                        type="button"
                                        className={styles.password_toggle}
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div className={styles.form_group}>
                                <label className={styles.form_label}>Confirm Password</label>
                                <div className={styles.password_input_wrapper}>
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm new password"
                                        className={styles.form_input}
                                        required
                                    />
                                    <button 
                                        type="button"
                                        className={styles.password_toggle}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div className={styles.form_actions}>
                                <button type="submit" className={styles.submit_btn_green} disabled={loading}>
                                    {loading ? "Updating..." : "Update Password"}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EmpChangePassword;
