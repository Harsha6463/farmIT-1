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
  const [errors, setErrors] = useState({ email: false, password: false, otp: false });
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = { email: false, password: false, otp: false };

    if (!formData.email) formErrors.email = true;
    if (!isOtpLogin && !formData.password) formErrors.password = true;
    if (isOtpLogin && otpSent && !formData.otp) formErrors.otp = true;

    setErrors(formErrors);
    return Object.values(formErrors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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

  const LoginMethod = () => {
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
          className={errors.email ? "error" : ""}
        />
        {errors.email && <span className="error-message">This field is required</span>}

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
                className={errors.password ? "error" : ""}
              />
              <span className="passwordicon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <span className="error-message">This field is required</span>}
            <button type="submit" className="action-button">Login</button>
          </>
        )}
        {isOtpLogin && !otpSent && (
          <button className="action-button" type="button" onClick={requestOtp}>Send OTP</button>
        )}
        {isOtpLogin && otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleOtpChange}
              required
              className={errors.otp ? "error" : ""}
            />
            {errors.otp && <span className="error-message">This field is required</span>}
            <button type="submit" className="action-button">Login with OTP</button>
          </>
        )}
       
        <button className="action-button" type="button" onClick={LoginMethod}>
          {isOtpLogin ? "Login with Password" : "Login with OTP"}
        </button>
        <h4>
          If you haven't Registered,{" "}
          <Link to="/register" className="link">Register</Link>
        </h4>
      </form>
    </div>
  );
};

export default Login;
