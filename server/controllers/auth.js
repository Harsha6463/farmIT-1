
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { emailTemplates, sendEmail } from "../services/emailService.js";
import dotenv from 'dotenv';

dotenv.config();
class AuthController {
  async register(req, res) {
    try {
      const { email, password, role, firstName, lastName } = req.body;
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
      });

      await user.save();

      res.json({ message: "Registration successful", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
  async  login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        console.log("Invalid Email");
        return res.status(400).json({ message: "Invalid Email" });
      }
      if (["farmer", "investor"].includes(user.role) && user.isVerified === false) {
        console.log("Admin has to verify your account");
        return res.status(400).json({ message: "Admin has to verify your account" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Invalid Password");
        return res.status(400).json({ message: "Invalid Password" });
      }
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      console.log("Login successful, token generated");
  
      const welcomeEmailData = emailTemplates.welcomeEmail(user.firstName,user.lastName);
      const emailSendData = {
        to: user.email,
        subject: welcomeEmailData.subject,
        html: welcomeEmailData.html,
      };
      console.log('Prepared welcome email:', welcomeEmailData);
      sendEmail(emailSendData);
      console.log("Welcome email sent");
  
      res.json({ token, role: user.role });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
  
}
export default AuthController
