import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";

export default function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openStudentLogin = () => {
    setIsModalOpen(true);
  };

  // simple inline SVG icons
  const Icon = {
    checklist: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 6h11M9 12h11M9 18h11" />
        <path d="M5 6l-2 2 2 2 4-4M5 12l-2 2 2 2 4-4M5 18l-2 2 2 2 4-4" strokeLinejoin="round" />
      </svg>
    ),
    chat: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" />
      </svg>
    ),
    target: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M22 12h-3M12 22v-3M2 12h3" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    gear: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.33 1.82l.03.07a2 2 0 1 1-3.4 0l.03-.07A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1.82-.33l-.07.03a2 2 0 1 1 0-3.4l.07.03A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6c.3 0 .6-.1 1-.6a1.65 1.65 0 0 0 .33-1.82l-.03-.07a2 2 0 1 1 3.4 0l-.03.07A1.65 1.65 0 0 0 15 4.6c.3 0 .6.1 1 .6a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c0 .3.1.6.6 1 .5.4 1 .7 1.82.33l.07-.03a2 2 0 1 1 0 3.4l-.07-.03A1.65 1.65 0 0 0 19.4 15z" />
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  };

  const features = [
    {
      title: "Streamlined Project Management",
      desc:
        "Efficiently manage student projects from submission to approval with our intuitive interface.",
      icon: Icon.checklist,
    },
    {
      title: "Real-time Collaboration",
      desc:
        "Enable seamless communication between students and supervisors with instant notifications.",
      icon: Icon.chat,
    },
    {
      title: "Comprehensive Tracking",
      desc:
        "Track project progress, feedback, and milestones all in one centralized platform.",
      icon: Icon.target,
    },
    {
      title: "Secure & Reliable",
      desc:
        "Your academic data is protected with enterprise-grade security and regular backups.",
      icon: Icon.shield,
    },
    {
      title: "Automated Workflows",
      desc:
        "Reduce manual work with automated project status updates and deadline reminders.",
      icon: Icon.gear,
    },
    {
      title: "24/7 Accessibility",
      desc:
        "Access your projects anytime, anywhere with our responsive web platform.",
      icon: Icon.clock,
    },
  ];

  return (
    <div className="w-full">
      {/* =============== HERO =============== */}
      <section className="bg-white pt-16 pb-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-slate-900">
            IFT Project Management
            <br />
            <span className="text-green-700">Made Simple</span>
          </h1>

          <p className="mt-5 text-slate-600 text-lg max-w-3xl mx-auto">
            Streamline academic project submissions, reviews, and collaboration
            between students, supervisors, and administrators at FUTO&apos;s
            Information Technology Department.
          </p>

          {/* Search */}
          <div className="mt-6 flex justify-center">
            <div className="relative w-full max-w-2xl">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                {Icon.search}
              </span>
              <input
                type="text"
                placeholder="Search projects, students, or supervisors..."
                className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-slate-700 outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={openStudentLogin}
              className="px-6 py-3 rounded-md bg-green-700 text-white font-semibold hover:bg-green-800 transition"
            >
              Get Started Today
            </button>
            <a
              href="#features"
              className="px-6 py-3 rounded-md border border-slate-200 text-slate-800 hover:bg-slate-50 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
      

      {/* =============== FEATURES =============== */}
      <section id="features" className="bg-slate-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-slate-900">
            Why Choose Our Platform?
          </h2>
          <p className="mt-3 text-center text-slate-600 max-w-3xl mx-auto">
            Designed specifically for academic institutions, our platform
            streamlines every aspect of project management and supervision.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-700">
                  {f.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Login Modal (triggered by Get Started Today) */}
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role="student"
      />
    </div>
  );
}
