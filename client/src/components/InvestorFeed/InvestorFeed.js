import React, { useState, useEffect } from "react";
import "./InvestorFeed.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import API from "../../API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const InvestorFeed = () => {
  const [loans, setLoans] = useState([]);
  const [investorId, setInvestorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const navigate = useNavigate();


  const getLoans = async () => {
    setLoading(true);
    try {
      const response = await API.get("/loans/available");
      setLoans(response.data.loans);
      setInvestorId(response.data.investorId);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoans();
  }, []);


  const acceptLoanRequest = async (loanAmount, loanId, farmerId) => {
    try {
     
      await API.post(`/loans/${loanId}/invest`, {
        amount: loanAmount,
        toUserId: farmerId,
        fromUserId: investorId,
        status: "Pending Approval", 
      });

      toast.success("Loan sent for admin approval!");
      navigate("/investorDashboard"); 
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error submitting loan request"
      );
    }
  };

  
  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedLoan(null);
  };


  return (
    <>
      <Navbar UserType={"investor"} />
      <div style={{ marginTop: "80px" }} className="investor-feed">
        <div className="dashboard-title">
          <h1
            className="title"
            style={{
              position: "relative",
              left: "500px",
              top: "20px",
            }}
          >
            Investor Feed
          </h1>
        </div>

        {loading ? (
          <p className="loading-message">
            <b>Loading loan requests...</b>
          </p>
        ) : (
          <div className="farm-list">
            {loans.length > 0 ? (
              loans.map((loan) => (
                <div key={loan._id} className="farm-card">
                  <img
                    src={`http://localhost:3600/${loan.farm.images}`}
                    alt="Farm Land Pictures"
                    className="farm-image"
                  />
                  <h2 className="farm-name">
                    <b>Status:</b> {loan.status}
                  </h2>
                  <p>
                    <b>Amount:</b> {loan.amount}
                  </p>
                  <p>
                    <b>Requested Interest Rate:</b> {loan.interestRate}
                  </p>
                  <p>
                    <b>Duration:</b> {loan.duration}
                  </p>
                  <button
                    className="view-details-btn"
                    onClick={() => handleViewDetails(loan)}
                  >
                    Loan Details...
                  </button>
                </div>
              ))
            ) : (
              <p className="no-farms">No farms available to fund.</p>
            )}
          </div>
        )}
        <Link to={`/issue/investor`}>
          <button className="report-issue-btn">Issue?</button>
        </Link>

        {popupOpen && selectedLoan && (
          <div className="popup-overlay">
            <div className="popup-container">
              <button className="close-popup-btn" onClick={closePopup}>
                X
              </button>
              <h2 style={{ color: "white" }}>{selectedLoan.farm.name}</h2>
              <p>
                <b>Status:</b> {selectedLoan.status}
              </p>
              <p>
                <b>Amount:</b> {selectedLoan.amount}
              </p>
              <p>
                <b>Requested Interest Rate:</b> {selectedLoan.interestRate}
              </p>
              <p>
                <b>Duration:</b> {selectedLoan.duration}
              </p>
              <button
                style={{ backgroundColor: "white", color: "black" }}
                className="interested-btn"
                onClick={() =>
                  acceptLoanRequest(
                    selectedLoan.amount,
                    selectedLoan._id,
                    selectedLoan.farm.farmer
                  )
                }
              >
                Accept Loan
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InvestorFeed;
