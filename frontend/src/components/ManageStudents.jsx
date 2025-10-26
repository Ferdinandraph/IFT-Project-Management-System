import React, { useEffect, useState } from 'react';
import { studentAPI } from '../services/api';

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await studentAPI.getAllStudents();
      setStudents(res.data || []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    try {
      await studentAPI.deleteStudent(id);
      setStudents((s) => s.filter((st) => st._id !== id));
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to delete');
    }
  };

  const handleEdit = async (student) => {
    const name = prompt('Student name', student.name);
    if (name === null) return; // cancelled
    const matricNumber = prompt('Matric number', student.matricNumber);
    if (matricNumber === null) return;

    try {
      const res = await studentAPI.editStudent(student._id, { name, matricNumber });
      // Update local list
      setStudents((s) => s.map((st) => (st._id === student._id ? res.data.student : st)));
      alert('Student updated');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to update student');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Students</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Matric Number</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-3 text-center text-gray-500">No students found</td>
                </tr>
              )}
              {students.map((st) => (
                <tr key={st._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{st.name}</td>
                  <td className="p-2 border">{st.matricNumber}</td>
                  <td className="p-2 border">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-blue-600 bg-blue-50 px-3 py-1 rounded-md hover:bg-blue-100"
                        onClick={() => handleEdit(st)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 bg-red-50 px-3 py-1 rounded-md hover:bg-red-100"
                        onClick={() => handleDelete(st._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
