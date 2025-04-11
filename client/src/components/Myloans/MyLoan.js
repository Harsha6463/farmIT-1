import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import API from "../../API";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import "./Loans.css";

const MyLoan = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const response = await API.get("/loans/my-loans");
      setLoans(response.data);
    } catch (error) {
      toast.error("Failed to load loans");
    } finally {
      setLoading(false);
    }
  };

  const handleRepayment = async (loanId, amount, investorId) => {
    const farmerId = localStorage.getItem("farmerId");
    const confirmed = window.confirm(`Do you want to repay Rs. ${amount}?`);
    if (confirmed) {
      try {
        const response = await API.post(`/loans/${loanId}/repay`, {
          amount,
          fromUserId: farmerId,
          toUserId: investorId,
        });

        if (response.data?.message) {
          toast.success(response.data.message);
          fetchLoans();
        } else {
          toast.error("Unexpected response.");
        }
      } catch {
        toast.error("Error while repaying amount.");
      }
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <>
      <Navbar UserType={"farmer"} />
      <div className="my-loans-container">
        <h1 className="my-loans-title">My Loans</h1>

        {loading ? (
          <p className="my-loans-loading">Loading loans...</p>
        ) : loans.length > 0 ? (
          <div className="my-loans-table-wrapper">
            <table className="my-loans-table">
              <thead>
                <tr>
                  <th>Farm Name</th>
                  <th>Loan Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan._id} className="my-loans-row">
                    <td>{loan.farm.name}</td>
                    <td>Rs {loan.amount.toLocaleString()}</td>
                    <td>
                      <span className={`my-loans-status ${loan.status.toLowerCase()}`}>
                        {loan.status === "pending" ? "⏳ Pending" : loan.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="my-loans-view-btn"
                        onClick={() => setSelectedLoan(loan)}
                      >
                        Repayment Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="my-loans-empty">No loans found.</p>
        )}

        <NavLink to={`/issue/farmer`}>
          <button className="report-issue-btn"> ⚠️ Report an Issue?</button>
        </NavLink>

        {selectedLoan && (
          <div className="my-loans-modal-overlay">
            <div className="my-loans-modal-content">
              <button
                className="my-loans-modal-close"
                onClick={() => setSelectedLoan(null)}
              >
                X
              </button>
              <h2 style={{ color: "white" }}>{selectedLoan.farm.name}</h2>
              <p style={{ fontSize: "15px" }}>
                <b>Loan Amount:</b> Rs {selectedLoan.amount.toLocaleString()}
              </p>
              <p style={{ fontSize: "15px" }}>
                <b>Status:</b>{" "}
                <span className={`my-loans-status ${selectedLoan.status.toLowerCase()}`}>
                  {selectedLoan.status === "pending" ? "⏳ Pending" : selectedLoan.status}
                </span>
              </p>

              {selectedLoan.status === "credited" && (
                <>
                  <h3 style={{ color: "wheat" }}>Repayment Schedule:</h3>
                  <ul className="my-loans-repayment-list">
                    {selectedLoan.repaymentSchedule.map((payment, index) => (
                      <li key={index} className="my-loans-repayment-item">
                        <p>
                          <b>Due Date:</b>{" "}
                          {new Date(payment.dueDate).toLocaleDateString()}
                        </p>
                        <p>
                          <b>Amount:</b> Rs {payment.amount.toLocaleString()}
                        </p>
                        <p>
                          <b>Status:</b>{" "}
                          <span className={`my-loans-status ${payment.status.toLowerCase()}`}>
                            {payment.status === "pending" ? "⏳ Pending" : payment.status}
                          </span>
                        </p>
                        {payment.status === "pending" && (
                          <button
                            className="my-loans-repay-btn"
                            onClick={() =>
                              handleRepayment(
                                selectedLoan._id,
                                payment.amount,
                                selectedLoan.investors[0]?.investor._id
                              )
                            }
                          >
                            Repay
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyLoan;
