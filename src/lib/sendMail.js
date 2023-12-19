import nodemailer from 'nodemailer';

export const sendMail = async (to, subject, html) => {
    try {

        //GoDaddy SMTP
        var transporter = nodemailer.createTransport({
            service: 'Godaddy',
            host: "smtpout.secureserver.net",
            secureConnection: true,
            port: 465,

            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
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
        return info.messageId;

    } catch (error) {
        throw new Error(error)
    }
};
