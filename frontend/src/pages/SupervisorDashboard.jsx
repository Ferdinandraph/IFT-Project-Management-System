import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const StatCard = ({ title, value }) => (
  <div className="bg-white border rounded-lg p-4 flex-1">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

const Badge = ({ children, color = 'bg-gray-100 text-gray-800' }) => (
  <span className={`${color} px-2 py-1 rounded-full text-xs`}>{children}</span>
);

const SupervisorDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ supervisor: null, groups: [], students: [], projectsByStudent: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('pending');
  const [activeProject, setActiveProject] = useState(null);
  const [openStudent, setOpenStudent] = useState({});

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get('/supervisor/dashboard');
        if (!mounted) return;
        setData(res.data || { supervisor: null, groups: [], students: [], projectsByStudent: {} });
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, []);

  const pendingCount = Object.values(data.projectsByStudent || {}).flat().filter(p => p.status === 'pending').length;

  const openFeedback = (project) => {
    setActiveProject(project);
    setFeedback(project.feedback || '');
    setStatus(project.status || 'pending');
  };

  const closeFeedback = () => {
    setActiveProject(null);
    setFeedback('');
    setStatus('pending');
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    if (!activeProject) return;
    try {
      await api.put(`/supervisor/project/${activeProject._id}/feedback`, { feedback, status });
      const res = await api.get('/supervisor/dashboard');
      setData(res.data);
      closeFeedback();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to submit feedback');
    }
  };

  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  const supName = (s) => {
    if (!s) return '';
    if (typeof s === 'string') return s;
    if (s.name) return s.name;
    if (s.username) return s.username;
    return '';
  };

  const username = localStorage.getItem('username') || '';

  return (
    <div className="min-h-screen bg-gray-50 pt-20 relative">
      <div className="bg-white shadow-md fixed top-0 left-0 w-full z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <div>
            <h2 className="text-green-700 font-bold text-lg">IFT Project Management System</h2>
          </div>
          <div>
            <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('username'); localStorage.removeItem('role'); navigate('/'); }}
              className="border border-green-700 rounded-lg px-4 py-2 text-green-700 font-semibold hover:bg-green-700 hover:text-white transition">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 px-6">
        <div className="flex justify-between items-center py-4">
          <div>
            <h2 className="sm:text-lg font-semibold text-green-700">Welcome{data.supervisor?.name ? `, ${data.supervisor.name}` : username ? `, ${username}` : ''}</h2>
            <p className="text-sm text-gray-500">Supervisor dashboard — manage groups, students and submissions</p>
          </div>

          <div className="flex gap-3">
            <StatCard title="Groups" value={data.groups.length} />
            <StatCard title="Students" value={data.students.length} />
            <StatCard title="Pending Submissions" value={pendingCount} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <h2 className="text-lg font-semibold mb-3">Your Groups</h2>
            <div className="space-y-3">
              {data.groups.length === 0 && <p className="text-sm text-gray-500">You are not part of any groups.</p>}
              {data.groups.map(g => (
                <div key={g._id} className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{g.groupName}</div>
                      <div className="text-sm text-gray-600">Lead: {supName(g.leadSupervisor)}</div>
                      <div className="text-sm text-gray-600 mt-1">Co-supervisors:</div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(g.additionalSupervisors || []).map(s => (
                          <Badge key={typeof s === 'object' ? s._id : s}>{supName(s)}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-3">Your Students & Submissions</h2>
            <div className="space-y-4">
              {data.students.length === 0 && <p className="text-sm text-gray-500">No students assigned to you.</p>}
              {data.students.map((s) => {
                const projects = (data.projectsByStudent[s._id] || []).sort((a,b) => (a.chapter||0) - (b.chapter||0));
                return (
                  <div key={s._id} className="bg-white border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold">{s.name} <span className="text-sm text-gray-500">({s.matricNumber})</span></div>
                        <div className="text-sm text-gray-600">Submissions: {projects.length}</div>
                      </div>
                      <div>
                        <button onClick={() => setOpenStudent(prev => ({ ...prev, [s._id]: !prev[s._id] }))} className="px-3 py-1 bg-gray-100 rounded">{openStudent[s._id] ? 'Hide' : 'View'}</button>
                      </div>
                    </div>

                    {openStudent[s._id] && (
                      <div className="mt-3 space-y-2">
                        <div>
                          <div className="font-medium">Chapters 1 - 3</div>
                          <div className="mt-2 space-y-2">
                            {projects.filter(p => p.chapter >=1 && p.chapter <=3).length === 0 && <p className="text-sm text-gray-500">No submissions</p>}
                            {projects.filter(p => p.chapter >=1 && p.chapter <=3).map(p => (
                              <div key={p._id} className="flex items-center justify-between border rounded px-3 py-2">
                                <div>
                                  <div className="font-medium">{p.title} <span className="text-xs text-gray-500">(Ch {p.chapter})</span></div>
                                  <div className="text-sm text-gray-600">Status: <Badge color={p.status==='approved' ? 'bg-green-100 text-green-800' : p.status==='rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>{p.status}</Badge></div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <a href={p.fileUrl} target="_blank" rel="noreferrer" className="text-sm text-green-700">View</a>
                                  <button onClick={() => openFeedback(p)} className="px-3 py-1 bg-blue-600 text-white rounded">Feedback</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="font-medium">Chapters 4 - 5</div>
                          <div className="mt-2 space-y-2">
                            {projects.filter(p => p.chapter >=4 && p.chapter <=5).length === 0 && <p className="text-sm text-gray-500">No submissions</p>}
                            {projects.filter(p => p.chapter >=4 && p.chapter <=5).map(p => (
                              <div key={p._id} className="flex items-center justify-between border rounded px-3 py-2">
                                <div>
                                  <div className="font-medium">{p.title} <span className="text-xs text-gray-500">(Ch {p.chapter})</span></div>
                                  <div className="text-sm text-gray-600">Status: <Badge color={p.status==='approved' ? 'bg-green-100 text-green-800' : p.status==='rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>{p.status}</Badge></div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <a href={p.fileUrl} target="_blank" rel="noreferrer" className="text-sm text-green-700">View</a>
                                  <button onClick={() => openFeedback(p)} className="px-3 py-1 bg-blue-600 text-white rounded">Feedback</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Provide Feedback</h3>
                <button onClick={closeFeedback} className="text-gray-600">Close</button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Student</p>
                  <p className="text-sm text-gray-600">{activeProject.studentId?.name} ({activeProject.studentId?.matricNumber})</p>
                  <p className="mt-3 font-medium">Title</p>
                  <p className="text-sm text-gray-600">{activeProject.title}</p>
                  <p className="mt-3 font-medium">File</p>
                  <a href={activeProject.fileUrl} target="_blank" rel="noreferrer" className="text-green-700">Open file</a>
                </div>

                <div>
                  <form onSubmit={submitFeedback} className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium">Decision</label>
                      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border w-full rounded px-3 py-2">
                        <option value="pending">Pending</option>
                        <option value="approved">Approve</option>
                        <option value="rejected">Reject</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Feedback</label>
                      <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={6} className="border w-full rounded px-3 py-2" />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={closeFeedback} className="border px-3 py-2 rounded">Cancel</button>
                      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisorDashboard;
