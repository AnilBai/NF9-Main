import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM || SMTP_USER;

// Recipients to notify when a new form is submitted.
// Can be overridden via env (comma-separated list).
const NOTIFY_RECIPIENTS = process.env.CONTACT_EMAIL_TO
  ? process.env.CONTACT_EMAIL_TO.split(",").map((s) => s.trim()).filter(Boolean)
  : ["anilbai897@gmail.com", "nf9officials@gmail.com", "support@nf9.in"];

router.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body || {};

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return res.status(500).json({ success: false, error: "SMTP credentials not configured" });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const formatMessageText = () =>
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`;

  const formatMessageHtml = () =>
    `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone}</p>
           <p><strong>Message:</strong></p>
           <p>${message.replace(/\n/g, "<br />")}</p>`;

  const notifyMailOptions = {
    from: CONTACT_EMAIL_FROM,
    to: NOTIFY_RECIPIENTS,
    subject: `New contact form submission from ${name}`,
    text: formatMessageText(),
    html: formatMessageHtml(),
  };

  const ackMailOptions = {
    from: CONTACT_EMAIL_FROM,
    to: email,
    subject: "We received your message — NF9",
    text: `Hi ${name},\n\nThanks for reaching out! We've received your message and will get back to you shortly.\n\nYour message:\n${message}\n\n— NF9 Team`,
    html: `<p>Hi ${name},</p>
           <p>Thanks for reaching out! We've received your message and will get back to you shortly.</p>
           <hr />
           <p><strong>Your message:</strong></p>
           <p>${message.replace(/\n/g, "<br />")}</p>
           <hr />
           <p>— NF9 Team</p>`,
  };

  try {
    await Promise.all([transporter.sendMail(notifyMailOptions), transporter.sendMail(ackMailOptions)]);
    return res.json({ success: true });
  } catch (err) {
    console.error("Error sending email", err);
    return res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

export default router;
