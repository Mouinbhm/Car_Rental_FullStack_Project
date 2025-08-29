// Frontend/src/pages/Cars.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const Cars = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState("all"); // economy | compact | suv | luxury | minivan | convertible | all
  const [priceFilter, setPriceFilter] = useState("all"); // u150 | 150-250 | 250-350 | o350 | all
  const [transmissionFilter, setTransmissionFilter] = useState("all"); // automatic | manual | all

  // API base
  const API_BASE_URL = "http://localhost:5000/cars";

  // Init animations + fetch cars
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ once: true, duration: 800 });
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/getAllCars`);
      setVehicles(data || []);
    } catch (e) {
      setVehicles([]);
    } finally {
      setLoading(false);
      setTimeout(() => AOS.refresh(), 0);
    }
  };

  const handleBookNow = (car) => {
    localStorage.setItem("selectedCar", JSON.stringify(car));
  };

  const getCategoryLabel = (category) => {
    const map = {
      economy: "Economy",
      compact: "Compact",
      midsize: "Midsize",
      fullsize: "Fullsize",
      suv: "SUV",
      van: "Minivan",
      pickup: "Pickup",
      luxury: "Luxury",
      sport: "Sport",
      other: "Other",
    };
    return map[category] || category || "Other";
  };

  const uiCategoryToApi = (uiValue) => {
    const map = {
      economy: "economy",
      compact: "compact",
      suv: "suv",
      luxury: "luxury",
      minivan: "van",
      convertible: "sport", // map convertible card to "sport" in DB (adjust if you use another category)
    };
    return map[uiValue] || uiValue;
  };

  const matchesCategory = (car) => {
    if (categoryFilter === "all") return true;
    const apiCat = (car.category || "").toLowerCase();
    return apiCat === uiCategoryToApi(categoryFilter);
  };

  const matchesTransmission = (car) => {
    if (transmissionFilter === "all") return true;
    return (car.transmission || "").toLowerCase() === transmissionFilter;
  };

  const matchesPrice = (car) => {
    if (priceFilter === "all") return true;
    const price = Number(car.dailyRate || 0);
    switch (priceFilter) {
      case "u150":
        return price < 150;
      case "150-250":
        return price >= 150 && price <= 250;
      case "250-350":
        return price > 250 && price <= 350;
      case "o350":
        return price > 350;
      default:
        return true;
    }
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(
      (car) =>
        matchesCategory(car) && matchesPrice(car) && matchesTransmission(car)
    );
  }, [vehicles, categoryFilter, priceFilter, transmissionFilter]);

  const clearFilters = () => {
    setCategoryFilter("all");
    setPriceFilter("all");
    setTransmissionFilter("all");
    setTimeout(() => AOS.refresh(), 0);
  };

  const capitalize = (s) =>
    typeof s === "string" ? s.charAt(0).toUpperCase() + s.slice(1) : s;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading vehicles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative py-20 overflow-hidden bg-blue-900 text-white"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.stockcake.com/public/7/d/8/7d8d9e88-d4fe-4458-aa69-52a2aa358980_large/luxury-cars-lined-stockcake.jpg"
            alt="Car rental fleet"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Our <span className="text-yellow-400">Vehicle Fleet</span>
            </h1>
            <p
              className="text-lg sm:text-xl mb-10"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Choose from our wide selection of premium vehicles for every need
              and budget
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section (functional) */}
      <section
        className="py-12 bg-white shadow-sm"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
            <div
              className="w-full md:w-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Type
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="economy">Economy</option>
                <option value="compact">Compact</option>
                <option value="suv">SUV</option>
                <option value="luxury">Luxury</option>
                <option value="minivan">Minivan</option>
                <option value="convertible">Convertible</option>
              </select>
            </div>

            <div
              className="w-full md:w-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Prices</option>
                <option value="u150">Under 150 TND/day</option>
                <option value="150-250">150 - 250 TND/day</option>
                <option value="250-350">250 - 350 TND/day</option>
                <option value="o350">Over 350 TND/day</option>
              </select>
            </div>

            <div
              className="w-full md:w-auto"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transmission
              </label>
              <select
                value={transmissionFilter}
                onChange={(e) => setTransmissionFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Transmissions</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Listing */}
      <section className="py-16" data-aos="fade-up" data-aos-duration="1000">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredVehicles.length === 0 ? (
            <div className="text-center text-gray-500">
              No vehicles match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((car, index) => {
                const categoryLabel = getCategoryLabel(car.category);
                const availabilityText =
                  car.status === "available" ? "Available" : "Unavailable";
                const image =
                  car.image ||
                  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop";
                const name =
                  `${car.make || ""} ${car.model || ""}`.trim() || "Vehicle";
                const price = Number(car.dailyRate || 0);
                const features = Array.isArray(car.features)
                  ? car.features
                  : [];
                const specs = car.specs || {};
                const doors = specs.doors ?? "-";
                const luggage = specs.luggage ?? "-";
                const year = specs.year || car.year || "-";
                const engine = specs.engine || "-";
                const fuel = capitalize(car.fuel || "-");
                const consumption = specs.consumption || "-";

                return (
                  <div
                    key={car._id || index}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
                    data-aos-duration="800"
                  >
                    <div className="relative">
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {categoryLabel}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-900">
                          {name}
                        </h3>
                        <div className="text-blue-600 font-bold text-xl">
                          {price} TND
                          <span className="text-sm text-gray-500">/day</span>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span
                          className={
                            availabilityText === "Available"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {availabilityText}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4">
                        {car.description || "—"}
                      </p>

                      <div className="mb-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Key Features:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {features.length > 0 ? (
                            features.map((feature, i) => (
                              <span
                                key={i}
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

                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Specifications:
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex">
                            <span className="text-gray-500 w-24">Engine:</span>
                            <span className="text-gray-900">{engine}</span>
                          </div>
                          <div className="flex">
                            <span className="text-gray-500 w-24">Fuel:</span>
                            <span className="text-gray-900">{fuel}</span>
                          </div>
                          <div className="flex">
                            <span className="text-gray-500 w-24">
                              Consumption:
                            </span>
                            <span className="text-gray-900">{consumption}</span>
                          </div>
                          <div className="flex">
                            <span className="text-gray-500 w-24">Doors:</span>
                            <span className="text-gray-900">{doors}</span>
                          </div>
                          <div className="flex">
                            <span className="text-gray-500 w-24">Luggage:</span>
                            <span className="text-gray-900">
                              {luggage} {luggage !== "-" ? "suitcases" : ""}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="text-gray-500 w-24">Year:</span>
                            <span className="text-gray-900">{year}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Link
                          to={`/order`}
                          onClick={() => handleBookNow(car)}
                          className="block w-full text-center px-6 py-3 bg-yellow-500 text-blue-900 font-medium rounded-md hover:bg-yellow-400 transition"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="py-16 bg-blue-50"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-12"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Rent With Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We go the extra mile to ensure your rental experience is perfect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="800"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                No Hidden Fees
              </h3>
              <p className="text-gray-600 text-center">
                Transparent pricing with all taxes and fees included in the
                quoted price.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="800"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
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
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                Full Insurance
              </h3>
              <p className="text-gray-600 text-center">
                Comprehensive coverage included with every rental for peace of
                mind.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition"
              data-aos="fade-right"
              data-aos-delay="400"
              data-aos-duration="800"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                Flexible Booking
              </h3>
              <p className="text-gray-600 text-center">
                Free cancellations and modifications up to 24 hours before
                pickup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 bg-blue-900 text-white"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Need Help Choosing?
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Our rental experts are available 24/7 to help you select the perfect
            vehicle
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center gap-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition shadow-lg hover:shadow-xl"
            >
              Contact Us
            </Link>
            <a
              href="tel:+21612345678"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition"
            >
              Call Now: +216 12 345 678
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cars;
