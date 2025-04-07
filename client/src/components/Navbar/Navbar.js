import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ UserType }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const activeNavLink = (isActive) => ({
    backgroundColor: isActive ? "blue" : "transparent",
    color: "white",
    borderRadius: isActive ? "6px" : "none",
  });

  return (
    <nav className="navigation-bar">
      <div className="nav-left">
        <div style={{ fontSize: "3rem", color: "gold" }} className="brand-logo">
        🌿FARM IT
        </div>
      </div>
      <div className="nav-center">
        {UserType === "farmer" && (
          <>
            <NavLink
              to="/farmerDashboard"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
              🚜Dashboard
            </NavLink>
            <NavLink
              to="/my-loans"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
              💰 My-Loans
            </NavLink>
            <NavLink
              to="/documents"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
              📄 Upload Documents
            </NavLink>
            <NavLink
              to="/my-documents"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
              📂 MyDocuments
            </NavLink>
            <NavLink
              to="/userissues"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
              🚨Issues
            </NavLink>
            <NavLink
              to="/profile"
              className="nav-item"
            >👨‍🌾 profile</NavLink>
          </>
        )}
        {UserType === "investor" && (
          <>
            <NavLink
              to="/investorFeed"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
              🏦 Available Loans
            </NavLink>
            <NavLink
              to="/investorDashboard"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
              💰Dashboard
            </NavLink>
            <NavLink
              to="/investorTracking"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
              📊 Tracking
            </NavLink>
            <NavLink
              to="/userissues"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
              🚨Issues
            </NavLink>
            <NavLink
              to="/Analytics"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
              📈Analytics
            </NavLink>
          </>
        )}
        {UserType === "admin" && (
          <>
            <NavLink
              to="/adminUsersDashboard"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
              👥 Users
            </NavLink>
            <NavLink
              to="/adminFarmsDashboard"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
              🪴Farms
            </NavLink>
            <NavLink
              to="/adminLoansDashboard"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
              💵 Loans
            </NavLink>
            <NavLink
              to="/adminIssuesDashboard"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
              🚨Issues
            </NavLink>
            <NavLink
              to="/userTransactions"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
            💸Transactions
            </NavLink>
            <NavLink
              to="/userDocuments"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
               📂User Documents
            </NavLink>
            <NavLink
              to="/verifyInvestments"
              className="nav-item"
              style={({ isActive }) => activeNavLink(isActive)}
            >
             ✅ Verification
            </NavLink>
          </>
        )}
      </div>
      <div className="nav-right">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
