import React, { useState } from "react";

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpload({ projectTitle, description, file });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-3">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Upload Submission</h2>
        <p className="text-gray-600 text-sm mb-4">
          Please fill in the details and upload your project document (PDF only).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Project Title</label>
            <input
              type="text"
              required
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="border border-gray-300 rounded-md w-full p-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Brief Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-md w-full p-2 focus:ring-2 focus:ring-green-600 outline-none"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Upload Document</label>
            <input
              type="file"
              accept=".pdf"
              required
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
            />
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;