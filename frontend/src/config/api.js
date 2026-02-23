// API Configuration for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production'
    ? 'https://mindmirror-ai-backend.onrender.com'
    : 'http://localhost:5000');

export const API_ENDPOINTS = {
  // Journal endpoints
  ANALYZE_ENTRY: `${API_BASE_URL}/api/journal/analyze`,
  GET_ENTRIES: `${API_BASE_URL}/api/journal/entries`,
  
  // Analysis endpoints
  GET_ANALYSIS: `${API_BASE_URL}/api/analysis/get-analysis`,
  GET_TRENDS: `${API_BASE_URL}/api/analysis/trends`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;
