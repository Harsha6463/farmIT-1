import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../API";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    profilePic: null,
    mobileNumber: "",
  });

  const navigate = useNavigate();

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.role ||
      !formData.mobileNumber ||
      !formData.profilePic
    ) {
      toast.error(
        "Please fill in all required fields, including a profile picture!"
      );
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    const formToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) formToSubmit.append(key, formData[key]);
    });

    try {
      await API.post("/auth/register", formToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error during registration");
    }
  };


  const getBorderClass = (fieldValue) => {
    return fieldValue.trim() ? "border-success" : "border-danger";
  };

  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "transparent", minHeight: "100vh" }}
    >
      <div className="d-flex justify-content-center">
        <div
          className="card p-4 shadow"
          style={{
            maxWidth: "600px",
            width: "100%",
            backgroundColor: "#e6f0ff",
          }}
        >
          <h2 className="mb-4 text-center">👤 Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label className="form-label text-start w-100">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-control-lg ${getBorderClass(
                    formData.firstName
                  )}`}
                  placeholder="👤 First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col">
                <label className="form-label text-start w-100">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-control-lg ${getBorderClass(
                    formData.lastName
                  )}`}
                  placeholder="👤 Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label text-start w-100">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className={`form-control form-control-lg ${getBorderClass(
                  formData.email
                )}`}
                placeholder="📧 example@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-start w-100">
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className={`form-control form-control-lg ${getBorderClass(
                  formData.password
                )}`}
                placeholder="🔒 Strong Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-start w-100">
                Mobile Number <span className="text-danger">*</span>
              </label>
              <PhoneInput
                country="in"
                value={formData.mobileNumber}
                onChange={(phone) =>
                  setFormData({ ...formData, mobileNumber: phone })
                }
                inputProps={{
                  name: "mobile",
                  required: true,
                }}
                containerClass="w-100"
                inputClass={`form-control form-control-lg custom-phone-input ${getBorderClass(
                  formData.mobileNumber
                )}`}
                buttonClass="custom-phone-button"
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-start w-100">
                Role <span className="text-danger">*</span>
              </label>
              <select
                className={`form-select form-select-lg ${getBorderClass(
                  formData.role
                )}`}
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                required
              >
                <option value="" disabled>
                  🎭 Select Role
                </option>
                <option value="farmer">👨‍🌾 Farmer</option>
                <option value="investor">💰 Investor</option>
                <option value="admin">🗂️ Admin</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label text-start w-100">
                Profile Picture <span className="text-danger">*</span>
              </label>
              <input
                type="file"
                className="form-control form-control-lg"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, profilePic: e.target.files[0] })
                }
                required
              />
            </div>

            {formData.profilePic && (
              <div className="mb-3 text-center">
                <img
                  src={URL.createObjectURL(formData.profilePic)}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "10px",
                  }}
                />
              </div>
            )}

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary btn-lg">
                Register
              </button>
            </div>

            <p className="text-center fs-5">
              Already have an account?{" "}
              <Link to="/login" className="fw-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <style>
{`
  .react-tel-input .custom-phone-input {
    height: calc(1.5em + 1rem + 2px);
    font-size: 1.25rem;
    padding-left: 58px !important;
    width: 100%;
    border-radius: 0.3rem;
    border: 1px solid #ced4da;
    box-shadow: none;
  }

  .react-tel-input .custom-phone-button {
    height: 100%;
    border-radius: 0.375rem 0 0 0.375rem;
    border: 1px solid #ced4da;
    background-color: #fff;
    display: flex;
    align-items: left;
    justify-content: center;
  }

  .react-tel-input .flag-dropdown {
    border-right: none;
  }

  .react-tel-input {
    width: 100%;
  }

  .react-tel-input .form-control {
    margin: 0;
  }
`}
</style>
    </div>
  );
};

export default Register;
