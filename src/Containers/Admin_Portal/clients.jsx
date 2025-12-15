import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebarMenu from "../../Components/Common/admin_sidebarmenu";
import HeaderDashboard from "../../Components/Layout/Header_dashboard";
import styles from "../../Styles/dashboard.module.css";
import { FaSearch, FaEye, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const Clients = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const totalPages = 150;

    // Form state for new client
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        state: "",
        country: "INDIA"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log("Saving client:", formData);
        // TODO: Add API call to save client
        setShowAddModal(false);
        setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            pincode: "",
            state: "",
            country: "INDIA"
        });
    };

    // Mock client data matching the reference image
    const clients = [
        { id: 1, name: "Chetan Reddy", email: "chetan@gmail.com", phone: "9949594508", location: "Rajahmundry" },
        { id: 2, name: "Ramesh Legala", email: "rameshlegala@gmail.com", phone: "9949545508", location: "Hyderbad" },
        { id: 3, name: "Murlidhar", email: "kumarmanda@gmail.com", phone: "6300594508", location: "Kakinada" },
        { id: 4, name: "SVIS", email: "svis@email.com", phone: "7998653210", location: "Visakhapatnam" },
        { id: 5, name: "Amir", email: "amir@email.com", phone: "9876543210", location: "Mumbai" },
        { id: 6, name: "Hyma", email: "hyma@email.com", phone: "7654321098", location: "Hyderbad" },
        { id: 7, name: "Anuradha Rao", email: "anuradha@email.com", phone: "8765432198", location: "Bengaluru" },
        { id: 8, name: "Suesha", email: "suesha@email.com", phone: "6543219876", location: "Chennai" },
        { id: 9, name: "Rashi Agarwal", email: "rashiagarwal@gmail.com", phone: "6300125789", location: "Vijayawada" },
        { id: 10, name: "KVS", email: "kvs@gmail.com", phone: "7998752301", location: "Hyderbad" },
    ];

    return (
        <div className={styles.emp_dashboard_wrapper}>
            <AdminSidebarMenu />
            <div className={styles.admin_dashboard_main}>
                <HeaderDashboard />

                <div className={styles.dashboard_content}>
                    {/* Page Header with Search and Add New */}
                    <div className={styles.daily_report_header}>
                        <h2 className={styles.pageTitle}>Client List</h2>
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

                    {/* Client Table */}
                    <div className={styles.daily_report_table_wrapper}>
                        <table className={styles.daily_report_table}>
                            <colgroup>
                                <col style={{ width: '18%' }} />
                                <col style={{ width: '22%' }} />
                                <col style={{ width: '18%' }} />
                                <col style={{ width: '18%' }} />
                                <col style={{ width: '14%' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone number</th>
                                    <th>Location</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client) => (
                                    <tr key={client.id} className={styles.data_row}>
                                        <td>{client.name}</td>
                                        <td>
                                            <a href={`mailto:${client.email}`} style={{ color: '#4B8BF5', textDecoration: 'none' }}>
                                                {client.email}
                                            </a>
                                        </td>
                                        <td>{client.phone}</td>
                                        <td>{client.location}</td>
                                        <td>
                                            <div className={styles.action_buttons}>
                                                <button 
                                                    className={styles.action_btn} 
                                                    title="View"
                                                    onClick={() => navigate(`/admin/clients/${client.id}`)}
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

            {/* Add New Client Modal */}
            {showAddModal && (
                <div className={styles.modal_overlay}>
                    <div className={styles.modal_container}>
                        <div className={styles.modal_header}>
                            <h3>Add New Client</h3>
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
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>Phone Number:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>Address line 1:</label>
                                <textarea
                                    type="textarea"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>City:</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>Pincode:</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>State:</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.form_row}>
                                <label>Country:</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                >
                                    <option value="INDIA">INDIA</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                    <option value="CANADA">CANADA</option>
                                    <option value="AUSTRALIA">AUSTRALIA</option>
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

export default Clients;
