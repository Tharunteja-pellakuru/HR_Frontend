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
    const [isEditing, setIsEditing] = useState(false);
    const [editingClientId, setEditingClientId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [clientToDelete, setClientToDelete] = useState(null);
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
    
    // Dropdown State
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const countryDropdownRef = React.useRef(null);
    
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
                setIsCountryDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (isEditing) {
            setClients(prev => prev.map(client => 
                client.id === editingClientId 
                    ? { 
                        ...client, 
                        name: formData.name, 
                        email: formData.email, 
                        phone: formData.phone, 
                        location: formData.city || formData.state || client.location 
                      } 
                    : client
            ));
        } else {
            const newClient = {
                id: Date.now(), // Use unique ID
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                location: formData.city || formData.state || "N/A"
            };
            setClients(prev => [newClient, ...prev]); // Prepend so it shows on first page
            setSearchQuery(""); // Reset search to show all results
        }
        
        setShowAddModal(false);
        setIsEditing(false);
        setEditingClientId(null);
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

    const handleEdit = (client) => {
        setFormData({
            name: client.name,
            email: client.email,
            phone: client.phone,
            address: "", // Mock data doesn't have detailed address
            city: client.location, // Assuming location stores city/state
            pincode: "",
            state: "",
            country: "INDIA"
        });
        setEditingClientId(client.id);
        setIsEditing(true);
        setShowAddModal(true);
    };

    const handleDelete = (client) => {
        setClientToDelete(client);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (clientToDelete) {
            setClients(prev => prev.filter(client => client.id !== clientToDelete.id));
            setShowDeleteModal(false);
            setClientToDelete(null);
        }
    };

    // Mock client data matching the reference image
    const [clients, setClients] = useState([
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
    ]);

    // Search and Pagination Logic
    const filteredClients = clients.filter(client => 
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone.includes(searchQuery) ||
        client.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Reset pagination on search
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                                <col style={{ width: '18%', minWidth: '120px' }} />
                                <col style={{ width: '22%', minWidth: '180px' }} />
                                <col style={{ width: '18%', minWidth: '130px' }} />
                                <col style={{ width: '18%', minWidth: '100px' }} />
                                <col style={{ width: '14%', minWidth: '100px' }} />
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
                                {currentItems.length > 0 ? (
                                    currentItems.map((client) => (
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
                                                    <button 
                                                        className={styles.action_btn} 
                                                        title="Edit"
                                                        onClick={() => handleEdit(client)}
                                                    >
                                                    <FaEdit />
                                                </button>
                                                <button 
                                                    className={styles.action_btn} 
                                                    title="Delete"
                                                    onClick={() => handleDelete(client)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                                            No clients found matching your search.
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
                            
                            {Array.from({ length: Math.ceil(filteredClients.length / itemsPerPage) }, (_, i) => (
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
                                disabled={currentPage === Math.ceil(filteredClients.length / itemsPerPage) || filteredClients.length === 0} 
                                onClick={() => paginate(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Client Modal */}
            {showAddModal && (
                <div className={styles.modal_overlay} style={{ zIndex: 1000 }}>
                    <div className={styles.modal_container}>
                        <div className={styles.modal_header}>
                            <h3>{isEditing ? "Edit Client" : "Add New Client"}</h3>
                            <button 
                                className={styles.modal_close_btn}
                                onClick={() => {
                                    setShowAddModal(false);
                                    setIsEditing(false);
                                    setEditingClientId(null);
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
                                <div className={styles.custom_dropdown} ref={countryDropdownRef} style={{ width: '100%' }}>
                                    <div 
                                        className={styles.dropdown_toggle} 
                                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                        style={{ background: '#FFF' }}
                                    >
                                        <span style={{ color: '#333' }}>{formData.country}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isCountryDropdownOpen ? styles.arrow_up : styles.arrow_down}>
                                            <path d="M6 9l6 6 6-6"/>
                                        </svg>
                                    </div>
                                    {isCountryDropdownOpen && (
                                        <div className={styles.dropdown_menu}>
                                            {["INDIA", "USA", "UK", "CANADA", "AUSTRALIA"].map((country, idx) => (
                                                <div 
                                                    key={idx}
                                                    className={`${styles.dropdown_item} ${formData.country === country ? styles.dropdown_item_active : ''}`}
                                                    onClick={() => {
                                                        handleInputChange({ target: { name: 'country', value: country } });
                                                        setIsCountryDropdownOpen(false);
                                                    }}
                                                >
                                                    {country}
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
                                Are you sure you want to delete this client?
                            </p>
                            <p style={{ fontWeight: '600', color: '#555', margin: 0, fontSize: '14px' }}>
                                {clientToDelete?.name}
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

export default Clients;
