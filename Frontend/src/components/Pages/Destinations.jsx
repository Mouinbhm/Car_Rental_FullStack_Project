import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Destinations = () => {
    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const destinations = [
        {
            name: 'Tunis',
            image: 'https://observatoirevivreensemble.org/sites/default/files/styles/obs-screen-lg-16-9/public/av_bourguiba.jpg?itok=g-wRGuZQ',
            description: 'Explore the vibrant capital with its historic medina, Bardo Museum, and modern city life.',
            recommendedCar: 'Hyundai Tucson',
            carCategory: 'SUV',
            carPrice: '250 TND/day',
            carLink: '/cars/suv'
        },
        {
            name: 'Sousse',
            image: 'https://t3.ftcdn.net/jpg/00/42/92/74/360_F_42927417_vZFt6VLiMZLU2ZSoz9oGhWxRuS3nGHE2.jpg',
            description: 'Discover the coastal charm of Sousse with its beaches, souks, and ancient Ribat fortress.',
            recommendedCar: 'Volkswagen Golf',
            carCategory: 'Compact',
            carPrice: '150 TND/day',
            carLink: '/cars/compact'
        },
        {
            name: 'Djerba',
            image: 'https://t3.ftcdn.net/jpg/06/59/25/30/360_F_659253097_9MWKTOWjBV5oS0Ju9iYbzhC2a2KfIc2W.jpg',
            description: 'Experience the island’s serene beaches, Djerbahood street art, and traditional markets.',
            recommendedCar: 'Toyota Corolla',
            carCategory: 'Sedan',
            carPrice: '180 TND/day',
            carLink: '/cars/sedan'
        },
        {
            name: 'Sahara Desert',
            image: 'https://www.discovertunisia.com/en/sites/default/files/oasis2_0.jpg',
            description: 'Venture into the vast desert for a unique adventure with camel rides and starlit camps.',
            recommendedCar: 'Jeep Wrangler',
            carCategory: '4x4',
            carPrice: '300 TND/day',
            carLink: '/cars/4x4'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-blue-900 text-white" data-aos="fade-up" data-aos-duration="1200">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                        alt="Tunisia destinations" 
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
                            Discover <span className="text-yellow-400">Tunisia</span>
                        </h1>
                        <p 
                            className="text-lg sm:text-xl mb-10" 
                            data-aos="fade-up" 
                            data-aos-delay="200"
                        >
                            Explore Tunisia’s top destinations with the perfect rental car for your journey
                        </p>
                        <Link 
                            to="/cars" 
                            className="px-8 py-4 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg hover:shadow-xl"
                            data-aos="fade-up" 
                            data-aos-delay="300"
                        >
                            Find Your Car
                        </Link>
                    </div>
                </div>
            </section>

            {/* Destinations Section */}
            <section className="py-16 bg-white" data-aos="fade-up" data-aos-duration="1000">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12" data-aos="fade-up" data-aos-delay="100">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Top Destinations in Tunisia</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            From historic cities to stunning coastlines, find the perfect car for your adventure
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {destinations.map((destination, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-xl shadow-md overflow-hidden transform hover:shadow-lg transition"
                                data-aos="zoom-in" 
                                data-aos-delay={`${200 + index * 100}`} 
                                data-aos-duration="800"
                            >
                                <img 
                                    src={destination.image} 
                                    alt={destination.name} 
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                                    <p className="text-gray-600 mb-4">{destination.description}</p>
                                    <div className="border-t border-gray-200 pt-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Recommended Car:</h4>
                                        <p className="text-gray-900 font-medium">{destination.recommendedCar}</p>
                                        <p className="text-gray-600 text-sm">{destination.carCategory} - {destination.carPrice}</p>
                                        <Link 
                                            to={destination.carLink} 
                                            className="mt-4 inline-block text-blue-600 hover:underline"
                                        >
                                            View {destination.carCategory} Cars
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Travel Tips Section */}
            <section className="py-16 bg-blue-50" data-aos="fade-up" data-aos-duration="1000">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12" data-aos="fade-up" data-aos-delay="100">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Travel Tips for Tunisia</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Make the most of your trip with these helpful tips
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div 
                            className="bg-white p-6 rounded-lg shadow-sm transform hover:shadow-lg transition" 
                            data-aos="fade-up" 
                            data-aos-delay="200" 
                            data-aos-duration="800"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Plan Your Route</h3>
                            <p className="text-gray-600 text-center">
                                Map out your itinerary to include must-see sites like Carthage, El Djem, and Matmata for a seamless road trip.
                            </p>
                        </div>
                        
                        <div 
                            className="bg-white p-6 rounded-lg shadow-sm transform hover:shadow-lg transition" 
                            data-aos="fade-up" 
                            data-aos-delay="300" 
                            data-aos-duration="800"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Budget Wisely</h3>
                            <p className="text-gray-600 text-center">
                                Take advantage of our affordable rates and consider fuel-efficient cars for longer trips to save costs.
                            </p>
                        </div>
                        
                        <div 
                            className="bg-white p-6 rounded-lg shadow-sm transform hover:shadow-lg transition" 
                            data-aos="fade-up" 
                            data-aos-delay="400" 
                            data-aos-duration="800"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Local Insights</h3>
                            <p className="text-gray-600 text-center">
                                Respect local customs, drive cautiously in busy markets, and carry cash for smaller vendors.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-900 text-white" data-aos="fade-up" data-aos-duration="1000">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 
                        className="text-3xl sm:text-4xl font-bold mb-6" 
                        data-aos="fade-up" 
                        data-aos-delay="100"
                    >
                        Start Your Tunisian Adventure
                    </h2>
                    <p 
                        className="text-xl max-w-2xl mx-auto mb-8" 
                        data-aos="fade-up" 
                        data-aos-delay="200"
                    >
                        Book your car today and explore Tunisia’s wonders with ease
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
            </section>
        </div>
    );
};

export default Destinations;