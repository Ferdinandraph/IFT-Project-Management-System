import React, { useState } from "react";
import { studentAPI } from "../services/api";

export default function AddStudent() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    matricNumber: "",
    group: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Simulation
  const availableGroups = ["Group A", "Group B", "Group C", "Group D"];

  const handleOpenModal = () => {
    setIsOpen(true);
    setError("");
    setSuccess("");
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setForm({ name: "", matricNumber: "", group: "" });
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.matricNumber || !form.group) {
      setError("All fields are required");
      return;
    }

    setError("");
    // Call API to add student
    (async () => {
      try {
        const payload = {
          name: form.name,
          matricNumber: form.matricNumber,
          group: form.group,
        };

        await studentAPI.addStudent(payload);
        setSuccess("Student added successfully!");
        setTimeout(() => {
          handleCloseModal();
        }, 1200);
      } catch (err) {
        console.error(err);
        const msg = err?.response?.data?.message || err.message || "Failed to add student";
        setError(msg);
      }
    })();
  };

  return (
    <div className="p-2">
      {/* Page Header */}
      <h2 className="text-2xl font-bold mb-3">Add Student Manually</h2>

      <p className="text-gray-500 text-center mb-6">
        Add a new student by providing their full name, matric number, and assigning them to a group.
      </p>

      {/* Button to open modal */}
      <div className="flex justify-center">
        <button
          onClick={handleOpenModal}
          className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-800 transition"
        >
          Add New Student
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              Add New Student
            </h3>

            {error && (
              <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
            )}

            {success && (
              <p className="text-green-600 text-sm mb-3 text-center font-semibold">
                {success}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter student's full name"
                  value={form.name}
                  onChange={handleChange}
                  className="border w-full rounded-md px-3 py-2 focus:ring-1 focus:ring-green-600"
                />
              </div>

              {/* Matric Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Matric Number
                </label>
                <input
                  type="text"
                  name="matricNumber"
                  placeholder="Enter matric number"
                  value={form.matricNumber}
                  onChange={handleChange}
                  className="border w-full rounded-md px-3 py-2 focus:ring-1 focus:ring-green-600"
                />
              </div>

              {/* Assign to Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assign to Group
                </label>
                <select
                  name="group"
                  value={form.group}
                  onChange={handleChange}
                  className="border w-full rounded-md px-3 py-2 focus:ring-1 focus:ring-green-600"
                >
                  <option value="">Select Group</option>
                  {availableGroups.map((grp, index) => (
                    <option key={index} value={grp}>
                      {grp}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="border border-gray-300 rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-green-700 text-white rounded-md px-4 py-2 hover:bg-green-800"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
