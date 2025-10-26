import React, { useState, useEffect } from "react";
import { supervisorAPI, adminAPI } from "../services/api";

export default function CreateSupervisorGroup() {
  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [leadSupervisor, setLeadSupervisor] = useState("");
  const [additionalSupervisors, setAdditionalSupervisors] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);

  // fetch supervisors from backend
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await supervisorAPI.getAllSupervisors();
        if (!mounted) return;
        const list = (res.data || []).map(s => ({ id: s._id, name: s.name, email: s.email }));
        setSupervisors(list);
        // also fetch existing groups
        try {
          const gres = await adminAPI.getGroups();
          if (!mounted) return;
          setGroups(gres.data || []);
        } catch (gerr) {
          console.warn('Failed to fetch groups', gerr);
        }
      } catch (err) {
        console.error('Failed to load supervisors', err);
        setError(err?.response?.data?.message || 'Failed to load supervisors');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
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

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    if (!groupName || !leadSupervisor) {
      setError("Please fill all required fields");
      return;
    }

    const groupData = { groupName, leadSupervisor, additionalSupervisors };
    setLoading(true);
    try {
      const res = await adminAPI.createGroup(groupData);
      const created = res.data.group;
      setGroups(prev => [created, ...prev]);
      setSuccess('Group created successfully!');
      setTimeout(() => handleCloseModal(), 900);
    } catch (err) {
      console.error('Failed to create group', err);
      setError(err?.response?.data?.message || 'Failed to create group');
    } finally {
      setLoading(false);
    }
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
                    .filter((sup) => sup.id !== leadSupervisor)
                    .map((sup) => (
                      <option key={sup.id} value={sup.id}>
                        {sup.name}
                      </option>
                    ))}
                </select>

                {/* Removal of Additional Selected Supervisor */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {additionalSupervisors.map((id) => {
                    const sup = supervisors.find((s) => s.id === id);
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
      {/* Display created groups below */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Created Groups</h3>
        {groups.length === 0 ? (
          <p className="text-sm text-gray-500">No groups created yet.</p>
        ) : (
          <ul className="space-y-2">
            {groups.map(g => {
              const leadId = (g.leadSupervisor && (g.leadSupervisor._id || g.leadSupervisor));
              const lead = supervisors.find(s => s.id === leadId);
              return (
                <li key={g._id} className="p-2 border rounded-md bg-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{g.groupName}</div>
                      <div className="text-sm text-gray-600">Lead: {lead ? lead.name : (g.leadSupervisor?.name || g.leadSupervisor)}</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
