import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
import { FaSearch, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const ProjectCategory = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const totalPages = 150;

    // Form state for new category
    const [formData, setFormData] = useState({
        categoryName: "",
        description: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log("Saving category:", formData);
        setShowAddModal(false);
        setFormData({ categoryName: "", description: "" });
    };

    // Mock category data
    const categories = [
        { id: 1, name: "Website", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 2, name: "Social Media", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 3, name: "AMC", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 4, name: "Photo Shoot", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 5, name: "App Development", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 6, name: "Corporate Branding", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 7, name: "Corporate Video", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 8, name: "SEO", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 9, name: "Content Management", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
    ];

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />

                <div className={styles.dashboard_content}>
                    {/* Page Header with Search and Add New */}
                    <div className={styles.daily_report_header}>
                        <h2 className={styles.pageTitle}>Project Category</h2>
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
                                onClick={() => setShowAddModal(true)}
                            >
                                Add New
                            </button>
                        </div>
                    </div>

                    {/* Category Table */}
                    <div className={styles.daily_report_table_wrapper}>
                        <table className={styles.daily_report_table}>
                            <colgroup>
                                <col style={{ width: '20%' }} />
                                <col style={{ width: '65%' }} />
                                <col style={{ width: '15%' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Category Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id} className={styles.data_row}>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>
                                            <div className={styles.action_buttons}>
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

            {/* Add New Category Modal */}
            {showAddModal && (
                <div className={styles.modal_overlay}>
                    <div className={styles.modal_container}>
                        <div className={styles.modal_header}>
                            <h3>Add New Project Category</h3>
                            <button 
                                className={styles.modal_close_btn}
                                onClick={() => setShowAddModal(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.modal_body}>
                            <div className={styles.form_row}>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="categoryName"
                                    value={formData.categoryName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>Description:</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    style={{ minHeight: '280px' }}
                                />
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

export default ProjectCategory;
