import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../API";
import { toast } from "react-toastify";
import Navbar from "../../Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const LoanRequest = () => {
  const { farmId } = useParams();
  const [loanData, setLoanData] = useState({
    amount: "",
    interestRate: "",
    duration: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoanData({ ...loanData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/loans", {
        farmId,
        ...loanData,
      });

      toast.success("Loan request submitted successfully!");
      navigate("/farmerDashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error submitting loan request"
      );
    }
  };

  return (
    <>
      <div
        className="container-fluid py-5"
        style={{
          backgroundColor: "transparent",
          minHeight: "100vh",
          marginTop: "100px",
        }}
      >
        <Navbar UserType="farmer" />
        <div className="d-flex justify-content-center">
          <div
            className="card p-4 shadow"
            style={{
              maxWidth: "600px",
              width: "100%",
              backgroundColor: "#e6f0ff",
            }}
          >
            <h2 className="mb-4 text-center">💸 Request a Loan</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold fs-5 text-black text-start w-100">
                  Loan Amount 💵 <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  name="amount"
                  placeholder="📝 Enter Loan Amount"
                  value={loanData.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold fs-5 text-black text-start w-100">
                  Interest Rate (%) 📊 <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  name="interestRate"
                  placeholder="📈 Enter Interest Rate"
                  value={loanData.interestRate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold fs-5 text-black text-start w-100">
                  Duration (months) 🗓️ <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  name="duration"
                  placeholder="📅 Enter Duration"
                  value={loanData.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  Request Loan 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanRequest;
