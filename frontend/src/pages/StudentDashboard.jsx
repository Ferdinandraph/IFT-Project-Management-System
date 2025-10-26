import React, { useState, useEffect } from "react";
import futoLogo from "../assets/futo-logo.png";
import UploadModal from "../components/UploadModal";
import { studentClient } from "../services/api";

const StudentDashboard = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [student, setStudent] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  // helper to open/close upload modal and set selected chapter
  const openUploadModal = (chapter = "") => {
    setSelectedChapter(chapter);
    setIsUploadOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadOpen(false);
    setSelectedChapter("");
  };

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await studentClient.getDashboard();
      const payload = res.data || {};
      setStudent(payload.student || null);
      setProjects(payload.projects || []);
      // derive feedback items from projects if present
      const fb = (payload.projects || []).filter(p => p.feedback).map(p => ({ chapter: `Chapter ${p.chapter || 'N/A'}`, comment: p.feedback }));
      setFeedback(fb);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // SVG ICONS
  const icons = {
    check: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ),
    clock: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-8V6a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 10z" clipRule="evenodd" />
      </svg>
    ),
    circle: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
      </svg>
    ),
    upload: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 8l4-4m-4 4L8 8" />
      </svg>
    ),
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 9h2v6H9V9z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
      </svg>
    ),
  };
  // show loading / error states early to avoid rendering when data not ready
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"> 
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center"> 
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-8"> 
      {/* Small fixed header shown when app navbar is hidden */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="container mx-auto flex items-center justify-between px-6 sm:px-4 py-3">
          <div className="flex items-center gap-3">
            <img src={futoLogo} alt="logo" className="h-8 w-8" />
            <span className="font-bold text-green-700">IFT Project Management</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-700">{student?.name ?? ''}</div>
            <button
              onClick={() => { localStorage.removeItem('token'); window.location.href = '/'; }}
              className="text-sm border border-green-700 text-green-700 px-3 py-1 rounded hover:bg-green-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Upload success message */}
      {uploadSuccess && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-40">
          <div className="bg-green-100 text-green-800 border border-green-200 px-4 py-2 rounded shadow">
            {uploadSuccess}
          </div>
        </div>
      )}

      <div className="pt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-3">
        <div>
          <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
            Welcome Back, {student?.name ?? "student"}
          </h1>
          <p className="text-gray-600">Track and manage your project submissions</p>
        </div>

        <div className="text-right mt-3 sm:mt-0">
          <p className="text-gray-500 text-sm">Matric: {student?.matricNumber ?? "-"}</p>
          <p className="text-gray-500 text-sm">Supervisor: {student?.supervisorId?.name ?? "No supervisor assigned"}</p>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Chapter 1–3 */}
        <div className="bg-white shadow-md rounded-lg p-5 border">
          <h3 className="font-semibold mb-3">Chapter 1-3</h3>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
            <div className="bg-green-600 h-3 rounded-full w-full"></div>
          </div>
          <p className="text-green-600 text-sm font-semibold mb-2">Approved</p>
          <ul className="text-sm text-gray-700 space-y-1 mb-3">
            <li>{icons.check} Submitted</li>
            <li>{icons.check} Awaiting Approval</li>
            <li>{icons.check} Approved</li>
          </ul>
          <button
            onClick={() => openUploadModal("Chapter 1-3")}
            className="flex items-center justify-center gap-2 w-full border border-green-600 text-green-700 py-2 rounded-md hover:bg-green-50 transition"
          >
            {icons.upload}
            Re-upload
          </button>
        </div>

        {/* Chapter 4–5 */}
        <div className="bg-white shadow-md rounded-lg p-5 border">
          <h3 className="font-semibold mb-3">Chapter 4-5</h3>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
            <div className="bg-yellow-500 h-3 rounded-full w-2/3"></div>
          </div>
          <p className="text-yellow-600 text-sm font-semibold mb-2">Awaiting Approval</p>
          <ul className="text-sm text-gray-700 space-y-1 mb-3">
            <li>{icons.check} Submitted</li>
            <li>{icons.clock} Awaiting Approval</li>
            <li>{icons.circle} Approved</li>
          </ul>
          <button
            onClick={() => openUploadModal("Chapter 4-5")}
            className="flex items-center justify-center gap-2 w-full border border-green-600 text-green-700 py-2 rounded-md hover:bg-green-50 transition"
          >
            {icons.upload}
            Re-upload
          </button>
        </div>

        {/* Final Submission */}
        <div className="bg-white shadow-md rounded-lg p-5 border">
          <h3 className="font-semibold mb-3">Final Submission (Chapter 1-5)</h3>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
            <div className="bg-gray-300 h-3 rounded-full w-1/5"></div>
          </div>
          <p className="text-gray-600 text-sm font-semibold mb-2">Not Started</p>
          <ul className="text-sm text-gray-700 space-y-1 mb-3">
            <li>{icons.circle} Submitted</li>
            <li>{icons.circle} Awaiting Approval</li>
            <li>{icons.circle} Approved</li>
          </ul>
          <button
            onClick={() => openUploadModal("Final Submission")}
            className="flex items-center justify-center gap-2 w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
          >
            {icons.upload}
            Upload
          </button>
        </div>
      </div>

      {/* Supervisor Feedback */}
      <div className="bg-blue-50 rounded-lg p-5 border mb-4">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          {icons.info} Supervisor Feedback
        </h3>

        {feedback && feedback.length > 0 ? (
          <div className="space-y-3">
            {feedback.map((item, index) => (
              <div key={index} className="bg-white border border-blue-200 rounded-md p-3">
                <p className="font-medium text-gray-800">{item.chapter}</p>
                <p className="text-gray-600 text-sm">{item.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-sm italic">
            No feedback from your supervisor yet.
          </p>
        )}

        <div className="mt-4 p-3 border-t text-gray-700 text-sm bg-green-50 rounded-md">
          <span className="font-semibold flex items-center gap-2">Tip:</span>
          <p>Review supervisor feedback before resubmitting. Upload only in PDF format.</p>
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={closeUploadModal}
        onUpload={async ({ projectTitle, description, file }) => {
          try {
            const formData = new FormData();
            formData.append('title', projectTitle);
            formData.append('description', description);
            formData.append('file', file);
            // chapter selection currently not wired server-side; you can add if needed
            await studentClient.uploadProject(formData);
            // refresh dashboard
            await fetchDashboard();
            // show success message and close modal
            setUploadSuccess('Upload successful');
            setTimeout(() => setUploadSuccess(''), 3000);
            closeUploadModal();
          } catch (err) {
            console.error('Upload failed', err);
            alert(err.response?.data?.message || err.message || 'Upload failed');
          }
        }}
      />
    </div>
  </div>
  );
};

export default StudentDashboard;