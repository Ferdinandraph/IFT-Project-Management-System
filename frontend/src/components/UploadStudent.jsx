import React, { useState } from "react";

export default function UploadStudent() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
    setError("");
    setSuccess("");
    setFile(null);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setError("");
    setSuccess("");
    setFile(null);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    if (!uploadedFile.name.endsWith(".csv")) {
      setError("Only CSV files are allowed");
      setFile(null);
    } else {
      setError("");
      setFile(uploadedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a CSV file");
      return;
    }

    setError("");

    // Temporary simulation for upload success
    setTimeout(() => {
      console.log("File uploaded:", file.name);
      setSuccess("Students uploaded successfully!");
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    }, 500);
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-3">Upload Students</h2>
      <p className="text-gray-500 text-center mb-6">
        Upload student details using a properly formatted CSV file.
      </p>

      <div className="flex justify-center">
        <button
          onClick={handleOpenModal}
          className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-800 transition"
        >
          Upload via CSV
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              Upload Students CSV
            </h3>

            {error && (
              <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
            )}

            {success && (
              <p className="text-green-600 text-sm mb-3 text-center font-semibold">
                {success}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select CSV File
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="border w-full rounded-md px-3 py-2 mt-1 text-sm focus:ring-1 focus:ring-green-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Only .csv files are supported (e.g., S/N, student_name, matric_no, group)
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="border border-gray-300 rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-green-700 text-white rounded-md px-4 py-2 hover:bg-green-800"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
