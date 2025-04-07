import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import API from "../../../API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddFarms.css"
const AddFarm = () => {
  const [farmData, setFarmData] = useState({
    name: "",
    description: "",
    location: "",
    farmType: "",
    size: "",
    productionCapacity: "",
    images: [],
  });
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        const response = await API.get("/documents/my-documents");
        let verified = response.data.some((doc) => doc.isVerified);
        setIsVerified(verified);
      } catch (error) {
        toast.error("Error fetching verification status");
      }
    };
    fetchVerificationStatus();
  }, []);

  const handleChange = (e) => {
    setFarmData({ ...farmData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setFarmData({ ...farmData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      toast.error("Document verification required to add a farm.");
      return;
    }

    const formData = new FormData();
    Object.entries(farmData).forEach(([key, value]) => {
      if (key === "images") {
        Array.from(value).forEach((file) => formData.append("images", file));
      } else {
        formData.append(key, value);
      }
    });

    try {
      await API.post("/farms/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Farm added successfully!");
      navigate("/farmerDashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add farm.");
    }
  };

  return (
    <>
      <Navbar UserType="farmer" />
      <div className="form-wrapper">
        <div className="form-header">
          <h2 className="form-title"> 🌾Register Your Farm</h2>
          <p style={{fontSize:"1.25rem"}}>Fill out the form to add your farm details</p>
        </div>

        <form className="form-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Farm Name :</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={farmData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description :</label>
            <textarea
              name="description"
              className="form-textarea"
              value={farmData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location :</label>
            <input
              type="text"
              name="location"
              className="form-input"
              value={farmData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Farm Type :</label>
            <input
              type="text"
              name="farmType"
              className="form-input"
              value={farmData.farmType}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Size : (in acres)</label>
            <input
              type="number"
              name="size"
              className="form-input"
              value={farmData.size}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Production Capacity :</label>
            <input
              type="text"
              name="productionCapacity"
              className="form-input"
              value={farmData.productionCapacity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Upload Farm Images :</label>
            <input
              type="file"
              name="images"
              className="form-input"
              multiple
              onChange={handleImageUpload}
            />
          </div>

          <div className="form-action">
            <button
              type="submit"
              className="submitbutton"
              disabled={!isVerified}
            >
              Submit Farm Details
            </button>
          </div>
        </form>

        <div className="form-footer">
          <p style={{fontSize:"1.25rem"}}>Ensure your documents are verified before submitting the farm details.</p>
        </div>
      </div>
    </>
  );
};

export default AddFarm;
