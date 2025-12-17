import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaPlus, FaList } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

const DashBoardLayouts = () => {
  const { user, dbUser } = useContext(AuthContext);
  console.log("DB USER:", dbUser);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr]">
      {/* SIDEBAR */}
      <aside className="bg-neutral text-neutral-content p-6">
        <h2 className="text-xl font-bold mb-6">Blood Donation</h2>

        <p className="text-sm mb-6">
          Welcome, <span className="font-semibold">{user?.displayName}</span>
        </p>
        <p className="text-xs mt-4 mb-4">
          <span className="font-bold text-2xl">{dbUser?.role}</span>
        </p>

        <nav className="space-y-2">
          {/* Dashboard Home (everyone) */}
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

          {/* Donor only */}
          {dbUser?.role === "donor" && (
            <>
              <NavLink
                to="/dashboard/create-donation-request"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "hover:bg-neutral-focus"
                  }`
                }
              >
                <FaPlus /> Create Request
              </NavLink>

              <NavLink
                to="/dashboard/my-donation-requests"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "hover:bg-neutral-focus"
                  }`
                }
              >
                <FaList /> My Requests
              </NavLink>
            </>
          )}

          {/* Admin only */}
          {dbUser?.role === "admin" && (
            <NavLink
              to="/dashboard/all-users"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded ${
                  isActive ? "bg-red-600 text-white" : "hover:bg-neutral-focus"
                }`
              }
            >
              <FaList /> All Users
            </NavLink>
          )}

          {/* Admin + Volunteer */}
          {(dbUser?.role === "admin" || dbUser?.role === "volunteer") && (
            <NavLink
              to="/dashboard/all-blood-donation-request"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded ${
                  isActive ? "bg-red-600 text-white" : "hover:bg-neutral-focus"
                }`
              }
            >
              <FaList /> All Donation Requests
            </NavLink>
          )}
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
