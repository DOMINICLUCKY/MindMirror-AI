import axios from 'axios';

// API Configuration for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production'
    ? 'https://mindmirror-ai-backend.onrender.com'
    : 'http://localhost:5000');

// Configure axios with timeout
axios.defaults.timeout = 5000; // 5 second timeout
axios.defaults.baseURL = API_BASE_URL;

export const API_ENDPOINTS = {
  // Authentication endpoints
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  
  // Journal endpoints
  ANALYZE_ENTRY: `${API_BASE_URL}/api/journal/analyze`,
  GET_USER_ENTRIES: `${API_BASE_URL}/api/journal/user`,
  GET_USER_HISTORY: `${API_BASE_URL}/api/journal/history`,
  
  // Analysis/Dashboard endpoints
  GET_ANALYSIS: `${API_BASE_URL}/api/analysis/entries`,
  GET_DASHBOARD: `${API_BASE_URL}/api/analysis/dashboard`,
  GET_TRENDS: `${API_BASE_URL}/api/analysis/entries`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;
