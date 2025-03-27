import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendEmail } from "../services/emailService.js";
import otpGenerator from "otp-generator";
import dotenv from 'dotenv';

dotenv.config();

global.otpStore = {};

class AuthController {

  async register(req, res) {
    try {
      const { email, password, role, firstName, lastName,mobileNumber } = req.body;
      const profilePic = req.file ? req.file.path : "";

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({
        email,
        password: hashedPassword,
        role,
        firstName,
        lastName,
        profilePic,
        mobileNumber
      });

      const otp = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false });
      global.otpStore[email] = otp;

      const otpMessage = `
        Farm IT - Email Verification Process
        <p>Dear ${firstName} ${lastName},</p>
        <p>Your OTP for registration is <strong>${otp}</strong>.</p>
        <p>This OTP will remain valid until you verify it.</p>
        <p>Thank you for registering with us.</p>`;

      await sendEmail(email, "Your OTP for Registration", otpMessage);

      await user.save();

      res.json({ message: "Registration successful. Please check your email for OTP verification." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  async verifyOtp(req, res) {
    try {
      const { email, otp } = req.body;

      if (global.otpStore[email] !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      const user = await User.findOne({ email });
      if (user) {
        user.isVerified = true;
        await user.save();

        delete global.otpStore[email];

        res.json({ message: "OTP verified successfully. You can now log in." });
      } else {
        res.status(400).json({ message: "User not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  async resendOtp(req, res) {
    try {
      const { email } = req.body;

      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (global.otpStore[email]) {
        return res.status(400).json({ message: "OTP already sent. Please verify it." });
      }

      const otp = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false });
      global.otpStore[email] = otp;

      const otpMessage = `
        Farm IT - Email Verification Process
        <p>Dear <b>${user.firstName} ${user.lastName}</b>,</p>
        <p>Your OTP for registration is <strong>${otp}</strong>.</p>
        <p>This OTP will remain valid until you verify it.</p>
        <p>Thank you for registering with us.</p>`;

      await sendEmail(email, "Your OTP for Registration", otpMessage);

      res.json({ message: "OTP resent successfully. Please check your email." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Email" });
      }
      if (["farmer", "investor"].includes(user.role) && user.isVerified === false) {
        return res.status(400).json({ message: "Admin has to verify your account" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Password" });
      }
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({ token, role: user.role });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
}

export default AuthController;
