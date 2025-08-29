import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiCalendar,
  FiTruck,
  FiAlertCircle,
  FiTrendingUp,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

const API_BASE = "http://localhost:5000";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    totalCars: 0,
    availableCars: 0,
    totalMessages: 0,
    newMessages: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel
      const [bookingsRes, carsRes, messagesRes] = await Promise.all([
        axios.get(`${API_BASE}/bookings/getAll`),
        axios.get(`${API_BASE}/cars/getAllCars`),
        axios.get(`${API_BASE}/contact/getAllMessages`),
      ]);

      const bookings = Array.isArray(bookingsRes.data) ? bookingsRes.data : [];
      const cars = Array.isArray(carsRes.data) ? carsRes.data : [];
      const messages = Array.isArray(messagesRes.data) ? messagesRes.data : [];

      // Calculate statistics
      const now = new Date();
      const activeBookings = bookings.filter((b) => {
        if (b.status === "Active") return true;
        if (b.status === "Cancelled") return false;

        const start = new Date(`${b.pickupDate}T${b.pickupTime || "00:00"}`);
        const end = new Date(`${b.returnDate}T${b.returnTime || "00:00"}`);
        return now >= start && now <= end;
      });

      const availableCars = cars.filter((c) => c.status === "available");
      const newMessages = messages.filter(
        (m) => m.status === "new" || !m.status
      );

      const totalRevenue = bookings.reduce((sum, b) => {
        return sum + (b.estimatedTotal || b.total || 0);
      }, 0);

      // Calculate monthly revenue (last 30 days)
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const monthlyRevenue = bookings
        .filter((b) => {
          const bookingDate = new Date(b.createdAt || b.pickupDate);
          return bookingDate >= thirtyDaysAgo;
        })
        .reduce((sum, b) => sum + (b.estimatedTotal || b.total || 0), 0);

      setStats({
        totalBookings: bookings.length,
        activeBookings: activeBookings.length,
        totalCars: cars.length,
        availableCars: availableCars.length,
        totalMessages: messages.length,
        newMessages: newMessages.length,
        totalRevenue,
        monthlyRevenue,
      });

      // Get recent data
      setRecentBookings(bookings.slice(0, 5));
      setRecentMessages(messages.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const RecentItem = ({ title, subtitle, time, status, statusColor }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-500 truncate">{subtitle}</p>
      </div>
      <div className="flex items-center space-x-2 ml-4">
        {status && (
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}
          >
            {status}
          </span>
        )}
        <span className="text-xs text-gray-400">{time}</span>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm p-6 border-b border-gray-200"
      >
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening with your car rental business.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={FiCalendar}
            color="bg-blue-500"
            subtitle="All time"
          />
          <StatCard
            title="Active Rentals"
            value={stats.activeBookings}
            icon={FiTrendingUp}
            color="bg-green-500"
            subtitle="Currently active"
          />
          <StatCard
            title="Total Vehicles"
            value={stats.totalCars}
            icon={FiTruck}
            color="bg-purple-500"
            subtitle={`${stats.availableCars} available`}
          />
          <StatCard
            title="New Messages"
            value={stats.newMessages}
            icon={FiAlertCircle}
            color="bg-orange-500"
            subtitle="Require attention"
            />
          </div>

        {/* Revenue Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Overview
              </h3>
              <FiDollarSign className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Revenue</span>
                <span className="text-xl font-bold text-gray-900">
                  {stats.totalRevenue.toLocaleString()} TND
                </span>
          </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">This Month</span>
                <span className="text-lg font-semibold text-green-600">
                  {stats.monthlyRevenue.toLocaleString()} TND
                </span>
          </div>
          </div>
      </motion.div>

            <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h3>
              <FiClock className="w-5 h-5 text-blue-500" />
              </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700 font-medium">
                    Add New Vehicle
                  </span>
                  <FiTruck className="w-4 h-4 text-blue-500" />
                    </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-green-700 font-medium">
                    View All Bookings
                  </span>
                  <FiCalendar className="w-4 h-4 text-green-500" />
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-orange-700 font-medium">
                    Check Messages
                  </span>
                  <FiAlertCircle className="w-4 h-4 text-orange-500" />
                    </div>
              </button>
                    </div>
          </motion.div>
                  </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Bookings
              </h3>
                  </div>
            <div className="p-6">
              {recentBookings.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No recent bookings
                </p>
              ) : (
                <div className="space-y-1">
                  {recentBookings.map((booking) => (
                    <RecentItem
                      key={booking._id}
                      title={`${booking.firstName || ""} ${
                        booking.lastName || ""
                      }`}
                      subtitle={`${booking.car?.make || ""} ${
                        booking.car?.model || ""
                      }`}
                      time={new Date(
                        booking.createdAt || booking.pickupDate
                      ).toLocaleDateString()}
                      status={booking.status || "New"}
                      statusColor={
                        booking.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Completed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    />
                  ))}
                </div>
              )}
                    </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Messages
              </h3>
                    </div>
            <div className="p-6">
              {recentMessages.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No recent messages
                </p>
              ) : (
                <div className="space-y-1">
                  {recentMessages.map((message) => (
                    <RecentItem
                      key={message._id}
                      title={`${message.firstName || ""} ${
                        message.lastName || ""
                      }`}
                      subtitle={message.subject || "No subject"}
                      time={new Date(message.createdAt).toLocaleDateString()}
                      status={message.status || "New"}
                      statusColor={
                        message.status === "new" || !message.status
                          ? "bg-green-100 text-green-800"
                          : message.status === "read"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    />
                  ))}
                </div>
              )}
              </div>
            </motion.div>
          </div>
      </div>
    </div>
  );
}
