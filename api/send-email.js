import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { to, subject, text } = req.body;

    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({
        error: "Missing required fields: 'to', 'subject', and either 'html' or 'text'",
      });
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.SMTP_USER, // your Gmail address
        pass: process.env.SMTP_PASS, // Gmail App Password
      },
    });

    // Ensure "to" is an array or single string
    const recipients = Array.isArray(to) ? to : [to];

    // Send email
    const info = await transporter.sendMail({
      from: `"AI Summarizer" <${process.env.SMTP_USER}>`,
      to: recipients.join(", "),
      subject,
      text: text || undefined,
    });

    console.log("Email sent:", info.messageId);

    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error("Nodemailer error:", err);
    return res.status(500).json({ error: "Failed to send email", details: err.message });
  }
}
