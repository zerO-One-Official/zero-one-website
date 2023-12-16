
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'
import User from "@/models/Users";
import { generateAccessCode } from "@/utils/helper";
import { resetEmail } from "@/lib/emailTemplates";
import { sendMail } from "@/lib/sendMail";

dbConnect()

export async function POST(req) {

    try {

        const reqBody = await req.json();
        const { emailOrRoll } = reqBody;

        const subject = 'Password Reset Link';
        let html;

        // ============= Check if User Exist =============
        let user = null;

        if (isNaN(parseInt(emailOrRoll))) {
            user = await User.findOne({ email: emailOrRoll })
        }
        else {
            user = await User.findOne({ roll: emailOrRoll })
        }

        if (!user) {
            return NextResponse.json(
                { message: "You are not registered", type: "error", success: false },
                { status: 404 }
            )
        }
        // ============= Check if User Exist =============



        // ============= Generate the Code =============
        const token = generateAccessCode();
        // ============= Generate the Code =============

        user.token = token;
        await user.save();

        const to = user.email;


        // ============= Sending the Mail =============
        html = resetEmail(token, process.env.NEXTAUTH_URL);
        const messageId = await sendMail(to, subject, html);
        // ============= Sending the Mail =============

        if (messageId) {
            return NextResponse.json(
                { message: "Reset Link has been sent.", type: "success", success: false },
                { status: 200 }
            )
        }
        else {
            return NextResponse.json(
                { message: "Failed to send Reset Link. please try again", type: "error", success: true },
                { status: 500 }
            )
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )
    }
}


export async function PUT(req) {
    try {
        const reqBody = await req.json();

        console.log(reqBody);
        const { token, password } = reqBody;

        const user = await User.findOne({ token });

        if (!user)
            return NextResponse.json(
                { message: 'Invalid Token', type: "error", success: false },
                { status: 403 }
            )

        user.password = password;
        user.token = '';

        await user.save();

        return NextResponse.json(
            { message: 'Password Updated. Please Login', type: "success", success: false },
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