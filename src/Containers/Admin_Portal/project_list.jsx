import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
import { FaSearch, FaEye, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const ProjectList = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    // Mock project data matching reference image - moved to state
    const [projects, setProjects] = useState([
        { sno: "0001", projectName: "project name", category: "Website", clientName: "Chetan Reddy", startDate: "05-10-2024", dueDate: "18-01-2025", status: "Ongoing" },
        { sno: "0002", projectName: "project name", category: "Social Media", clientName: "Ramesh Legala", startDate: "12-08-2024", dueDate: "12-12-2024", status: "Completed" },
        { sno: "0003", projectName: "project name", category: "AMC", clientName: "Murlidhar", startDate: "24-06-2024", dueDate: "10-01-2025", status: "Overdue" },
        { sno: "0004", projectName: "project name", category: "Photo Shoot", clientName: "SVIS", startDate: "31-10-2024", dueDate: "31-12-2024", status: "Completed" },
        { sno: "0005", projectName: "project name", category: "App Development", clientName: "Amir", startDate: "03-07-2024", dueDate: "03-01-2025", status: "Completed" },
        { sno: "0006", projectName: "project name", category: "Corporate Branding", clientName: "Hyma", startDate: "16-05-2024", dueDate: "16-01-2025", status: "Ongoing" },
        { sno: "0007", projectName: "project name", category: "Corporate Video", clientName: "Anuradha Rao", startDate: "22-09-2024", dueDate: "08-01-2025", status: "Overdue" },
        { sno: "0008", projectName: "project name", category: "SEO", clientName: "Suesha", startDate: "25-08-2024", dueDate: "25-01-2025", status: "Ongoing" },
        { sno: "0009", projectName: "project name", category: "Content Management", clientName: "Rashi Agarwal", startDate: "01-05-2024", dueDate: "01-01-2025", status: "Completed" },
        { sno: "0010", projectName: "project name", category: "Website", clientName: "KVS", startDate: "08-11-2024", dueDate: "08-02-2025", status: "Ongoing" },
    ]);
    
    // Dropdown States for Modal
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

    // Refs
    const categoryRef = React.useRef(null);
    const statusRef = React.useRef(null);
    const clientModalRef = React.useRef(null);
    const employeeModalRef = React.useRef(null);
    
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) setIsCategoryOpen(false);
            if (statusRef.current && !statusRef.current.contains(event.target)) setIsStatusOpen(false);
            if (clientModalRef.current && !clientModalRef.current.contains(event.target)) setIsClientModalOpen(false);
            if (employeeModalRef.current && !employeeModalRef.current.contains(event.target)) setIsEmployeeModalOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Reset pagination when search query changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    // Mock Data for Dropdowns
    const CATEGORIES = ["Website", "Social Media", "AMC", "Photo Shoot", "App Development", "Corporate Branding", "Corporate Video", "SEO"];
    const CLIENTS = ["Chetan Reddy", "Ramesh Legala", "Murlidhar", "SVIS", "Amir", "Hyma", "Anuradha Rao", "Suesha", "KVS"];
    const EMPLOYEES = ["Vishal", "Veera", "Sandeep", "Lokesh", "Jagadeesh", "Shayam", "Sai"];

    // Form state for new project
    const [formData, setFormData] = useState({
        projectName: "",
        category: "",
        clientName: "",
        startDate: "",
        dueDate: "",
        status: "Ongoing"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (isEditing) {
            setProjects(prev => prev.map(project => 
                project.sno === editingProjectId 
                    ? { 
                        ...project, 
                        projectName: formData.projectName, 
                        category: formData.category, 
                        clientName: formData.clientName, 
                        startDate: formData.startDate, 
                        dueDate: formData.dueDate, 
                        status: formData.status 
                      } 
                    : project
            ));
        } else {
            const nextSno = (projects.length + 1).toString().padStart(4, '0');
            const newProject = {
                sno: nextSno,
                projectName: formData.projectName,
                category: formData.category,
                clientName: formData.clientName,
                startDate: formData.startDate,
                dueDate: formData.dueDate,
                status: formData.status
            };
            setProjects(prev => [newProject, ...prev]);
            setSearchQuery(""); // Reset search to show all
        }
        
        setShowAddModal(false);
        setIsEditing(false);
        setEditingProjectId(null);
        setFormData({
            projectName: "",
            category: "",
            clientName: "",
            startDate: "",
            dueDate: "",
            status: "Ongoing"
        });
    };

    const handleEdit = (project) => {
        setFormData({
            projectName: project.projectName,
            category: project.category,
            clientName: project.clientName,
            startDate: project.startDate, // Note: In a real app, you'd format date strings
            dueDate: project.dueDate,
            status: project.status
        });
        setEditingProjectId(project.sno);
        setIsEditing(true);
        setShowAddModal(true);
    };

    const handleDelete = (project) => {
        setProjectToDelete(project);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (projectToDelete) {
            setProjects(prev => prev.filter(p => p.sno !== projectToDelete.sno));
            setShowDeleteModal(false);
            setProjectToDelete(null);
        }
    };

    // Filter projects based on search query
    const filteredProjects = projects.filter(project => 
        project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
    const totalPagesCount = Math.ceil(filteredProjects.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getStatusStyle = (status) => {
        switch (status) {
            case "Ongoing":
                return { color: "#F5A623" };
            case "Completed":
                return { color: "#73BF44" };
            case "Overdue":
                return { color: "#E74C3C" };
            default:
                return { color: "#333" };
        }
    };

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />

                <div className={styles.dashboard_content}>
                    {/* Page Header with Search and Add New */}
                    <div className={styles.daily_report_header}>
                        <h2 className={styles.pageTitle}>Project List</h2>
                        <div className={styles.daily_report_filters}>
                            <div className={styles.search_box}>
                                <FaSearch className={styles.search_icon} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={styles.search_input}
                                />
                            </div>
                            <button 
                                className={styles.add_new_btn}
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditingProjectId(null);
                                    setFormData({
                                        projectName: "",
                                        category: "",
                                        clientName: "",
                                        startDate: "",
                                        dueDate: "",
                                        status: "Ongoing"
                                    });
                                    setShowAddModal(true);
                                }}
                            >
                                Add New
                            </button>
                        </div>
                    </div>

                    {/* Project Table */}
                    <div className={styles.daily_report_table_wrapper}>
                        <table className={styles.daily_report_table}>
                            <colgroup>
                                <col style={{ width: '6%', minWidth: '50px' }} />
                                <col style={{ width: '12%', minWidth: '120px' }} />
                                <col style={{ width: '15%', minWidth: '130px' }} />
                                <col style={{ width: '13%', minWidth: '110px' }} />
                                <col style={{ width: '12%', minWidth: '100px' }} />
                                <col style={{ width: '12%', minWidth: '100px' }} />
                                <col style={{ width: '12%', minWidth: '90px' }} />
                                <col style={{ width: '10%', minWidth: '100px' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Project Name</th>
                                    <th>Category</th>
                                    <th>Client Name</th>
                                    <th>Start Date</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((project) => (
                                        <tr key={project.sno} className={styles.data_row}>
                                            <td>{project.sno}</td>
                                            <td>{project.projectName}</td>
                                            <td>{project.category}</td>
                                            <td>{project.clientName}</td>
                                            <td>{project.startDate}</td>
                                            <td>{project.dueDate}</td>
                                            <td>
                                                <span style={getStatusStyle(project.status)}>
                                                    {project.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className={styles.action_buttons}>
                                                    <button 
                                                        className={styles.action_btn} 
                                                        title="View"
                                                        onClick={() => navigate(`/admin/projects/${project.sno}`)}
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button 
                                                        className={styles.action_btn} 
                                                        title="Edit"
                                                        onClick={() => handleEdit(project)}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button 
                                                        className={styles.action_btn} 
                                                        title="Delete"
                                                        onClick={() => handleDelete(project)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
                                            No projects found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className={styles.pagination_container}>
                            <button 
                                className={styles.pagination_btn} 
                                disabled={currentPage === 1} 
                                onClick={() => paginate(currentPage - 1)}
                            >
                                Previous
                            </button>
                            
                            {Array.from({ length: Math.ceil(projects.length / itemsPerPage) }, (_, i) => (
                                <button
                                    key={i + 1}
                                    className={`${styles.pagination_btn} ${currentPage === i + 1 ? styles.pagination_btn_active : ''}`}
                                    onClick={() => paginate(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button 
                                className={styles.pagination_btn} 
                                disabled={currentPage === totalPagesCount || totalPagesCount === 0} 
                                onClick={() => paginate(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Project Modal */}
            {showAddModal && (
                <div className={styles.modal_overlay} style={{ zIndex: 1000 }}>
                    <div className={styles.modal_container}>
                        <div className={styles.modal_header}>
                            <h3>{isEditing ? "Edit Project" : "Add New Project"}</h3>
                            <button 
                                className={styles.modal_close_btn}
                                onClick={() => {
                                    setShowAddModal(false);
                                    setIsEditing(false);
                                    setEditingProjectId(null);
                                }}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.modal_body}>
                            <div className={styles.form_row}>
                                <label>Project Name:</label>
                                <input
                                    type="text"
                                    name="projectName"
                                    value={formData.projectName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>Category:</label>
                                <div className={styles.custom_dropdown} ref={categoryRef} style={{ width: '100%' }}>
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
                                            {["Website", "Social Media", "AMC", "Photo Shoot", "App Development", "Corporate Branding", "Corporate Video", "SEO"].map((cat, idx) => (
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
                            </div>
                            <div className={styles.form_row}>
                                <label>Client Name:</label>
                                <div className={styles.custom_dropdown} ref={clientModalRef} style={{ width: '100%' }}>
                                    <div 
                                        className={styles.dropdown_toggle} 
                                        onClick={() => setIsClientModalOpen(!isClientModalOpen)}
                                        style={{ background: '#FFF' }}
                                    >
                                        <span style={{ color: formData.clientName ? '#333' : '#888' }}>
                                            {formData.clientName || "Select Client"}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isClientModalOpen ? styles.arrow_up : styles.arrow_down}>
                                            <path d="M6 9l6 6 6-6"/>
                                        </svg>
                                    </div>
                                    {isClientModalOpen && (
                                        <div className={styles.dropdown_menu}>
                                            <div 
                                                className={`${styles.dropdown_item} ${formData.clientName === "" ? styles.dropdown_item_active : ''}`}
                                                onClick={() => {
                                                    handleInputChange({ target: { name: 'clientName', value: '' } });
                                                    setIsClientModalOpen(false);
                                                }}
                                            >
                                                Select Client
                                            </div>
                                            {CLIENTS.map((client, idx) => (
                                                <div 
                                                    key={idx}
                                                    className={`${styles.dropdown_item} ${formData.clientName === client ? styles.dropdown_item_active : ''}`}
                                                    onClick={() => {
                                                        handleInputChange({ target: { name: 'clientName', value: client } });
                                                        setIsClientModalOpen(false);
                                                    }}
                                                >
                                                    {client}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.form_row}>
                                <label>Select Employee:</label>
                                <div className={styles.custom_dropdown} ref={employeeModalRef} style={{ width: '100%' }}>
                                    <div 
                                        className={styles.dropdown_toggle} 
                                        onClick={() => setIsEmployeeModalOpen(!isEmployeeModalOpen)}
                                        style={{ background: '#FFF' }}
                                    >
                                        <span style={{ color: formData.employee ? '#333' : '#888' }}>
                                            {formData.employee || "Select Employee"}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isEmployeeModalOpen ? styles.arrow_up : styles.arrow_down}>
                                            <path d="M6 9l6 6 6-6"/>
                                        </svg>
                                    </div>
                                    {isEmployeeModalOpen && (
                                        <div className={styles.dropdown_menu}>
                                            <div 
                                                className={`${styles.dropdown_item} ${formData.employee === "" ? styles.dropdown_item_active : ''}`}
                                                onClick={() => {
                                                    handleInputChange({ target: { name: 'employee', value: '' } });
                                                    setIsEmployeeModalOpen(false);
                                                }}
                                            >
                                                Select Employee
                                            </div>
                                            {EMPLOYEES.map((emp, idx) => (
                                                <div 
                                                    key={idx}
                                                    className={`${styles.dropdown_item} ${formData.employee === emp ? styles.dropdown_item_active : ''}`}
                                                    onClick={() => {
                                                        handleInputChange({ target: { name: 'employee', value: emp } });
                                                        setIsEmployeeModalOpen(false);
                                                    }}
                                                >
                                                    {emp}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.form_row}>
                                <label>Start Date:</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>Due Date:</label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>Status:</label>
                                <div className={styles.custom_dropdown} ref={statusRef} style={{ width: '100%' }}>
                                    <div 
                                        className={styles.dropdown_toggle} 
                                        onClick={() => setIsStatusOpen(!isStatusOpen)}
                                        style={{ background: '#FFF' }}
                                    >
                                        <span style={{ color: '#333' }}>{formData.status}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isStatusOpen ? styles.arrow_up : styles.arrow_down}>
                                            <path d="M6 9l6 6 6-6"/>
                                        </svg>
                                    </div>
                                    {isStatusOpen && (
                                        <div className={styles.dropdown_menu}>
                                            {["Ongoing", "Completed", "Overdue"].map((status, idx) => (
                                                <div 
                                                    key={idx}
                                                    className={`${styles.dropdown_item} ${formData.status === status ? styles.dropdown_item_active : ''}`}
                                                    onClick={() => {
                                                        handleInputChange({ target: { name: 'status', value: status } });
                                                        setIsStatusOpen(false);
                                                    }}
                                                >
                                                    {status}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.modal_footer}>
                            <button 
                                className={styles.save_btn}
                                onClick={handleSave}
                            >
                                {isEditing ? "Save Changes" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className={styles.modal_overlay} style={{ zIndex: 1001 }}>
                    <div className={styles.modal_container} style={{ maxWidth: '350px', minHeight: 'auto', height: 'auto', padding: '10px' }}>
                        <div className={styles.modal_header} style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>
                            <h3 style={{ fontSize: '15px', margin: 0 }}>Confirm Delete</h3>
                            <button 
                                className={styles.modal_close_btn}
                                onClick={() => setShowDeleteModal(false)}
                                style={{ margin: 0 }}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.modal_body} style={{ textAlign: 'center', padding: '20px 15px' }}>
                            <div style={{ color: '#E74C3C', marginBottom: '8px' }}>
                                <FaTrash size={24} />
                            </div>
                            <p style={{ fontSize: '14px', color: '#333', margin: '0 0 5px 0', lineHeight: '1.4' }}>
                                Are you sure you want to delete this project?
                            </p>
                            <p style={{ fontWeight: '600', color: '#555', margin: 0, fontSize: '14px' }}>
                                {projectToDelete?.projectName}
                            </p>
                        </div>
                        <div className={styles.modal_footer} style={{ justifyContent: 'center', gap: '10px', padding: '15px', borderTop: 'none' }}>
                            <button 
                                className={styles.add_new_btn} 
                                style={{ background: '#f5f5f5', color: '#333', border: '1px solid #ddd', padding: '6px 20px', fontSize: '13px', height: '34px' }}
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className={styles.save_btn}
                                style={{ background: '#E74C3C', border: 'none', padding: '6px 20px', fontSize: '13px', height: '34px' }}
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectList;
