import React, { useEffect, useState } from 'react';
import { supervisorAPI, adminAPI } from '../services/api';

export default function ViewGroups() {
  const [groups, setGroups] = useState([]);
  const [supervisors, setSupervisors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
    const [editing, setEditing] = useState(null);
    const [editGroupName, setEditGroupName] = useState('');
    const [editLead, setEditLead] = useState('');
    const [editAdditional, setEditAdditional] = useState([]);
    const [allSupervisorsList, setAllSupervisorsList] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [sRes, gRes] = await Promise.all([supervisorAPI.getAllSupervisors(), adminAPI.getGroups()]);
        if (!mounted) return;
        const map = {};
        const list = (sRes.data || []).map(s => ({ id: s._id, name: s.name, username: s.username, email: s.email }));
        (sRes.data || []).forEach(s => { map[s._id] = s; });
        setSupervisors(map);
        setAllSupervisorsList(list);
        setGroups(gRes.data || []);
      } catch (err) {
        console.error('Failed to load supervisors or groups', err);
        setError(err?.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, []);

  const handleDelete = async (id) => {
    try {
      await adminAPI.deleteGroup(id);
      setGroups(prev => prev.filter(g => g._id !== id));
    } catch (err) {
      console.error('Failed to delete group', err);
      setError(err?.response?.data?.message || 'Failed to delete group');
    }
  };

  const handleOpenEdit = (group) => {
    setEditing(group);
    setEditGroupName(group.groupName || '');
    setEditLead(group.leadSupervisor?._id || group.leadSupervisor);
    setEditAdditional((group.additionalSupervisors || []).map(s => (s._id ? s._id : s)));
  };

  const handleToggleAdditional = (id) => {
    if (editAdditional.includes(id)) setEditAdditional(editAdditional.filter(x => x !== id));
    else setEditAdditional([...editAdditional, id]);
  };

  const handleSaveEdit = async () => {
    if (!editing) return;
    try {
      const payload = { groupName: editGroupName, leadSupervisor: editLead, additionalSupervisors: editAdditional };
      const res = await adminAPI.updateGroup(editing._id, payload);
      const updated = res.data.group;
      setGroups(prev => prev.map(g => g._id === updated._id ? updated : g));
      setEditing(null);
    } catch (err) {
      console.error('Failed to update group', err);
      setError(err?.response?.data?.message || 'Failed to update group');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-3">Supervisor Groups</h2>
      {groups.length === 0 ? (
        <p className="text-gray-500">No groups created yet.</p>
      ) : (
        <div className="space-y-4">
          {groups.map((g) => {
            const leadId = g.leadSupervisor?._id || g.leadSupervisor;
            const lead = supervisors[leadId];
            return (
              <div key={g._id} className="p-4 border rounded-md bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">{g.groupName}</div>
                    <div className="text-sm text-gray-600">Lead: {lead ? `${lead.name} (${lead.username || lead.email})` : (g.leadSupervisor?.name || g.leadSupervisor)}</div>
                    <div className="text-sm text-gray-600 mt-1">Additional supervisors: {g.additionalSupervisors && g.additionalSupervisors.length > 0 ? g.additionalSupervisors.map(a => {
                      const id = a?._id || a;
                      return supervisors[id]?.name || id;
                    }).join(', ') : 'None'}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => handleOpenEdit(g)} className="text-blue-600 bg-blue-50 px-3 py-1 rounded-md hover:bg-blue-100">Edit</button>
                    <button onClick={() => handleDelete(g._id)} className="text-red-600 bg-red-50 px-3 py-1 rounded-md hover:bg-red-100">Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-3">Edit Group</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Group Name</label>
                <input value={editGroupName} onChange={(e) => setEditGroupName(e.target.value)} className="border w-full rounded px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium">Lead Supervisor</label>
                <select value={editLead} onChange={(e) => setEditLead(e.target.value)} className="border w-full rounded px-3 py-2">
                  <option value="">Select lead</option>
                  {allSupervisorsList.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Additional Supervisors</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {allSupervisorsList.filter(s => s.id !== editLead).map(s => (
                    <label key={s.id} className={`px-2 py-1 border rounded cursor-pointer ${editAdditional.includes(s.id) ? 'bg-green-100' : 'bg-white'}`}>
                      <input type="checkbox" checked={editAdditional.includes(s.id)} onChange={() => handleToggleAdditional(s.id)} className="mr-2" />
                      {s.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setEditing(null)} className="border px-3 py-2 rounded">Cancel</button>
                <button onClick={handleSaveEdit} className="bg-green-700 text-white px-4 py-2 rounded">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
