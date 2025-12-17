import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Swal from "sweetalert2";
import { FaHeartbeat, FaHandHoldingHeart } from "react-icons/fa";

export default function Navbar() {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { user, logoutUser } = auth;

  const handleLogout = async () => {
    try {
      await logoutUser();
      Swal.fire("Logged out", "You have been logged out", "success");
    } catch {
      Swal.fire("Error", "Logout failed", "error");
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/donation-requests"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-semibold" : ""
          }
        >
          Donation Requests
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/dashboard/funding"
            className={({ isActive }) =>
              isActive ? "text-red-600 font-semibold" : ""
            }
          >
            <FaHandHoldingHeart className="inline mr-1" />
            Funding
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 lg:px-8">
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
            {!user && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <FaHeartbeat className="text-2xl text-red-600 animate-pulse" />
          <span className="text-xl font-bold">
            Blood<span className="text-red-600">Donate</span>
          </span>
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">{navLinks}</ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-3">
        {!user ? (
          <NavLink to="/login" className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
            Login
          </NavLink>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-red-500 ring-offset-2">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="avatar"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="px-3 py-2 text-sm font-semibold">
                {user.displayName || "User"}
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
