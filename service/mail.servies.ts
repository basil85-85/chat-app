import nodemailer, { type SentMessageInfo } from "nodemailer";

// ── Validate env vars at startup, not at send-time ──────────────────────────
const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"] as const;
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const SMTP_PORT = Number(process.env.SMTP_PORT);

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true only for 465, false for 587/25
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ── Verify SMTP connection once on startup ───────────────────────────────────
transporter.verify((error) => {
  if (error) {
    console.error("[mailer] SMTP connection failed:", error.message);
  } else {
    console.log("[mailer] SMTP server is ready");
  }
});

// ── Send helper with error handling and return value ────────────────────────
export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<SentMessageInfo> => {
  try {
    const info = await transporter.sendMail({
      from: `"Chat App" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`[mailer] Email sent to ${to} | messageId: ${info.messageId}`);
    return info;

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[mailer] Failed to send email to ${to}: ${message}`);
    throw new Error(`Email delivery failed: ${message}`);
  }
};