// Frontend/src/components/CarsByCategory.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const API_BASE_URL = "http://localhost:5000/cars";

const categoryTitle = (c) => {
  const map = {
    economy: "Economy Cars",
    compact: "Compact Cars",
    midsize: "Midsize Cars",
    fullsize: "Fullsize Cars",
    suv: "SUVs & 4x4s",
    van: "Vans & Minivans",
    pickup: "Pickup Trucks",
    luxury: "Luxury Vehicles",
    sport: "Sport Cars",
    other: "Other Vehicles",
  };
  return map[c] || c;
};

const CarsByCategory = () => {
  const { category } = useParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}/getCarByCategory/${(category || "").toLowerCase()}`
      );
      setCars(res.data || []);
    } catch (e) {
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ once: true });
  }, []);

  useEffect(() => {
    fetchCars();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="relative py-16 overflow-hidden bg-blue-900 text-white"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.stockcake.com/public/7/d/8/7d8d9e88-d4fe-4458-aa69-52a2aa358980_large/luxury-cars-lined-stockcake.jpg"
            alt="Cars"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-4xl font-bold">
              {categoryTitle((category || "").toLowerCase())}
            </h1>
            <Link
              to="/cars"
              className="px-4 py-2 bg-yellow-500 text-blue-900 rounded-lg font-semibold hover:bg-yellow-400"
            >
              View All Cars
            </Link>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="py-14" data-aos="fade-up" data-aos-duration="800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-24 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading vehicles…</p>
              </div>
            </div>
          ) : cars.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-10 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                No vehicles found in this category
              </h3>
              <p className="text-gray-600 mt-2">
                Please try another category or view all cars.
              </p>
              <div className="mt-6">
                <Link
                  to="/cars"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Browse All Cars
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car, idx) => (
                <div
                  key={car._id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                  data-aos="zoom-in"
                  data-aos-delay={Math.min(idx * 80, 400)}
                  data-aos-duration="700"
                >
                  <div className="relative">
                    <img
                      src={
                        car.image ||
                        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=60"
                      }
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {car.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {car.make} {car.model}
                      </h3>
                      <div className="text-blue-600 font-bold text-xl">
                        {car.dailyRate} TND
                        <span className="text-sm text-gray-500">/day</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
                      <div>
                        Year: <span className="text-gray-900">{car.year}</span>
                      </div>
                      <div>
                        Seats:{" "}
                        <span className="text-gray-900">{car.seats}</span>
                      </div>
                      <div className="capitalize">
                        Fuel: <span className="text-gray-900">{car.fuel}</span>
                      </div>
                      <div className="capitalize">
                        Trans:{" "}
                        <span className="text-gray-900">
                          {car.transmission}
                        </span>
                      </div>
                    </div>

                    {Array.isArray(car.features) && car.features.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Features
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {car.features.slice(0, 6).map((f, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex justify-between items-center">
                      <Link
                        to="/order"
                        className="px-4 py-2 bg-yellow-500 text-blue-900 font-medium rounded-md hover:bg-yellow-400 transition"
                        onClick={() =>
                          localStorage.setItem(
                            "selectedCar",
                            JSON.stringify(car)
                          )
                        }
                      >
                        Book Now
                      </Link>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          car.status === "available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {car.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CarsByCategory;
