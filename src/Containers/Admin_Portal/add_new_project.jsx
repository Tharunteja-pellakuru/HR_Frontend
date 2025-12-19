import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
import { FaPlus, FaTimes } from "react-icons/fa";

const AddNewProject = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        projectName: "",
        category: "",
        client: "",
        startDate: "",
        dueDate: "",
        existingUrl: "",
        description: ""
    });

    const [selectedEmployees, setSelectedEmployees] = useState([
        { id: 1, name: "Vishal" },
        { id: 2, name: "Vamsi" },
        { id: 3, name: "Spr" },
        { id: 4, name: "Murlidhari" }
    ]);

    const [selectedTags, setSelectedTags] = useState([
        "inbox", "irene", "Vishal", "inbox", "irene"
    ]);

    // Modal states
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showClientModal, setShowClientModal] = useState(false);

    // Dropdown states
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isClientOpen, setIsClientOpen] = useState(false);
    const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);

    const categoryRef = React.useRef(null);
    const clientRef = React.useRef(null);
    const employeeRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) setIsCategoryOpen(false);
            if (clientRef.current && !clientRef.current.contains(event.target)) setIsClientOpen(false);
            if (employeeRef.current && !employeeRef.current.contains(event.target)) setIsEmployeeOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Modal form data
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });
    const [newClient, setNewClient] = useState({
        name: "", email: "", phone: "", address: "", city: "", pincode: "", state: "", country: ""
    });

    // Mock data for dropdowns
    const [categories, setCategories] = useState(["Website", "Social Media", "AMC", "Photo Shoot", "App Development", "Corporate Branding"]);
    const [clients, setClients] = useState(["Chetan Reddy", "Ramesh Legala", "Murlidhar", "SVIS", "Amir", "Hyma"]);
    const employees = ["Vishal", "Vamsi", "Spr", "Murlidhari", "Ravi", "Kumar"];

    const handleAddEmployee = (empName) => {
        if (!selectedEmployees.some(emp => emp.name === empName)) {
            setSelectedEmployees(prev => [...prev, { id: Date.now(), name: empName }]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const removeEmployee = (id) => {
        setSelectedEmployees(prev => prev.filter(emp => emp.id !== id));
    };

    const removeTag = (index) => {
        setSelectedTags(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        console.log("Submitting project:", formData, selectedEmployees);
        navigate('/admin/projects');
    };

    const handleSaveCategory = () => {
        if (newCategory.name) {
            setCategories(prev => [...prev, newCategory.name]);
            setNewCategory({ name: "", description: "" });
            setShowCategoryModal(false);
        }
    };

    const handleSaveClient = () => {
        if (newClient.name) {
            setClients(prev => [...prev, newClient.name]);
            setNewClient({ name: "", email: "", phone: "", address: "", city: "", pincode: "", state: "", country: "" });
            setShowClientModal(false);
        }
    };

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />

                <div className={styles.dashboard_content}>
                    {/* Page Header */}
                    <div className={styles.daily_report_header}>
                        <h2 className={styles.pageTitle}>Add New Project</h2>
                        <button 
                            className={styles.go_back_btn_grey}
                            onClick={() => navigate('/admin/projects')}
                        >
                            Go Back
                        </button>
                    </div>

                    {/* Form Container */}
                    <div className={styles.add_project_container}>
                        <div className={styles.add_project_form}>
                            {/* Left Column - Form Fields */}
                            <div className={styles.form_left_column}>
                                {/* Project Name */}
                                <div className={styles.form_row}>
                                    <label>Project Name</label>
                                    <input
                                        type="text"
                                        name="projectName"
                                        value={formData.projectName}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Select Category */}
                                <div className={styles.form_row}>
                                    <label>Select Category</label>
                                    <div className={styles.input_with_button} style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className={styles.custom_dropdown} ref={categoryRef} style={{ width: '100%', marginRight: '10px' }}>
                                            <div 
                                                className={styles.dropdown_toggle} 
                                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                                style={{ background: '#FFF' }}
                                            >
                                                <span style={{ color: formData.category ? '#333' : '#888' }}>
                                                    {formData.category || "Select Category"}
                                                </span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isCategoryOpen ? styles.arrow_up : styles.arrow_down}>
                                                    <path d="M6 9l6 6 6-6"/>
                                                </svg>
                                            </div>
                                            {isCategoryOpen && (
                                                <div className={styles.dropdown_menu}>
                                                    <div 
                                                        className={`${styles.dropdown_item} ${formData.category === "" ? styles.dropdown_item_active : ''}`}
                                                        onClick={() => {
                                                            handleInputChange({ target: { name: 'category', value: '' } });
                                                            setIsCategoryOpen(false);
                                                        }}
                                                    >
                                                        Select Category
                                                    </div>
                                                    {categories.map((cat, idx) => (
                                                        <div 
                                                            key={idx}
                                                            className={`${styles.dropdown_item} ${formData.category === cat ? styles.dropdown_item_active : ''}`}
                                                            onClick={() => {
                                                                handleInputChange({ target: { name: 'category', value: cat } });
                                                                setIsCategoryOpen(false);
                                                            }}
                                                        >
                                                            {cat}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <button 
                                            type="button"
                                            className={styles.plus_btn}
                                            onClick={() => setShowCategoryModal(true)}
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>

                                {/* Select Client */}
                                <div className={styles.form_row}>
                                    <label>Select Client</label>
                                    <div className={styles.input_with_button} style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className={styles.custom_dropdown} ref={clientRef} style={{ width: '100%', marginRight: '10px' }}>
                                            <div 
                                                className={styles.dropdown_toggle} 
                                                onClick={() => setIsClientOpen(!isClientOpen)}
                                                style={{ background: '#FFF' }}
                                            >
                                                <span style={{ color: formData.client ? '#333' : '#888' }}>
                                                    {formData.client || "Select Client"}
                                                </span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isClientOpen ? styles.arrow_up : styles.arrow_down}>
                                                    <path d="M6 9l6 6 6-6"/>
                                                </svg>
                                            </div>
                                            {isClientOpen && (
                                                <div className={styles.dropdown_menu}>
                                                    <div 
                                                        className={`${styles.dropdown_item} ${formData.client === "" ? styles.dropdown_item_active : ''}`}
                                                        onClick={() => {
                                                            handleInputChange({ target: { name: 'client', value: '' } });
                                                            setIsClientOpen(false);
                                                        }}
                                                    >
                                                        Select Client
                                                    </div>
                                                    {clients.map((client, idx) => (
                                                        <div 
                                                            key={idx}
                                                            className={`${styles.dropdown_item} ${formData.client === client ? styles.dropdown_item_active : ''}`}
                                                            onClick={() => {
                                                                handleInputChange({ target: { name: 'client', value: client } });
                                                                setIsClientOpen(false);
                                                            }}
                                                        >
                                                            {client}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <button 
                                            type="button"
                                            className={styles.plus_btn}
                                            onClick={() => setShowClientModal(true)}
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>

                                {/* Start Date */}
                                <div className={styles.form_row}>
                                    <label>Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Due Date */}
                                <div className={styles.form_row}>
                                    <label>Due Date</label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Existing URL */}
                                <div className={styles.form_row}>
                                    <label>Existing URL (If Any)</label>
                                    <input
                                        type="text"
                                        name="existingUrl"
                                        value={formData.existingUrl}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Assign to */}
                                <div className={styles.form_row}>
                                    <label>Assign to</label>
                                    <div className={styles.input_with_button} style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className={styles.custom_dropdown} ref={employeeRef} style={{ width: '100%', marginRight: '10px' }}>
                                            <div 
                                                className={styles.dropdown_toggle} 
                                                onClick={() => setIsEmployeeOpen(!isEmployeeOpen)}
                                                style={{ background: '#FFF' }}
                                            >
                                                <span style={{ color: '#888' }}>Select Employee</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isEmployeeOpen ? styles.arrow_up : styles.arrow_down}>
                                                    <path d="M6 9l6 6 6-6"/>
                                                </svg>
                                            </div>
                                            {isEmployeeOpen && (
                                                <div className={styles.dropdown_menu}>
                                                    {employees.map((emp, idx) => (
                                                        <div 
                                                            key={idx}
                                                            className={styles.dropdown_item}
                                                            onClick={() => {
                                                                handleAddEmployee(emp);
                                                                setIsEmployeeOpen(false);
                                                            }}
                                                        >
                                                            {emp}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <button className={styles.plus_btn}>
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>

                                {/* Selected Employees Tags */}
                                <div className={styles.selected_tags}>
                                    {selectedEmployees.map((emp) => (
                                        <span key={emp.id} className={styles.tag}>
                                            {emp.name}
                                            <button onClick={() => removeEmployee(emp.id)}>
                                                <FaTimes />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column - Description */}
                            <div className={styles.form_right_column}>
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className={styles.description_textarea}
                                />
                            </div>
                        </div>

                        {/* Add Button */}
                        <div className={styles.form_actions}>
                            <button 
                                className={styles.add_btn}
                                onClick={handleSubmit}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Project Category Modal */}
            {showCategoryModal && (
                <div className={styles.modal_overlay}>
                    <div className={styles.modal_container}>
                        <div className={styles.modal_header}>
                            <h3>Add New Project Category</h3>
                            <button 
                                className={styles.modal_close_btn}
                                onClick={() => setShowCategoryModal(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.modal_body}>
                            <div className={styles.form_row}>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={newCategory.name}
                                    onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>Description:</label>
                                <textarea
                                    value={newCategory.description}
                                    onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                                    style={{ minHeight: '280px' }}
                                />
                            </div>
                        </div>
                        <div className={styles.modal_footer}>
                            <button 
                                className={styles.save_btn}
                                onClick={handleSaveCategory}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add New Client Modal */}
            {showClientModal && (
                <div className={styles.modal_overlay}>
                    <div className={styles.modal_container}>
                        <div className={styles.modal_header}>
                            <h3>Add New Client</h3>
                            <button 
                                className={styles.modal_close_btn}
                                onClick={() => setShowClientModal(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.modal_body}>
                            <div className={styles.form_row}>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={newClient.name}
                                    onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={newClient.email}
                                    onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>Phone Number:</label>
                                <input
                                    type="text"
                                    value={newClient.phone}
                                    onChange={(e) => setNewClient(prev => ({ ...prev, phone: e.target.value }))}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>Address line 1:</label>
                                <textarea
                                    value={newClient.address}
                                    onChange={(e) => setNewClient(prev => ({ ...prev, address: e.target.value }))}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>City:</label>
                                <input
                                    type="text"
                                    value={newClient.city}
                                    onChange={(e) => setNewClient(prev => ({ ...prev, city: e.target.value }))}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>Pincode:</label>
                                <input
                                    type="text"
                                    value={newClient.pincode}
                                    onChange={(e) => setNewClient(prev => ({ ...prev, pincode: e.target.value }))}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>State:</label>
                                <input
                                    type="text"
                                    value={newClient.state}
                                    onChange={(e) => setNewClient(prev => ({ ...prev, state: e.target.value }))}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>Country:</label>
                                <select
                                    value={newClient.country}
                                    onChange={(e) => setNewClient(prev => ({ ...prev, country: e.target.value }))}
                                >
                                    <option value="">Select Country</option>
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                    <option value="Australia">Australia</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.modal_footer}>
                            <button 
                                className={styles.save_btn}
                                onClick={handleSaveClient}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddNewProject;
