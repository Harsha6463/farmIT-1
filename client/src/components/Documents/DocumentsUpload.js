import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../API";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Navbar/Navbar";

const DocumentUpload = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "farm_certificate",
    file: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first. 🔐");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("type", formData.type);
    formDataToSubmit.append("file", formData.file);
    formDataToSubmit.append("token", token);

    try {
      await API.post("/documents/upload", formDataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Document uploaded successfully! 📁");
      navigate("/my-documents");
    } catch (error) {
      toast.error("Failed to upload document 📁");
    }
  };

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "transparent", minHeight: "100vh",marginTop:"100px" }}>
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
          <h2 className="mb-4 text-center">📂 Upload Document</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-start w-100">
                Document Title <span className="text-danger">*</span> 📑
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="📝 Document Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-start w-100">
                Document Type <span className="text-danger">*</span> 📂
              </label>
              <select
                className="form-select form-select-lg"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="farm_certificate">Farm Passbook 🌾</option>
                <option value="loan_agreement">Bank Details 💰</option>
                <option value="identity_proof">Identity Proof 🆔</option>
                <option value="other">Other 📄</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label text-start w-100">
                Choose File <span className="text-danger">*</span> 📁
              </label>
              <input
                type="file"
                className="form-control form-control-lg"
                name="file"
                onChange={handleChange}
                required
              />
              {formData.file && <p className="mt-2">Selected file: {formData.file.name}</p>}
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary btn-lg">
                Upload Document 🚀
              </button>
            </div>

            <p className="text-center fs-5">
              View Your document? click here <Link to="/my-documents" className="fw-bold no-underline">
                My Documents 📁
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
