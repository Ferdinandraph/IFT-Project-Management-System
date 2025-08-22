import React from "react";

const AdminLogin = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-md w-full max-w-md mx-auto rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-1">IFT Project Management</h2>
                <p className="text-gray-700 text-center mb-1">Sign in to access the admin dashboard</p>
            
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input type="email" placeholder="Enter your email" className="border w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input type="password" placeholder="Enter your password" className="border w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500" />
                    </div>

                    <button type="submit" className="w-full bg-green-700 rounded-lg text-white py-2 font-bold hover:bg-green-800 transition">Login</button>
                </form>
            
            </div>
        </div>
    );

};
export default AdminLogin;