import User from "../models/User.js";
import Farm from "../models/Farm.js";
import Loan from "../models/Loan.js";
import Transaction from "../models/Transaction.js";
import Document from "../models/Document.js";
import { sendEmail } from "../services/emailService.js";

class AdminController {
  async getUsers(req, res) {
    try {
      const users = await User.find().select("-password");
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
  async verifyUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { isVerified: true },
        { new: true }
      ).select("-password");
      const mailDetails = {
        to: user.email,
        subject: "Account Verified",
        text: `Farm IT - Account Verified,\n\n`

      `  Dear ${user.firstName} ${user.lastName},\n\n`

       ` Your Farm IT account has been successfully verified.\n\n`

       ` You can now log in to your account and start managing your farms.\n\n`

      `  click on that link http://localhost:3000/login and start using all features.\n\n`
`
        If you have any questions, feel free to contact our support team.\n\n`

       ` Best Regards,\n\n`
      `  Farm IT Team,\n\n`
      };
      console.log(mailDetails);
      sendEmail(mailDetails);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getDocuments(req, res) {
    try {
      const documents = await Document.find();
      res.json(documents);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async verifyDocument(req, res) {
    try {
      const document = await Document.findByIdAndUpdate(
        req.params.id,
        { isVerified: true },
        { new: true }
      );

      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }


      const user = await User.findByIdAndUpdate(document.owner, { isVerified: true });

      await sendEmail(
        user.email,
        "Farm IT - Document Verified",
        `<p><strong>Dear ${user.firstName}${user.lastName},</strong></p>
         <p>Your document <strong>${document.title}</strong> has been successfully verified. 🎉</p>
         <p>You can now proceed with registering farms and requesting loans.</p>
         <p>Best Regards,<br>Farm IT Team</p>`
      );


     
      res.json(document);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getLoans(req, res) {
    try {
      const loans = await Loan.find()
        .populate("farm")
        .populate("investors.investor");
      res.json(loans);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getFarms(req, res) {
    try {
      const farms = await Farm.find().populate("farmer");
      res.json(farms);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getInvestments(req, res) {
    try {
      const loans = await Transaction.find({ farm: req.params.id })
        .populate("farm")
        .populate("investors.investor", "-password");

      if (!loans || loans.length === 0) {
        return res
          .status(404)
          .json({ message: "No loans found for this farm" });
      }

      const investmentsList = loans.map((loan) => {
        return {
          loanId: loan._id,
          farm: loan.farm.name,
          totalAmount: loan.amount,
          status: loan.status,
          investments: loan.investors.map((investment) => ({
            investorId: investment.investor._id,
            investorName: investment.investor.name,
            investorEmail: investment.investor.email,
            amountInvested: investment.amount,
          })),
        };
      });

      res.json(investmentsList);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getTransactions(req, res) {
    try {
      const { type } = req.query;
      const filter = type ? { transactionType: type } : {};

      const transactions = await Transaction.find(filter)
        .populate("loan", "amount interestRate")
        .populate("from", "firstName lastName")
        .populate("to", "firstName lastName")
        .sort("-createdAt");

      res.json(transactions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
}

export default AdminController;
