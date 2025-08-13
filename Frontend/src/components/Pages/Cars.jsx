import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Cars = () => {
    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const vehicles = [
        {
            id: 1,
            category: "Economy",
            name: "Toyota Yaris",
            image: "https://w0.peakpx.com/wallpaper/833/59/HD-wallpaper-toyota-yaris-s-2018-cars-road-new-yaris-toyota.jpg",
            price: 120,
            features: ["Air Conditioning", "Automatic Transmission", "5 Seats", "Bluetooth", "Fuel Efficient"],
            description: "Perfect for city driving and short trips. The Toyota Yaris offers excellent fuel economy and easy maneuverability in urban areas.",
            specs: {
                engine: "1.5L 4-cylinder",
                fuel: "Petrol",
                consumption: "5.1L/100km",
                doors: 4,
                luggage: 2,
                year: 2022
            },
            availability: "Available"
        },
        {
            id: 2,
            category: "Compact",
            name: "Volkswagen Golf",
            image: "https://www.supercars.net/blog/wp-content/uploads/2024/01/2024-Volkswagen-Golf-GTI-380-001-2160-scaled.jpg",
            price: 150,
            features: ["Air Conditioning", "Automatic Transmission", "5 Seats", "Touchscreen", "Rear Camera"],
            description: "The versatile Volkswagen Golf combines comfort and performance, ideal for both city and highway driving.",
            specs: {
                engine: "1.4L TSI",
                fuel: "Petrol",
                consumption: "5.8L/100km",
                doors: 5,
                luggage: 3,
                year: 2021
            },
            availability: "Available"
        },
        {
            id: 3,
            category: "SUV",
            name: "Hyundai Tucson",
            image: "https://www.hdcarwallpapers.com/walls/hyundai_tucson_hybrid_2021_5k_4-HD.jpg",
            price: 250,
            features: ["Air Conditioning", "Automatic Transmission", "5 Seats", "4WD", "Panoramic Sunroof"],
            description: "Spacious and comfortable SUV with excellent road presence. Perfect for family trips and light off-road adventures.",
            specs: {
                engine: "2.0L Diesel",
                fuel: "Diesel",
                consumption: "6.5L/100km",
                doors: 5,
                luggage: 4,
                year: 2023
            },
            availability: "Available"
        },
        {
            id: 4,
            category: "Luxury",
            name: "Mercedes-Benz E-Class",
            image: "https://w0.peakpx.com/wallpaper/665/847/HD-wallpaper-2021-mercedes-benz-e-class-front-view-exterior-w213-new-silver-e-class-uk-version-220d-9g-tronic-german-cars-mercedes-benz.jpg",
            price: 400,
            features: ["Premium Leather", "Automatic Transmission", "5 Seats", "Heated Seats", "Advanced Safety"],
            description: "Experience luxury travel with the Mercedes E-Class. Perfect for business trips or special occasions.",
            specs: {
                engine: "2.0L Turbo",
                fuel: "Petrol",
                consumption: "7.2L/100km",
                doors: 4,
                luggage: 3,
                year: 2023
            },
            availability: "Available"
        },
        {
            id: 5,
            category: "Minivan",
            name: "Toyota Hiace",
            image: "https://www.scuderiamotordesign.com/wp-content/uploads/2024/02/Toyota-Hiace-Banner.jpg",
            price: 300,
            features: ["Air Conditioning", "Manual Transmission", "12 Seats", "Spacious Interior", "Sliding Doors"],
            description: "Ideal for large groups or family vacations. The Toyota Hiace offers ample space for passengers and luggage.",
            specs: {
                engine: "2.8L Diesel",
                fuel: "Diesel",
                consumption: "8.5L/100km",
                doors: 4,
                luggage: 6,
                year: 2022
            },
            availability: "Available"
        },
        {
            id: 6,
            category: "Convertible",
            name: "BMW 4 Series",
            image: "https://images.hindustantimes.com/auto/img/2020/08/28/1600x900/p90390203_highres_bmw-m440i-xdrive-arc_1598598820039_1598598829088.jpg",
            price: 450,
            features: ["Convertible Roof", "Automatic Transmission", "4 Seats", "Premium Sound", "Sport Mode"],
            description: "Enjoy Tunisia's beautiful coastline with this stylish convertible. Perfect for romantic getaways.",
            specs: {
                engine: "2.0L Turbo",
                fuel: "Petrol",
                consumption: "7.0L/100km",
                doors: 2,
                luggage: 2,
                year: 2023
            },
            availability: "Available"
        }
    ];

    const handleBookNow = (car) => {
        localStorage.setItem('selectedCar', JSON.stringify(car));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-blue-900 text-white" data-aos="fade-up" data-aos-duration="1000">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.stockcake.com/public/7/d/8/7d8d9e88-d4fe-4458-aa69-52a2aa358980_large/luxury-cars-lined-stockcake.jpg" 
                        alt="Car rental fleet" 
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6" data-aos="fade-up" data-aos-delay="100">
                            Our <span className="text-yellow-400">Vehicle Fleet</span>
                        </h1>
                        <p className="text-lg sm:text-xl mb-10" data-aos="fade-up" data-aos-delay="200">
                            Choose from our wide selection of premium vehicles for every need and budget
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-12 bg-white shadow-sm" data-aos="fade-right" data-aos-duration="1000">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="w-full md:w-auto" data-aos="fade-up" data-aos-delay="100">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                <option>All Categories</option>
                                <option>Economy</option>
                                <option>Compact</option>
                                <option>SUV</option>
                                <option>Luxury</option>
                                <option>Minivan</option>
                                <option>Convertible</option>
                            </select>
                        </div>
                        <div className="w-full md:w-auto" data-aos="fade-up" data-aos-delay="200">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                <option>All Prices</option>
                                <option>Under 150 TND/day</option>
                                <option>150 - 250 TND/day</option>
                                <option>250 - 350 TND/day</option>
                                <option>Over 350 TND/day</option>
                            </select>
                        </div>
                        <div className="w-full md:w-auto" data-aos="fade-up" data-aos-delay="300">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                <option>All Transmissions</option>
                                <option>Automatic</option>
                                <option>Manual</option>
                            </select>
                        </div>
                        <div className="w-full md:w-auto" data-aos="fade-up" data-aos-delay="400">
                            <button className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
                                Filter Vehicles
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vehicle Listing */}
            <section className="py-16" data-aos="fade-up" data-aos-duration="1000">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {vehicles.map((car, index) => (
                            <div 
                                key={car.id} 
                                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1" 
                                data-aos="zoom-in" 
                                data-aos-delay={index * 100}
                                data-aos-duration="800"
                            >
                                <div className="relative">
                                    <img 
                                        src={car.image} 
                                        alt={car.name} 
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {car.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                                        <div className="text-blue-600 font-bold text-xl">{car.price} TND<span className="text-sm text-gray-500">/day</span></div>
                                    </div>
                                    
                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span className={car.availability === "Available" ? "text-green-500" : "text-red-500"}>
                                            {car.availability}
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-600 mb-4">{car.description}</p>
                                    
                                    <div className="mb-5">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {car.features.map((feature, index) => (
                                                <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="border-t border-gray-200 pt-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Specifications:</h4>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="flex">
                                                <span className="text-gray-500 w-24">Engine:</span>
                                                <span className="text-gray-900">{car.specs.engine}</span>
                                            </div>
                                            <div className="flex">
                                                <span className="text-gray-500 w-24">Fuel:</span>
                                                <span className="text-gray-900">{car.specs.fuel}</span>
                                            </div>
                                            <div className="flex">
                                                <span className="text-gray-500 w-24">Consumption:</span>
                                                <span className="text-gray-900">{car.specs.consumption}</span>
                                            </div>
                                            <div className="flex">
                                                <span className="text-gray-500 w-24">Doors:</span>
                                                <span className="text-gray-900">{car.specs.doors}</span>
                                            </div>
                                            <div className="flex">
                                                <span className="text-gray-500 w-24">Luggage:</span>
                                                <span className="text-gray-900">{car.specs.luggage} suitcases</span>
                                            </div>
                                            <div className="flex">
                                                <span className="text-gray-500 w-24">Year:</span>
                                                <span className="text-gray-900">{car.specs.year}</span>
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
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-blue-50" data-aos="fade-up" data-aos-duration="1000">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12" data-aos="fade-up" data-aos-delay="100">
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
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">No Hidden Fees</h3>
                            <p className="text-gray-600 text-center">
                                Transparent pricing with all taxes and fees included in the quoted price.
                            </p>
                        </div>
                        
                        <div 
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition" 
                            data-aos="fade-up" 
                            data-aos-delay="300" 
                            data-aos-duration="800"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Full Insurance</h3>
                            <p className="text-gray-600 text-center">
                                Comprehensive coverage included with every rental for peace of mind.
                            </p>
                        </div>
                        
                        <div 
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition" 
                            data-aos="fade-right" 
                            data-aos-delay="400" 
                            data-aos-duration="800"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Flexible Booking</h3>
                            <p className="text-gray-600 text-center">
                                Free cancellations and modifications up to 24 hours before pickup.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-900 text-white" data-aos="fade-up" data-aos-duration="1000">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
                        Need Help Choosing?
                    </h2>
                    <p className="text-xl max-w-2xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="200">
                        Our rental experts are available 24/7 to help you select the perfect vehicle
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4" data-aos="fade-up" data-aos-delay="300">
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