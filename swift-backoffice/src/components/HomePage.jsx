import React, { useState, useEffect } from 'react';
import backgroundImage from '../images/1.jpg';
import backgroundImage2 from '../images/2.jpg';
import backgroundImage3 from '../images/3.jpg';
import backgroundImage4 from '../images/4.jpg';
import backgroundImage5 from '../images/5.jpg';
import backgroundImage6 from '../images/6.jpg';
import logo from '../images/logo.png'; // Import your logo
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false, // Allow animation to trigger on every scroll
      mirror: false, // Prevent animation on scrolling back up
    });
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Swift Backoffice Solutions" className="h-16 w-16" />
            <span className="text-xl font-bold text-[#034C8C]">Swift Backoffice</span>
          </div>
          <div className="hidden md:flex space-x-4">
            <a href="#strengths" className="hover:text-[#F58220] text-[#034C8C]">Our Strengths</a>
            <a href="#about" className="hover:text-[#F58220] text-[#034C8C]">About Us</a>
            <a href="#vision" className="hover:text-[#F58220] text-[#034C8C]">Vision</a>
            <a href="#mission" className="hover:text-[#F58220] text-[#034C8C]">Mission</a>
            <a href="#services" className="hover:text-[#F58220] text-[#034C8C]">Services</a>
            <a href="/signin" className="hover:text-[#F58220] text-[#034C8C]">Sign In</a>
            <a href="/signup" className="hover:text-[#F58220] text-[#034C8C]">Sign Up</a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <header
        className="bg-cover bg-center h-screen flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1 className="text-4xl md:text-6xl font-bold animate-fadeIn">Welcome to Swift Backoffice Solutions</h1>
        <p className="text-lg md:text-xl mt-4 animate-fadeIn delay-2">Optimizing your insurance back-office operations</p>
        <a href="#about" className="mt-8 px-6 py-3 bg-white text-[#034C8C] font-semibold rounded-md shadow-md hover:bg-[#F58220] hover:text-white transition-all duration-300">Learn More</a>
      </header>

      {/* Our Strengths Section */}
      <section id="strengths" className="p-8 bg-gray-100 flex flex-col md:flex-row items-center">
        <div data-aos="fade-right" className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4 text-[#034C8C]">Our Strengths</h2>
          <p className="text-gray-700">At Swift Backoffice Solutions, we are proficient in providing Insurance Back-Office Support tailored to the insurance and financial sectors. With over 4 years of experience, we ensure that your operations are efficient, compliant, and optimized for success.</p>
        </div>
        <div data-aos="fade-left" className="md:w-1/2 p-4">
          <img src={backgroundImage2} alt="Our Strengths" className="rounded shadow-md h-64 w-full object-cover" />
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="p-8 flex flex-col md:flex-row items-center">
        <div data-aos="fade-right" className="md:w-1/2 p-4">
          <img src={backgroundImage3} alt="About Us" className="rounded shadow-md h-64 w-full object-cover" />
        </div>
        <div data-aos="fade-left" className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4 text-[#034C8C]">About Us</h2>
          <p className="text-gray-700">At Swift Back Office Solutions, we take pride in delivering services that meet and exceed client expectations. Our commitment to quality and client satisfaction is at the heart of everything we do. We specialize in delivering comprehensive Insurance BPO services that are designed to maximize value for our clients...</p>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="p-8 bg-gray-100 flex flex-col md:flex-row items-center">
        <div data-aos="fade-right" className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4 text-[#034C8C]">Our Vision</h2>
          <p className="text-gray-700">To be the most trusted and innovative insurance back-office service provider globally, transforming business processes and client interactions through our cutting-edge solutions and unparalleled expertise.</p>
        </div>
        <div data-aos="fade-left" className="md:w-1/2 p-4">
          <img src={backgroundImage6} alt="Our Vision" className="rounded shadow-md h-64 w-full object-cover" />
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="p-8 flex flex-col md:flex-row items-center">
        <div data-aos="fade-right" className="md:w-1/2 p-4">
          <img src={backgroundImage4} alt="Our Mission" className="rounded shadow-md h-64 w-full object-cover" />
        </div>
        <div data-aos="fade-left" className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4 text-[#034C8C]">Our Mission</h2>
          <p className="text-gray-700">We strive to deliver unparalleled value to our clients through dedication, perseverance, and a relentless focus on achieving superior results. Our mission is to empower businesses by optimizing and transforming their back-office operations, providing customized solutions that enhance productivity and deliver a competitive edge...</p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="p-8 bg-gray-100 flex flex-col md:flex-row items-center">
        <div data-aos="fade-right" className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4 text-[#034C8C]">Our Services</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Policy Checking</li>
            <li>Certificate Issuance</li>
            <li>Policy Issuance</li>
            <li>Policy Administration</li>
          </ul>
        </div>
        <div data-aos="fade-left" className="md:w-1/2 p-4">
          <img src={backgroundImage5} alt="Our Services" className="rounded shadow-md h-64 w-full object-cover" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-6">
        <div className="container mx-auto flex justify-between">
          <p>&copy; 2023 Swift Backoffice Solutions. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#strengths" className="text-white hover:text-[#F58220]">Our Strengths</a>
            <a href="#about" className="text-white hover:text-[#F58220]">About Us</a>
            <a href="#vision" className="text-white hover:text-[#F58220]">Vision</a>
            <a href="#mission" className="text-white hover:text-[#F58220]">Mission</a>
            <a href="#services" className="text-white hover:text-[#F58220]">Services</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
