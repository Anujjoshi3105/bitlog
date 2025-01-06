"use server";
import nodemailer from "nodemailer";
import emailTemplates from "./emailTemplates.json";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

type MailType =
  | "welcome"
  | "verify"
  | "thanks"
  | "forgot"
  | "subscribe"
  | "contact";

export async function userMail(type: MailType, email: string, link?: string) {
  if (!email) {
    throw new Error("Email address is required.");
  }

  const template = emailTemplates[type];
  if (!template) {
    throw new Error(`Invalid email type: ${type}`);
  }

  const body = template.body.replace(/{{link}}/g, link || "");

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: template.subject,
    html: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}: ${type}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
    throw new Error(`Could not send email: ${error}`);
  }
}

export async function adminMail(
  email?: string,
  name?: string,
  message?: string
) {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER,
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Contact Email sent by ${email}`);
  } catch (error) {
    console.error(`Error sending contact email to ${email}:`, error);
    throw new Error(`Could not send contact email: ${error}`);
  }
}
