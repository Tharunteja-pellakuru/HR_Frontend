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
    const [isEditing, setIsEditing] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    // Mock category data initialized in state
    const [categories, setCategories] = useState([
        { id: 1, name: "Website", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 2, name: "Social Media", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 3, name: "AMC", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 4, name: "Photo Shoot", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 5, name: "App Development", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 6, name: "Corporate Branding", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 7, name: "Corporate Video", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 8, name: "SEO", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { id: 9, name: "Content Management", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
    ]);

    // Form state for new category
    const [formData, setFormData] = useState({
        categoryName: "",
        description: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Reset pagination when search query changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const handleSave = () => {
        if (isEditing) {
            setCategories(prev => prev.map(cat => 
                cat.id === editingCategoryId 
                    ? { ...cat, name: formData.categoryName, description: formData.description } 
                    : cat
            ));
        } else {
            const newCategory = {
                id: Date.now(),
                name: formData.categoryName,
                description: formData.description
            };
            setCategories(prev => [newCategory, ...prev]);
            setSearchQuery(""); // Reset search to show all results
        }
        
        setShowAddModal(false);
        setIsEditing(false);
        setEditingCategoryId(null);
        setFormData({ categoryName: "", description: "" });
    };

    const handleEdit = (category) => {
        setFormData({
            categoryName: category.name,
            description: category.description
        });
        setEditingCategoryId(category.id);
        setIsEditing(true);
        setShowAddModal(true);
    };

    const handleDelete = (category) => {
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            setCategories(prev => prev.filter(cat => cat.id !== categoryToDelete.id));
            setShowDeleteModal(false);
            setCategoryToDelete(null);
        }
    };

    // Filter categories based on search query
    const filteredCategories = categories.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                                <col style={{ width: '20%', minWidth: '150px' }} />
                                <col style={{ width: '65%', minWidth: '300px' }} />
                                <col style={{ width: '15%', minWidth: '100px' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Category Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((category) => (
                                        <tr key={category.id} className={styles.data_row}>
                                            <td>{category.name}</td>
                                            <td>{category.description}</td>
                                            <td>
                                                <div className={styles.action_buttons}>
                                                    <button 
                                                        className={styles.action_btn} 
                                                        title="Edit"
                                                        onClick={() => handleEdit(category)}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button 
                                                        className={styles.action_btn} 
                                                        title="Delete"
                                                        onClick={() => handleDelete(category)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
                                            No categories found matching your search.
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
                            
                            {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }, (_, i) => (
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
                                disabled={currentPage === totalPages || totalPages === 0} 
                                onClick={() => paginate(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Category Modal */}
            {showAddModal && (
                <div className={styles.modal_overlay} style={{ zIndex: 1000 }}>
                    <div className={styles.modal_container}>
                        <div className={styles.modal_header}>
                            <h3>{isEditing ? "Edit Project Category" : "Add New Project Category"}</h3>
                            <button 
                                className={styles.modal_close_btn}
                                onClick={() => {
                                    setShowAddModal(false);
                                    setIsEditing(false);
                                    setEditingCategoryId(null);
                                }}
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
                                Are you sure you want to delete this category?
                            </p>
                            <p style={{ fontWeight: '600', color: '#555', margin: 0, fontSize: '14px' }}>
                                {categoryToDelete?.name}
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

export default ProjectCategory;
