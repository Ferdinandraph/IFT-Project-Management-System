import React, { useEffect, useState } from 'react';
import { supervisorAPI } from '../services/api';

export default function ManageSupervisors() {
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ id: '', name: '', username: '', email: '', password: '', department: 'Information Technology', field: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await supervisorAPI.getAllSupervisors();
      setSupervisors(res.data || []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to load supervisors');
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (sup) => {
    setForm({ id: sup._id, name: sup.name || '', username: sup.username || '', email: sup.email || '', password: '', department: sup.department || 'Information Technology', field: sup.field || '' });
    setEditing(true);
    setError('');
  };

  const closeEdit = () => {
    setEditing(false);
    setForm({ id: '', name: '', username: '', email: '', password: '', department: 'Information Technology', field: '' });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { name: form.name, username: form.username, email: form.email, department: form.department, field: form.field };
      if (form.password) payload.password = form.password;
      await supervisorAPI.editSupervisor(form.id, payload);
      await load();
      closeEdit();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to update supervisor');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this supervisor? This will unassign them from students.')) return;
    try {
      await supervisorAPI.deleteSupervisor(id);
      await load();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to delete supervisor');
    }
  };

  if (loading) return <div className="p-4">Loading supervisors...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Supervisors</h2>

      {supervisors.length === 0 ? (
        <p className="text-gray-500">No supervisors found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Department</th>
                <th className="px-4 py-2 border">Field</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {supervisors.map((s, idx) => (
                <tr key={s._id} className="odd:bg-gray-50">
                  <td className="px-4 py-2 border text-center">{idx + 1}</td>
                  <td className="px-4 py-2 border">{s.name}</td>
                  <td className="px-4 py-2 border">{s.username}</td>
                  <td className="px-4 py-2 border">{s.email}</td>
                  <td className="px-4 py-2 border">{s.department || '-'}</td>
                  <td className="px-4 py-2 border">{s.field || '-'}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(s)} className="text-blue-600 bg-blue-50 px-3 py-1 rounded-md hover:bg-blue-100">Edit</button>
                      <button onClick={() => handleDelete(s._id)} className="text-red-600 bg-red-50 px-3 py-1 rounded-md hover:bg-red-100">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Edit Supervisor</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="border w-full rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input name="username" value={form.username} onChange={handleChange} className="border w-full rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="border w-full rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Department</label>
                <select name="department" value={form.department} onChange={handleChange} className="border w-full rounded px-3 py-2">
                  <option>Information Technology</option>
                  <option>Cyber Security</option>
                  <option>Computer Science</option>
                  <option>Software Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Field</label>
                <input name="field" value={form.field} onChange={handleChange} className="border w-full rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Password (leave blank to keep current)</label>
                <input name="password" type="text" value={form.password} onChange={handleChange} className="border w-full rounded px-3 py-2" />
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeEdit} className="border px-3 py-2 rounded">Cancel</button>
                <button type="submit" disabled={saving} className="bg-green-700 text-white px-4 py-2 rounded">{saving? 'Saving...':'Save'}</button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
