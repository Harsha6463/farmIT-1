// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const mailTransporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_SENDER_USERNAME,
//     pass: process.env.EMAIL_SENDER_PASSWORD,
//   },
// });

// function sendEmail(mailDetails) {
//   mailDetails.from = process.env.EMAIL_SENDER_USERNAME;
  
//   mailTransporter.sendMail(mailDetails, (err, data) => {
//     if (err) {
  
//       console.error('Error while sending email:', err);
//     } else {
//       console.log('Email sent successfully:', data);
//     }
//   });
// }

// const emailTemplates = {
//   welcomeEmail: (firstName) => ({
//     subject: 'Welcome to Farm Investment Platform',
//     html: `
//       <h1>Welcome ${firstName}!</h1>
//       <p>Thank you for joining our platform. We're excited to have you on board.</p>
//     `,
//   }),

//   loanRequestNotification: (farmName, amount) => ({
//     subject: 'New Loan Request',
//     html: `
//       <h1>New Loan Request</h1>
//       <p>A new loan request has been created for ${farmName} with amount $${amount}.</p>
//     `,
//   }),

//   investmentConfirmation: (farmName, amount) => ({
//     subject: 'Investment Confirmation',
//     html: `
//       <h1>Investment Confirmed</h1>
//       <p>Your investment of $${amount} in ${farmName} has been confirmed.</p>
//     `,
//   }),

//   repaymentReminder: (amount, dueDate) => ({
//     subject: 'Loan Repayment Reminder',
//     html: `
//       <h1>Repayment Reminder</h1>
//       <p>Your loan payment of $${amount} is due on ${new Date(dueDate).toLocaleDateString()}.</p>
//     `,
//   }),
// };

// export { sendEmail, emailTemplates };




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
  
  return new Promise((resolve, reject) => {
    mailTransporter.sendMail(mailDetails, (err, data) => {
      if (err) {
        console.error('Error while sending email:', err);
        reject(err);
      } else {
        console.log('Email sent successfully:', data);
        resolve(data);
      }
    });
  });
}

const investmentConfirmation = (farmName, amount) => ({
  subject: 'Investment Confirmation',
  html: `
    <h1>Investment Confirmed</h1>
    <p>Your investment of $${amount} in ${farmName} has been confirmed.</p>
  `,
});

const sendInvestmentConfirmationToFarmer = (farmerEmail, farmName, amount) => {
  return sendEmail({
    to: farmerEmail,
    subject: 'Investment Successful',
    html: `<h1>Investment Successful</h1><p>You have received an investment of $${amount} in ${farmName}.</p>`,
  });
};

const sendInvestmentConfirmationToInvestor = (investorEmail, farmName, amount) => {
  return sendEmail(investmentConfirmation(farmName, amount));
};

export { sendInvestmentConfirmationToFarmer, sendInvestmentConfirmationToInvestor };
