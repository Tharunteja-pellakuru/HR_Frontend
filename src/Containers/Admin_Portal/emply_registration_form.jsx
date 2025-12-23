import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
// Removed import "../../Styles/empregistrationform.css"; as per instruction to use dashboard styles

const departmentDesignations = {
  "Developer": ["Senior Developer", "Junior Developer", "Intern Developer"],
  "Designer": ["Senior Designer", "Junior Designer", "Intern Designer"],
  "Programmer": ["Senior Programmer", "Junior Programmer", "Intern Programmer"],
  "Mobile Development": ["Android Developer", "iOS Developer", "React Native Developer"],
  "Content Writer": ["Senior Content Writer", "Junior Content Writer", "Intern Writer"],
  "Junior Programmer": ["Junior Programmer"],
  "Junior Content Writer": ["Junior Content Writer"],
  "Video Editor": ["Video Editor"],
  "Internship": ["Intern"],
};

const CustomDropdown = ({ label, name, value, options, onChange, placeholder = "Select" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    return (
        <div className={styles.form_row}>
             <label>{label}</label>
             <div className={styles.custom_dropdown} ref={dropdownRef} style={{ width: '100%' }}>
                <div 
                    className={styles.dropdown_toggle} 
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ background: '#FFF' }}
                >
                    <span style={{ color: value ? '#333' : '#888' }}>
                        {value || placeholder}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isOpen ? styles.arrow_up : styles.arrow_down}>
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </div>
                {isOpen && (
                    <div className={styles.dropdown_menu}>
                        <div 
                             className={`${styles.dropdown_item} ${value === "" ? styles.dropdown_item_active : ''}`}
                             onClick={() => {
                                 onChange({ target: { name, value: '' } });
                                 setIsOpen(false);
                             }}
                        >
                            {placeholder}
                        </div>
                        {options.map((opt, idx) => (
                            <div 
                                key={idx}
                                className={`${styles.dropdown_item} ${value === opt ? styles.dropdown_item_active : ''}`}
                                onClick={() => {
                                    onChange({ target: { name, value: opt } });
                                    setIsOpen(false);
                                }}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const EmpRegistrationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    emp_company_code: "",
    emp_password: "",
    emp_first_name: "",
    emp_last_name: "",
    emp_dob: "",
    emp_age: "",
    emp_email: "",
    emp_phone_number: "",
    emp_nationality: "",
    emp_gender: "",
    team: "",
    emp_department: "",
    emp_designation: "",
    emp_date_of_joining: "",
    emp_ctc: "",
    status: "",
    emp_current_address: "",
    emp_permanent_address: "",
    emp_emerg_contact_num: "",
    emp_emerg_contact_name: "",
    emp_id_proof: "",
    emp_profile_pic: null,
  });

  useEffect(() => {
    if (location.state && location.state.employee) {
        const emp = location.state.employee;
        setIsEditMode(true);
        // Map existing fields
        // Note: joinDate format in active_employees is DD-MM-YYYY, inputs expect YYYY-MM-DD
        const formatDateForInput = (dateStr) => {
            if (!dateStr) return "";
            const parts = dateStr.split("-");
            if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
            return dateStr;
        };

        setFormData(prev => ({
            ...prev,
            emp_company_code: emp.id || "",
            emp_first_name: emp.name || "", // Assuming full name in first name for now
            emp_phone_number: emp.phone || "",
            emp_designation: emp.designation || "",
            status: emp.status || "",
            emp_date_of_joining: formatDateForInput(emp.joinDate),
            // Other fields not available in the simple table data will remain empty or default
        }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "emp_profile_pic") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
        console.log("Updating Employee:", formData);
        // Update API call here
    } else {
        console.log("Registering Employee:", formData);
        // Create API call here
    }
    navigate('/admin/active-employees');
  };

  return (
    <div className={styles.emp_dashboard_wrapper}>
      <AdminSidebarMenu />
      <div className={styles.admin_dashboard_main}>
        <HeaderDashboard />
        <div className={styles.dashboard_content}>
            
            <div className={styles.daily_report_header}>
                <h2 className={styles.pageTitleWithLine}>{isEditMode ? "Update Employee Details" : "Employee Registration"}</h2>
                <button 
                     className={styles.go_back_btn_grey}
                     onClick={() => navigate('/admin/active-employees')}
                >
                    Go Back
                </button>
            </div>

          {/* Use a container that mimics the white card style */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginTop: '20px' }}>
            <form onSubmit={handleSubmit}>
              
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Account Information</h3>
              <div className={styles.form_row}>
                <label>EMP Company Code</label>
                <input name="emp_company_code" value={formData.emp_company_code} onChange={handleChange} type="text" />
              </div>
              <div className={styles.form_row}>
                <label>EMP Password</label>
                <input type="password" name="emp_password" value={formData.emp_password} onChange={handleChange} />
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: '25px', marginBottom: '15px', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Personal Information</h3>
              <div className={styles.form_row}>
                 <label>Profile Picture</label>
                 <input type="file" name="emp_profile_pic" accept="image/*" onChange={handleChange} style={{ padding: '5px' }} />
              </div>
              <div className={styles.form_row}>
                 <label>First Name</label>
                 <input name="emp_first_name" value={formData.emp_first_name} onChange={handleChange} type="text" />
              </div>
              <div className={styles.form_row}>
                 <label>Last Name</label>
                 <input name="emp_last_name" value={formData.emp_last_name} onChange={handleChange} type="text" />
              </div>
              <div className={styles.form_row}>
                 <label>Date of Birth</label>
                 <input type="date" name="emp_dob" value={formData.emp_dob} onChange={handleChange} />
              </div>
              <div className={styles.form_row}>
                 <label>Age</label>
                 <input name="emp_age" value={formData.emp_age} onChange={handleChange} type="number" />
              </div>
              
              <CustomDropdown 
                label="Gender" 
                name="emp_gender" 
                value={formData.emp_gender} 
                options={["Male", "Female", "Other"]} 
                onChange={handleChange} 
              />
              
              <div className={styles.form_row}>
                 <label>Nationality</label>
                 <input name="emp_nationality" value={formData.emp_nationality} onChange={handleChange} type="text" />
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: '25px', marginBottom: '15px', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Contact Information</h3>
              <div className={styles.form_row}>
                 <label>Email</label>
                 <input type="email" name="emp_email" value={formData.emp_email} onChange={handleChange} />
              </div>
              <div className={styles.form_row}>
                 <label>Phone Number</label>
                 <input name="emp_phone_number" value={formData.emp_phone_number} onChange={handleChange} type="text" />
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: '25px', marginBottom: '15px', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Address</h3>
              <div className={styles.form_row}>
                 <label>Current Address</label>
                 <textarea name="emp_current_address" value={formData.emp_current_address} onChange={handleChange} rows="3" />
              </div>
              <div className={styles.form_row}>
                 <label>Permanent Address</label>
                 <textarea name="emp_permanent_address" value={formData.emp_permanent_address} onChange={handleChange} rows="3" />
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: '25px', marginBottom: '15px', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Emergency Contact</h3>
              <div className={styles.form_row}>
                 <label>Contact Name</label>
                 <input name="emp_emerg_contact_name" value={formData.emp_emerg_contact_name} onChange={handleChange} type="text" />
              </div>
              <div className={styles.form_row}>
                 <label>Contact Number</label>
                 <input name="emp_emerg_contact_num" value={formData.emp_emerg_contact_num} onChange={handleChange} type="text" />
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: '25px', marginBottom: '15px', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Job Details</h3>
              <CustomDropdown 
                label="Department" 
                name="emp_department" 
                value={formData.emp_department} 
                options={Object.keys(departmentDesignations)} 
                onChange={handleChange} 
              />
              <CustomDropdown 
                label="Designation" 
                name="emp_designation" 
                value={formData.emp_designation} 
                options={departmentDesignations[formData.emp_department] || []} 
                onChange={handleChange} 
              />
              <CustomDropdown 
                label="Team" 
                name="team" 
                value={formData.team} 
                options={["Tech Team", "Social Team"]} 
                onChange={handleChange} 
              />
              <div className={styles.form_row}>
                 <label>Joining Date</label>
                 <input type="date" name="emp_date_of_joining" value={formData.emp_date_of_joining} onChange={handleChange} />
              </div>
              <div className={styles.form_row}>
                 <label>CTC</label>
                 <input name="emp_ctc" value={formData.emp_ctc} onChange={handleChange} type="text" />
              </div>
              <CustomDropdown 
                label="Status" 
                name="status" 
                value={formData.status} 
                options={["Active", "Resigned", "Terminated"]} 
                onChange={handleChange} 
              />

              <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: '25px', marginBottom: '15px', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Verification</h3>
              <div className={styles.form_row}>
                 <label>ID Proof</label>
                 <input name="emp_id_proof" value={formData.emp_id_proof} onChange={handleChange} type="text" />
              </div>

              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                 <button className={styles.save_btn} style={{ height: '42px', width: 'auto', padding: '0 30px', minWidth: '220px', fontSize: '15px' }} type="submit">{isEditMode ? "Update Employee Details" : "Register Employee"}</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpRegistrationForm;
