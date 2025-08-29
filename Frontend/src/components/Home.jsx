// Frontend/src/components/Home.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative py-20 overflow-hidden bg-blue-900 text-white"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        <div className="absolute inset-0">
          <img
            src="https://media.istockphoto.com/id/1493402574/photo/sidi-bou-said.jpg?s=612x612&w=0&k=20&c=fO7us-bpyxS20BBlPn98w3isJcfPhzLxl8N8Ik_BPuY="
            alt="Tunisia landscape"
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
              Premium Car Rental in{" "}
              <span className="text-yellow-400">Tunisia</span>
            </h1>
            <p
              className="text-lg sm:text-xl mb-10"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Explore Tunisia in comfort with our wide selection of vehicles at
              competitive prices
            </p>
            <div
              className="flex flex-col sm:flex-row justify-center gap-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Link
                to="/cars"
                className="px-8 py-4 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Browse Cars
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition transform hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-16 bg-white"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-16"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer the best car rental experience in Tunisia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition transform hover:scale-105"
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-duration="800"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                Best Prices
              </h3>
              <p className="text-gray-600 text-center">
                Competitive rates with no hidden fees. Price match guarantee.
              </p>
            </div>

            <div
              className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition transform hover:scale-105"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="800"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                New Fleet
              </h3>
              <p className="text-gray-600 text-center">
                Well-maintained, late-model vehicles with comprehensive
                insurance.
              </p>
            </div>

            <div
              className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition transform hover:scale-105"
              data-aos="fade-left"
              data-aos-delay="400"
              data-aos-duration="800"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                24/7 Support
              </h3>
              <p className="text-gray-600 text-center">
                Local customer service available anytime you need assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Vehicles */}
      <section
        className="py-20 bg-gray-100"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-16"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Popular Vehicles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our wide selection of vehicles for every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay="200"
              data-aos-duration="800"
            >
              <img
                src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Economy Car"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Economy Cars
                </h3>
                <p className="text-gray-600 mb-4">
                  Perfect for city driving and saving on fuel
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">
                    From 120 TND/day
                  </span>
                  <Link
                    to="/cars/category/economy"
                    className="text-blue-600 hover:underline"
                  >
                    View Options
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay="300"
              data-aos-duration="800"
            >
              <img
                src="https://c4.wallpaperflare.com/wallpaper/1018/799/788/4x4-jeep-offroad-suv-wallpaper-thumb.jpg"
                alt="SUV"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  SUVs & 4x4s
                </h3>
                <p className="text-gray-600 mb-4">
                  Ideal for family trips and off-road adventures
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">
                    From 250 TND/day
                  </span>
                  <Link
                    to="/cars/category/suv"
                    className="text-blue-600 hover:underline"
                  >
                    View Options
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay="400"
              data-aos-duration="800"
            >
              <img
                src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg"
                alt="Luxury Car"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Luxury Vehicles
                </h3>
                <p className="text-gray-600 mb-4">
                  Travel in style with our premium selection
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">
                    From 400 TND/day
                  </span>
                  <Link
                    to="/cars/category/luxury"
                    className="text-blue-600 hover:underline"
                  >
                    View Options
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="py-20 bg-white"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div
              className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10"
              data-aos="fade-right"
              data-aos-delay="100"
              data-aos-duration="1000"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Simple <span className="text-blue-600">Rental Process</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Renting a car with us is quick and easy with just a few simple
                steps
              </p>
              <div className="space-y-6">
                <div
                  className="flex items-start"
                  data-aos="fade-right"
                  data-aos-delay="200"
                  data-aos-duration="800"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      Choose Your Vehicle
                    </h3>
                    <p className="text-gray-600">
                      Select from our wide range of vehicles
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-start"
                  data-aos="fade-right"
                  data-aos-delay="300"
                  data-aos-duration="800"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      Make Reservation
                    </h3>
                    <p className="text-gray-600">
                      Book online or call our reservation team
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-start"
                  data-aos="fade-right"
                  data-aos-delay="400"
                  data-aos-duration="800"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      Pick Up & Drive
                    </h3>
                    <p className="text-gray-600">
                      Collect your car and enjoy your trip
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="lg:w-1/2"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              <div className="bg-gray-100 p-6 rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Car rental process"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section
        className="py-20 bg-blue-900 text-white"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-16"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Locations in Tunisia
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              We have convenient pickup locations across the country
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="bg-white text-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition"
              data-aos="flip-left"
              data-aos-delay="200"
              data-aos-duration="800"
            >
              <h3 className="text-xl font-bold mb-3">Tunis</h3>
              <p className="mb-4">Tunis-Carthage International Airport</p>
              <p className="text-blue-600">Open 24/7</p>
            </div>
            <div
              className="bg-white text-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition"
              data-aos="flip-left"
              data-aos-delay="300"
              data-aos-duration="800"
            >
              <h3 className="text-xl font-bold mb-3">Sousse</h3>
              <p className="mb-4">City Center Location</p>
              <p className="text-blue-600">Daily 8:00 - 20:00</p>
            </div>
            <div
              className="bg-white text-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition"
              data-aos="flip-left"
              data-aos-delay="400"
              data-aos-duration="800"
            >
              <h3 className="text-xl font-bold mb-3">Djerba</h3>
              <p className="mb-4">Djerba-Zarzis International Airport</p>
              <p className="text-blue-600">Daily 6:00 - 23:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 bg-yellow-500 text-blue-900"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Ready to Explore Tunisia?
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Book your perfect car today and enjoy special online discounts
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center gap-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Link
              to="/cars"
              className="px-8 py-4 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Book Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Call Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
