import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { motion } from 'framer-motion';
import { FiUsers,  FiCalendar, FiDollarSign, FiAlertCircle, FiSettings, FiLogOut } from 'react-icons/fi';

Chart.register(...registerables);

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([
    { id: 1, customer: 'Mohamed Ali', car: 'Toyota Yaris', pickupDate: '2023-06-15', returnDate: '2023-06-20', status: 'Active', price: 600 },
    { id: 2, customer: 'Ahmed Ben Salah', car: 'Hyundai Tucson', pickupDate: '2023-06-18', returnDate: '2023-06-25', status: 'Active', price: 1750 },
    { id: 3, customer: 'Fatma Zohra', car: 'Mercedes E-Class', pickupDate: '2023-06-10', returnDate: '2023-06-12', status: 'Completed', price: 800 },
    { id: 4, customer: 'Youssef Hammami', car: 'Volkswagen Golf', pickupDate: '2023-06-22', returnDate: '2023-06-28', status: 'Upcoming', price: 900 },
    { id: 5, customer: 'Amina Trabelsi', car: 'BMW 4 Series', pickupDate: '2023-06-05', returnDate: '2023-06-08', status: 'Completed', price: 1350 },
  ]);

  const [cars, setCars] = useState([
    { id: 1, model: 'Toyota Yaris', status: 'Available', location: 'Tunis Airport', lastService: '2023-05-28' },
    { id: 2, model: 'Hyundai Tucson', status: 'Rented', location: 'Sousse Downtown', lastService: '2023-05-20' },
    { id: 3, model: 'Mercedes E-Class', status: 'Available', location: 'Tunis City Center', lastService: '2023-06-01' },
    { id: 4, model: 'Volkswagen Golf', status: 'Maintenance', location: 'Djerba Airport', lastService: '2023-05-15' },
    { id: 5, model: 'BMW 4 Series', status: 'Available', location: 'Tunis Airport', lastService: '2023-06-05' },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Mohamed Ali', email: 'mohamed@example.com', rentals: 3, status: 'Active' },
    { id: 2, name: 'Ahmed Ben Salah', email: 'ahmed@example.com', rentals: 5, status: 'Active' },
    { id: 3, name: 'Fatma Zohra', email: 'fatma@example.com', rentals: 2, status: 'Active' },
    { id: 4, name: 'Youssef Hammami', email: 'youssef@example.com', rentals: 1, status: 'New' },
    { id: 5, name: 'Amina Trabelsi', email: 'amina@example.com', rentals: 4, status: 'Active' },
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Chart data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (TND)',
        data: [12000, 19000, 15000, 18000, 21000, 17000],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const carStatusData = {
    labels: ['Available', 'Rented', 'Maintenance'],
    datasets: [
      {
        data: [8, 5, 2],
        backgroundColor: [
          'rgba(16, 185, 129, 0.5)',
          'rgba(59, 130, 246, 0.5)',
          'rgba(245, 158, 11, 0.5)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const bookingStatusData = {
    labels: ['Active', 'Completed', 'Upcoming', 'Cancelled'],
    datasets: [
      {
        label: 'Bookings',
        data: [12, 25, 8, 3],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Filter data based on search query
  const filteredBookings = bookings.filter(booking =>
    booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.car.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCars = cars.filter(car =>
    car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.price, 0);
  const activeBookings = bookings.filter(booking => booking.status === 'Active').length;
  const availableCars = cars.filter(car => car.status === 'Available').length;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-blue-900 text-white shadow-lg"
      >
        <div className="p-4 border-b border-blue-800">
          <h1 className="text-2xl font-bold">Tunisia Car Rental</h1>
          <p className="text-blue-200 text-sm">Admin Dashboard</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
              >
                <FiUsers className="mr-3" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'bookings' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
              >
                <FiCalendar className="mr-3" />
                Bookings
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('cars')}
                className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'cars' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
              >
                <FiUsers className="mr-3" />
                Vehicles
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'users' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
              >
                <FiUsers className="mr-3" />
                Customers
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('alerts')}
                className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'alerts' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
              >
                <FiAlertCircle className="mr-3" />
                Alerts
              </button>
            </li>
            <li className="pt-4 mt-4 border-t border-blue-800">
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'settings' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
              >
                <FiSettings className="mr-3" />
                Settings
              </button>
            </li>
            <li>
              <button className="flex items-center w-full p-3 rounded-lg hover:bg-blue-800">
                <FiLogOut className="mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-sm p-4 flex justify-between items-center"
        >
          <h2 className="text-xl font-semibold text-gray-800 capitalize">
            {activeTab === 'dashboard' ? '' : 
             activeTab === 'bookings' ? 'Manage Bookings' : 
             activeTab === 'cars' ? 'Vehicle Management' : 
             activeTab === 'users' ? 'Customer Management' : 
             activeTab === 'alerts' ? 'System Alerts' : 
             'Settings'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
              AD
            </div>
          </div>
        </motion.div>

        {/* Dashboard Content */}
        <div className="p-6">
          {activeTab === 'dashboard' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Stats Cards */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500">Total Revenue</p>
                      <h3 className="text-2xl font-bold">{totalRevenue.toLocaleString()} TND</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <FiDollarSign size={24} />
                    </div>
                  </div>
                  <p className="text-green-600 mt-2 text-sm">+12% from last month</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500">Active Bookings</p>
                      <h3 className="text-2xl font-bold">{activeBookings}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <FiCalendar size={24} />
                    </div>
                  </div>
                  <p className="text-blue-600 mt-2 text-sm">+3 from yesterday</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500">Available Cars</p>
                      <h3 className="text-2xl font-bold">{availableCars}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                      <FiUsers size={24} />
                    </div>
                  </div>
                  <p className="text-yellow-600 mt-2 text-sm">2 in maintenance</p>
                </div>
              </motion.div>

              {/* Charts */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">
                <div className="bg-white p-9 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
                  <Line data={revenueData} />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Vehicle Status</h3>
                  <Pie data={carStatusData} />
                </div>
              </motion.div>

              {/* Recent Bookings */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Recent Bookings</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.slice(0, 5).map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                {booking.customer.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{booking.customer}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.car}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {booking.pickupDate} to {booking.returnDate}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'Active' ? 'bg-green-100 text-green-800' :
                              booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.price} TND
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button className="text-gray-600 hover:text-gray-900">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">All Bookings</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Add New Booking
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{booking.customer}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.car}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.pickupDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.returnDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'Active' ? 'bg-green-100 text-green-800' :
                              booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.price} TND</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button className="text-gray-600 hover:text-gray-900">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'cars' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Vehicle Fleet</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Add New Vehicle
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCars.map((car) => (
                        <tr key={car.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{car.model}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              car.status === 'Available' ? 'bg-green-100 text-green-800' :
                              car.status === 'Rented' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {car.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.lastService}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button className="text-gray-600 hover:text-gray-900">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Customer Management</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Add New Customer
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rentals</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                {user.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.rentals}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button className="text-gray-600 hover:text-gray-900">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}



          {activeTab === 'alerts' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">System Alerts</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="p-4 hover:bg-gray-50 transition">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                          <FiAlertCircle />
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-gray-900">Vehicle Maintenance Required</h4>
                          <span className="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Toyota Yaris (ID: 1) is due for service. Last service was on 2023-05-28.</p>
                        <div className="mt-2 flex space-x-3">
                          <button className="text-xs text-blue-600 hover:text-blue-900">Mark as Read</button>
                          <button className="text-xs text-gray-600 hover:text-gray-900">View Vehicle</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 hover:bg-gray-50 transition">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                          <FiAlertCircle />
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-gray-900">Booking Payment Pending</h4>
                          <span className="text-xs text-gray-500">5 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Booking #105 by Ahmed Ben Salah has not been paid yet.</p>
                        <div className="mt-2 flex space-x-3">
                          <button className="text-xs text-blue-600 hover:text-blue-900">Mark as Read</button>
                          <button className="text-xs text-gray-600 hover:text-gray-900">View Booking</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 hover:bg-gray-50 transition">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <FiAlertCircle />
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-gray-900">New Customer Registration</h4>
                          <span className="text-xs text-gray-500">1 day ago</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">New customer: Youssef Hammami registered with 1 booking.</p>
                        <div className="mt-2 flex space-x-3">
                          <button className="text-xs text-blue-600 hover:text-blue-900">Mark as Read</button>
                          <button className="text-xs text-gray-600 hover:text-gray-900">View Customer</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold">System Settings</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium mb-3">General Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input
                          type="text"
                          id="company-name"
                          className="ml-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          defaultValue="Tunisia Car Rental"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
                        <select
                          id="currency"
                          className="ml-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option>TND (Tunisian Dinar)</option>
                          <option>USD (US Dollar)</option>
                          <option>EUR (Euro)</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Timezone</label>
                        <select
                          id="timezone"
                          className="ml-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option>Africa/Tunis (UTC+1)</option>
                          <option>UTC</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium mb-3">Booking Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label htmlFor="min-age" className="block text-sm font-medium text-gray-700">Minimum Rental Age</label>
                        <input
                          type="number"
                          id="min-age"
                          className="ml-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          defaultValue="21"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">Security Deposit (TND)</label>
                        <input
                          type="number"
                          id="deposit"
                          className="ml-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          defaultValue="500"
                        />
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="require-license"
                            type="checkbox"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="require-license" className="font-medium text-gray-700">Require Driver's License Scan</label>
                          <p className="text-gray-500">Customers must upload a copy of their driver's license when booking</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;