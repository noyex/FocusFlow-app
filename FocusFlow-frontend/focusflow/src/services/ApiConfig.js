/**
 * API configuration for the application
 */

// Base URL for API
export const API_BASE_URL = 'http://localhost:8080/api';

// Function to get authorization headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// API endpoints
export const API_ENDPOINTS = {
  // Projects
  PROJECTS: {
    ALL: `${API_BASE_URL}/projects/all`,
    GET: (id) => `${API_BASE_URL}/projects/${id}`,
    CREATE: `${API_BASE_URL}/projects/create`,
    UPDATE: (id) => `${API_BASE_URL}/projects/${id}`,
    DELETE: (id) => `${API_BASE_URL}/projects/${id}`
  },
  
  // Tasks
  TASKS: {
    BY_PROJECT: (projectId) => `${API_BASE_URL}/tasks/${projectId}`,
    GET: (taskId) => `${API_BASE_URL}/tasks/task/${taskId}`,
    CREATE: `${API_BASE_URL}/tasks/create`,
    UPDATE: (taskId) => `${API_BASE_URL}/tasks/task/${taskId}`,
    COMPLETE: (taskId) => `${API_BASE_URL}/tasks/task/${taskId}/complete`,
    DELETE: (taskId) => `${API_BASE_URL}/tasks/task/${taskId}`,
    STATUS_DONE: (taskId) => `${API_BASE_URL}/tasks/status/done/${taskId}`
  },
  
  // Users
  USERS: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    PROFILE: `${API_BASE_URL}/users/profile`
  }
};

export default {
  API_BASE_URL,
  getAuthHeaders,
  API_ENDPOINTS
}; 