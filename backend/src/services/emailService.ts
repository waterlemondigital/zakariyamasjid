import nodemailer from 'nodemailer';

interface ContactEmailPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryId?: string;
}

/**
 * Creates Nodemailer Transporter based on Environment Variables
 */
export const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    const isPort465 = port === 465;

    return nodemailer.createTransport({
      host,
      port,
      secure: isPort465, // true for 465, false for 587
      auth: {
        user,
        pass,
      },
      tls: {
        // Do not fail on invalid certificates or corporate proxies
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000, // 10s connection timeout
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }

  // If standard SMTP service name (e.g. gmail) is provided
  if (process.env.SMTP_SERVICE && user && pass) {
    return nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        user,
        pass,
      },
    });
  }

  return null;
};

/**
 * Tests SMTP credentials and returns status report
 */
export const testSmtpConnection = async (): Promise<{ success: boolean; message: string; details?: any }> => {
  const transporter = getTransporter();
  if (!transporter) {
    return {
      success: false,
      message: 'SMTP credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) are not configured in environment variables.',
    };
  }

  try {
    await transporter.verify();
    return {
      success: true,
      message: 'SMTP connection verified successfully with mail server!',
    };
  } catch (error: any) {
    return {
      success: false,
      message: `SMTP verification failed: ${error.message}`,
      details: {
        code: error.code,
        response: error.response,
        responseCode: error.responseCode,
        command: error.command,
      },
    };
  }
};

/**
 * Dispatches an HTML notification email to contact@zakariyamasjid.org
 */
export const sendContactNotificationEmail = async (
  payload: ContactEmailPayload
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  const recipientEmail = process.env.NOTIFICATION_EMAIL || 'contact@zakariyamasjid.org';
  const transporter = getTransporter();

  const formattedDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const cleanPhone = payload.phone.replace(/[^0-9+]/g, '');
  const whatsAppPhone = payload.phone.replace(/[^0-9]/g, '');

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Website Contact Inquiry</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF7F0; margin: 0; padding: 20px; color: #22261F; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 2px solid #D4AF37; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
      .header { background: #0F4C36; color: #ffffff; padding: 24px; text-align: center; border-bottom: 2px solid #D4AF37; }
      .header h1 { margin: 0; font-size: 20px; color: #F3E5AB; font-family: Georgia, serif; }
      .header p { margin: 6px 0 0 0; font-size: 12px; color: #ffffff; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px; }
      .body-content { padding: 24px; font-size: 14px; line-height: 1.6; }
      .badge { display: inline-block; background: #0F4C36; color: #F3E5AB; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; }
      .info-table { width: 100%; border-collapse: collapse; margin: 16px 0; }
      .info-table td { padding: 8px 12px; border-bottom: 1px solid #FAF7F0; }
      .info-table td.label { width: 30%; font-weight: bold; color: #0F4C36; background: #FAF7F0; font-size: 12px; text-transform: uppercase; }
      .info-table td.value { width: 70%; font-size: 13px; }
      .message-box { background: #FAF7F0; border-left: 4px solid #D4AF37; padding: 14px; border-radius: 8px; margin: 16px 0; font-size: 14px; color: #22261F; white-space: pre-wrap; }
      .actions { margin-top: 24px; text-align: center; }
      .btn { display: inline-block; padding: 10px 18px; margin: 4px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 12px; text-transform: uppercase; }
      .btn-primary { background: #0F4C36; color: #F3E5AB !important; border: 1px solid #D4AF37; }
      .btn-whatsapp { background: #25D366; color: #ffffff !important; }
      .footer { background: #FAF7F0; padding: 16px; text-align: center; font-size: 11px; color: #666; border-top: 1px solid #eee; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Zakariya Masjid &amp; Kabrastan Trust</h1>
        <p>New Public Website Inquiry Received</p>
      </div>

      <div class="body-content">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="badge">${payload.subject}</span>
          <span style="font-size: 11px; color: #888;">${formattedDate}</span>
        </div>

        <table class="info-table">
          <tr>
            <td class="label">Sender Name</td>
            <td class="value"><strong>${payload.name}</strong></td>
          </tr>
          <tr>
            <td class="label">Phone / WhatsApp</td>
            <td class="value"><a href="tel:${cleanPhone}" style="color: #0F4C36; font-weight: bold; text-decoration: none;">${payload.phone}</a></td>
          </tr>
          <tr>
            <td class="label">Email Address</td>
            <td class="value"><a href="mailto:${payload.email}" style="color: #0F4C36; text-decoration: underline;">${payload.email}</a></td>
          </tr>
          <tr>
            <td class="label">Subject</td>
            <td class="value"><strong>${payload.subject}</strong></td>
          </tr>
        </table>

        <div style="margin-top: 16px;">
          <strong style="color: #0F4C36; font-size: 12px; text-transform: uppercase;">Inquiry Message:</strong>
          <div class="message-box">${payload.message}</div>
        </div>

        <div class="actions">
          <a href="mailto:${payload.email}?subject=Re:%20${encodeURIComponent(payload.subject)}%20-%20Zakariya%20Masjid%20Trust" class="btn btn-primary">
            ✉️ Reply via Email
          </a>
          <a href="https://wa.me/${whatsAppPhone}" class="btn btn-whatsapp">
            💬 Open WhatsApp Chat
          </a>
        </div>
      </div>

      <div class="footer">
        Zakariya Masjid &amp; Kabrastan Trust • Mundhwa, Off Koregaon Park, Pune, Maharashtra<br/>
        This message was automatically forwarded from the website contact form.
      </div>
    </div>
  </body>
  </html>
  `;

  if (!transporter) {
    console.warn(`[EMAIL NOTICE] No SMTP transporter configured. Notification logged locally for ${recipientEmail}`);
    return {
      success: false,
      error: 'SMTP not configured in environment variables',
    };
  }

  try {
    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER || 'contact@zakariyamasjid.org';

    const info = await transporter.sendMail({
      from: `"Zakariya Masjid Website" <${fromAddress}>`,
      to: recipientEmail,
      replyTo: `${payload.name} <${payload.email}>`,
      subject: `[New Inquiry] ${payload.subject} - from ${payload.name}`,
      text: `New Inquiry from ${payload.name}\n\nPhone: ${payload.phone}\nEmail: ${payload.email}\nSubject: ${payload.subject}\nDate: ${formattedDate}\n\nMessage:\n${payload.message}`,
      html: htmlContent,
    });

    console.log(`✅ Notification email dispatched successfully: ${info.messageId} to ${recipientEmail}`);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: any) {
    console.error(`⚠️ Failed to send notification email: ${error.message}`);
    return {
      success: false,
      error: error.message,
    };
  }
};
