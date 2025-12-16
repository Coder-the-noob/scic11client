import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaPlus, FaList } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

const DashBoardLayouts = () => {
    const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr]">
      
      {/* SIDEBAR */}
      <aside className="bg-neutral text-neutral-content p-6">
        <h2 className="text-xl font-bold mb-6">
          Blood Donation
        </h2>

        <p className="text-sm mb-6">
          Welcome, <span className="font-semibold">{user?.displayName}</span>
        </p>

        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded ${
                isActive ? "bg-red-600 text-white" : "hover:bg-neutral-focus"
              }`
            }
          >
            <FaHome /> Dashboard Home
          </NavLink>

          <NavLink
            to="/dashboard/create-donation-request"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded ${
                isActive ? "bg-red-600 text-white" : "hover:bg-neutral-focus"
              }`
            }
          >
            <FaPlus /> Create Request
          </NavLink>

          <NavLink
            to="/dashboard/my-donation-requests"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded ${
                isActive ? "bg-red-600 text-white" : "hover:bg-neutral-focus"
              }`
            }
          >
            <FaList /> My Requests
          </NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="bg-base-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoardLayouts;