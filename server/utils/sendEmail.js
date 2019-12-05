import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export default async function sendMail(link, receiverMail){
  const msg = {
    to: receiverMail,
    from: "idealab@namy.com",
    subject: "Verify Your Account",
    text: "You have to click this link in 15 minutes, else it becomes invalid",
    html: `
      <h4 style='color: green; text-align: center'>Verify your Account</h4>
      <p>Click on the link below to verify your account</p>
      <a>${link}</a>
    `
  }
  await sgMail.send(msg);
}
