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
                    <th>Description</th>
                    <th>Amount Invested</th>
                    <th>Interest Rate</th>
                    <th>Start Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.length > 0 ? (
                    investments.map((investment) => (
                      <tr key={investment._id}>
                        <td>{investment.farm && investment.farm.name}</td>
                        <td>{investment.farm && investment.farm.description}</td>
                        <td>Rs {investment.amount}</td>
                        <td>{investment.interestRate}%</td>
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No investments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <NavLink to={`/issue/farmer`}>
               <button className="report-issue-btn"> ⚠️ Report an Issue?</button>
             </NavLink>
    </>
  );
};

export default InvestorTracking;
