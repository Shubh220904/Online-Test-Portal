const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Set up SMTP Transport
const transporter = nodemailer.createTransport({
  service: "gmail", // or any other email service (e.g., Outlook, Yahoo)
  auth: {
    user: "shubham220904@gmail.com", // Replace with your email
    pass: "Shubham04#", // Replace with your app password
  },
});

app.post("/send-email", async (req, res) => {
  const { email, name } = req.body;

  try {
    await transporter.sendMail({
      from: "Shubham220904@gmail.com",
      to: email,
      subject: "Payment Confirmation",
      text: `Hi ${name},\n\nThank you for your payment! You can now start the quiz.\n\nBest Regards,\nShubham's QUIZ`,
    });
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
