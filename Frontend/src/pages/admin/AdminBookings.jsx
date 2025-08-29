import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiEye,
  FiEdit2,
  FiRefreshCcw,
  FiX,
  FiSave,
} from "react-icons/fi";

const API_BASE = "http://localhost:5000/bookings";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editBooking, setEditBooking] = useState(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    additionalDriver: false,
    childSeat: false,
    fullTank: false,
    notes: "",
    carId: "",
  });
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/getAll`);
      setBookings(Array.isArray(data) ? data : data?.bookings || []);
      setError("");
    } catch {
      setError("Failed to load bookings.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    try {
      setRefreshing(true);
      const { data } = await axios.get(`${API_BASE}/getAll`);
      setBookings(Array.isArray(data) ? data : data?.bookings || []);
      setError("");
    } catch {
      setError("Failed to refresh.");
    } finally {
      setRefreshing(false);
    }
  };

  const fetchCars = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/cars/getAllCars");
      setCars(Array.isArray(data) ? data : []);
    } catch {}
  };

  const formatDateTime = (date, time) => {
    if (!date) return "-";
    const dt = new Date(`${date}T${time || "00:00"}`);
    if (isNaN(dt.getTime())) return "-";
    return dt.toLocaleString();
  };

  const computeStatus = (b) => {
    if (b.status) return b.status;
    const start = new Date(`${b.pickupDate}T${b.pickupTime || "00:00"}`);
    const end = new Date(`${b.returnDate}T${b.returnTime || "00:00"}`);
    const now = new Date();
    if (isNaN(start) || isNaN(end)) return "Upcoming";
    if (now < start) return "Upcoming";
    if (now > end) return "Completed";
    return "Active";
  };

  const carLabel = (b) => {
    const c = b.car || {};
    const make = c.make || "";
    const model = c.model || "";
    const name = `${make} ${model}`.trim() || c.name || "Vehicle";
    const cat = c.category || b.category || "";
    return cat ? `${name} (${cat})` : name;
  };

  const customerLabel = (b) =>
    `${b.firstName || ""} ${b.lastName || ""}`.trim() || "—";

  const filteredBookings = useMemo(() => {
    const q = search.trim().toLowerCase();
    return bookings
      .map((b) => ({ ...b, _computedStatus: computeStatus(b) }))
      .filter((b) => {
        const matchesStatus =
          statusFilter === "All" ? true : b._computedStatus === statusFilter;
        const hay = `${customerLabel(b)} ${carLabel(b)} ${b.email || ""} ${
          b.phone || ""
        }`.toLowerCase();
        const matchesSearch = q ? hay.includes(q) : true;
        return matchesStatus && matchesSearch;
      });
  }, [bookings, search, statusFilter]);

  const openEdit = (b) => {
    setEditBooking({
      ...b,
      car: {
        make: b.car?.make || "",
        model: b.car?.model || "",
        category: b.car?.category || "",
        dailyRate: b.car?.dailyRate || "",
        image: b.car?.image || "",
      },
      status: b.status || computeStatus(b),
      estimatedTotal: b.estimatedTotal ?? b.total ?? "",
      additionalDriver: !!b.additionalDriver,
      childSeat: !!b.childSeat,
      fullTank: !!b.fullTank,
    });
    setEditOpen(true);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setEditBooking(null);
    setSaving(false);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("car.")) {
      const key = name.split(".")[1];
      setEditBooking((prev) => ({
        ...prev,
        car: { ...prev.car, [key]: type === "number" ? Number(value) : value },
      }));
      return;
    }
    setEditBooking((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const saveEdit = async () => {
    if (!editBooking?._id) return;
    try {
      setSaving(true);
      const payload = {
        firstName: editBooking.firstName,
        lastName: editBooking.lastName,
        email: editBooking.email,
        phone: editBooking.phone,
        pickupLocation: editBooking.pickupLocation,
        dropoffLocation: editBooking.dropoffLocation,
        pickupDate: editBooking.pickupDate,
        pickupTime: editBooking.pickupTime,
        returnDate: editBooking.returnDate,
        returnTime: editBooking.returnTime,
        additionalDriver: editBooking.additionalDriver,
        childSeat: editBooking.childSeat,
        fullTank: editBooking.fullTank,
        estimatedTotal: editBooking.estimatedTotal,
        notes: editBooking.notes,
        status: editBooking.status,
        car: {
          make: editBooking.car?.make || "",
          model: editBooking.car?.model || "",
          category: editBooking.car?.category || "",
          dailyRate: editBooking.car?.dailyRate || "",
          image: editBooking.car?.image || "",
        },
      };

      const { data: updated } = await axios.put(
        `${API_BASE}/update/${editBooking._id}`,
        payload
      );
      setBookings((prev) =>
        prev.map((b) => (b._id === updated._id ? { ...b, ...updated } : b))
      );
      closeEdit();
    } catch (e) {
      alert(
        e?.response?.data?.message ||
          "Failed to save changes. Please try again."
      );
      setSaving(false);
    }
  };

  const openCreate = async () => {
    if (cars.length === 0) await fetchCars();
    setCreateOpen(true);
  };

  const closeCreate = () => {
    setCreateOpen(false);
    setCreating(false);
    setCreateForm({
      pickupLocation: "",
      dropoffLocation: "",
      pickupDate: "",
      pickupTime: "",
      returnDate: "",
      returnTime: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      additionalDriver: false,
      childSeat: false,
      fullTank: false,
      notes: "",
      carId: "",
    });
  };

  const handleCreateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreateForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitCreate = async () => {
    try {
      setCreating(true);
      const chosenCar = cars.find((c) => c._id === createForm.carId);
      const payload = {
        ...createForm,
        car: chosenCar
          ? {
              _id: chosenCar._id,
              make: chosenCar.make,
              model: chosenCar.model,
              category: chosenCar.category,
              dailyRate: chosenCar.dailyRate,
              image: chosenCar.image,
            }
          : undefined,
      };
      await axios.post(`${API_BASE}/create`, payload);
      await refresh();
      closeCreate();
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to create booking.");
      setCreating(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm p-4 flex justify-between items-center"
      >
        <h2 className="text-xl font-semibold text-gray-800">All Bookings</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer, vehicle, email…"
              className="pl-10 pr-3 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Upcoming</option>
            <option>Active</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={refreshing}
          >
            <FiRefreshCcw className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add New Booking
          </button>
        </div>
      </motion.div>

      {/* Table / content */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden m-6"
      >
        {loading ? (
          <div className="p-10 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading bookings…</p>
            </div>
          </div>
        ) : error ? (
          <div className="p-6">
            <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3">
              {error}
            </div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-8 text-gray-600">No bookings found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-56 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="w-56 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="w-44 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pickup Date
                  </th>
                  <th className="w-44 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Return Date
                  </th>
                  <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="w-28 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => {
                  const status =
                    booking._computedStatus || computeStatus(booking);
                  const pickup = formatDateTime(
                    booking.pickupDate,
                    booking.pickupTime
                  );
                  const drop = formatDateTime(
                    booking.returnDate,
                    booking.returnTime
                  );
                  const price =
                    booking.estimatedTotal ??
                    booking.total ??
                    (booking.car?.dailyRate || 0);
                  return (
                    <tr key={booking._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 max-w-[220px] truncate">
                          {customerLabel(booking)}
                        </div>
                        <div className="text-xs text-gray-500 max-w-[220px] truncate">
                          {booking.email || booking.phone || "—"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="max-w-[220px] truncate">
                          {carLabel(booking)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="max-w-[180px] truncate">{pickup}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="max-w-[180px] truncate">{drop}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            status === "Active"
                              ? "bg-green-100 text-green-800"
                              : status === "Completed"
                              ? "bg-blue-100 text-blue-800"
                              : status === "Cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {price} TND
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => alert(`View booking ${booking._id}`)}
                        >
                          <FiEye /> View
                        </button>
                        <button
                          className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900"
                          onClick={() => openEdit(booking)}
                        >
                          <FiEdit2 /> Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editOpen && editBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Edit Booking</h3>
                <button
                  onClick={closeEdit}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FiX size={18} />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* (same form content as your version) */}
                {/* Customer */}
                <div>
                  <h4 className="text-md font-semibold mb-3">Customer</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        First Name
                      </label>
                      <input
                        name="firstName"
                        value={editBooking.firstName || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Last Name
                      </label>
                      <input
                        name="lastName"
                        value={editBooking.lastName || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={editBooking.email || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Phone
                      </label>
                      <input
                        name="phone"
                        value={editBooking.phone || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Rental */}
                <div>
                  <h4 className="text-md font-semibold mb-3">Rental</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Pickup Location
                      </label>
                      <input
                        name="pickupLocation"
                        value={editBooking.pickupLocation || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Dropoff Location
                      </label>
                      <input
                        name="dropoffLocation"
                        value={editBooking.dropoffLocation || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Pickup Date
                      </label>
                      <input
                        type="date"
                        name="pickupDate"
                        value={editBooking.pickupDate || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Pickup Time
                      </label>
                      <input
                        type="time"
                        name="pickupTime"
                        value={editBooking.pickupTime || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Return Date
                      </label>
                      <input
                        type="date"
                        name="returnDate"
                        value={editBooking.returnDate || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Return Time
                      </label>
                      <input
                        type="time"
                        name="returnTime"
                        value={editBooking.returnTime || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={editBooking.status || "Upcoming"}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        <option>Upcoming</option>
                        <option>Active</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Estimated Total (TND)
                      </label>
                      <input
                        type="number"
                        name="estimatedTotal"
                        value={editBooking.estimatedTotal || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name="additionalDriver"
                        checked={!!editBooking.additionalDriver}
                        onChange={handleEditChange}
                        className="h-4 w-4"
                      />
                      Additional Driver
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name="childSeat"
                        checked={!!editBooking.childSeat}
                        onChange={handleEditChange}
                        className="h-4 w-4"
                      />
                      Child Seat
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name="fullTank"
                        checked={!!editBooking.fullTank}
                        onChange={handleEditChange}
                        className="h-4 w-4"
                      />
                      Full Tank
                    </label>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm text-gray-600 mb-1">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={editBooking.notes || ""}
                      onChange={handleEditChange}
                      rows="3"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                {/* Vehicle snapshot */}
                <div>
                  <h4 className="text-md font-semibold mb-3">Vehicle</h4>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-600 mb-1">
                        Make
                      </label>
                      <input
                        name="car.make"
                        value={editBooking.car?.make || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-600 mb-1">
                        Model
                      </label>
                      <input
                        name="car.model"
                        value={editBooking.car?.model || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Category
                      </label>
                      <input
                        name="car.category"
                        value={editBooking.car?.category || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="suv / economy / luxury…"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Daily Rate (TND)
                      </label>
                      <input
                        type="number"
                        name="car.dailyRate"
                        value={editBooking.car?.dailyRate || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div className="md:col-span-4">
                      <label className="block text-sm text-gray-600 mb-1">
                        Image URL
                      </label>
                      <input
                        name="car.image"
                        value={editBooking.car?.image || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t flex items-center justify-end gap-3">
                <button
                  onClick={closeEdit}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  <FiSave />
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Modal */}
      <AnimatePresence>
        {createOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Add Booking</h3>
                <button
                  onClick={closeCreate}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FiX size={18} />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Customer */}
                <div>
                  <h4 className="text-md font-semibold mb-3">Customer</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      name="firstName"
                      value={createForm.firstName}
                      onChange={handleCreateChange}
                      placeholder="First Name"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      name="lastName"
                      value={createForm.lastName}
                      onChange={handleCreateChange}
                      placeholder="Last Name"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      type="email"
                      name="email"
                      value={createForm.email}
                      onChange={handleCreateChange}
                      placeholder="Email"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      name="phone"
                      value={createForm.phone}
                      onChange={handleCreateChange}
                      placeholder="Phone"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                {/* Rental */}
                <div>
                  <h4 className="text-md font-semibold mb-3">Rental</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      name="pickupLocation"
                      value={createForm.pickupLocation}
                      onChange={handleCreateChange}
                      placeholder="Pickup Location"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      name="dropoffLocation"
                      value={createForm.dropoffLocation}
                      onChange={handleCreateChange}
                      placeholder="Dropoff Location"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      type="date"
                      name="pickupDate"
                      value={createForm.pickupDate}
                      onChange={handleCreateChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      type="time"
                      name="pickupTime"
                      value={createForm.pickupTime}
                      onChange={handleCreateChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      type="date"
                      name="returnDate"
                      value={createForm.returnDate}
                      onChange={handleCreateChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      type="time"
                      name="returnTime"
                      value={createForm.returnTime}
                      onChange={handleCreateChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <select
                      name="carId"
                      value={createForm.carId}
                      onChange={handleCreateChange}
                      className="w-full border rounded-lg px-3 py-2 md:col-span-2"
                    >
                      <option value="">Select Vehicle (optional)</option>
                      {cars.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.make} {c.model} ({c.category}) - {c.dailyRate}{" "}
                          TND/day
                        </option>
                      ))}
                    </select>
                    <select
                      name="status"
                      value={createForm.status || "Upcoming"}
                      onChange={handleCreateChange}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option>Upcoming</option>
                      <option>Active</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name="additionalDriver"
                        checked={!!createForm.additionalDriver}
                        onChange={handleCreateChange}
                        className="h-4 w-4"
                      />
                      Additional Driver
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name="childSeat"
                        checked={!!createForm.childSeat}
                        onChange={handleCreateChange}
                        className="h-4 w-4"
                      />
                      Child Seat
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name="fullTank"
                        checked={!!createForm.fullTank}
                        onChange={handleCreateChange}
                        className="h-4 w-4"
                      />
                      Full Tank
                    </label>
                  </div>

                  <div className="mt-4">
                    <textarea
                      name="notes"
                      value={createForm.notes}
                      onChange={handleCreateChange}
                      rows="3"
                      placeholder="Notes"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t flex items-center justify-end gap-3">
                <button
                  onClick={closeCreate}
                  disabled={creating}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={submitCreate}
                  disabled={creating}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  <FiSave />
                  {creating ? "Creating…" : "Create Booking"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
