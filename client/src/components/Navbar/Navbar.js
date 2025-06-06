import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  HiUsers, HiHome, HiDocumentText, HiCash, HiChartBar,
  HiOfficeBuilding, HiCreditCard, HiDocumentDuplicate,
  HiShieldCheck, HiExclamationCircle,
  HiCog, HiQuestionMarkCircle, HiLogout
} from 'react-icons/hi';
import { FaSeedling, FaLeaf } from 'react-icons/fa';
import API from '../../API'; // ✅ import your API helper
import './Navbar.css';

const navigationConfig = {
  farmer: [
    { path: '/farmerDashboard', label: 'Dashboard', icon: HiHome },
    { path: '/my-loans', label: 'My Loans', icon: HiCash },
    { path: '/documents', label: 'Upload Documents', icon: HiDocumentText },
    { path: '/my-documents', label: 'My Documents', icon: HiDocumentDuplicate },
    { path: '/userissues', label: 'Issues', icon: HiExclamationCircle },
  ],
  investor: [
    { path: '/investorFeed', label: 'Available Loans', icon: HiCash },
    { path: '/investorDashboard', label: 'Dashboard', icon: HiHome },
    { path: '/investorTracking', label: 'Tracking', icon: HiChartBar },
    { path: '/userissues', label: 'Issues', icon: HiExclamationCircle },
    { path: '/Analytics', label: 'Analytics', icon: HiChartBar },
  ],
  admin: [
    { path: '/adminUsersDashboard', label: 'Users', icon: HiUsers },
    { path: '/adminFarmsDashboard', label: 'Farms', icon: HiOfficeBuilding },
    { path: '/adminLoansDashboard', label: 'Loans', icon: HiCash },
    { path: '/adminIssuesDashboard', label: 'Issues', icon: HiExclamationCircle },
    { path: '/userTransactions', label: 'Transactions', icon: HiCreditCard },
    { path: '/userDocuments', label: 'User Documents', icon: HiDocumentText },
    { path: '/verifyInvestments', label: 'Verification', icon: HiShieldCheck },
  ],
};

const userMenuItems = [
  { label: 'Profile', icon: HiUsers, path: '/profile' },
  { label: 'Settings', icon: HiCog, path: '/settings' },
  { label: 'Help & Support', icon: HiQuestionMarkCircle, path: '/contactus' },
];

const Navbar = ({ UserType }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActivePath = (path) => location.pathname === path;
  const togglePopup = () => setIsPopupOpen((prev) => !prev);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await API.get("http://localhost:3600/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <FaSeedling />
            <FaLeaf className="leaf-icon" />
          </div>
          <span style={{ fontSize: "2.5rem" }} className="logo-text">
            Farm<span className="logo-highlight">IT</span>
          </span>
        </Link>

        <div className="nav-links">
          {navigationConfig[UserType]?.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActivePath(item.path) ? 'active' : ''}`}
            >
              <item.icon className="nav-icon" />
              {item.label}
            </Link>
          ))}
        </div>

        {user && (
          <div className="profile-dropdown">
            <button className="profile-btn" onClick={togglePopup}>
              <div className="profile-icon">
                <img
                  src={
                    user?.profilePic
                      ? `http://localhost:3600/${user.profilePic}`
                      : 'https://i.imgur.com/8RKXAIV.jpg'
                  }
                  alt="User"
                  className="nav-profile-pic"
                />
              </div>
              <span style={{fontSize:"1.15rem"}} className="profile-name">{user?.firstName}</span>
            </button>

            {isPopupOpen && (
              <div className="popup-menu">
                <div className="popup-header">
                  <div style={{color:"#fff", textAlign:"left" ,paddingLeft:"10px"}} className="popup-name">{user?.firstName} {user?.lastName}</div>
                  <div style={{color:"#fff",textAlign:"left" ,paddingLeft:"10px"}} className="popup-email">{user?.email}</div>
                </div>
                {userMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="popup-item"
                    onClick={() => setIsPopupOpen(false)}
                  >
                    <item.icon className="popup-icon" />
                    {item.label}
                  </Link>
                ))}
                <button className="popup-item logout" onClick={handleLogout}>
                  <HiLogout className="popup-icon logout-icon" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
