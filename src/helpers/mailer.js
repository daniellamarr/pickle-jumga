import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

const {
  TRANSPORT_HOST, TRANSPORT_PORT, TRANSPORT_USER, TRANSPORT_PASSWORD
} = process.env;

const mailer = async (to, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    host: TRANSPORT_HOST,
    port: TRANSPORT_PORT,
    secure: true,
    auth: {
      user: TRANSPORT_USER,
      pass: TRANSPORT_PASSWORD
    }
  });

  const info = await transporter.sendMail({
    from: '"Pickle Jumga" <daniel@warrenfinancials.com>',
    to,
    subject,
    text,
    html,
  });

  return info;
};

export default mailer;
