import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import futoLogo from "../assets/futo-logo.png";
import StatsCard from "../components/StatsCard";
import SideBar from "../components/SideBar";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const [academicYear, setAcademicYear] = useState(() => {
        const saved = localStorage.getItem("academicYear");
        return saved ? JSON.parse(saved) : ["2024/2025"];
    });


    const [currentYear, setCurrentYear] = useState("2024/2025");
    const [addingYear, setAddingYear] = useState(false);
    const [newyear, setNewYear] = useState("");

    useEffect(() => {
        localStorage.setItem("academicYear", JSON.stringify(academicYear));
    }, [academicYear]);

    const handleSelectYear = (e) => {
        const value = e.target.value;
        if (value === "add_new") {
            setAddingYear(true);
        }
        else {
            setCurrentYear(value);
            setAddingYear(false);
        }
    }

    const handleAddYear = () => {
        if (newyear && !academicYear.includes(newyear)) {
            setAcademicYear([...academicYear, newyear]);
            setCurrentYear(newyear);
            setNewYear("");
            setAddingYear(false);
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem("isAdminLoggedIn");
        navigate("/admin-login");
    }

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 pt-20 relative ">
            {/* Navbar */}
            <div className="bg-white shadow-md fixed top-0 left-0 w-full z-20">
                <div className="max-w-7xl mx-auto flex justify-between items-center p-4 ">
                    <div className="flex items-center gap-3">
                        {/* Hamburger Menu for mobile */}
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-green-700 md:hidde">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                        {/* title & Logo */}
                        <img src={futoLogo} alt="FUTO Logo" className="h-10 w-10 object-contain" />
                        <h2 className="text-green-700 font-bold text-lg">IFT Project Management System</h2>
                    </div>

                    <button onClick={handleSignOut}
                        className="border border-green-700 rounded-lg px-4 py-2 text-green-700 font-semibold hover:bg-green-700 hover:text-white transition">
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Year Selector & Stats */}
            <div className="max-w-7xl mx-auto mt-6">
                <div className="flex justify-between items-center px-6 py-4">
                    <h2 className="sm:text-lg font-semibold text-green-700">Welcome to the Admin Dashboard</h2>

                    <div className=" flex flex-col items-start">
                        <span className="text-sm text-gray-500 font-semibold">Academic Year</span>
                        {!addingYear ? (
                            <select value={currentYear} onChange={handleSelectYear} className="border rounded-md px-3 py-1 mt-1 text-sm">
                                {academicYear.map((year, idx) => (
                                    <option key={idx} value={year}>
                                        {year}
                                    </option>
                                ))}
                                <option value="add_new">+ Add New Year</option>
                            </select>
                        ) : (
                            <div className="flex mt-1">
                                <input type="text"
                                    placeholder="2024/2025"
                                    value={newyear}
                                    onChange={(e) => setNewYear(e.target.value)}
                                    className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                                />

                                <button onClick={handleAddYear} className="border rounded-md px-3 py-1 text-sm hover:bg-green-600 hover:text-white">Save</button>
                            </div>
                        )}
                    </div>
                </div>
                <StatsCard />
            </div>

            {/* Sidebar + Main Content */}
            <div className="max-w-7xl mx-auto mt-6 flex justify-center gap-6 relative">
                <div className="hidden md:block">
                    <SideBar />
                </div>

                {sidebarOpen && (
                    <div
                        onClick={() => setSidebarOpen(false)}
                        className="fixed top-20 left-0 w-full h-[calc(100%-5rem)] bg-black bg-opacity-40 z-10 md:hidden">

                        <div onClick={(e) => e.stopPropagation()} className="absolute top-0 left-0">
                            <SideBar onNavigate={() => setSidebarOpen(false)} />
                        </div>
                    </div>
                )}

                <div className="flex-1 bg-white border border-gray-200 p-4 rounded-md">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

