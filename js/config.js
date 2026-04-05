// API Configuration
// Backend deployed on Render
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3005' 
  : 'https://final-year-project-bms9.onrender.com';

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API_BASE_URL };
}
