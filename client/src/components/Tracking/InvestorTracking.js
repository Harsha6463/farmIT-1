import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { NavLink } from "react-router-dom";
import API from "../../API";
import "./InvestorTracking.css";

const InvestorTracking = () => {
  const [investments, setInvestments] = useState([]);
  const [stats, setStats] = useState({
    totalInvested: 0,
    totalReturns: 0,
    activeInvestments: 0,
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const fetchInvestments = async () => {
    setLoading(true);
    try {
      const response = await API.get("/investments/tracking");
      const allInvestments = response.data.investments;
      const creditedInvestments = allInvestments.filter(
        (inv) => inv.status.toLowerCase() === "credited"
      );

      setInvestments(allInvestments);
      setStats({
        totalInvested: response.data.stats.totalInvested,
        totalReturns: response.data.stats.totalReturns,
        activeInvestments: creditedInvestments.length,
      });
    } catch (error) {
      console.error("Error fetching investment tracking data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const handleViewDetails = (investment) => {
    setSelectedInvestment(investment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvestment(null);
  };

  return (
    <>
      <Navbar UserType={"investor"} />
      <div className="investor-tracking">
        <h1 className="title">Investment Tracking</h1>

        {loading ? (
          <p className="loading-message">Loading investments...</p>
        ) : (
          <>
            <div className="stats-card">
              <p>
                <b>Total Invested:</b> Rs {stats.totalInvested}
              </p>
              <p>
                <b>Total Returns:</b> Rs {stats.totalReturns}
              </p>
              <p>
                <b>Active Investments:</b> {stats.activeInvestments}
              </p>
            </div>

            <div className="investment-table-container">
              <table className="investment-table">
                <thead>
                  <tr>
                    <th>Farm Name</th>
                    <th>Start Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.length > 0 ? (
                    investments.map((investment) => (
                      <tr key={investment._id}>
                        <td>{investment.farm && investment.farm.name}</td>
                        <td>
                          {new Date(investment.startDate).toLocaleDateString()}
                        </td>
                        <td>
                          <span
                            className={`status ${investment.status.toLowerCase()}`}
                          >
                            {investment.status}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleViewDetails(investment)}
                            className="view-details-btn1"
                            style={{
                              backgroundColor: "black",
                              color: "white",
                              fontSize: "1.25rem",
                            }}
                          >
                            Tracking
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No investments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <NavLink to={`/issue/investor`}>
        <button className="report-issue-btn">Report An Issue</button>
      </NavLink>

      {isModalOpen && selectedInvestment && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={closeModal}>
              X
            </button>
            <h2 style={{ color: "white", textAlign: "center" }}>
              {selectedInvestment.farm && selectedInvestment.farm.name}
            </h2>
            <p style={{ textAlign: "center" }}>
              <b>Description:</b>{" "}
              {selectedInvestment.farm && selectedInvestment.farm.description}
            </p>
            <p style={{ textAlign: "center" }}>
              <b>Amount Invested:</b> Rs {selectedInvestment.amount}
            </p>
            <p style={{ textAlign: "center" }}>
              <b>Interest Rate:</b> {selectedInvestment.interestRate}%
            </p>
            <p style={{ textAlign: "center" }}>
              <b>Start Date:</b>{" "}
              {new Date(selectedInvestment.startDate).toLocaleDateString()}
            </p>
            <p style={{ textAlign: "center" }}>
              <b>Status:</b> {selectedInvestment.status}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default InvestorTracking;
