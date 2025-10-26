import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; // Change to your backend URL in production

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  // Support both `adminToken` (older) and `token` (set by AdminLogin)
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Supervisor API calls
export const supervisorAPI = {
  addSupervisor: (data) => api.post('/admin/supervisor', data),
  editSupervisor: (id, data) => api.put(`/admin/supervisor/${id}`, data),
  deleteSupervisor: (id) => api.delete(`/admin/supervisor/${id}`),
  getAllSupervisors: () => api.get('/admin/supervisors'), // You'll need to add this route
};

// Student API calls
export const studentAPI = {
  addStudent: (data) => api.post('/admin/student', data),
  editStudent: (id, data) => api.put(`/admin/student/${id}`, data),
  deleteStudent: (id) => api.delete(`/admin/student/${id}`),
  assignSupervisor: (data) => api.put('/admin/assign-supervisor', data),
  uploadStudentsCSV: (formData) => api.post('/admin/students/csv', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAllStudents: () => api.get('/admin/students'), // You'll need to add this route
};

// Student-specific API
export const studentClient = {
  getDashboard: () => api.get('/student/dashboard'),
  uploadProject: (formData) => api.post('/student/project', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

// Admin (groups) API
export const adminAPI = {
  createGroup: (data) => api.post('/admin/groups', data),
  getGroups: () => api.get('/admin/groups'),
  updateGroup: (id, data) => api.put(`/admin/groups/${id}`, data),
  deleteGroup: (id) => api.delete(`/admin/groups/${id}`),
};

// Error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear both token keys and any login flags
      localStorage.removeItem('adminToken');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('isAdminLoggedIn');
      window.location.href = '/admin-login';
    }
    return Promise.reject(error);
  }
);

export default api;