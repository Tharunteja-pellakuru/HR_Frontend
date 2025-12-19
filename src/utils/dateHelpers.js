/**
 * Date and Time Helper Functions
 * Reusable utility functions for date/time formatting
 */

/**
 * Get current date in DD-MM-YYYY format
 * @returns {string} Formatted date string
 */
export const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
};

/**
 * Format duration from hours and minutes to readable format
 * @param {number} hours - Number of hours
 * @param {number} minutes - Number of minutes
 * @returns {string} Formatted duration (e.g., "8Hrs 30Mins")
 */
export const formatDuration = (hours, minutes) => {
    const hrs = parseInt(hours, 10) || 0;
    const mins = parseInt(minutes, 10) || 0;
    
    let result = '';
    if (hrs > 0) result += `${hrs}Hrs`;
    if (mins > 0) result += ` ${mins}Mins`;
    return result.trim() || '0Hrs';
};

/**
 * Format date object to DD-MM-YYYY
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};
