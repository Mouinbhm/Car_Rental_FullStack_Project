// Frontend/src/components/AdminMessages.jsx
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FiSearch,
  FiInbox,
  FiMail,
  FiPhone,
  FiClock,
  FiTag,
  FiX,
  FiRefreshCcw,
} from "react-icons/fi";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_BASE_URL = "http://localhost:5000/contact";

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setFetchError("");
      const res = await axios.get(`${API_BASE_URL}/getAllMessages`);
      setMessages(res.data || []);
    } catch (e) {
      setFetchError(
        e?.response?.data?.message || "Failed to load messages. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter((m) => {
      const parts = [
        m.firstName,
        m.lastName,
        m.email,
        m.phone,
        m.subject,
        m.message,
        m.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return parts.includes(q);
    });
  }, [messages, query]);

  const formatSubject = (s) => {
    if (!s) return "-";
    const map = {
      booking: "Booking Inquiry",
      modification: "Modify Existing Booking",
      fleet: "Vehicle Fleet Questions",
      payment: "Payment Questions",
      other: "Other",
    };
    return map[s] || s;
  };

  const getStatusBadgeClass = (status) => {
    const base =
      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
    if (status === "new") return `${base} bg-green-100 text-green-800`;
    if (status === "read") return `${base} bg-blue-100 text-blue-800`;
    if (status === "archived") return `${base} bg-gray-100 text-gray-700`;
    return `${base} bg-gray-100 text-gray-700`;
  };

  const openView = (msg) => {
    setSelected(msg);
    setShowModal(true);
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm p-6 border-b border-gray-200"
      >
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Messages Inbox</h1>
            <p className="text-gray-600 mt-1">
              All messages submitted from the Contact form
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, subject…"
                className="pl-10 pr-3 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={fetchMessages}
              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FiRefreshCcw />
              Refresh
            </button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          {loading ? (
            <div className="p-10 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading messages…</p>
              </div>
            </div>
          ) : fetchError ? (
            <div className="p-6">
              <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3">
                {fetchError}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      From
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email / Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preview
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Received
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map((m) => (
                    <tr key={m._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {m.firstName} {m.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          #{m._id.slice(-6)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <FiMail className="text-gray-400" /> {m.email}
                        </div>
                        {m.phone && (
                          <div className="flex items-center gap-2 text-gray-500 mt-1">
                            <FiPhone className="text-gray-400" /> {m.phone}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <FiTag className="text-gray-400" />
                          {formatSubject(m.subject)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-[280px]">
                        <span className="line-clamp-2">{m.message || "-"}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadgeClass(m.status)}>
                          {m.status || "new"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <FiClock className="text-gray-400" />
                          {m.createdAt
                            ? new Date(m.createdAt).toLocaleString()
                            : "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => openView(m)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-10 text-center text-sm text-gray-500"
                      >
                        No messages found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {showModal && selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white w-full max-w-2xl rounded-xl shadow-xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Message Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FiX size={18} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500">From</div>
                    <div className="font-medium text-gray-900">
                      {selected.firstName} {selected.lastName}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500">Subject</div>
                    <div className="font-medium text-gray-900">
                      {formatSubject(selected.subject)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium text-gray-900 break-all">
                      {selected.email}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium text-gray-900">
                      {selected.phone || "-"}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500">Status</div>
                    <div className="mt-1">
                      <span className={getStatusBadgeClass(selected.status)}>
                        {selected.status || "new"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500">Received</div>
                    <div className="font-medium text-gray-900">
                      {selected.createdAt
                        ? new Date(selected.createdAt).toLocaleString()
                        : "-"}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Message</div>
                  <div className="p-4 bg-white border rounded-lg text-gray-800">
                    {selected.message || "-"}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminMessages;
