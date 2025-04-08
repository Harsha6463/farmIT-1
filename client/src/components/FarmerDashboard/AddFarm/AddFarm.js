import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import API from "../../../API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdErrorOutline } from "react-icons/md";

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

  const [errors, setErrors] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        const response = await API.get("/documents/my-documents");
        const verified = response.data.some((doc) => doc.isVerified);
        setIsVerified(verified);
      } catch {
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

  const validateForm = () => {
    const newErrors = {};
    Object.entries(farmData).forEach(([key, value]) => {
      if (key !== "images" && !value.trim()) newErrors[key] = true;
    });
    if (farmData.images.length === 0) newErrors.images = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      toast.error("🔒 Document verification required to add a farm.");
      return;
    }

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    Object.entries(farmData).forEach(([key, value]) => {
      if (key === "images") {
        Array.from(value).forEach((file) =>
          formDataToSend.append("images", file)
        );
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      await API.post("/farms/", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("🌱 Farm added successfully!");
      navigate("/farmerDashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || " Failed to add farm.");
    }
  };

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "transparent", minHeight: "100vh", marginTop: "80px" }}>
      <Navbar UserType="farmer" />
      <div className="d-flex justify-content-center">
        <div className="card p-4 shadow" style={{ maxWidth: "700px", width: "100%", backgroundColor: "#e6f0ff" }}>
          <h2 className="mb-4 text-center">🌾 Register Your Farm</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
            {[ 
              { name: "name", label: "Farm Name 🌻" },
              { name: "description", label: "Description 📝", isTextArea: true },
              { name: "location", label: "Location 📍" },
              { name: "farmType", label: "Farm Type 🌱" },
              { name: "size", label: "Size (in acres) 🌾", type: "number" },
              { name: "productionCapacity", label: "Production Capacity 🛠️" },
            ].map(({ name, label, isTextArea, type }) => (
              <div key={name} className="mb-3">
                <label className="form-label text-start w-100">{label} <span className="text-danger">*</span></label>
                <div className="position-relative">
                  {isTextArea ? (
                    <textarea
                      name={name}
                      className={`form-control pe-5 py-3 ${errors[name] ? "border-danger" : farmData[name] ? "border-success" : ""}`}
                      value={farmData[name]}
                      onChange={handleChange}
                      rows={3}
                      style={{ resize: "none" }}
                    />
                  ) : (
                    <input
                      type={type || "text"}
                      name={name}
                      className={`form-control pe-5 py-3 ${errors[name] ? "border-danger" : farmData[name] ? "border-success" : ""}`}
                      value={farmData[name]}
                      onChange={handleChange}
                    />
                  )}
                  {errors[name] && (
                    <MdErrorOutline
                      className="position-absolute"
                      style={{
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "red",
                        pointerEvents: "none",
                      }}
                      size={22}
                    />
                  )}
                </div>
              </div>
            ))}

            <div className="mb-4">
              <label className="form-label text-start w-100">
                Upload Farm Images 📸 <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <input
                  type="file"
                  name="images"
                  className={`form-control pe-5 py-3 ${errors.images ? "border-danger" : farmData.images.length > 0 ? "border-success" : ""}`}
                  multiple
                  onChange={handleImageUpload}
                />
                {errors.images && (
                  <MdErrorOutline
                    className="position-absolute"
                    style={{
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "red",
                      pointerEvents: "none",
                    }}
                    size={22}
                  />
                )}
              </div>
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary btn-lg" disabled={!isVerified}>
                Submit Farm Details
              </button>
            </div>
            {!isVerified && (
              <p className="text-danger text-center mt-2">
                Your documents must be verified to add a farm. 🔒
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFarm;
