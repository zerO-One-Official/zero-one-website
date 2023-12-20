import nodemailer from 'nodemailer';

export const sendMail = async (to, subject, html) => {
    try {

        const transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",
            secure: true,
            secureConnection: false, // TLS requires secureConnection to be false
            tls: {
                ciphers: 'SSLv3'
            },
            requireTLS: true,
            port: 465,
            debug: true,
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
        console.log(error);
        throw new Error(error)
    }
};
