import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "../../Styles/team.module.css"
import { MdWork, MdEmail } from "react-icons/md";
import { BsFillTelephoneFill  } from "react-icons/bs";

const TechTeamEmployess = () => {

    const naviagte = useNavigate();

    const employees = [
        {
            id: "EMP001",
            name: "Shyam Sunder Rao",
            image: "https://i.pravatar.cc/40?img=1",
            designation: "Frontend Developer",
            team: "Tech",
            email: "shyam@example.com",
            phone: "9876543210",
            status: "Active",
            joiningDate: "2022-01-15"
        },
        {
            id: "EMP002",
            name: "Rani Sharma",
            image: "https://i.pravatar.cc/40?img=2",
            designation: "UI Designer",
            team: "social",
            email: "rani@example.com",
            phone: "9876501123",
            status: "Active",
            joiningDate: "2021-10-10"
        },
        {
            id: "EMP003",
            name: "Kunal Mehta",
            image: "https://i.pravatar.cc/40?img=3",
            designation: "Backend Developer",
            team: "Tech",
            email: "kunal@example.com",
            phone: "9876543212",
            status: "On Leave",
            joiningDate: "2020-03-21"
        },
        {
            id: "EMP004",
            name: "Soumya Jain",
            image: "https://i.pravatar.cc/40?img=4",
            designation: "HR Executive",
            team: "social",
            email: "soumya@example.com",
            phone: "9876547890",
            status: "Active",
            joiningDate: "2019-07-19"
        },
        {
            id: "EMP005",
            name: "Mouli Das",
            image: "https://i.pravatar.cc/40?img=5",
            designation: "Content Writer",
            team: "social",
            email: "mouli@example.com",
            phone: "9876549999",
            status: "Resigned",
            joiningDate: "2021-11-01"
        },
        {
            id: "EMP006",
            name: "Surya Nair",
            image: "https://i.pravatar.cc/40?img=6",
            designation: "QA Engineer",
            team: "Tech",
            email: "surya@example.com",
            phone: "9876543111",
            status: "Active",
            joiningDate: "2022-06-05"
        },
        {
            id: "EMP007",
            name: "Srikanth Rao",
            image: "https://i.pravatar.cc/40?img=7",
            designation: "DevOps Engineer",
            team: "Tech",
            email: "srikanth@example.com",
            phone: "9876542222",
            status: "Active",
            joiningDate: "2020-12-15"
        },
        {
            id: "EMP008",
            name: "Silva Anthony",
            image: "https://i.pravatar.cc/40?img=8",
            designation: "Marketing Head",
            team: "social",
            email: "silva@example.com",
            phone: "9876509876",
            status: "Active",
            joiningDate: "2018-04-20"
        },
        {
            id: "EMP009",
            name: "Pradeep Varma",
            image: "https://i.pravatar.cc/40?img=9",
            designation: "Sales Lead",
            team: "social",
            email: "pradeep@example.com",
            phone: "9876543000",
            status: "Active",
            joiningDate: "2019-09-09"
        },
        {
            id: "EMP010",
            name: "Minal Kaur",
            image: "https://i.pravatar.cc/40?img=10",
            designation: "Business Analyst",
            team: "social",
            email: "minal@example.com",
            phone: "9876501111",
            status: "Active",
            joiningDate: "2023-01-01"
        }
    ];

    return (
        <div className={styles.tech_team_list_container}>
        <div className={styles.cards_wrapper}>
          {employees.filter(emp => emp.team === "Tech").map(emp => (
            <div key={emp.id} className={styles.employee_card}>
              <div className={`${styles.status_badge} ${styles[emp.status.toLowerCase().replace(" ", "")]}`}>
                {emp.status}
              </div>
              <div className={styles.card_top}>
                <img src={emp.image} alt={emp.name} className={styles.emp_image} />
                <h3>{emp.name}</h3>
                <p className={styles.emp_designation}>{emp.designation}</p>
              </div>
              <div className={styles.card_body}>
              <p className={styles.emp_id}><strong>#</strong>{emp.id}</p>
                <p className={styles.work_type}>
                    <span> <MdWork /></span>Fulltime · Tech</p>
                <p className={styles.emp_mail}>
                    <span><MdEmail/></span> {emp.email}</p>
               <p className={styles.emp_num}><span><BsFillTelephoneFill /></span>{emp.phone}</p>
                </div>
              <div className={styles.card_footer}>
                <span>Joined: {new Date(emp.joiningDate).toLocaleDateString()}</span>
                <Link to={`/admin/employee-profile/${emp.id}`} style={{ textDecoration: 'none', color: '#73BF44', fontWeight: '600' }}>View Profile →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    )
}


export default TechTeamEmployess


