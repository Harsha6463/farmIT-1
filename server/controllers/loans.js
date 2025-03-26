import Loan from "../models/Loan.js";
import Farm from "../models/Farm.js";
import Transaction from "../models/Transaction.js";
// import { emailTemplates, sendEmail } from "../services/emailService.js";

class LoanController {
  async getMyLoans(req, res) {
    try {
      const userFarms = await Farm.find({ farmer: req.user.userId }).select('_id');
      const farmIds = userFarms.map(farm => farm._id);
      const loans = await Loan.find({ farm: { $in: farmIds } })
        .populate('investors.investor')
        .populate('farm');
      res.json(loans);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }

  async getMyInvestments(req, res) {
    try {
      const loans = await Loan.find({ "investors.investor": req.user.userId })
        .populate("farm")
        .populate("investors.investor");
      res.json(loans);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getAvailableLoans(req, res) {
    try {
      const loans = await Loan.find({ status: "pending" })
        .populate("farm")
        .populate("investors.investor");
      res.json({ loans, investorId: req.user.userId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async createLoan(req, res) {
    try {
      const { farmId, amount, interestRate, duration } = req.body;
  
      const farm = await Farm.findOne({ _id: farmId, farmer: req.user.userId });
      if (!farm) {
        return res.status(404).json({ message: "Farm not found" });
      }
  
      const loan = new Loan({
        farm: farmId,
        amount,
        interestRate,
        duration,
        repaymentSchedule: this.generateRepaymentSchedule(amount, interestRate, duration),
      });
  
      const requestLoandata = emailTemplates.loanRequestNotification(farm.name, amount);
      const emailSendData = {
        to: req.user.email,
        subject: requestLoandata.subject,
        html: requestLoandata.html,
      };
  console.log(requestLoandata)
      sendEmail(emailSendData);
      console.log("Loan request email sent");
  
      await loan.save();
      res.json(loan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
  
  async investInLoan(req, res) {
    try {
      const { amount, fromUserId } = req.body;
      const loan = await Loan.findById(req.params.id);
      if (!loan) return res.status(404).json({ message: "Loan not found" });
      if (loan.status !== "pending") return res.status(400).json({ message: "Loan is not available for investment" });
  
      const totalInvested = loan.investors.reduce((sum, inv) => sum + inv.amount, 0) + amount;
      if (totalInvested > loan.amount) return res.status(400).json({ message: "Investment exceeds loan amount" });
  
      loan.investors.push({ investor: fromUserId, amount });
      if (totalInvested === loan.amount) loan.status = "pending";
  
      const farm = await Farm.findById(loan.farm); 
      const requestLoandata = emailTemplates.investmentConfirmation(farm.name, amount);
  
      const emailSendData = {
        to: req.user.email,
        subject: requestLoandata.subject,
        html: requestLoandata.html,
      };
  
      console.log(requestLoandata);
      sendEmail(emailSendData);
      console.log("Investment confirmed");
  
      await loan.save();
      res.json({ message: "Investment successful", loan });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
  

  async repayLoan(req, res) {
    try {
      const { amount, toUserId } = req.body;
      const fromUserId = req.user.userId;
      const loan = await Loan.findById(req.params.id).populate("farm");

      if (!loan) {
        return res.status(404).json({ message: "Loan not found" });
      }

      const transaction = new Transaction({
        type: "repayment",
        amount: amount,
        loan: loan._id,
        from: fromUserId,
        to: toUserId,
      });
      await transaction.save();

      const unpaidPayment = loan.repaymentSchedule.find(p => p.status === "pending");
      if (!unpaidPayment) {
        return res.status(400).json({ message: "No pending payments found" });
      }

      if (amount !== unpaidPayment.amount) {
        return res.status(400).json({ message: "Payment amount must match the scheduled amount" });
      }

      unpaidPayment.status = "paid";

      const allPaid = loan.repaymentSchedule.every(p => p.status === "paid");
      if (allPaid) {
        loan.status = "completed";
      }

      await loan.save();
      res.json({ message: "Repayment successful and transaction recorded", loan, transaction });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getRepaymentSchedule(req, res) {
    try {
      const loan = await Loan.findById(req.params.id).populate("farm");

      if (!loan) {
        return res.status(404).json({ message: "Loan not found" });
      }

      const isAuthorized = loan.farm.farmer.toString() === req.user.userId || loan.investors.some(inv => inv.investor.toString() === req.user.userId);
      if (!isAuthorized) {
        return res.status(403).json({ message: "Not authorized" });
      }

      res.json(loan.repaymentSchedule);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  generateRepaymentSchedule(amount, interestRate, duration) {
    const monthlyInterest = interestRate / 12 / 100;
    const monthlyPayment = (amount * monthlyInterest * Math.pow(1 + monthlyInterest, duration)) / (Math.pow(1 + monthlyInterest, duration) - 1);

    const schedule = [];
    let remainingBalance = amount;

    for (let i = 1; i <= duration; i++) {
      const interest = remainingBalance * monthlyInterest;
      const principal = monthlyPayment - interest;
      remainingBalance -= principal;

      schedule.push({
        dueDate: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000),
        amount: monthlyPayment,
        status: "pending",
      });
    }

    return schedule;
  }

  async getPendingInvestments(req, res) {
    try {
      const loans = await Loan.find({ "status": ["pending", "verified"] })
        .populate({
          path: "investors.investor",
          select: "name email",
        })
        .populate("farm", "name location");

      res.status(200).json(loans);
    } catch (error) {
      console.error("Error fetching pending investments:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  async verifyInvestment(req, res) {
    try {
      const { loanId, investorId } = req.body;
      const loan = await Loan.findById(loanId);
      if (!loan) return res.status(404).json({ message: "Loan not found" });

      const investor = loan.investors.find(inv => inv.investor.toString() === investorId._id.toString());
      if (!investor) return res.status(404).json({ message: "Investor not found" });

      if (loan.status !== "pending") {
        return res.status(400).json({ message: "Investment already processed" });
      }

      loan.status = "verified";
      await loan.save();

      res.status(200).json({ message: "Investment verified successfully." });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  async creditInvestment(req, res) {
    try {
      const { loanId, investorId } = req.body;
      const loan = await Loan.findById(loanId).populate("farm");
      if (!loan) return res.status(404).json({ message: "Loan not found" });

      const investor = loan.investors.find(inv => inv.investor.toString() === investorId._id);
      if (!investor) return res.status(404).json({ message: "Investor not found" });

      if (loan.status !== "verified") {
        return res.status(400).json({ message: "Investment must be verified before crediting" });
      }

      investor.status = "debited";

      await Transaction.create({
        loan: loan._id,
        from: investor.investor,
        to: loan.farm.farmer,
        amount: investor.amount,
        type: "investment",
        date: new Date(),
      });

      loan.status = "credited"; 

      const generateRepaymentSchedule = async (amount, interestRate, duration) => {
        const monthlyInterest = interestRate / 12 / 100;
        const monthlyPayment = (amount * monthlyInterest * Math.pow(1 + monthlyInterest, duration)) /
          (Math.pow(1 + monthlyInterest, duration) - 1);

        const schedule = [];
        let remainingBalance = amount;

        for (let i = 1; i <= duration; i++) {
          const interest = remainingBalance * monthlyInterest;
          const principal = monthlyPayment - interest;
          remainingBalance -= principal;

          schedule.push({
            dueDate: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000),
            amount: monthlyPayment,
            status: "pending",
          });
        }
        return schedule;
      };

      const repaymentSchedule = await generateRepaymentSchedule(loan.amount, loan.interestRate, loan.duration);
      loan.repaymentSchedule = repaymentSchedule;
      const requestLoandata = emailTemplates.repaymentReminder( amount,dueDate);
  
      const emailSendData = {
        to: req.user.email,
        subject: requestLoandata.subject,
        html: requestLoandata.html,
      };
  
      console.log(requestLoandata);
      sendEmail(emailSendData);
      console.log("Repayment  Reminder");
      await loan.save();

      res.status(200).json({ message: "Investment credited successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
}

export default LoanController;
