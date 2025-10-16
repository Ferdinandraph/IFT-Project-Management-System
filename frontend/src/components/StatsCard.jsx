import { useEffect, useState } from "react";

export default function StatsCard() {
    const [Stats, setStats] = useState({
        totalSupervisors: 0,
        totalStudents: 0,
        assigned: 0,
        unassigned: 0
    });

    useEffect(() => {
        // Fetch stats from backend API

        // Simulating with dummy data for now
        setStats({
            totalSupervisors: 15,
            totalStudents: 120,
            assigned: 90,
            unassigned: 30
        });
    }, []);

    const Card = ({ title, value, color, icon }) => (
        <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-400">{icon}</p>
            </div>
            <p className={`mt-2 text-2xl font-semibold ${color}`}>{value}</p>
        </div>
    );

    const userIcon = (
        <svg className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">

            <path strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M3 20h5v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 010 7.75"
            />
        </svg>
    );

    const studentIcon = (
        <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">

            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422A12.083 12.083 0 0112 21.5 12.083 12.083 0 015.84 10.578L12 14z"
            />
        </svg>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4 pb-6 mx-3">
            {/* Supervisors */}
            <Card title="Total Supervisors" 
                value={Stats.totalSupervisors}
                icon={userIcon}
            />
            
            {/* Students */}
            <Card title="Total Students"
                value={Stats.totalStudents}
                icon={studentIcon}
            />

            {/* Assigned */}
            <Card title="Assigned"
                value={Stats.assigned}
                color="text-green-700"
                icon={userIcon}
            />

            {/* Unassigned */}
            <Card title="Unassigned"
                value={Stats.unassigned}
                color="text-red-600"
                icon={userIcon}
            />
        </div>
    )
}