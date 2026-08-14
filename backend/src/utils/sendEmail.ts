import { Resend } from 'resend';

// Render free tier blocks ALL outbound SMTP (ports 465 & 587).
// Resend uses HTTPS API — no SMTP, no port blocking.
const resend = new Resend(process.env.RESEND_API_KEY);

class EmailService {
  async sendEmail(to: string, subject: string, text: string) {
    try {
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'ShopNova <onboarding@resend.dev>',
        to,
        subject,
        text,
      });

      if (error) {
        console.error('Error sending email:', error);
        return;
      }

      console.log('Email sent:', data?.id);
    } catch (error) {
      // Log the error but DO NOT re-throw — a failed email should not crash the server
      console.error('Error sending email:', error);
    }
  }
}

export const EmailServiceInstance = new EmailService();
