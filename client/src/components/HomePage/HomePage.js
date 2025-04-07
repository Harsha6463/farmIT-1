import { FaTractor, FaSeedling, FaHandshake, FaIndustry, FaUsers, FaRegChartBar, FaLeaf, FaBullhorn } from "react-icons/fa";
import "./HomePage.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="#home" className="logo">Farm IT</a>
      </div>
      <ul className="navbar-links">
        <li><a href="#home" className="navbar-link">Home</a></li>
        <li><a href="#features" className="navbar-link">Features</a></li>
        <li><a href="#about" className="navbar-link">About</a></li>
        <li><a href="#contact" className="navbar-link">Contact</a></li>
        <li className="navbar-dropdown">
          <button className="navbar-link">Account</button>
          <ul className="dropdown-menu">
            <li><a href="/login" className="dropdown-item">Login</a></li>
            <li><a href="/register" className="dropdown-item">Sign Up</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <header  className="header" id="home">
        <h1 className="title">Farm IT</h1>
        <p className="tagline">Connecting Farmers with Technology and Resources</p>
      </header>
      <section className="features" id="features">
        <h2 className="section-title">Our Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <FaTractor size={60} color="#2c3e50" />
            <h3>Farm Management Tools</h3>
            <p>Optimize your farming operations with advanced tools for every stage.</p>
          </div>
          <div className="feature-card">
            <FaSeedling size={60} color="#2c3e50" />
            <h3>Financial Support</h3>
            <p>Get access to funding and grow your farming business with ease.</p>
          </div>
          <div className="feature-card">
            <FaHandshake size={60} color="#2c3e50" />
            <h3>Market Access</h3>
            <p>Sell your crops directly to buyers through our marketplace.</p>
          </div>
          <div className="feature-card">
            <FaIndustry size={60} color="#2c3e50" />
            <h3>Advanced Analytics</h3>
            <p>Leverage data insights to improve farming efficiency and sustainability.</p>
          </div>
          <div className="feature-card">
            <FaUsers size={60} color="#2c3e50" />
            <h3>Community Support</h3>
            <p>Join a network of farmers and experts for knowledge sharing and advice.</p>
          </div>
          <div className="feature-card">
            <FaRegChartBar size={60} color="#2c3e50" />
            <h3>Real-Time Reporting</h3>
            <p>Monitor your farm's performance and growth with real-time reports and dashboards.</p>
          </div>
          <div className="feature-card">
            <FaLeaf size={60} color="#2c3e50" />
            <h3>Sustainability Solutions</h3>
            <p>Implement eco-friendly farming practices and reduce your environmental footprint.</p>
          </div>
          <div className="feature-card">
            <FaBullhorn size={60} color="#2c3e50" />
            <h3>Advertising & Promotion</h3>
            <p>Promote your farm and products to a larger audience and increase your visibility.</p>
          </div>
        </div>
      </section>
      <section className="about" id="about">
        <h2 className="section-title">About Us</h2>
        <p>
          Farm Connect is a platform dedicated to revolutionizing the agriculture sector by bridging the gap between farmers and technology. Our goal is to help farmers increase productivity, access funding, and easily connect with buyers.
        </p>
      </section>
      <section className="contact" id="contact">
        <h2 className="section-title">Get in Touch</h2>
        <p>Have questions or need support? Reach out to us anytime!</p>
        <a href="#contact" className="cta-btn">Contact Us</a>
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
