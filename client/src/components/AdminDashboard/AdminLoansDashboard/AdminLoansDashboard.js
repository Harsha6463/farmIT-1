import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import API from "../../../API";
import "./Adminlo.css";

const AdminLoansDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const response = await API.get("/admin/loans");
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar UserType={"admin"} />
      <div className="admin-loans-wrapper">
        <div className="loans-dashboard-container">
          <h1 className="title" style={{ marginTop: "80px" }}>
            Admin Loans Dashboard
          </h1>

          {loading ? (
            <p className="dashboard-loading-text">
              <b>Loading loans...</b>
            </p>
          ) : loans.length > 0 ? (
            <div className="loan-table-container">
              <table className="loan-table">
                <thead>
                  <tr>
                    <th>Farm Name</th>
                    <th>Loan ID</th>
                    <th>Amount</th>
                    <th>Interest Rate</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan._id}>
                      <td>{loan.farm ? loan.farm.name : "N/A"}</td>
                      <td>{loan._id}</td>
                      <td>₹ {loan.amount}</td>
                      <td>{loan.interestRate}%</td>
                      <td>{loan.duration} months</td>
                      <td>
                        <span
                          className={`loan-status ${loan.status.toLowerCase()}`}
                        >
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="dashboard-no-loans">No loans found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminLoansDashboard;
