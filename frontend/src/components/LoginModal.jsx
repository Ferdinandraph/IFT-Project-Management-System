import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose, role }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        username: role === 'student' ? username : username,
        password,
      });
      const { token, role: userRole } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);

      // Navigate based on role
      if (userRole === 'student') {
        navigate('/student-dashboard');
      } else if (userRole === 'supervisor') {
        navigate('/supervisor-dashboard');
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:bg-gray-100 rounded-full border border-gray-300 p-1"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path d="M6 6l12 12M6 18L18 6" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-green-700 text-center mb-1">IFT Project Management</h2>
        <p className="text-gray-600 text-center mb-1">Sign in to access your {role} dashboard</p>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {role === 'student' ? 'Matric Number' : 'Username'}
            </label>
            <input
              type="text"
              placeholder={role === 'student' ? 'Enter your matric number' : 'Enter your username'}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder={role === 'student' ? 'Enter your matric number' : 'Enter your password'}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-lg font-bold hover:bg-green-800 transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;