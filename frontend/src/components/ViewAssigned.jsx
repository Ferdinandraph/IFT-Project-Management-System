import React, { useEffect, useState } from 'react';
import { studentAPI, supervisorAPI } from '../services/api';

export default function ViewAssigned() {
  const [students, setStudents] = useState([]);
  const [supervisors, setSupervisors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [studentsRes, supervisorsRes] = await Promise.all([
          studentAPI.getAllStudents(),
          supervisorAPI.getAllSupervisors(),
        ]);

        if (!mounted) return;
        const allStudents = studentsRes.data || [];
        const allSupervisors = supervisorsRes.data || [];

        const supMap = {};
        allSupervisors.forEach((s) => { supMap[s._id] = s; });

        const assigned = allStudents.filter(s => s.supervisorId);

        setStudents(assigned);
        setSupervisors(supMap);
      } catch (err) {
        console.error('Failed to load assigned list', err);
        setError(err?.response?.data?.message || 'Failed to load assigned students');
      } finally {
        setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-3">Assigned Students</h2>
      {students.length === 0 ? (
        <p className="text-gray-500">No students have been assigned to supervisors yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Student Name</th>
                <th className="px-4 py-2 border">Matric Number</th>
                <th className="px-4 py-2 border">Supervisor</th>
                <th className="px-4 py-2 border">Department / Field</th>
              </tr>
            </thead>
            <tbody>
              {students.map((st, idx) => {
                const sup = supervisors[st.supervisorId];
                return (
                  <tr key={st._id} className="odd:bg-gray-50">
                    <td className="px-4 py-2 border text-center">{idx + 1}</td>
                    <td className="px-4 py-2 border">{st.name}</td>
                    <td className="px-4 py-2 border">{st.matricNumber}</td>
                    <td className="px-4 py-2 border">{sup ? `${sup.name} (${sup.username || sup.email})` : 'Unknown'}</td>
                    <td className="px-4 py-2 border">{sup ? `${sup.department || '-'} / ${sup.field || '-'}` : '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
