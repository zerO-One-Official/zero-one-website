import { sendMail } from "@/lib/sendMail";
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'
import { resetEmail } from "@/lib/emailTemplates";

dbConnect();

export async function POST() {

    try {

        const subject = 'Password Reset Link';
        const html = 'asdasd';
        const to = 'rahulrajking68@gmail.com';

        const messageId = await sendMail(to, subject, html);

        return NextResponse.json(
            { message: messageId, type: "suiceess", success: false },
            { status: 200 }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )
    }


}