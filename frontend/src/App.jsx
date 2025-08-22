import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import AdminLogin from "./components/AdminLogin"
import Home from "./components/Home"

function App() {
  const location = useLocation()
  const hideNavbar = location.pathname === "/admin-login"

  return (
    <div>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* <Route path="/" element={<h1 className="text-2xl font-bold text-blue-500">Hello, World!</h1>} /> */}
        <Route path="/" element={<Home />} />
        {<Route path="/admin-login" element={<AdminLogin/>} />}
      </Routes>
    </div>
  )
}

export default App
