import React, { useEffect, useState } from 'react';
import { studentAPI, supervisorAPI } from '../services/api';

export default function AssignSupervisor() {
  const [students, setStudents] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [supervisorId, setSupervisorId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [studentsRes, supervisorsRes] = await Promise.all([
          studentAPI.getAllStudents(),
          supervisorAPI.getAllSupervisors(),
        ]);
        if (!mounted) return;
        setStudents(studentsRes.data || []);
        setSupervisors(supervisorsRes.data || []);
      } catch (err) {
        console.error('Failed to load lists', err);
        setError(err?.response?.data?.message || 'Failed to load students or supervisors');
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!studentId || !supervisorId) {
      setError('Please select both a student and a supervisor');
      return;
    }

    setLoading(true);
    try {
      await studentAPI.assignSupervisor({ studentId, supervisorId });
      setSuccess('Supervisor assigned successfully');
      // Optionally refresh students
      const studentsRes = await studentAPI.getAllStudents();
      setStudents(studentsRes.data || []);
    } catch (err) {
      console.error('Assign failed', err);
      setError(err?.response?.data?.message || 'Failed to assign supervisor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-3">Assign Supervisor</h2>
      <p className="text-gray-500 mb-4">Select a student and a supervisor and click Assign.</p>

      {error && <div className="text-red-600 mb-3">{error}</div>}
      {success && <div className="text-green-600 mb-3">{success}</div>}

      <form onSubmit={handleAssign} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">Student</label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="border w-full rounded-md px-3 py-2 focus:ring-1 focus:ring-green-600"
          >
            <option value="">Select student</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>{s.name} - {s.matricNumber || ''}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Supervisor</label>
          <select
            value={supervisorId}
            onChange={(e) => setSupervisorId(e.target.value)}
            className="border w-full rounded-md px-3 py-2 focus:ring-1 focus:ring-green-600"
          >
            <option value="">Select supervisor</option>
            {supervisors.map((sp) => (
              <option key={sp._id} value={sp._id}>{sp.name} ({sp.username || sp.email})</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white rounded-md px-4 py-2 hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? 'Assigning...' : 'Assign'}
          </button>
        </div>
      </form>
    </div>
  );
}
