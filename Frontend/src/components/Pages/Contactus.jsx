import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-blue-900 text-white" data-aos="fade-up" data-aos-duration="1200">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.stockcake.com/public/7/d/8/7d8d9e88-d4fe-4458-aa69-52a2aa358980_large/luxury-cars-lined-stockcake.jpg" 
                        alt="Contact us" 
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
                            Contact <span className="text-yellow-400">Us</span>
                        </h1>
                        <p 
                            className="text-lg sm:text-xl mb-10" 
                            data-aos="fade-up" 
                            data-aos-delay="200"
                        >
                            We're here to help with any questions about your car rental in Tunisia
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16" data-aos="fade-up" data-aos-duration="1000">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Contact Form */}
                        <div className="lg:w-1/2" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
                            <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 transform hover:shadow-lg transition">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                                
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div data-aos="fade-up" data-aos-delay="200">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                                            <input 
                                                type="text" 
                                                id="first-name" 
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                                required
                                            />
                                        </div>
                                        <div data-aos="fade-up" data-aos-delay="250">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                                            <input 
                                                type="text" 
                                                id="last-name" 
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div data-aos="fade-up" data-aos-delay="300">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                            required
                                        />
                                    </div>
                                    
                                    <div data-aos="fade-up" data-aos-delay="350">
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            id="phone" 
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                            placeholder="+216 12 345 678"
                                        />
                                    </div>
                                    
                                    <div data-aos="fade-up" data-aos-delay="400">
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                                        <select 
                                            id="subject" 
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="booking">Booking Inquiry</option>
                                            <option value="modification">Modify Existing Booking</option>
                                            <option value="fleet">Vehicle Fleet Questions</option>
                                            <option value="payment">Payment Questions</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    
                                    <div data-aos="fade-up" data-aos-delay="450">
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
                                        <textarea 
                                            id="message" 
                                            rows="5" 
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                            required
                                        ></textarea>
                                    </div>
                                    
                                    <div className="flex items-start" data-aos="fade-up" data-aos-delay="500">
                                        <div className="flex items-center h-5">
                                            <input 
                                                id="terms" 
                                                type="checkbox" 
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                required
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="terms" className="font-medium text-gray-700">
                                                I agree to the <Link to="/privacy" className="text-blue-600 hover:underline">privacy policy</Link>*
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div data-aos="fade-up" data-aos-delay="550">
                                        <button 
                                            type="submit" 
                                            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition transform hover:scale-105 shadow-md hover:shadow-lg"
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                        {/* Contact Info */}
                        <div className="lg:w-1/2" data-aos="fade-left" data-aos-delay="100" data-aos-duration="1000">
                            <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 h-full transform hover:shadow-lg transition">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our contact information</h2>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start" data-aos="fade-up" data-aos-delay="200">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-bold text-gray-900">Phone Support</h3>
                                            <p className="text-gray-600 mt-1">Available 24/7 for urgent inquiries</p>
                                            <a href="tel:+21612345678" className="text-blue-600 hover:underline block mt-2">+216 12 345 678</a>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start" data-aos="fade-up" data-aos-delay="250">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-bold text-gray-900">Email Support</h3>
                                            <p className="text-gray-600 mt-1">Typically responds within 1 business day</p>
                                            <a href="mailto:contact@tunisia-car-rental.com" className="text-blue-600 hover:underline block mt-2">contact@tunisia-car-rental.com</a>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start" data-aos="fade-up" data-aos-delay="300">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-bold text-gray-900">Our Locations</h3>
                                            <div className="mt-2 space-y-3">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">Tunis-Carthage Airport</h4>
                                                    <p className="text-gray-600">Aéroport Tunis-Carthage, 1080 Tunis</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">Tunis City Center</h4>
                                                    <p className="text-gray-600">Avenue Habib Bourguiba, 1001 Tunis</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">Sousse Downtown</h4>
                                                    <p className="text-gray-600">Rue de la Médina, 4000 Sousse</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start" data-aos="fade-up" data-aos-delay="350">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-bold text-gray-900">Business Hours</h3>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-gray-600"><span className="font-medium">Monday-Friday:</span> 8:00 AM - 8:00 PM</p>
                                                <p className="text-gray-600"><span className="font-medium">Saturday:</span> 9:00 AM - 6:00 PM</p>
                                                <p className="text-gray-600"><span className="font-medium">Sunday:</span> 10:00 AM - 4:00 PM</p>
                                                <p className="text-gray-600 text-sm mt-2">Airport locations open 24/7</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-blue-50" data-aos="fade-up" data-aos-duration="1000">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12" data-aos="fade-up" data-aos-delay="100">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find quick answers to common questions about our car rental service</p>
                    </div>
                    
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="divide-y divide-gray-200">
                                {/* FAQ Item 1 */}
                                <div className="p-6" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="800">
                                    <button className="flex justify-between items-center w-full text-left">
                                        <h3 className="text-lg font-medium text-gray-900">What documents do I need to rent a car?</h3>
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <div className="mt-2 text-gray-600">
                                        <p>You'll need a valid driver's license (held for at least 2 years), a credit card in the main driver's name, and a passport or ID card. International renters may need an International Driving Permit.</p>
                                    </div>
                                </div>
                                
                                {/* FAQ Item 2 */}
                                <div className="p-6" data-aos="zoom-in" data-aos-delay="250" data-aos-duration="800">
                                    <button className="flex justify-between items-center w-full text-left">
                                        <h3 className="text-lg font-medium text-gray-900">What is the minimum age to rent a car?</h3>
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <div className="mt-2 text-gray-600">
                                        <p>The minimum age is 21 years for economy and compact cars, and 25 years for SUVs and luxury vehicles. Young driver fees may apply for renters under 25.</p>
                                    </div>
                                </div>
                                
                                {/* FAQ Item 3 */}
                                <div className="p-6" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="800">
                                    <button className="flex justify-between items-center w-full text-left">
                                        <h3 className="text-lg font-medium text-gray-900">Can I pick up the car at one location and return it to another?</h3>
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <div className="mt-2 text-gray-600">
                                        <p>Yes, we offer one-way rentals between most of our locations in Tunisia. Additional fees may apply depending on the distance between locations.</p>
                                    </div>
                                </div>
                                
                                {/* FAQ Item 4 */}
                                <div className="p-6" data-aos="zoom-in" data-aos-delay="350" data-aos-duration="800">
                                    <button className="flex justify-between items-center w-full text-left">
                                        <h3 className="text-lg font-medium text-gray-900">What payment methods do you accept?</h3>
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <div className="mt-2 text-gray-600">
                                        <p>We accept all major credit cards (Visa, MasterCard, American Express). Cash payments are accepted at some locations but require a credit card for the security deposit.</p>
                                    </div>
                                </div>
                                
                                {/* FAQ Item 5 */}
                                <div className="p-6" data-aos="zoom-in" data-aos-delay="400" data-aos-duration="800">
                                    <button className="flex justify-between items-center w-full text-left">
                                        <h3 className="text-lg font-medium text-gray-900">What is your cancellation policy?</h3>
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <div className="mt-2 text-gray-600">
                                        <p>You can cancel or modify your reservation free of charge up to 24 hours before pickup. Late cancellations may incur a fee equivalent to one day's rental.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay="450">
                            <Link to="/faq" className="text-blue-600 hover:underline font-medium">View all FAQs →</Link>
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
                        Ready to book your car?
                    </h2>
                    <p 
                        className="text-xl max-w-2xl mx-auto mb-8" 
                        data-aos="fade-up" 
                        data-aos-delay="200"
                    >
                        Browse our fleet and reserve your perfect vehicle in just a few clicks
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
                            View Our Fleet
                        </Link>
                        <a 
                            href="tel:+21612345678" 
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition transform hover:scale-105"
                        >
                            Call Now: +216 12 345 678
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;