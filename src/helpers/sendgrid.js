import sgMail from '@sendgrid/mail';
import { config } from 'dotenv';

config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendgrid = async (to, subject, text, html) => {
  try {
    const sendMail = await sgMail.send({
      from: '"Pickle Jumga" <danielchidiebele@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    return sendMail;
  } catch (err) {
    return false;
  }
};

export default sendgrid;
