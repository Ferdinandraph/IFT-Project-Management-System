import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLogin from './components/AdminLogin';
import Home from './components/Home';
//import AdminDashboard from './components/AdminDashboard';
//import SupervisorDashboard from './components/SupervisorDashboard';
//import StudentDashboard from './components/StudentDashboard';
import LoginModal from './components/LoginModal';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/admin-login';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState('student');

  const openModal = (selectedRole) => {
    setRole(selectedRole);
    setIsModalOpen(true);
  };

  return (
    <div>
      {!hideNavbar && <Navbar openModal={openModal} />}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} role={role} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;