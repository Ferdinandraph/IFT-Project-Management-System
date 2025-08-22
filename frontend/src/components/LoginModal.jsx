import React from "react";

const LoginModal = ({ isOpen, onClose, role }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                {/* Close button */}
                <button className="absolute top-4 right-4 text-gray-500 hover:bg-gray-100 rounded-full border border-gray-300 p-1" onClick={onClose} aria-label="Close">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                        <path d="M6 6l12 12M6 18L18 6" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-green-700 text-center mb-1">IFT Project Management</h2>
                <p className="text-gray-600 text-center mb-1">Sign in to access your dashboard</p>

                {/* Form Role for Studnet / supervisor */}
                <form className="space-y-4">
                    {/* Username / Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            {role === "student" ? "User Name" : "Email"}
                        </label>
                        <input 
                            type={role === "student" ? "text" : "email"}
                            placeholder={role === "student" ? "Enter your username" : "Enter your email"}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input type="password" 
                            placeholder={role === "student" ? "Re-enter your reg number" : "Enter your password"}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-lg font-bold hover:bg-green-800 transition">Sign in</button>
                </form>
            </div>
        </div>
    );

};
export default LoginModal;