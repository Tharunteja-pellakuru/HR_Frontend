import React, { useRef, useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "../../Styles/style.css";
import Common from "../../Components/Common/common";
import SidebarMenu from "../../Components/Common/Dashboard";
import styles from "../../Styles/dashboard.module.css";
import { useParams } from "react-router-dom";

const EmpOfferLetter = () => {
    const { empId } = useParams();
    const componentRef = useRef();

    // Mock Data - In real app, fetch using empId
    const employeeData = {
        name: "PELLAKURU THARUN ",
        designation: "Jr MERN Stack Developer",
        joiningDate: "13/10/2026", // Future date as per image? Or typo in image? adhering to image "13/10/2026"
        ctc: "2,40,000.00",
        location: "Hyderabad, India",
        date: "02/01/2025"
    };

    const [isDownloading, setIsDownloading] = useState(false);


    const generatePDF = async () => {
         const element = componentRef.current;
        if (!element) return;

        setIsDownloading(true);
        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pages = element.querySelectorAll('.pdf_page_content');

            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];
                const canvas = await html2canvas(page, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff'
                });

                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 210; 
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                if (i > 0) pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            }
             
             pdf.save(`Offer_Letter_${employeeData.name.trim()}.pdf`);
        } catch (error) {
            console.error("Error:", error);
        }
        setIsDownloading(false);
    };

    return (
        <div className="emp_wrapper">
            <SidebarMenu />
            <div className={styles.emp_dashboard_main}>
                <Common />
                <div className={styles.dashboard_content}> 
                    {/* Header with Print Button */}
                    <div className={styles.offer_letter_header_actions}>
                        <h2 className={styles.offer_letter_title}>Offer Letter</h2>
                        <button onClick={generatePDF} className={styles.print_btn} disabled={isDownloading}>
                            {isDownloading ? 'Generating...' : 'Download Offer Letter'}
                        </button>
                    </div>

                    {/* Letter Container - A4 visual style */}
                    <div className={styles.offer_letter_container} ref={componentRef}>
                        
                        {/* Page 1 */}
                        <div className="pdf_page_content" style={{ padding: '20px', background: 'white' }}>
                            {/* Letter Header */}
                            <div className={styles.letter_header}>
                                {/* Logo usually in Common, but typical offer letters have letterhead logos. 
                                    Assuming existing common header is for app, but letter needs its own logo if printing?
                                    The image shows "parivartan" header. 
                                    I will add a logo placeholder or rely on the image text. 
                                */}
                                <img src="/path/to/logo.png" alt="Parivartan" className={styles.letter_logo} style={{ display: 'none' }} /> {/* Placeholder if needed */}
                                
                                <p><strong>Date:</strong> {employeeData.date}</p>
                                <p><strong>{employeeData.name}</strong></p>
                                <p>{employeeData.location}</p>
                            </div>

                            <div className={styles.letter_body}>
                                <p><strong>Dear {employeeData.name},</strong></p>
                                <p>This is with reference to the discussion you had with us recently. We are pleased to offer you the position of <strong>{employeeData.designation}</strong> on the following terms:</p>

                                <h4 className={styles.letter_section_title}>Compensation & Benefits:</h4>
                                <p>The Compensation & Benefits applicable to you is as follows, which is personal and should be treated with utmost confidence. This is not to be discussed or divulged to anybody else other than for statutory purposes.</p>
                                <p>Salary, perquisites, and other allowances (Cost to Company): INR {employeeData.ctc} Per Annum</p>

                                <h4 className={styles.letter_section_title}>Term of Appointment:</h4>
                                <p>This appointment will be in effect from <strong>{employeeData.joiningDate}</strong>.</p>

                                <h4 className={styles.letter_section_title}>Probation/Notice Period:</h4>
                                <p>You will have a probation period of three months from the date of joining the company. During this time, your services are liable to be terminated without any notice on either side. After confirmation, your appointment is terminable by either party by giving one-month (30 days) notice in writing. Either party is not bound to give any reason thereof. The Company reserves the right to pay or recover salary in lieu of notice period or to relieve you before the expiry of the notice period.</p>

                                <h4 className={styles.letter_section_title}>Non-Solicitation of Resources/ Customers:</h4>
                                <p>You agree that during your engagement with us and for a period of one (1) year following resignation or termination, you shall not, directly or indirectly, solicit for employment or any other commercial engagement or business arrangement any employees or Resources utilized by Parivartan (including all subsidiaries, affiliates, and joint ventures) to perform business. The same applies to Parivartan customers also. The term "Parivartan Customers" as used herein shall mean any customer for whom Parivartan provides Services, and or any other Potential Customer of whom you become aware as a result of any communication, either written or verbal, during your engagement with us.</p>
                                
                                <h4 className={styles.letter_section_title}>Separation:</h4>
                                <p>On separation, you will immediately give up to the Company before you are relieved all correspondence, specifications, formulae, books, documents, cost data, market data, literature, drawings, effects or records, etc. belonging to the Company or relating to its business and shall not make or retain any copies of these items. You will also return to the Company all the assets given to you for official and/or personal use as per the various policies/schemes applicable to you as part of your Compensation & Benefits. This would not apply to those assets or items, which are obligatory for you to buy under the concerned schemes.</p>

                                <h4 className={styles.letter_section_title}>Leave:</h4>
                                <p>You will be entitled to leave in accordance with the laws of the company, the details of which will be intimated to you separately through the HR policy.</p>

                                <h4 className={styles.letter_section_title}>Validity of the Offer:</h4>
                                <p>This offer is valid provided a written acceptance is a given to our office within 5 business days from the date of this letter. It is understood that your date of joining Parivartan will not be later than <strong>{employeeData.joiningDate}</strong> failing which this offer will automatically stand revoked without any further notice.</p>

                                <h4 className={styles.letter_section_title}>Service Conditions:</h4>
                                <p>Your services will be governed by additional terms and conditions as explained in the Service Conditions attached herewith. These additional Service Conditions are applicable to all employees of your band.</p>
                                <p>The terms and conditions are subject to statutory requirements and Company Policy.</p>
                                <p>Please confirm that the above terms and conditions as also the additional Service Conditions are acceptable to you by signing a copy of this letter and the other documents attached hereto.</p>
                                <p>We welcome you to our team and wish you a long and mutually beneficial association with us.</p>

                                <p style={{ marginTop: '20px' }}>Yours truly,</p>
                                <p>For <strong>Parivartan</strong></p>
                                
                                <div style={{ marginTop: '40px', marginBottom: '40px' }}>
                                    <p><strong>Anand Pohankar</strong></p>
                                    <p>CEO</p>
                                </div>

                                <p>Encl.: Service Conditions</p>
                                <p>Confidentiality Agreement</p>
                                <p>I agree to accept the terms and conditions mentioned above and also as in the Service Conditions document attached to this letter.</p>
                                
                                <div style={{ textAlign: 'right', marginTop: '40px' }}>
                                    <p>Signature</p>
                                </div>
                            </div>
                        </div>

                        <hr className={styles.page_break} />

                        {/* Page 2 - Service Conditions */}
                        <div className={`pdf_page_content ${styles.letter_body}`} style={{ padding: '20px', background: 'white' }}>
                            <h3 className={styles.letter_page_header}>SERVICE CONDITIONS</h3>
                            <p className={styles.centered_text}>The following additional terms and conditions will be applicable to all employees of <strong>Parivartan</strong></p>

                            <h4 className={styles.letter_section_title}>Full Time Work:</h4>
                            <p>Your position is a whole time employment with the Company and you shall devote yourself exclusively to the business of the Company. You will not take any other work for remuneration (part-time or otherwise) or work in advisory capacity or be interested directly or indirectly in any other trade or business during the employment with the Company. The authorized person should approve, in writing, any honorary professional engagement outside the work with the company.</p>

                            <h4 className={styles.letter_section_title}>Re-designation | Transfer | Salary Review:</h4>
                            <p>The company reserves the right to re-designate the employees and assign suitable responsibilities from time to time. The Company is not bound to give any reason thereof. Your services are liable to be transferred in such capacity as the Company may from time to time determine or to any other location, department, establishment or branch of the Company. In such case, you will be governed by the terms and conditions of service as applicable to the new assignment. Such transfer could be to any location in India or any other country. Your salary will be reviewed periodically as per the policy of the Company. The Company believes in rewarding performers, and hence increase in Compensation will be subject to and on the basis of effective performance and results during the review period.</p>

                            <h4 className={styles.letter_section_title}>Responsibilities:</h4>
                            <p>You are expected to work effectively to ensure results and you will be expected to work extra hours to achieve this whenever the job so requires.</p>

                            <h4 className={styles.letter_section_title}>Travel:</h4>
                            <p>You will be required to undertake travel on Company work and you will be reimbursed travel expenses as per the Company Policy.</p>
                            
                            <h4 className={styles.letter_section_title}>Confidentiality:</h4>
                            <p>The Company has evolved a Confidentiality Agreement to protect the right of the employees and also that of the Company while dealing with confidential information, documents, etc. The said Confidentiality Agreement forms part of the Service Conditions applicable to employees of your category. You are required to read, understand and sign the enclosed Confidentiality Agreement in acknowledgement of your acceptance of the conditions therein.</p>
                            
                            <h4 className={styles.letter_section_title}>Protection of Interest:</h4>
                            <p>If you conceive of/invent/discover/improve on any new or advanced or current methods of improving process/formulae/systems in relation to the operation of the Company or its affiliates or customers, such developments, discoveries or inventions will be fully communicated to the Company and remain the sole right/property of the Company.</p>
                            
                            <h4 className={styles.letter_section_title}>Conflict of Interest:</h4>
                            <p>If any transaction with the Company involves conflict between your personal interest and the interest of the Company in dealings with suppliers, customers, and any other organization or individuals doing or seeking to do business with the Company, you are required to inform the Company in writing about the nature of such conflict of interest so that the Company could protect its right and address the transaction suitably.</p>
                            
                            <p>I, <strong>{employeeData.name}</strong>, have read, understood and agree to abide by the above mentioned Service Conditions applicable to employees of my category. I hereby affix my signature below in confirmation of the acceptance of all the terms and conditions of my employment including the above Service Conditions.</p>

                             <div style={{ textAlign: 'right', marginTop: '40px' }}>
                                <p>Signature</p>
                            </div>
                        </div>

                         <hr className={styles.page_break} />

                        {/* Page 3 - Salary Structure */}
                         <div className={styles.letter_body}>
                            <h3 className={styles.letter_page_header}>SALARY STRUCTURE</h3>
                            
                            <div className={styles.salary_details_block}>
                                <p><strong>Employee Name : {employeeData.name}</strong></p>
                                <p><strong>Designation : {employeeData.designation}</strong></p>
                                <p><strong>Date of Joining : {employeeData.joiningDate}</strong></p>
                            </div>

                            <p style={{ marginTop: '20px', marginBottom: '10px' }}><strong>SALARY AND STANDARD BENEFITS:</strong></p>
                            
                            <table className={styles.salary_table}>
                                <thead>
                                    <tr>
                                        <th>Labor Components</th>
                                        <th style={{ width: '150px', textAlign: 'right' }}>YEARLY</th>
                                        <th style={{ width: '150px', textAlign: 'right' }}>MONTHLY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={styles.salary_total_row}>
                                        <td>Total Cost to the Company</td>
                                        <td>240,000.00</td>
                                        <td>20,000.00</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Monthly Benefits:</strong></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>A. Basic Salary</td>
                                        <td>120,000.00</td>
                                        <td>10,000.00</td>
                                    </tr>
                                    <tr>
                                        <td>B. House Rent Allowance</td>
                                        <td>52,000.00</td>
                                        <td>4,800.00</td>
                                    </tr>
                                    <tr>
                                        <td>C. Conveyance Allowance</td>
                                        <td>9,600.00</td>
                                        <td>800.00</td>
                                    </tr>
                                    <tr>
                                        <td>D. Medical Allowance Reimbursement</td>
                                        <td>15,000.00</td>
                                        <td>1,250.00</td>
                                    </tr>
                                    <tr>
                                        <td>E. Other Allowance</td>
                                        <td>47,400.00</td>
                                        <td>3,950.00</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ height: '20px' }}></td>
                                    </tr>
                                    <tr className={styles.salary_total_row_bottom}>
                                        <td><strong>Net Take Home</strong></td>
                                        <td></td>
                                        <td><strong>20,000.00</strong></td>
                                    </tr>
                                </tbody>
                            </table>

                             <h3 className={styles.letter_page_header} style={{ marginTop: '40px' }}>Parivartan (CONFIDENTIALITY AGREEMENT)</h3>
                             <p>During the course of carrying out business activities at Parivartan employees will be exposed to Intellectual Property and Confidential Information of Parivartan, its partners, its customers and those of former employers. It is only ethical to hold all such information with the highest level of confidentiality. This agreement binds employees to hold in strict confidence any information that they have gathered during their course of employment with the company and will not divulge to any person or persons including any organization(s) without the prior written approval of the company.</p>

                             <h4 className={styles.letter_section_title}>Confidential Information:</h4>
                             <p>Company Information: I agree at all times during the term of my employment and thereafter, to hold in strictest confidence, and not to use, except for the benefit of the Company, or to disclose to any person, firm or corporation without written authorization of the Board of Directors of the Company, any Confidential Information of the Company. I understand that "Confidential Information" means any Company proprietary information, technical data, trade secrets or know-how, including, but not limited to, research, product plans, products, services, customer lists and customers (including, but not limited to, customers of the Company on whom I called or with whom I became acquainted during the term of my employment), markets, software, developments, inventions, processes, formulas, technology, designs, drawings, engineering, hardware configuration information, marketing, finances or other business information disclosed to me by the Company either directly or indirectly in writing, orally or by drawings or observation of parts or equipment. I further understand that Confidential Information does not include any of the foregoing items:</p>
                             <ul style={{ paddingLeft: '20px', fontSize: '11px', lineHeight: '1.4', marginBottom: '10px' }}>
                                <li>Which is already in the public domain, or is made public by the Company;</li>
                                <li>Or Comes into the public domain otherwise than by reason of the default of the employees;</li>
                                <li>Or is required to be disclosed by the employee pursuant to any law or judicial process/decree, or is involved by the employer from third party having the right to disclose the same.</li>
                             </ul>

                             <p>Former Employer Information: I agree that I will not, during my employment with the Company, improperly use or disclose any proprietary information or trade secrets of any former or concurrent employer or other person or entity and that I will not bring onto the premises of the Company any unpublished document or proprietary information belonging to any such employer, person or entity unless consented to in writing by such employer, person or entity.</p>
                             <p>Third Party Information: I recognize that the Company has received and in the future will receive from third parties their confidential or proprietary information subject to a duty on the Company's part to maintain the confidentiality of such information and to use it only for certain limited purposes. I agree to hold all such confidential or proprietary information in the strictest confidence and not to disclose it to any person, firm or corporation or to use it except as necessary in carrying out my work for the Company consistent with the Company's agreement with such third party.</p>
                             <p>On Separation: I will return to Parivartan after termination of my employment, all confidential information and materials of whatever nature in my possession, arising from my employment with Parivartan.</p>
                             
                             <p>I understand and agree that my obligations under this Agreement shall extend beyond the date of termination of my employment with Parivartan and shall be binding upon my heirs, assigns and legal representatives. I have read and fully understood this agreement.</p>

                             <div style={{ textAlign: 'right', marginTop: '40px' }}>
                                <p>Signature</p>
                            </div>

                         </div>
                    </div>
                    
                    {/* Bottom Print Button (Optional duplication for ease) */}
                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <button onClick={generatePDF} className={styles.print_btn} disabled={isDownloading}>
                             {isDownloading ? 'Generating...' : 'Download Offer Letter'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EmpOfferLetter;
