import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SENDER_USERNAME,
    pass: process.env.EMAIL_SENDER_PASSWORD,
  },
});

function sendEmail(mailDetails) {
  mailDetails.from = process.env.EMAIL_SENDER_USERNAME;
  mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log('Error Occurs');
    } else {
      console.log('Email sent successfully');
    }
  });
}

const emailTemplates = {
  welcomeEmail: (firstName,lastName) => ({
    subject: 'Welcome to Farm Investment Platform ' ,
    html: `
      Welcome ${firstName} ${lastName}!
      Thank you for joining our platform. We're excited to have you on board.
    `,
  }),

  loanRequestNotification: (farmName, amount) => ({
    subject: 'New Loan Request',
    html: `
      New Loan Request.
      A new loan request has been created for ${farmName} with amount Rs:${amount}.</p>
    `,
  }),

  investmentConfirmation: (farmName, amount) => ({
    subject: 'Investment Confirmation',
    html: `
      Investment Confirmed.
     Your investment of Rs:${amount} in ${farmName} has been confirmed.
    `,
  }),

  repaymentReminder: (amount, dueDate) => ({
    subject: 'Loan Repayment Reminder',
    html: `
      <h1>Repayment Reminder</h1>
      <p>Your loan payment of $${amount} is due on ${new Date(dueDate).toLocaleDateString()}.</p>
    `,
  }),
};

export { sendEmail, emailTemplates };
