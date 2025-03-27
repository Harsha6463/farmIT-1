import React, { useState } from "react";
import API from "../../API";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", otp: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isOtpLogin && otpSent) {
        const { data } = await API.post("/auth/login", { email: formData.email, otp: formData.otp });
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        navigateToDashboard(data.role);
      } else {
        const { data } = await API.post("/auth/login", { email: formData.email, password: formData.password });
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        navigateToDashboard(data.role);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error during login");
    }
  };

  const navigateToDashboard = (role) => {
    if (role === "investor") navigate("/investorDashboard");
    else if (role === "farmer") navigate("/farmerDashboard");
    else if (role === "admin") navigate("/adminUsersDashboard");
  };

  const handleOtpChange = (e) => {
    setFormData({ ...formData, otp: e.target.value });
  };

  const toggleLoginMethod = () => {
    setIsOtpLogin(!isOtpLogin);
    setFormData({ ...formData, otp: "" });
    setOtpSent(false);
  };

  const requestOtp = async () => {
    try {
      await API.post("/auth/send-Otp", { email: formData.email });
      toast.success("OTP sent to your email. Please check your inbox.");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div style={{ marginTop: "100px" }} className="main-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        {!isOtpLogin && !otpSent && (
          <>
            <div className="password-container">
              <input
                style={{ width: "350px" }}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <span className="passwordicon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="authbutton">Login</button>
          </>
        )}
        {isOtpLogin && !otpSent && (
          <button type="button" onClick={requestOtp}>Send OTP</button>
        )}
        {isOtpLogin && otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleOtpChange}
              required
            />
            <button type="submit" className="authbutton">Login with OTP</button>
          </>
        )}
        <h4>
          If you haven't Registered,{" "}
          <Link to="/register" className="link">Register</Link>
        </h4>
        <button type="button" onClick={toggleLoginMethod}>
          {isOtpLogin ? "Login with Password" : "Login with OTP"}
        </button>
      </form>
    </div>
  );
};

export default Login;
