import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function VehicleFleetPage() {
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [editingCarId, setEditingCarId] = useState(null);

  const API_BASE_URL = "http://localhost:5000/cars";

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    category: "economy",
    transmission: "automatic",
    fuel: "gasoline",
    seats: 5,
    dailyRate: 0,
    status: "available",
    image: "",
    features: [],
    description: "",
    specs: {
      engine: "",
      consumption: "",
      doors: 4,
      luggage: 2,
      year: new Date().getFullYear(),
    },
  });

  const [editFormData, setEditFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    category: "economy",
    transmission: "automatic",
    fuel: "gasoline",
    seats: 5,
    dailyRate: 0,
    status: "available",
    image: "",
    features: [],
    description: "",
    specs: {
      engine: "",
      consumption: "",
      doors: 4,
      luggage: 2,
      year: new Date().getFullYear(),
    },
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/getAllCars`);
      setCars(res.data || []);
    } catch {
      // toast error if needed
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("specs.")) {
      const specField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        specs: { ...prev.specs, [specField]: value },
      }));
    } else if (name === "features") {
      const featuresArray = value
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);
      setFormData((prev) => ({ ...prev, features: featuresArray }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      // Primitive fields
      fd.append("make", formData.make);
      fd.append("model", formData.model);
      fd.append("year", String(formData.year));
      fd.append("category", formData.category);
      fd.append("transmission", formData.transmission);
      fd.append("fuel", formData.fuel);
      fd.append("seats", String(formData.seats));
      fd.append("dailyRate", String(formData.dailyRate));
      fd.append("status", formData.status);
      fd.append("description", formData.description || "");
      // Features as comma-separated for backend parsing
      fd.append(
        "features",
        Array.isArray(formData.features)
          ? formData.features.join(",")
          : String(formData.features || "")
      );
      // Specs as JSON string
      fd.append("specs", JSON.stringify(formData.specs || {}));
      // Image file
      if (imageFile) {
        fd.append("image", imageFile);
      }

      await axios.post(`${API_BASE_URL}/addCar`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData({
        ...formData,
        make: "",
        model: "",
        image: "",
        features: [],
        description: "",
      });
      setImageFile(null);
      setShowModal(false);
      setSuccessText("New vehicle has been added to the fleet.");
      setShowSuccess(true);
      fetchCars();
      setTimeout(() => setShowSuccess(false), 3000);
    } catch {}
  };

  const openEditModal = (car) => {
    setEditingCarId(car._id);
    setEditFormData({
      make: car.make || "",
      model: car.model || "",
      year: car.year || new Date().getFullYear(),
      category: car.category || "economy",
      transmission: car.transmission || "automatic",
      fuel: car.fuel || "gasoline",
      seats: car.seats ?? 5,
      dailyRate: car.dailyRate ?? 0,
      status: car.status || "available",
      image: car.image || "",
      features: Array.isArray(car.features) ? car.features : [],
      description: car.description || "",
      specs: {
        engine: car.specs?.engine || "",
        consumption: car.specs?.consumption || "",
        doors: car.specs?.doors ?? 4,
        luggage: car.specs?.luggage ?? 2,
        year: car.specs?.year || car.year || new Date().getFullYear(),
      },
    });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("specs.")) {
      const specField = name.split(".")[1];
      setEditFormData((prev) => ({
        ...prev,
        specs: { ...prev.specs, [specField]: value },
      }));
    } else if (name === "features") {
      const featuresArray = value
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);
      setEditFormData((prev) => ({ ...prev, features: featuresArray }));
    } else {
      setEditFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingCarId) return;
    try {
      const fd = new FormData();
      fd.append("make", editFormData.make);
      fd.append("model", editFormData.model);
      fd.append("year", String(editFormData.year));
      fd.append("category", editFormData.category);
      fd.append("transmission", editFormData.transmission);
      fd.append("fuel", editFormData.fuel);
      fd.append("seats", String(editFormData.seats));
      fd.append("dailyRate", String(editFormData.dailyRate));
      fd.append("status", editFormData.status);
      fd.append("description", editFormData.description || "");
      fd.append(
        "features",
        Array.isArray(editFormData.features)
          ? editFormData.features.join(",")
          : String(editFormData.features || "")
      );
      fd.append("specs", JSON.stringify(editFormData.specs || {}));
      if (editImageFile) {
        fd.append("image", editImageFile);
      }

      await axios.put(`${API_BASE_URL}/updateCar/${editingCarId}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowEditModal(false);
      setSuccessText("Vehicle updated successfully.");
      setShowSuccess(true);
      fetchCars();
      setTimeout(() => setShowSuccess(false), 3000);
    } catch {}
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/deleteCar/${id}`);
      fetchCars();
    } catch {}
  };

  const getStatusBadgeClass = (status) =>
    status === "available"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  const getCategoryLabel = (category) => {
    const categories = {
      economy: "Economy",
      compact: "Compact",
      midsize: "Midsize",
      fullsize: "Fullsize",
      suv: "SUV",
      van: "Van",
      pickup: "Pickup",
      luxury: "Luxury",
      sport: "Sport",
      other: "Other",
    };
    return categories[category] || category;
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Success! </strong>
              <span className="block sm:inline">{successText}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="min-h-[40vh] p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
              <p className="mt-4 text-gray-600">Loading vehicles...</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Vehicle Fleet</h3>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add New Vehicle
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Make & Model
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transmission
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fuel
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Seats
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Daily Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cars.map((car) => (
                      <tr key={car._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-10 w-10 flex-shrink-0">
                            {car.image ? (
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={car.image}
                                alt={car.model}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-xs text-gray-500">
                                  No image
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {car.make} {car.model}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getCategoryLabel(car.category)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {car.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {car.transmission}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {car.fuel}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {car.seats}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${car.dailyRate}/day
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                              car.status
                            )}`}
                          >
                            {car.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openEditModal(car)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(car._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold">Add New Vehicle</h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6">
                {/* Make / Model */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Make
                    </label>
                    <input
                      type="text"
                      name="make"
                      value={formData.make}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Year / Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      min="1886"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="economy">Economy</option>
                      <option value="compact">Compact</option>
                      <option value="midsize">Midsize</option>
                      <option value="fullsize">Fullsize</option>
                      <option value="suv">SUV</option>
                      <option value="van">Van</option>
                      <option value="pickup">Pickup</option>
                      <option value="luxury">Luxury</option>
                      <option value="sport">Sport</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Transmission / Fuel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transmission
                    </label>
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="automatic">Automatic</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fuel
                    </label>
                    <select
                      name="fuel"
                      value={formData.fuel}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="gasoline">Gasoline</option>
                      <option value="diesel">Diesel</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="electric">Electric</option>
                      <option value="lpg">LPG</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Seats / Daily Rate */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seats
                    </label>
                    <input
                      type="number"
                      name="seats"
                      value={formData.seats}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Daily Rate (TND)
                    </label>
                    <input
                      type="number"
                      name="dailyRate"
                      value={formData.dailyRate}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Status / Image Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="available">Available</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setImageFile(
                          e.target.files && e.target.files[0]
                            ? e.target.files[0]
                            : null
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features (comma separated)
                  </label>
                  <input
                    type="text"
                    name="features"
                    value={
                      Array.isArray(formData.features)
                        ? formData.features.join(", ")
                        : formData.features
                    }
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. GPS, Bluetooth, Air Conditioning"
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Specs */}
                <div className="mb-2">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Specifications
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Engine
                      </label>
                      <input
                        type="text"
                        name="specs.engine"
                        value={formData.specs.engine}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Consumption
                      </label>
                      <input
                        type="text"
                        name="specs.consumption"
                        value={formData.specs.consumption}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Doors
                      </label>
                      <input
                        type="number"
                        name="specs.doors"
                        value={formData.specs.doors}
                        onChange={handleInputChange}
                        min="2"
                        max="6"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Luggage
                      </label>
                      <input
                        type="number"
                        name="specs.luggage"
                        value={formData.specs.luggage}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specs Year
                      </label>
                      <input
                        type="number"
                        name="specs.year"
                        value={formData.specs.year}
                        onChange={handleInputChange}
                        min="1886"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Add Vehicle
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold">Edit Vehicle</h3>
              </div>
              <form onSubmit={handleEditSubmit} className="p-6">
                {/* Make / Model */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Make
                    </label>
                    <input
                      type="text"
                      name="make"
                      value={editFormData.make}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={editFormData.model}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Year / Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={editFormData.year}
                      onChange={handleEditInputChange}
                      min="1886"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="economy">Economy</option>
                      <option value="compact">Compact</option>
                      <option value="midsize">Midsize</option>
                      <option value="fullsize">Fullsize</option>
                      <option value="suv">SUV</option>
                      <option value="van">Van</option>
                      <option value="pickup">Pickup</option>
                      <option value="luxury">Luxury</option>
                      <option value="sport">Sport</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Transmission / Fuel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transmission
                    </label>
                    <select
                      name="transmission"
                      value={editFormData.transmission}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="automatic">Automatic</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fuel
                    </label>
                    <select
                      name="fuel"
                      value={editFormData.fuel}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="gasoline">Gasoline</option>
                      <option value="diesel">Diesel</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="electric">Electric</option>
                      <option value="lpg">LPG</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Seats / Daily Rate */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seats
                    </label>
                    <input
                      type="number"
                      name="seats"
                      value={editFormData.seats}
                      onChange={handleEditInputChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Daily Rate (TND)
                    </label>
                    <input
                      type="number"
                      name="dailyRate"
                      value={editFormData.dailyRate}
                      onChange={handleEditInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Status / Image Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={editFormData.status}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="available">Available</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setEditImageFile(
                          e.target.files && e.target.files[0]
                            ? e.target.files[0]
                            : null
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features (comma separated)
                  </label>
                  <input
                    type="text"
                    name="features"
                    value={
                      Array.isArray(editFormData.features)
                        ? editFormData.features.join(", ")
                        : editFormData.features
                    }
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. GPS, Bluetooth, Air Conditioning"
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Specs */}
                <div className="mb-2">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Specifications
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Engine
                      </label>
                      <input
                        type="text"
                        name="specs.engine"
                        value={editFormData.specs.engine}
                        onChange={handleEditInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Consumption
                      </label>
                      <input
                        type="text"
                        name="specs.consumption"
                        value={editFormData.specs.consumption}
                        onChange={handleEditInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Doors
                      </label>
                      <input
                        type="number"
                        name="specs.doors"
                        value={editFormData.specs.doors}
                        onChange={handleEditInputChange}
                        min="2"
                        max="6"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Luggage
                      </label>
                      <input
                        type="number"
                        name="specs.luggage"
                        value={editFormData.specs.luggage}
                        onChange={handleEditInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specs Year
                      </label>
                      <input
                        type="number"
                        name="specs.year"
                        value={editFormData.specs.year}
                        onChange={handleEditInputChange}
                        min="1886"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
