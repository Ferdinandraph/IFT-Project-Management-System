import React, { useState } from "react";
import futoLogo from "../assets/futo-logo.png";
import LoginModal from "./LoginModal";

const Navbar = () => {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [role, setRole] = useState("");

    const handleLoginClick = (selectedRole) => {
        setRole(selectedRole);
        setModalOpen(true);
        setIsLoginOpen(false); //Close the dropdown after selection
    }

    return (
        <nav className="shadow-sm fixed top-0 left-0 z-50 w-full bg-white">
            <div className="container mx-auto flex items-center justify-between px-6 sm:px-4 py-3">
                <div className="flex items-center">
                    <img src={futoLogo} alt="FUTO Logo" className="h-10 w-10 object-contain" />
                    <span className="ml-2 font-bold text-green-700 text-lg sm:text-md">IFT Project Management</span>
                </div>

                <div className="relative">
                    <button
                        onMouseEnter={() => setIsLoginOpen(true)}
                        onMouseLeave={() => setIsLoginOpen(false)}
                        className="border border-green-700 rounded-lg px-6 py-2 text-gray-700 font-bold hover:bg-green-700 hover:text-white transition"
                    >Login
                    </button>

                    {/* Login Drowpdown */}
                    {isLoginOpen && (
                        <div
                            className="absolute right-0 top-full mt-2 border rounded-md text-center"
                            onMouseEnter={() => setIsLoginOpen(true)}
                            onMouseLeave={() => setIsLoginOpen(false)}
                        >


                            <button onClick={() => handleLoginClick("student")}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-200"
                            >Student
                            </button>

                            <button onClick={() => handleLoginClick("supervisor")}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-200"
                            >Supervisor
                            </button>

                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <LoginModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                role={role}
            />

        </nav >
    );
};

export default Navbar;
