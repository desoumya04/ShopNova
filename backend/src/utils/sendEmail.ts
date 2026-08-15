import { Resend } from 'resend';

class EmailService {
  private resend: Resend | null = null;

  private getClient(): Resend {
    if (!this.resend) {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        throw new Error('RESEND_API_KEY is not set in environment variables');
      }
      this.resend = new Resend(apiKey);
    }
    return this.resend;
  }

  async sendEmail(to: string, subject: string, text: string) {
    try {
      const client = this.getClient();
      const { data, error } = await client.emails.send({
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
