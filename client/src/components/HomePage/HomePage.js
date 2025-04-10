import React from "react";
import {
  FaTractor,
  FaSeedling,
  FaHandshake,
  FaIndustry,
  FaUsers,
  FaRegChartBar,
  FaLeaf,
  FaBullhorn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./HomePage.css";
import {  NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a style={{fontSize:"2.5rem"}} href="#home" className="logo">🌿Farm IT</a>
      </div>
      <ul className="navbar-links">
        <li><a href="#home" className="navbar-link">Home</a></li>
        <li><a href="#features" className="navbar-link">Features</a></li>
        <li><a href="#data" className="navbar-link">Information</a></li>
        <li><a href="#about" className="navbar-link">About</a></li>
        <li><a href="#contact" className="navbar-link">Contact</a></li>
        <li><NavLink to="/login" className="navbar-link">Login</NavLink></li>
        <li><NavLink to="/register" className="navbar-link">Register</NavLink></li>
      </ul>
    </nav>
  );
};

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />

      <header className="header" id="home">
        <h1 style={{color:"white", fontSize:"50px"}} className="title">Farm IT</h1>
        <p className="tagline">Empowering Farmers with Smart Solutions & Sustainable Growth</p>
        <a href="/login" className="cta-btns">Get Started</a>
      </header>

      <section className="features" id="features">
        <h2 className="section-title">Our Features</h2>
        <div className="feature-cards">
          <div className="feature-card"><FaTractor size={60} /><h3>Farm Management Tools</h3><p>Optimize your farming operations with advanced tools for every stage.</p></div>
          <div className="feature-card"><FaSeedling size={60} /><h3>Financial Support</h3><p>Get access to funding and grow your farming business with ease.</p></div>
          <div className="feature-card"><FaHandshake size={60} /><h3>Market Access</h3><p>Sell your crops directly to buyers through our marketplace.</p></div>
          <div className="feature-card"><FaIndustry size={60} /><h3>Advanced Analytics</h3><p>Leverage data insights to improve farming efficiency and sustainability.</p></div>
          <div className="feature-card"><FaUsers size={60} /><h3>Community Support</h3><p>Join a network of farmers and experts for knowledge sharing and advice.</p></div>
          <div className="feature-card"><FaRegChartBar size={60} /><h3>Real-Time Reporting</h3><p>Monitor your farm's performance and growth with real-time reports.</p></div>
          <div className="feature-card"><FaLeaf size={60} /><h3>Sustainability Solutions</h3><p>Implement eco-friendly farming practices and reduce your environmental footprint.</p></div>
          <div className="feature-card"><FaBullhorn size={60} /><h3>Advertising & Promotion</h3><p>Promote your farm and products to a larger audience and increase visibility.</p></div>
        </div>
      </section>

      <section className="data" id="data">
        <h2 className="section-title">📊 Farm IT in Numbers</h2>
        <div className="data-cards">
          <div className="data-card"><h3>👨‍🌾 12,000+</h3><p>Farmers Registered</p></div>
          <div className="data-card"><h3>🌾 45,000+</h3><p>Acres Digitally Managed</p></div>
          <div className="data-card"><h3>💰 ₹150 Crore+</h3><p>Funding Facilitated</p></div>
          <div className="data-card"><h3>📈 98%</h3><p>User Satisfaction Rate</p></div>
          <div className="data-card"><h3>📱 24/7</h3><p>Support & Monitoring</p></div>
          <div className="data-card"><h3>🌍 5+ Countries</h3><p>International Reach</p></div>
          <div className="data-card"><h3>📦 10,000+</h3><p>Orders Processed</p></div>
          <div className="data-card"><h3>🚜 7,500+</h3><p>Farming Equipment Listed</p></div>
        </div>
      </section>

      <section className="about" id="about">
        <h2 className="section-title">About Us</h2>
        <p>Farm IT is more than just a platform—it's a movement to empower agricultural communities. With a commitment to innovation, sustainability, and inclusivity, we provide digital tools that help farmers make better decisions, access new markets, and secure financial stability.</p>
        <p style={{ marginTop: "15px" }}>We're building a smarter agricultural future—one farm at a time. Join us and be part of the transformation.</p>
      </section>

      <section className="contact" id="contact">
        <h2 className="section-title">Get in Touch</h2>
        <p>Have questions or need support? Reach out to us anytime!</p>
        <div style={{ marginTop: "30px", lineHeight: "2", fontSize: "1.1rem" }}>
          <p><FaEnvelope style={{ marginRight: "10px" }} /> farmit@farmconnect.com</p>
          <p><FaPhone style={{ marginRight: "10px" }} /> +91 9390034150</p>
          <p><FaMapMarkerAlt style={{ marginRight: "10px" }} /> 123 Agri Lane, HYD</p>
        </div>
        <a href="mailto:farmit@farmconnect.com" className="cta-btn">Contact Us</a>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Farm Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
