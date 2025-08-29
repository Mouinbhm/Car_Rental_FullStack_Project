// Frontend/src/pages/Order.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const Order = () => {
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
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
  });

  const BOOKING_API_BASE = "http://localhost:5000/bookings";

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem("selectedCar"));
    if (raw) {
      const specs = raw.specs || {};
      const normalized = {
        ...raw,
        _id: raw._id,
        name: raw.name || `${raw.make || ""} ${raw.model || ""}`.trim(),
        price: raw.price ?? raw.dailyRate ?? 0,
        category: raw.category || "other",
        image:
          raw.image ||
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
        features: Array.isArray(raw.features) ? raw.features : [],
        specs: {
          engine: specs.engine || "",
          fuel: raw.fuel || specs.fuel || "",
          year: specs.year || raw.year || "",
          doors: specs.doors ?? "",
          luggage: specs.luggage ?? "",
          consumption: specs.consumption || "",
        },
      };
      setSelectedCar(normalized);
    }
    window.scrollTo(0, 0);
    AOS.init({ once: true, duration: 800 });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const rentalDays = () => {
    const { pickupDate, pickupTime, returnDate, returnTime } = formData;
    if (!pickupDate || !pickupTime || !returnDate || !returnTime) return 1;
    const start = new Date(`${pickupDate}T${pickupTime}`);
    const end = new Date(`${returnDate}T${returnTime}`);
    const ms = end.getTime() - start.getTime();
    const d = Math.ceil(ms / (1000 * 60 * 60 * 24));
    return isNaN(d) || d <= 0 ? 1 : d;
  };

  const computeTotals = () => {
    const days = rentalDays();
    const dailyRate = Number(selectedCar?.price || 0);
    const base = dailyRate * days;
    const addons =
      (formData.additionalDriver ? 50 * days : 0) +
      (formData.childSeat ? 30 : 0) +
      (formData.fullTank ? 100 : 0);
    const subtotal = base + addons;
    const taxes = Math.round(subtotal * 0.1); // 10% illustrative
    const total = subtotal + taxes;
    return { days, dailyRate, base, addons, taxes, total };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCar) return;

    const { total } = computeTotals();

    const carSnapshot = {
      _id: selectedCar._id,
      make: selectedCar.make || "",
      model: selectedCar.model || selectedCar.name || "",
      category: selectedCar.category || "",
      image: selectedCar.image || "",
      dailyRate: Number(selectedCar.price || 0),
      features: Array.isArray(selectedCar.features) ? selectedCar.features : [],
      specs: {
        engine: selectedCar.specs?.engine || "",
        fuel: selectedCar.specs?.fuel || "",
        year: Number(selectedCar.specs?.year) || undefined,
        doors: Number(selectedCar.specs?.doors) || undefined,
        luggage: Number(selectedCar.specs?.luggage) || undefined,
        consumption: selectedCar.specs?.consumption || "",
      },
    };

    const payload = {
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      returnDate: formData.returnDate,
      returnTime: formData.returnTime,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      additionalDriver: formData.additionalDriver,
      childSeat: formData.childSeat,
      fullTank: formData.fullTank,
      carId: selectedCar._id,
      car: carSnapshot,
      estimatedTotal: total,
    };

    try {
      setSubmitting(true);
      const { data } = await axios.post(`${BOOKING_API_BASE}/create`, payload);
      // Navigate to confirmation page with booking details
      navigate("/order/confirmation", {
        state: {
          booking: data,
          car: carSnapshot,
          totals: computeTotals(),
        },
        replace: true,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const locations = [
    {
      id: 1,
      name: "Tunis-Carthage Airport",
      address: "Aéroport Tunis-Carthage, 1080 Tunis",
    },
    {
      id: 2,
      name: "Tunis City Center",
      address: "Avenue Habib Bourguiba, 1001 Tunis",
    },
    {
      id: 3,
      name: "Sousse Downtown",
      address: "Rue de la Médina, 4000 Sousse",
    },
    {
      id: 4,
      name: "Djerba Airport",
      address: "Aéroport Djerba-Zarzis, 4119 Djerba",
    },
  ];

  if (!selectedCar) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div
          className="text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h2
            className="text-2xl font-bold text-gray-900 mb-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            No Car Selected
          </h2>
          <p
            className="text-gray-600 mb-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Please go back and select a vehicle to book
          </p>
          <Link
            to="/cars"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition transform hover:scale-105 shadow-md hover:shadow-lg"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Browse Vehicles
          </Link>
        </div>
      </div>
    );
  }

  const totals = computeTotals();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div
        className="bg-white shadow-sm"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div
              className="flex items-center"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div className="ml-2 text-sm font-medium text-blue-600">
                Select Car
              </div>
            </div>
            <div className="h-1 flex-1 mx-2 bg-blue-600"></div>
            <div
              className="flex items-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div className="ml-2 text-sm font-medium text-blue-600">
                Booking Details
              </div>
            </div>
            <div className="h-1 flex-1 mx-2 bg-gray-300"></div>
            <div
              className="flex items-center"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">
                3
              </div>
              <div className="ml-2 text-sm font-medium text-gray-500">
                Confirmation
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Section */}
      <section className="py-12" data-aos="fade-up" data-aos-duration="1000">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Car Summary */}
            <div
              className="lg:w-1/3"
              data-aos="fade-right"
              data-aos-delay="100"
              data-aos-duration="1000"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:shadow-lg transition">
                <div className="p-6">
                  <h2
                    className="text-2xl font-bold text-gray-900 mb-4"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    Your Selected Vehicle
                  </h2>

                  <div className="mb-6" data-aos="zoom-in" data-aos-delay="300">
                    <img
                      src={selectedCar.image}
                      alt={selectedCar.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  <h3
                    className="text-xl font-bold text-gray-900 mb-2"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    {selectedCar.name}
                  </h3>
                  <div
                    className="flex justify-between items-center mb-4"
                    data-aos="fade-up"
                    data-aos-delay="450"
                  >
                    <span className="text-blue-600 font-bold text-xl">
                      {selectedCar.price} TND
                      <span className="text-sm text-gray-500">/day</span>
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {selectedCar.category}
                    </span>
                  </div>

                  <div
                    className="border-t border-gray-200 pt-4 mb-4"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Key Features:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCar.features.length > 0 ? (
                        selectedCar.features.map((feature, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">
                          No features listed
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className="border-t border-gray-200 pt-4"
                    data-aos="fade-up"
                    data-aos-delay="550"
                  >
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Specifications:
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex">
                        <span className="text-gray-500 w-20">Engine:</span>
                        <span className="text-gray-900">
                          {selectedCar.specs.engine || "-"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-20">Fuel:</span>
                        <span className="text-gray-900">
                          {selectedCar.specs.fuel || "-"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-20">Year:</span>
                        <span className="text-gray-900">
                          {selectedCar.specs.year || "-"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-20">Doors:</span>
                        <span className="text-gray-900">
                          {selectedCar.specs.doors || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div
              className="lg:w-2/3"
              data-aos="fade-left"
              data-aos-delay="100"
              data-aos-duration="1000"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:shadow-lg transition">
                <div className="p-6">
                  <h2
                    className="text-2xl font-bold text-gray-900 mb-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    Booking Details
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Pickup Location */}
                      <div data-aos="fade-up" data-aos-delay="300">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pickup Location*
                        </label>
                        <select
                          name="pickupLocation"
                          value={formData.pickupLocation}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select pickup location</option>
                          {locations.map((location) => (
                            <option key={location.id} value={location.name}>
                              {location.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Dropoff Location */}
                      <div data-aos="fade-up" data-aos-delay="350">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dropoff Location*
                        </label>
                        <select
                          name="dropoffLocation"
                          value={formData.dropoffLocation}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Same as pickup</option>
                          {locations.map((location) => (
                            <option key={location.id} value={location.name}>
                              {location.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Pickup Date */}
                      <div data-aos="fade-up" data-aos-delay="400">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pickup Date & Time*
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="date"
                            name="pickupDate"
                            value={formData.pickupDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                          <input
                            type="time"
                            name="pickupTime"
                            value={formData.pickupTime}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>

                      {/* Return Date */}
                      <div data-aos="fade-up" data-aos-delay="450">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Return Date & Time*
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="date"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                          <input
                            type="time"
                            name="returnTime"
                            value={formData.returnTime}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Driver Information */}
                    <div
                      className="mb-8"
                      data-aos="fade-up"
                      data-aos-delay="500"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Driver Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div data-aos="fade-up" data-aos-delay="550">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name*
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John"
                            required
                          />
                        </div>
                        <div data-aos="fade-up" data-aos-delay="600">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name*
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Doe"
                            required
                          />
                        </div>
                        <div data-aos="fade-up" data-aos-delay="650">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email*
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                        <div data-aos="fade-up" data-aos-delay="700">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number*
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="+216 12 345 678"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Additional Options */}
                    <div
                      className="mb-8"
                      data-aos="fade-up"
                      data-aos-delay="750"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Additional Options
                      </h3>
                      <div className="space-y-4">
                        <div
                          className="flex items-start"
                          data-aos="fade-up"
                          data-aos-delay="800"
                        >
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              name="additionalDriver"
                              checked={formData.additionalDriver}
                              onChange={handleChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label className="font-medium text-gray-700">
                              Additional Driver (+50 TND/day)
                            </label>
                            <p className="text-gray-500">
                              Add a second driver to share the driving
                            </p>
                          </div>
                        </div>
                        <div
                          className="flex items-start"
                          data-aos="fade-up"
                          data-aos-delay="850"
                        >
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              name="childSeat"
                              checked={formData.childSeat}
                              onChange={handleChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label className="font-medium text-gray-700">
                              Child Seat (+30 TND)
                            </label>
                            <p className="text-gray-500">
                              Required for children under 5 years old
                            </p>
                          </div>
                        </div>
                        <div
                          className="flex items-start"
                          data-aos="fade-up"
                          data-aos-delay="900"
                        >
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              name="fullTank"
                              checked={formData.fullTank}
                              onChange={handleChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label className="font-medium text-gray-700">
                              Full Tank Service (+100 TND)
                            </label>
                            <p className="text-gray-500">
                              Return the car empty and we'll refuel for you
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Summary */}
                    <div
                      className="bg-gray-50 p-6 rounded-lg mb-8"
                      data-aos="fade-up"
                      data-aos-delay="950"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Payment Summary
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Daily Rate ({selectedCar.price} TND/day) ×{" "}
                            {totals.days} day(s)
                          </span>
                          <span className="text-gray-900 font-medium">
                            {totals.base} TND
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Add-ons</span>
                          <span className="text-gray-900 font-medium">
                            {totals.addons} TND
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Taxes & Fees (10%)
                          </span>
                          <span className="text-gray-900 font-medium">
                            {totals.taxes} TND
                          </span>
                        </div>
                        <div className="border-t border-gray-2 00 pt-3 mt-3">
                          <div className="flex justify-between">
                            <span className="text-gray-900 font-bold">
                              Total Estimated
                            </span>
                            <span className="text-blue-600 font-bold text-xl">
                              {totals.total} TND
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div
                      className="mb-8"
                      data-aos="fade-up"
                      data-aos-delay="1000"
                    >
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            required
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label className="font-medium text-gray-700">
                            I agree to the{" "}
                            <Link
                              to="/terms"
                              className="text-blue-600 hover:underline"
                            >
                              Terms & Conditions
                            </Link>{" "}
                            and{" "}
                            <Link
                              to="/privacy"
                              className="text-blue-600 hover:underline"
                            >
                              Privacy Policy
                            </Link>
                            *
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div
                      className="flex justify-end"
                      data-aos="fade-up"
                      data-aos-delay="1050"
                    >
                      <button
                        type="submit"
                        disabled={submitting}
                        className={`px-8 py-3 ${
                          submitting ? "bg-blue-400" : "bg-blue-600"
                        } text-white font-bold rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-md hover:shadow-lg disabled:cursor-not-allowed`}
                      >
                        {submitting ? "Submitting..." : "Continue to Payment"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Info */}
      <section
        className="py-12 bg-blue-50"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Included Insurance Coverage
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              All our rentals come with comprehensive protection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="bg-white p-6 rounded-lg shadow-sm transform hover:shadow-lg transition"
              data-aos="zoom-in"
              data-aos-delay="200"
              data-aos-duration="800"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900 mb-2">
                Collision Damage Waiver
              </h3>
              <p className="text-gray-600 text-center">
                Covers damage to the rental vehicle with a deductible of 1000
                TND
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-lg shadow-sm transform hover:shadow-lg transition"
              data-aos="zoom-in"
              data-aos-delay="300"
              data-aos-duration="800"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900 mb-2">
                Theft Protection
              </h3>
              <p className="text-gray-600 text-center">
                Covers theft of the vehicle with a deductible of 1500 TND
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-lg shadow-sm transform hover:shadow-lg transition"
              data-aos="zoom-in"
              data-aos-delay="400"
              data-aos-duration="800"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900 mb-2">
                Third Party Liability
              </h3>
              <p className="text-gray-600 text-center">
                Covers damage to other vehicles/property up to 5,000,000 TND
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
