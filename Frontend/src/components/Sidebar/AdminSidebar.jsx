/* eslint-disable */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiCalendar,
  FiAlertCircle,
  FiLogOut,
  FiTruck,
  FiHome,
} from "react-icons/fi";

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Active logic similar to your Notus example (but using useLocation)
  const isActive = (path, { exact = false } = {}) => {
    if (exact) return pathname === path;
    return pathname === path || pathname.startsWith(path + "/");
  };

  const itemClass = (active) =>
    `flex items-center w-full p-3 rounded-lg transition-colors ${
      active
        ? "bg-blue-700 text-white"
        : "text-blue-100 hover:bg-blue-800 hover:text-white"
    }`;

  const handleLogout = () => {
    // Clear any admin session data
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminToken");

    // Redirect to home page
    navigate("/");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-blue-900 text-white min-h-screen sticky top-0"
    >
      <div className="p-4 border-b border-blue-800">
        <h1 className="text-xl font-bold">Tunisia Car Rental</h1>
        <p className="text-blue-200 text-sm">Admin Panel</p>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            {/* Active for both /admin and /admin/dashboard */}
            <Link
              to="/admin/dashboard"
              className={itemClass(
                isActive("/admin/dashboard") || pathname === "/admin"
              )}
            >
              <FiUsers className="mr-3" />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/admin/bookings"
              className={itemClass(isActive("/admin/bookings"))}
            >
              <FiCalendar className="mr-3" />
              Bookings
            </Link>
          </li>

          <li>
            {/* Route name matches your App.jsx: /admin/cars */}
            <Link
              to="/admin/cars"
              className={itemClass(isActive("/admin/cars"))}
            >
              <FiTruck className="mr-3" />
              Vehicles
            </Link>
          </li>

          <li>
            <Link
              to="/admin/messages"
              className={itemClass(isActive("/admin/messages"))}
            >
              <FiAlertCircle className="mr-3" />
              Messages
            </Link>
          </li>

          <li className="pt-4 mt-4 border-t border-blue-800">
            <button
              onClick={handleHomeClick}
              className="flex items-center w-full p-3 rounded-lg text-blue-100 hover:bg-blue-800 hover:text-white transition-colors"
            >
              <FiHome className="mr-3" />
              Back to Site
            </button>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 rounded-lg text-blue-100 hover:bg-blue-800 hover:text-white transition-colors"
            >
              <FiLogOut className="mr-3" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </motion.aside>
  );
}
