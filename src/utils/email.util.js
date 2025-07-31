import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../config/logger.config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendVerificationEmail = async (to, token) => {
  const verificationLink = `${process.env.BASE_URL}/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Mirach Community" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Verifikasi Alamat Email Anda',
    html: `
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="UTF-8" />
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 30px auto;
              background: #fff;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
              border-radius: 10px;
              overflow: hidden;
            }
            .header {
              padding: 30px 20px;
              text-align: center;
            }
            .header img {
              width: 180px;
              margin-bottom: 10px;
            }
            .content {
              padding: 0 30px 30px 30px;
              text-align: left;
            }
            h2 {
              margin-top: 0;
              color: #4a00e0;
            }
            .btn {
              display: inline-block;
              margin-top: 20px;
              padding: 12px 25px;
              background: linear-gradient(45deg, #4a00e0, #8e2de2);
              color: #fff;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
              transition: background 0.3s ease;
            }
            .btn:hover {
              background: linear-gradient(45deg, #8e2de2, #4a00e0);
            }
            .footer {
              background: url('https://www.transparenttextures.com/patterns/asfalt-light.png'), linear-gradient(90deg, #8e2de2, #4a00e0);
              color: #fff;
              text-align: center;
              padding: 20px;
              font-size: 14px;
            }
            .icon {
              width: 20px;
              vertical-align: middle;
              margin-right: 6px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="cid:logo" alt="Mirach Community Logo" />
            </div>
            <div class="content">
              <p>
                Terima kasih telah mendaftar di <strong>Mirach Community</strong>.<br />
                Silakan klik tautan di bawah ini untuk memverifikasi alamat email Anda:
              </p>
              <a href="${verificationLink}" class="btn">
                Verifikasi Email
              </a>
              <p style="margin-top: 30px; font-size: 14px; color: #777">
                Jika Anda tidak merasa mendaftar, abaikan email ini.
              </p>
            </div>
            <div class="footer">
              &copy; ${new Date().getFullYear()} Mirach Community. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `,
    attachments: [
      {
        filename: 'logo_plain.png',
        path: path.join(__dirname, '../../public/logo_plain.png'),
        cid: 'logo'
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email verifikasi berhasil dikirim ke ${to}`);
  } catch (error) {
    logger.error('Gagal mengirim email verifikasi:', error);
    throw new Error('Gagal mengirim email verifikasi.');
  }
};
