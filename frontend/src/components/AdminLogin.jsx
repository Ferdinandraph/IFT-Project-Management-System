import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call simulation
    if (email === "admin@futo.edu.ng" && password === "admin567") {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin");
    }
    else {
      alert("Invalid email or password. Please try again.");
    }
  }

  return (
  <div className="bg-gray-100 h-screen flex justify-center items-center">
    <div className="bg-white shadow-md w-full max-w-md mx-auto p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-green-700 text-center mb-1">IFT Project Management</h2>
      <p className="text-gray-700 text-center mb-1">Sign in to access the admin dashboard</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input type="password" name="password" id="password" 
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>

        <button type="submit" className="w-full bg-green-700 rounded-lg text-white py-2 font-bold hover:bg-green-800 transition">Login</button>
      </form>
    </div>
  </div>
)
};

export default AdminLogin;