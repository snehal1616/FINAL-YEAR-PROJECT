// API Configuration
// Change this to your Render backend URL after deployment
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3005' 
  : 'https://cureastic-app.onrender.com'; // Replace with your actual Render URL

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API_BASE_URL };
}
