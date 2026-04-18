/**
 * Mail API — same JSON contract as legacy send-mail.php (POST JSON → { success, message }).
 * Configure SMTP via project root .env (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, …).
 */
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
/** cPanel / PaaS often set PORT; override with MAIL_SERVER_PORT if needed */
const PORT = Number(process.env.PORT || process.env.MAIL_SERVER_PORT || 3001);

app.use(cors({ origin: true }));
app.use(express.json({ limit: '128kb' }));

app.post('/api/send-mail', async (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid JSON input' });
    }

    const name = data.name ?? 'Not specified';
    const email = data.email ?? 'Not specified';
    const subject = data._subject ?? data.subject ?? 'New Message from Website';
    const messageContent = data.message ?? '';

    const to = process.env.TO_EMAIL || 'info@apexongroup.net';
    const fromEmail = process.env.FROM_EMAIL || 'info@apexongroup.net';
    const fromName = process.env.FROM_NAME || 'Apexon Group Web';

    const fullMessage =
      `New message from: ${name} (${email})\n\n` +
      `Message details:\n----------------\n${messageContent}`;

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER || '';
    const pass = process.env.SMTP_PASS || '';

    if (!user || !pass) {
      return res.status(500).json({
        success: false,
        message: 'Mail not configured: set SMTP_USER and SMTP_PASS in .env',
        hint: 'See .env.example in project root.',
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user, pass },
    });

    const replyTo = typeof data._replyto === 'string' && data._replyto.trim() ? data._replyto.trim() : email;

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      replyTo,
      subject,
      text: fullMessage,
    });

    return res.json({ success: true, message: 'Mail sent successfully' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send mail.';
    console.error('[send-mail]', err);
    return res.status(500).json({
      success: false,
      message,
      hint:
        process.env.NODE_ENV !== 'production' && err instanceof Error
          ? err.stack
          : 'Check SMTP settings and provider limits.',
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[mail-api] listening ${PORT} → /api/send-mail`);
});
