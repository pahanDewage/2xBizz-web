/* eslint-disable */

// API Configuration
export const API_CONFIG = {
  // Update this URL to match your backend server
  BASE_URL: 'http://localhost:5000/api', // Change this to your backend URL
  
  // You can also use environment variables
  // BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  
  // Common ports for backend servers:
  // - Express/Node.js: 3001, 5000, 8000
  // - Spring Boot: 8080
  // - Django: 8000
  // - FastAPI: 8000
};

// Common backend URLs (uncomment the one that matches your setup):
// export const API_CONFIG = {
//   BASE_URL: 'http://localhost:3001/api',  // Node.js/Express on port 3001
//   BASE_URL: 'http://localhost:5000/api',  // Node.js/Express on port 5000
//   BASE_URL: 'http://localhost:8080/api',  // Spring Boot
//   BASE_URL: 'http://localhost:8000/api',  // Django/FastAPI
// };
