import React, { useState } from "react";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            alert("New password and confirm password do not match!");
            return;
        }
        console.log("Password change submitted:", formData);
        // API call would go here
    };

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />
                <div className={styles.dashboard_content}>
                    
                    <div className={styles.approve_header_row}>
                        <h2 className={styles.pageTitleWithLine}>Change Password</h2>
                    </div>

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
                                <button type="submit" className={styles.submit_btn_green}>
                                    Update Password
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
