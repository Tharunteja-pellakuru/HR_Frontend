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
    const totalPages = 150;

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
        console.log("Saving project:", formData);
        setShowAddModal(false);
        setFormData({
            projectName: "",
            category: "",
            clientName: "",
            startDate: "",
            dueDate: "",
            status: "Ongoing"
        });
    };

    // Mock project data matching reference image
    const projects = [
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
    ];

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
                                onClick={() => navigate('/admin/projects/add')}
                            >
                                Add New
                            </button>
                        </div>
                    </div>

                    {/* Project Table */}
                    <div className={styles.daily_report_table_wrapper}>
                        <table className={styles.daily_report_table}>
                            <colgroup>
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '12%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '13%' }} />
                                <col style={{ width: '12%' }} />
                                <col style={{ width: '12%' }} />
                                <col style={{ width: '12%' }} />
                                <col style={{ width: '10%' }} />
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
                                {projects.map((project) => (
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
                                                <button className={styles.action_btn} title="Edit">
                                                    <FaEdit />
                                                </button>
                                                <button className={styles.action_btn} title="Delete">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className={styles.pagination}>
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </button>
                            {[1, 2, 3, 4, 5].map((page) => (
                                <button
                                    key={page}
                                    className={currentPage === page ? styles.active_page : ""}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            ))}
                            <span>...</span>
                            <button onClick={() => setCurrentPage(150)}>150</button>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Project Modal */}
            {showAddModal && (
                <div className={styles.modal_overlay}>
                    <div className={styles.modal_container}>
                        <div className={styles.modal_header}>
                            <h3>Add New Project</h3>
                            <button 
                                className={styles.modal_close_btn}
                                onClick={() => setShowAddModal(false)}
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
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Website">Website</option>
                                    <option value="Social Media">Social Media</option>
                                    <option value="AMC">AMC</option>
                                    <option value="Photo Shoot">Photo Shoot</option>
                                    <option value="App Development">App Development</option>
                                    <option value="Corporate Branding">Corporate Branding</option>
                                    <option value="Corporate Video">Corporate Video</option>
                                    <option value="SEO">SEO</option>
                                </select>
                            </div>
                            <div className={styles.form_row}>
                                <label>Client Name:</label>
                                <input
                                    type="text"
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleInputChange}
                                />
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
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                >
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Overdue">Overdue</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.modal_footer}>
                            <button 
                                className={styles.save_btn}
                                onClick={handleSave}
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

export default ProjectList;
