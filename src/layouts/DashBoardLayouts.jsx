import React from "react";
import { Navigate, NavLink, Outlet } from "react-router";
import { FaHome, FaPlus, FaList } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Loader from "../components/Loader";

const DashBoardLayouts = () => {
  const { user, dbUser, loading } = useContext(AuthContext);
  console.log("DASHBOARD LAYOUT FILE LOADED");

  // ⏳ loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  // 🔐 not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ BLOCKED USER
  if (dbUser && dbUser.status === "blocked") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Your account is blocked
        </h2>
        <p>Please contact admin for support.</p>
      </div>
    );
  }

  if (!dbUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  console.log("DASHBOARD GUARD CHECK", {
    user,
    dbUser,
    loading,
  });

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr]">
      {/* SIDEBAR */}
      <aside className="bg-neutral text-neutral-content p-6">
        <h2 className="text-xl font-bold mb-6">Blood Donation</h2>

        <p className="text-sm mb-6">
          Welcome, <span className="font-semibold">{user?.displayName}</span>
        </p>

        <nav className="space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded ${
                isActive ? "bg-red-600 text-white" : "hover:bg-neutral-focus"
              }`
            }
          >
            <FaHome /> Website Home
          </NavLink>

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

          <NavLink
            to="/dashboard/funding-history"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded ${
                isActive ? "bg-red-600 text-white" : "hover:bg-neutral-focus"
              }`
            }
          >
            <FaList /> Funding History
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
