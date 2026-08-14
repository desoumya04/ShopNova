import nodemailer from 'nodemailer'

class EmailService {
  // Use port 587 with TLS (STARTTLS) instead of 465 (SSL).
  // Render free tier blocks outbound IPv6, and Gmail port 465 resolves to IPv6.
  // Port 587 uses IPv4 and works reliably on Render.
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // false for port 587 (STARTTLS), true only for 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // avoid self-signed cert issues on some hosts
    },
  });

  async sendEmail(to: string, subject: string, text: string) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
      };
      // Use pure async/await — do NOT mix with a callback, it causes double invocation
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      // Log the error but DO NOT re-throw — a failed email should not crash the server
      console.error('Error sending email:', error);
    }
  }
}

export const EmailServiceInstance = new EmailService();
