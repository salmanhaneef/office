// src/axiosConfig.js
import axios from 'axios';

// Set default axios configuration
axios.defaults.withCredentials = true;

// Optionally set the base URL
axios.defaults.baseURL = 'http://localhost:5000';

export default axios;
