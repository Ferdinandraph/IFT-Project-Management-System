import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminLogin from "./components/AdminLogin";
import Home from "./components/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AddSupervisor from "./components/AddSupervisor";
import AssignSupervisor from "./components/AssignSupervisor";
import ViewAssigned from "./components/ViewAssigned";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import CreateGroup from "./components/CreateGroup";
import ViewGroups from "./components/ViewGroups";
import ManageSupervisors from "./components/ManageSupervisors";
import AddStudent from "./components/AddStudent";
import UploadStudent from "./components/UploadStudent";

function App() {
  const location = useLocation();

  // hide navbar on admin pages
  const hideNavbar =
    location.pathname === "/admin-login" ||
    location.pathname.startsWith("/admin");

  return (
    <div>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route
            index element={
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-green-700 mb-2">IFT-PMS</h2>
                <p className="text-gray-600 max-w-md mx-auto">Manage supervisors, students, and project allocations efficiently</p>
              </div>
            }
          />
          <Route path="supervisors/add" element={<AddSupervisor />} />
          <Route path="supervisors/groups" element={<CreateGroup />} />
          <Route path="supervisors/view" element={<ViewGroups />} />
          <Route path="supervisors/manage" element={<ManageSupervisors />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="students/upload" element={<UploadStudent />} />
          <Route path="students/assign" element={<AssignSupervisor />} />
          <Route path="students/view-assigned" element={<ViewAssigned />} />

        </Route>
        <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
      </Routes>
    </div>
  );
}

export default App;

