import React, { useState } from "react";

export default function AddSupervisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
    setError("");
    setSuccess("");
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setForm({ title: "", fullName: "", email: "", password: "" });
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Generate random password
  const handleGeneratePassword = () => {
    const newPassword = Math.random().toString(36).slice(-8);
    setForm({ ...form, password: newPassword });
  };

  const handleCopyPassword = () => {
    if (!form.password) return alert("No password to copy!");
    navigator.clipboard.writeText(form.password);
    alert("Password copied");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!form.title || !form.fullName || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (!form.email.endsWith("@futo.edu.ng")) {
      setError("Email must end with @futo.edu.ng");
      return;
    }

    setError("");

    // temporary frontend-only success simulation
    setTimeout(() => {
      console.log("Supervisor added:", form);
      setSuccess("Supervisor added successfully!");
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    }, 500);
  };

  return (
    <div className="p-2">
      {/* Page Header */}
      <h2 className="text-2xl font-bold mb-3">Add Supervisor</h2>
      
      <p className="text-gray-500 text-center mb-6">Add a new supervisor by providing their title, full name, FUTO email, and generating a secure password.</p>

      {/* modal */}
      <div className="flex justify-center">
        <button
          onClick={handleOpenModal}
          className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-800 transition">Add New Supervisor
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold text-green-700 mb-4">Add Supervisor</h3>

            {error && (
              <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
            )}

            {success && (
              <p className="text-green-600 text-sm mb-3 text-center font-semibold">
                {success}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <select
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="border w-full rounded-md px-3 py-2 focus:ring-1 focus:ring-green-600"
                >
                  <option value="">Select Title</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Miss">Miss</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={form.fullName}
                  onChange={handleChange}
                  className="border w-full rounded-md px-3 py-2 focus:ring-1 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">FUTO Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@futo.edu.ng"
                  value={form.email}
                  onChange={handleChange}
                  className="border w-full rounded-md px-3 py-2 focus:ring-1 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name="password"
                    placeholder="Generate password"
                    value={form.password}
                    onChange={handleChange}
                    className="border w-full rounded-md px-3 py-2 focus:ring-1 focus:ring-green-600 bg-gray-50"
                    readOnly
                  />
                  <button type="button" onClick={handleGeneratePassword} className="bg-gray-200 text-sm px-3 py-2 rounded-md hover:bg-gray-300">Generate</button>
                  
                  <button type="button" onClick={handleCopyPassword} className="bg-gray-200 text-sm px-3 py-2 rounded-md hover:bg-gray-300">Copy</button>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={handleCloseModal} className="border border-gray-300 rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100">Cancel</button>
                
                <button type="submit" className="bg-green-700 text-white rounded-md px-4 py-2 hover:bg-green-800">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
