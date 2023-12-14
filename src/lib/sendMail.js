import nodemailer from 'nodemailer';

export const sendMail = async (to, subject, html) => {
    try {
        // Create a transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // your Gmail email address
                pass: process.env.APP_PASSWORD // your Gmail password or an App Password if using 2-step verification
            }
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL, // sender address
            to: to, // list of receivers
            subject: subject,
            html: html
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
        return info.messageId;

    } catch (error) {
        console.error(error);
        return null;
    }
};
