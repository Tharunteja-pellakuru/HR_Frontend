/**
 * Daily Report Constants
 * Centralized constants for the Daily Report feature
 */

// Project options for dropdown
export const PROJECT_OPTIONS = [
    "SSPL",
    "Hr Portal Pages",
    "Chick Spaces",
    "R Firms"
];

// Status options for dropdown
export const STATUS_OPTIONS = [
    "Pending",
    "In Progress",
    "Completed"
];

// Initial form data
export const INITIAL_FORM_DATA = {
    projectName: '',
    hours: '',
    minutes: '',
    description: '',
    status: ''
};

// Initial dummy data for daily reports
export const INITIAL_DAILY_REPORTS = [
    { id: "01", project: "SSPL", date: "27-01-2025", duration: "3Hrs", description: "Republic day posters desgined", status: "Completed" },
    { id: "02", project: "Hr Portal Pages", date: "27-01-2025", duration: "1Hrs", description: "Hr Portal Pages UX/UI Designs", status: "In Progress" },
    { id: "03", project: "Chick Spaces", date: "27-01-2025", duration: "2Hrs", description: "Republic day posters desgined", status: "Completed" },
    { id: "04", project: "R Firms", date: "27-01-2025", duration: "2Hrs", description: "Republic day posters desgined", status: "Pending" },
];
