"use server";

const { contactEmail } = require("@/utils/emailTemplates");
import nodemailer from "nodemailer";

export const sendMail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport(
      {
        host: "smtpout.secureserver.net",
        secure: true,
        secureConnection: false, // TLS requires secureConnection to be false
        tls: {
          ciphers: "SSLv3",
        },
        requireTLS: true,
        port: 465,
        debug: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      { from: "ZERO ONE" }
    );

    // Email content
    const mailOptions = {
      from: `ZERO ONE <${process.env.EMAIL}>`, // sender address
      to: to, // list of receivers
      bcc: [],
      cc: [],
      subject: subject,
      html: html,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return {
      message: "Email sent successfully",
      type: "success",
      success: true,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const sendInfoMail = async (mail) => {
  try {
    const { subject, heading, body, recieversMail, link, buttonLabel } = mail;

    const message = body
      .split("")
      .map((m) => {
        if (m === `\n`) return `<br/>`;
        else return m;
      })
      .join("");

    const html = contactEmail(heading, buttonLabel, link, message);

    await sendMail(recieversMail, subject, html);

    return {
      message: "emails sent Successfully.",
      type: "success",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { message: error.message, type: "error", success: false };
  }
};
