import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";



export default function Home() {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const openStudentLogin = () => {
        setModalOpen(true);
    };


    return (
        <div className="w-full pt-[20px]">
            {/*=============== HERO ================= */}
            <section className="bg-white mt-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-slate-900">
                        IFT Project Management
                        <br />
                        <span className="text-green-900">Made Simple</span>
                    </h1>

                    <p className="mt-5 text-slate-600 text-lg max-w-3xl mx-auto">Streamline academic project submissions, reviews, and collaboration between students, supervisors, and administrators at Information Technology Department.</p>

                    {/* Search */}
                    <div className="flex justify-center mt-5 mx-5">
                        <div className="relative w-full max-w-md">
                            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="M21 21l-4.3-4.3" />
                                </svg>
                            </span>

                            <input type="text" placeholder="Search projects, students, or supervisors..."
                                className="border border-slate-200 rounded-lg w-full py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <div className="mt-5 flex justify-center gap-5">
                        <button
                            onClick={openStudentLogin}
                            className="bg-green-700 px-6 py-2 rounded-md text-white font-semibold hover:bg-green-800 transition"
                        >Get Started
                        </button>

                        <a href="#" className="border border-slate-200 text-green-700 px-6 py-2 rounded-md hover:bg-slate-200 transition">Learn More</a>
                    </div>
                </div>
            </section>

            {/*================ FEATURES / FOOTER =============*/}
            <section className="bg-slate-50 mt-10 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl sm:text-4xl font-bold text-center text-slate-900">Why Choose Our Platform?</h2>
                    <p className="mt-3 text-center text-slate-700 max-w-2xl mx-auto">Designed specifically for academic institutions, our platform streamlines every aspect of project management and supervision.</p>

                    {/* Features Card */}
                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="max-w-sm mx-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition ">
                            <div className="flex items-center gap-4">
                                <div className="bg-gray-100 w-10 h-10 rounded-lg text-green-900 inline-flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 6h11M9 12h11M9 18h11" />
                                        <path d="M5 6l-2 2 2 2 4-4M5 12l-2 2 2 2 4-4M5 18l-2 2 2 2 4-4" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Streamlined Project Management</h3>
                            </div>
                            <p className="mt-3 text-sm text-slate-600">Efficiently manage student projects from submission to approval with our intuitive interface.</p>
                        </div>

                        <div className="max-w-sm mx-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-4">
                                <div className="bg-gray-100 w-10 h-10 rounded-lg text-green-900 inline-flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Real-time Collaboration</h3>
                            </div>
                            <p className="mt-3 text-sm text-slate-600">Enable seamless communication between students and supervisors with instant notifications.</p>
                        </div>

                        <div className="max-w-sm mx-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-4">
                                <div className="bg-gray-100 w-10 h-10 rounded-lg text-green-700 inline-flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="8" />
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M12 2v3M22 12h-3M12 22v-3M2 12h3" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Comprehensive Tracking</h3>
                            </div>
                            <p className="mt-3 text-sm text-slate-600">Track project progress, feedback, and milestones all in one centralized platform.</p>
                        </div>

                        <div className="max-w-sm mx-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-4">
                                <div className="bg-gray-100 w-10 h-10 rounded-lg text-green-700 inline-flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
                                        <path d="M9 12l2 2 4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Secure & Reliable</h3>
                            </div>
                            <p className="mt-3 text-sm text-slate-600">Your academic data is protected with enterprise-grade security and regular backups.</p>
                        </div>

                        <div className="max-w-sm mx-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-4">
                                <div className="bg-gray-100 w-10 h-10 rounded-lg text-green-700 inline-flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.33 1.82l.03.07a2 2 0 1 1-3.4 0l.03-.07A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1.82-.33l-.07.03a2 2 0 1 1 0-3.4l.07.03A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6c.3 0 .6-.1 1-.6a1.65 1.65 0 0 0 .33-1.82l-.03-.07a2 2 0 1 1 3.4 0l-.03.07A1.65 1.65 0 0 0 15 4.6c.3 0 .6.1 1 .6a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c0 .3.1.6.6 1 .5.4 1 .7 1.82.33l.07-.03a2 2 0 1 1 0 3.4l-.07-.03A1.65 1.65 0 0 0 19.4 15z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Automated Workflows</h3>
                            </div>
                            <p className="mt-3 text-sm text-slate-600">Reduce manual work with automated project status updates and deadline reminders.</p>
                        </div>

                        <div className="max-w-sm mx-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-4">
                                <div className="bg-gray-100 w-10 h-10 rounded-lg text-green-700 inline-flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="9" />
                                        <path d="M12 7v5l3 3" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">24/7 Accessibility</h3>
                            </div>
                            <p className="mt-3 text-sm text-slate-600">Access your projects anytime, anywhere with our responsive web platform.</p>
                        </div>
                    </div>
                </div>

                <footer className="border-t border-slate-200 mt-16">
                    <div className="max-w-7xl mx-auto px-16 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-green-700">IFT Project Management</h3>
                            <p className="mt-2 text-gray-600 text-sm">Streamlining academic project management for students, supervisors, and administrators.</p>
                        </div>

                        {/* Qucik Links */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800 mb-3">Qucik Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-600 hover:text-green-600">Home</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-green-600">About</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-green-600">Contact</a></li>
                            </ul>
                        </div>

                        {/* Users */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800 mb-3">For Users</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-600 hover:text-green-600">Students</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-green-600">Supervisors</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-green-600">Administrators</a></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800 mb-3">Support</h4>
                            <ul className="space-y-2"> 
                                <li><a href="#" className="text-gray-600 hover:text-green-600">Help Center</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-green-600">Documentation</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-green-600">FAQs</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-200 py-6">
                        <div className="max-w-7xl mx-auto px-16 flex flex-col md:flex-row justify-between items-center text-sm">
                            <p className="text-sm text-slate-500">&copy; 2024 IFT Project Management. All rights reserved.</p>
                            <div className="flex space-x-4 mt-4 md:mt-0">
                                <a href="#" className="text-slate-500 hover:text-slate-900 mx-2">Privacy Policy</a>
                                <a href="#" className="text-slate-500 hover:text-slate-900 mx-2">Terms of Service</a>
                            </div>
                        </div>

                    </div>
                </footer>
            </section>

            <LoginModal
                isOpen={modalOpen}   // pass the actual state value
                onClose={() => setModalOpen(false)}
                role="student"
            />

        </div>
    )
};