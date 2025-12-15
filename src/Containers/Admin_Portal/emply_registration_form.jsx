import React, { useState } from "react";
import "../../Styles/empregistrationform.css";
import parivartan_logo from "../../Assets/images/parivartan_logo.png";

const departmentDesignations = {
  "developer": ["Senior Developer", "Junior Developer", "Intern Developer"],
  "designer": ["Senior Designer", "Junior Designer", "Intern Designer"],
  "programmer": ["Senior Programmer", "Junior Programmer", "Intern Programmer"],
  "mobile developement": ["Android Developer", "iOS Developer", "React Native Developer"],
  "content writer": ["Senior Content Writer", "Junior Content Writer", "Intern Writer"],
  "junior programmer": ["Junior Programmer"],
  "junior content writer": ["Junior Content Writer"],
  "video editor": ["Video Editor"],
  "internship": ["Intern"],
};

const EmpRegistrationForm = () => {
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
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    console.log([...data]); // Replace with API call
  };

  return (
    <div>
      <div className="logo-container">
        <img src={parivartan_logo} alt="Company Logo" className="logo" />
      </div>

      <div className="emp-registration-main-container">
        <form className="emp-registration-form" onSubmit={handleSubmit}>
          {/* Account Info */}
          <fieldset className="form-section">
            <legend>Account Information</legend>
            <div className="form-group">
              <label>EMP Company Code</label>
              <input name="emp_company_code" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>EMP Password</label>
              <input type="password" name="emp_password" onChange={handleChange} />
            </div>
          </fieldset>

          {/* Personal Info */}
          <fieldset className="form-section">
            <legend>Personal Information</legend>
            <div className="form-group">
              <label>Profile Picture</label>
              <input type="file" name="emp_profile_pic" accept="image/*" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>EMP First Name</label>
              <input name="emp_first_name" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>EMP Last Name</label>
              <input name="emp_last_name" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>EMP DOB</label>
              <input type="date" name="emp_dob" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>EMP Age</label>
              <input name="emp_age" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>EMP Gender</label>
              <select name="emp_gender" onChange={handleChange}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>EMP Nationality</label>
              <input name="emp_nationality" onChange={handleChange} />
            </div>
          </fieldset>

          {/* Contact Info */}
          <fieldset className="form-section">
            <legend>Contact Information</legend>
            <div className="form-group">
              <label>EMP Email</label>
              <input type="email" name="emp_email" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>EMP Phone Number</label>
              <input name="emp_phone_number" onChange={handleChange} />
            </div>
          </fieldset>

          {/* Address */}
          <fieldset className="form-section">
            <legend>Address</legend>
            <div className="form-group">
              <label>Current Address</label>
              <textarea name="emp_current_address" onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
              <label>Permanent Address</label>
              <textarea name="emp_permanent_address" onChange={handleChange}></textarea>
            </div>
          </fieldset>

          {/* Emergency Contact */}
          <fieldset className="form-section">
            <legend>Emergency Contact</legend>
            <div className="form-group">
              <label>Emergency Contact Name</label>
              <input name="emp_emerg_contact_name" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Emergency Contact Number</label>
              <input name="emp_emerg_contact_num" onChange={handleChange} />
            </div>
          </fieldset>

          {/* Job Details */}
          <fieldset className="form-section">
            <legend>Job Details</legend>
            <div className="form-group">
              <label>Department</label>
              <select name="emp_department" onChange={handleChange}>
                <option value="">Select</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="programmer">Programmer</option>
                <option value="mobile developement">Mobile Development</option>
                <option value="content writer">Content Writer</option>
                <option value="junior programmer">Junior Programmer</option>
                <option value="junior content writer">Junior Content Writer</option>
                <option value="video editor">Video Editor</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="form-group">
              <label>Designation</label>
              <select name="emp_designation" onChange={handleChange}>
                <option value="">Select</option>
                {(departmentDesignations[formData.emp_department?.toLowerCase()] || []).map((role, index) => (
                  <option key={index} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Team</label>
              <select name="team" onChange={handleChange}>
                <option value="">Select</option>
                <option value="tech">Tech Team</option>
                <option value="social">Social Team</option>
              </select>
            </div>
            <div className="form-group">
              <label>Joining Date</label>
              <input type="date" name="emp_date_of_joining" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>CTC</label>
              <input name="emp_ctc" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" onChange={handleChange}>
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="resigned">Resigned</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
          </fieldset>

          {/* Verification */}
          <fieldset className="form-section">
            <legend>Verification</legend>
            <div className="form-group">
              <label>ID Proof</label>
              <input name="emp_id_proof" onChange={handleChange} />
            </div>
          </fieldset>

          {/* Submit */}
          <button className="submit-btn" type="submit">Register Employee</button>
        </form>
      </div>
    </div>
  );
};

export default EmpRegistrationForm;
