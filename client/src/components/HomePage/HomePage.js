import React from "react";
import {
  FaTractor, FaSeedling, FaHandshake, FaIndustry,
  FaUsers, FaRegChartBar, FaLeaf, FaBullhorn,
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./HomePage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      <a style={{ fontSize: "2.5rem",color:"black" }} href="#home" className="logo"><img className="farmitlogo" src="/assets/logo.png" alt="Logo"></img></a>
    </div>
    <ul className="navbar-links">
      <li><a href="#home" className="navbar-link">Home</a></li>
      <li><a href="#features" className="navbar-link">Features</a></li>
      <li><a href="#data" className="navbar-link">Information</a></li>
      <li><a href="#about" className="navbar-link">About</a></li>
      <li><a href="#contact" className="navbar-link">Contact Us</a></li>
      <li><NavLink to="/login" className="navbar-link">Login</NavLink></li>
      <li><NavLink to="/register" className="navbar-link">Register</NavLink></li>
    </ul>
  </nav>
);

const HomePage = () => (
  <div className="homepage">
    <Navbar />
    {/* <header className="header" id="home">
      <h1 style={{ color: "lightBlue" }} className="title">Farm IT</h1>
      <p className="tagline">Empowering Farmers with Smart Solutions & Sustainable Growth</p>
      <a href="/login" className="cta-btns">Get Started</a>
    </header> */}

    <div id="farmCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
    <h2 className="carousel-title display-4 text-center text-white">Transforming Agriculture with Smart Technology</h2>

     
      <ol className="carousel-indicators">
        <li data-bs-target="#farmCarousel" data-bs-slide-to="0" className="active"></li>
        <li data-bs-target="#farmCarousel" data-bs-slide-to="1"></li>
        <li data-bs-target="#farmCarousel" data-bs-slide-to="2"></li>
        <li data-bs-target="#farmCarousel" data-bs-slide-to="3"></li>
        <li data-bs-target="#farmCarousel" data-bs-slide-to="4"></li>
        <li data-bs-target="#farmCarousel" data-bs-slide-to="5"></li>
        <li data-bs-target="#farmCarousel" data-bs-slide-to="6"></li>
      </ol>
      <div className="carousel-inner">
        {[{
          src: "/assets/hero_1.jpg", title: "Modern Farming Equipment", desc: "Utilize state-of-the-art tools for maximum efficiency."
        }, {
          src: "/assets/hero_2.jpg", title: "Harvesting the Future", desc: "Maximize yield with cutting-edge technology and practices."
        }, {
          src: "/assets/hero_3.jpg", title: "Data-Driven Insights", desc: "Monitor your farm’s progress with real-time analytics."
        }, {
          src: "/assets/hero_4.jpg", title: "Farming Community", desc: "Join a network of farmers sharing knowledge and support."
        }, {
          src: "/assets/hero_5.jpg", title: "Sustainable Farming", desc: "Grow your crops with eco-friendly and sustainable methods."
        }, {
          src: "/assets/hero_8.jpg", title: "Smart Irrigation", desc: "Save water and enhance crop health with automated irrigation systems."
        }, {
          src: "/assets/hero_10.jpg", title: "Soil Health Monitoring", desc: "Use data-driven tools to monitor and improve soil quality."
        }].map((item, index) => (
          <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
            <img src={item.src} className="d-block w-100" alt={item.title} />
            <div className="carousel-caption d-none d-md-block">
              <h5>{item.title}</h5>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#farmCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#farmCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

    <section className="features" id="features">
      <h2 className="section-title">Our Features</h2>
      <div className="feature-cards">
        {[{
          icon: <FaTractor size={60} />, title: "Farm Management Tools", desc: "Optimize your farming operations..."
        }, {
          icon: <FaSeedling size={60} />, title: "Financial Support", desc: "Get access to funding and grow your business..."
        }, {
          icon: <FaHandshake size={60} />, title: "Market Access", desc: "Sell your crops directly through our marketplace..."
        }, {
          icon: <FaIndustry size={60} />, title: "Advanced Analytics", desc: "Leverage data to improve efficiency..."
        }, {
          icon: <FaUsers size={60} />, title: "Community Support", desc: "Join a network for advice and sharing..."
        }, {
          icon: <FaRegChartBar size={60} />, title: "Real-Time Reporting", desc: "Monitor performance with real-time reports..."
        }, {
          icon: <FaLeaf size={60} />, title: "Sustainability Solutions", desc: "Implement eco-friendly practices..."
        }, {
          icon: <FaBullhorn size={60} />, title: "Advertising & Promotion", desc: "Promote your farm to more people..."
        }].map((item, index) => (
          <div className="feature-card" key={index}>
            {item.icon}
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
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
      <p>Farm IT is more than just a platform—it's a movement to empower agricultural communities...</p>
      <p style={{ marginTop: "15px" }}>We're building a smarter agricultural future—one farm at a time...</p>
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
      <div className="footer-container">
        <div className="footer-box">
          <h3>🌿 Farm IT</h3>
          <p>Your digital farming partner for a smarter, sustainable future.</p>
        </div>
        <div className="footer-box">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">🏠 Home</a></li>
            <li><a href="#features">⚙️ Features</a></li>
            <li><a href="#data">📊 Farm Data</a></li>
            <li><a href="#about">📖 About</a></li>
            <li><a href="#contact">📬 Contact</a></li>
          </ul>
        </div>
        <div className="footer-box">
          <h4>Contact Info</h4>
          <p><FaEnvelope /> farmit@farmconnect.com</p>
          <p><FaPhone /> +91 9390034150</p>
          <p><FaMapMarkerAlt /> 123 Agri Lane, HYD</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF size={35} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter size={35} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram size={35} /></a>
            <a href="https://wa.me/919390034150" target="_blank" rel="noreferrer"><FaWhatsapp size={35} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Farm Connect. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

export default HomePage;
