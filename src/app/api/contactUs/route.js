import connect from "@/lib/dbConnect";
import { contactEmail } from "@/lib/emailTemplates";
import { sendMail } from "@/lib/sendMail";
import Contact from "@/models/Contact";
import { NextResponse } from 'next/server'

export const POST = async (req) => {
    try {
        connect();
        const reqBody = await req.json();
        const { name, email, roll, message } = reqBody;

        let formattedMessage = message.replace(/(?:\r\n|\r|\n)/g, '<br>');

        const html = contactEmail({ name, email, roll, message: formattedMessage });

        await sendMail(process.env.EMAIL, `${name} ${roll}`, html);
        await Contact.create({ name, email, roll, message: formattedMessage });


        return NextResponse.json(
            { message: "Form submitted. One of Club Lead will contact you shortly.", type: "success", success: true },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        );
    }

}