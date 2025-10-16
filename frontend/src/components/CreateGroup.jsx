import React, { useState, useEffect } from "react";

export default function CreateSupervisorGroup() {
  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [leadSupervisor, setLeadSupervisor] = useState("");
  const [additionalSupervisors, setAdditionalSupervisors] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // mock fetch - replace with backend API later
  useEffect(() => {
    // this will come from backend (GET /api/supervisors)
    const mockSupervisors = [
      { id: 1, name: "Mrs. Mbamala", email: "nnamalaga@futo.edu.ng" },
      { id: 2, name: "Dr. Etus", email: "etusato@futo.edu.ng" },
      { id: 3, name: "Dr. John", email: "stanley@futo.edu.ng" },
      { id: 4, name: "Dr. Amadi", email: "amadi@futo.edu.ng" },
    ];
    setSupervisors(mockSupervisors);
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
    setSuccess("");
    setError("");
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setGroupName("");
    setLeadSupervisor("");
    setAdditionalSupervisors([]);
    setSuccess("");
    setError("");
  };

  const handleSelectAdditional = (e) => {
    const selectedId = e.target.value;
    if (!selectedId || additionalSupervisors.includes(selectedId)) return;
    setAdditionalSupervisors([...additionalSupervisors, selectedId]);
  };

  const handleRemoveAdditional = (id) => {
    setAdditionalSupervisors(additionalSupervisors.filter((x) => x !== id));
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();

    if (!groupName || !leadSupervisor) {
      setError("Please fill all required fields");
      return;
    }

    const groupData = {
      groupName,
      leadSupervisor,
      additionalSupervisors,
    };

    console.log("Group Created:", groupData); // Later send to backend
    setSuccess("Group created successfully!");

    // Simulate success and close modal after delay
    setTimeout(() => {
      handleCloseModal();
    }, 1500);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Supervisor Group</h2>
      <p className="text-gray-500 text-center mb-6">Create a supervisor group by selecting a lead and additional supervisors.</p>

      <div className="flex justify-center">
        <button onClick={handleOpenModal}
          className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-800 transition">
          + Add New Group
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold text-green-700 mb-4">Add New Supervisor Group</h3>

            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

            {success && (<p className="text-green-600 text-sm mb-3 font-semibold">{success}</p>)}

            <form onSubmit={handleCreateGroup} className="space-y-4">
              {/* Group Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Group Name</label>
                <input
                  type="text"
                  placeholder="e.g., Group A (Blockchain)"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="border w-full rounded-md px-3 py-2 focus:ring-1 focus:ring-green-600"
                />
              </div>

              {/* Lead Supervisor */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Lead Supervisor</label>
                <select
                  value={leadSupervisor}
                  onChange={(e) => setLeadSupervisor(e.target.value)}
                  className="border w-full rounded-md px-3 py-2 focus:ring-1 focus:ring-green-600"
                >
                  <option value="">Select lead supervisor</option>
                  {supervisors.map((sup) => (
                    <option key={sup.id} value={sup.id}>
                      {sup.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional Supervisors */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Additional Supervisors</label>
                <select
                  onChange={handleSelectAdditional}
                  className="border w-full rounded-md px-3 py-2 focus:ring-1 focus:ring-green-600">
                  <option value="">Select supervisor</option>
                  {supervisors
                    .filter((sup) => sup.id !== Number(leadSupervisor))
                    .map((sup) => (
                      <option key={sup.id} value={sup.id}>
                        {sup.name}
                      </option>
                    ))}
                </select>

                {/* Removal of Additional Selected Supervisor */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {additionalSupervisors.map((id) => {
                    const sup = supervisors.find((s) => s.id === Number(id));
                    return (
                      <span key={id} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                        {sup?.name}
                        <button type="button" onClick={() => handleRemoveAdditional(id)} className="text-red-500 hover:text-red-700 font-bold">
                         x 
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={handleCloseModal} className="border border-gray-300 rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100">
                  Cancel
                </button>

                <button type="submit" className="bg-green-700 text-white rounded-md px-4 py-2 hover:bg-green-800">
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
