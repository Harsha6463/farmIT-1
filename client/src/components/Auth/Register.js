import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import API from "../../API";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    profilePic: null,
    mobileNumber: "",  // Add mobileNumber to the state
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpResent, setOtpResent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.role || !formData.mobileNumber) {
      toast.error("Please fill in all required fields!");
      return;
    }

    // Validation for the mobile number (example: check if it's a valid 10-digit number)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobileNumber)) {
      toast.error("Please enter a valid mobile number!");
      return;
    }

    const formToSubmit = new FormData();
    formToSubmit.append("firstName", formData.firstName);
    formToSubmit.append("lastName", formData.lastName);
    formToSubmit.append("email", formData.email);
    formToSubmit.append("password", formData.password);
    formToSubmit.append("role", formData.role);
    formToSubmit.append("mobileNumber", formData.mobileNumber);  // Include mobileNumber in the form data
    if (formData.profilePic) {
      formToSubmit.append("profilePic", formData.profilePic);
    }

    try {
      await API.post("/auth/register", formToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Registration successful! OTP has been sent to your email.");
      setOtpSent(true);
      setOtpResent(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error during registration");
    }
  };

  const OtpSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP!");
      return;
    }

    try {
      const response = await API.post("/auth/verify-otp", {
        email: formData.email,
        otp,
      });

      if (response.data.message) {
        toast.success("OTP Verified! You can now log in.");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error during OTP verification");
    }
  };

  const ResendOtp = async () => {
    try {
      const response = await API.post("/auth/resend-otp", {
        email: formData.email,
      });

      if (response.data.message) {
        toast.success("OTP resent successfully! Please check your email.");
        setOtpResent(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error during OTP resend");
    }
  };

  const profile = (e) => {
    setFormData({
      ...formData,
      profilePic: e.target.files[0],
    });
  };

  return (
    <div style={{ marginTop: "100px" }} className="main-container">
      <form onSubmit={otpSent ? OtpSubmit : handleSubmit} className="form-container">
        <h1>{otpSent ? "Enter OTP" : "Register"}</h1>

        {!otpSent && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
              required
            />
            <select
              className="select-input"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="farmer">Farmer</option>
              <option value="investor">Investor</option>
              <option value="admin">Admin</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={profile}
              placeholder="Profile Picture (Optional)"
            />

            {formData.profilePic && (
              <div>
                <h3> Profile Picture:</h3>
                <img
                  src={URL.createObjectURL(formData.profilePic)}
                  alt="Profile Pic"
                  style={{ width: "100px", height: "100px", borderRadius:"10px" }}
                />
              </div>
            )}

            <button type="submit">Register</button>
            <h4>
              If you have already Registered,{" "}
              <Link to="/login" className="link">
                Login
              </Link>
            </h4>
          </>
        )}

        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit">Verify OTP</button>

            {!otpResent && (
              <button type="button" onClick={ResendOtp} style={{ marginTop: "10px" }}>
                Resend OTP
              </button>
            )}

            {otpResent && (
              <p style={{ marginTop: "10px", color: "green" }}>
                OTP has been resent. Please check your email.
              </p>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
