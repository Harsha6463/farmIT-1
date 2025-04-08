import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../API";
import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

const Issue = () => {
  const { userType } = useParams();
  const [issueData, setIssueData] = useState({
    issueTitle: "",
    issueDiscription: "",
  });
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setIssueData({ ...issueData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/issue/add-issue", {
        ...issueData,
        userId,
      });
      console.log(response);
      toast.success("Issue submitted successfully! 📝");
      if (userType === "investor") navigate("/investorDashboard");
      else if (userType === "farmer") navigate("/farmerDashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error submitting the issue ⚠️"
      );
    }
  };

  return (
    <>
      <div className="container py-5">
      <Navbar UserType={userType} />
        <div className="card p-4 shadow" style={{ backgroundColor: "#e6f0ff", maxWidth: "800px", margin: "auto" }}>
          <h2 className="text-center mb-4">📝 Report an Issue</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-start w-100">
                Issue Title <span className="text-danger">*</span> 📌
              </label>
              <input
                type="text"
                name="issueTitle"
                className="form-control form-control-lg"
                placeholder="Title of your issue"
                value={issueData.issueTitle}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-start w-100">
                Issue Description <span className="text-danger">*</span> 📝
              </label>
              <textarea
                name="issueDiscription"
                className="form-control form-control-lg"
                placeholder="Describe the issue in detail"
                value={issueData.issueDiscription}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary btn-lg">
                Submit Issue 🚨
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Issue;
