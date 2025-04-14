import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import API from "../../API";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", otp: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const otpRefs = useRef([]);

  const validateForm = () => {
    const newErrors = {
      email: !formData.email.trim() ? "Email is required" : "",
      password: !isOtpLogin && !formData.password.trim() ? "Password is required" : "",
      otp: isOtpLogin && otpSent && otp.some((digit) => digit === "") ? "All OTP digits are required" : "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    if (/^\d*$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) otpRefs.current[index + 1].focus();
      if (!value && index > 0) otpRefs.current[index - 1].focus();
      setErrors((prev) => ({ ...prev, otp: "" }));
    }
  };

  const requestOtp = async () => {
    if (!formData.email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }
    try {
      await API.post("/auth/send-Otp", { email: formData.email });
      toast.success("📨 OTP sent to your email.");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isOtpLogin) {
        const finalOtp = otp.join("");
        const { data } = await API.post("/auth/login", {
          email: formData.email,
          otp: finalOtp,
        });
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        navigateToDashboard(data.role);
      } else {
        const { data } = await API.post("/auth/login", formData);
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        navigateToDashboard(data.role);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      toast.error(errorMsg);
      if (isOtpLogin && errorMsg.toLowerCase().includes("otp")) {
        setErrors((prev) => ({ ...prev, otp: errorMsg }));
      }
    }
  };

  const navigateToDashboard = (role) => {
    if (role === "admin") navigate("/adminUsersDashboard");
    else if (role === "farmer") navigate("/farmerDashboard");
    else navigate("/investorDashboard");
  };

  return (
    <div className=" d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%", backgroundColor: "#e6f0ff" }}>
        <h3 className="text-center mb-4">🔐 Login</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold text-black">
              Email <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                type="email"
                placeholder="📧 Enter your email"
                className={`form-control form-control-lg pe-5 ${errors.email ? "border-danger" : formData.email ? "border-success" : ""}`}
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
              {errors.email && (
                <MdErrorOutline
                  className="position-absolute"
                  style={{ right: "12px", top: "50%", transform: "translateY(-50%)", color: "red" }}
                  size={20}
                />
              )}
            </div>
            {errors.email && <div className="text-danger mt-1" style={{ fontSize: "14px" }}>{errors.email}</div>}
          </div>

          {!isOtpLogin && (
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold text-black">
                Password <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="🔑 Enter your password"
                  className={`form-control form-control-lg pe-5 ${errors.password ? "border-danger" : formData.password ? "border-success" : ""}`}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                />
                <span
                  className="position-absolute"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    top: "50%",
                    right: errors.password ? "35px" : "12px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#6c757d",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {errors.password && (
                  <MdErrorOutline
                    className="position-absolute"
                    style={{ right: "12px", top: "50%", transform: "translateY(-50%)", color: "red" }}
                    size={20}
                  />
                )}
              </div>
              {errors.password && <div className="text-danger mt-1" style={{ fontSize: "14px" }}>{errors.password}</div>}
            </div>
          )}

          {isOtpLogin && otpSent && (
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold text-black">
                Enter OTP <span className="text-danger">*</span>
              </label>
              <div className="d-flex justify-content-between">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={(el) => (otpRefs.current[index] = el)}
                    className={`form-control text-center me-1 ${digit ? "border-success" : errors.otp ? "border-danger" : ""}`}
                    style={{ width: "45px", fontSize: "20px" }}
                    value={digit}
                    placeholder="•"
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>
              {errors.otp && <div className="text-danger mt-2" style={{ fontSize: "14px" }}>{errors.otp}</div>}
            </div>
          )}

          {isOtpLogin && !otpSent && (
            <div className="d-grid mb-3">
              <button type="button" className="btn btn-warning btn-lg" onClick={requestOtp}>
                📩 Send OTP
              </button>
            </div>
          )}

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary btn-lg">
              {isOtpLogin ? "🔓 Login with OTP" : "🔓 Login"}
            </button>
          </div>

          <div className="d-grid mb-3">
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={() => {
                setIsOtpLogin(!isOtpLogin);
                setOtpSent(false);
                setOtp(Array(6).fill(""));
                setErrors({ email: "", password: "", otp: "" });
              }}
            >
              {isOtpLogin ? "🔒 Login with Password" : "📲 Login with OTP"}
            </button>
          </div>

          <p className="text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
