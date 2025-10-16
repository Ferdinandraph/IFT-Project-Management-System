import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SideBar({onNavigate}) {
  const [openSupervisor, setOpenSupervisor] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const location = useLocation();

  const baseClass = "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-900 transition";
  const activeClass = "bg-green-50 text-green-900";


  // SVG Icons
  const ChevronDown = ({ open }) => (
    <svg className={`w-4 h-4 transition-transform ${open ? "transform -rotate-90" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  );

  const Users = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M3 20h5v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 010 7.75"
      />
    </svg>
  );

  const GraduationCap = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 14l9-5-9-5-9 5 9 5z M12 14v7m0-7l6.16-3.422A12.083 12.083 0 0112 21.5 12.083 12.083 0 015.84 10.578L12 14z"
      />
    </svg>
  );

  const BarChart = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 17v-6h4v6m5 0V9h4v8M3 17V5h4v12"
      />
    </svg>
  );


  return (
    <aside className="w-60 bg-white border border-gray-200 p-4 rounded-md">
      <nav className="space-y-2">
        {/* supervisors */}
        <div>
          <button className={`${baseClass} w-full justify-between `} onClick={() => setOpenSupervisor(!openSupervisor)}>

            <span className="flex items-center gap-2 text-sm font-semibold">
              <Users />
              Supervisors
            </span>

            <ChevronDown open={openSupervisor} />
          </button>

          {openSupervisor && (
            <ul className="ml-6 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/supervisors/add"
                  onClick={onNavigate}
                  className={`${baseClass} text-sm font-semibold ${location.pathname === "/admin/supervisors/add" ? activeClass : ""
                  }`}>
                  Add Supervisors
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/supervisors/groups"
                  onClick={onNavigate}
                  className={`${baseClass} text-sm font-semibold ${location.pathname === "/admin/supervisors/groups" ? activeClass : ""
                  }`}>
                  Create Groups
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/supervisors/view"
                  onClick={onNavigate}
                  className={`${baseClass} text-sm font-semibold ${location.pathname === "/admin/supervisors/view" ? activeClass : ""
                  }`}>
                  View Groups
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* students */}
        <div>
          <button className={`${baseClass} w-full justify-between `} onClick={() => setOpenStudent(!openStudent)}>

            <span className="flex items-center gap-2 text-sm font-semibold">
              <GraduationCap />
              Students
            </span>

            <ChevronDown open={openStudent} />
          </button>

          {openStudent && (
            <ul className="ml-6 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/students/add"
                  onClick={onNavigate}
                  className={`${baseClass} text-sm font-semibold ${location.pathname === "/admin/students/add" ? activeClass : ""
                  }`}>
                  Add Students
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/students/upload"
                  onClick={onNavigate}
                  className={`${baseClass} text-sm font-semibold ${location.pathname === "/admin/students/upload" ? activeClass : ""
                  }`}>
                  Upload Students (CSV)
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/students/assign"
                  onClick={onNavigate}
                  className={`${baseClass} text-sm font-semibold ${location.pathname === "/admin/students/assign" ? activeClass : ""
                  }`}>
                  Assign to Group
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/students/view-assigned"
                  onClick={onNavigate}
                  className={`${baseClass} text-sm font-semibold ${location.pathname === "/admin/students/view-assigned" ? activeClass : ""
                  }`}>
                  View All Assigned
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Project Stats */}
        <Link
          to="/admin/Project-status"
          onClick={onNavigate}
          className={`${baseClass} text-sm font-semibold ${location.pathname === "/admin/Project-status" ? activeClass : ""
          }`}>
          <BarChart />
          Overall Project Status
        </Link>
      </nav>
    </aside>

  );
}