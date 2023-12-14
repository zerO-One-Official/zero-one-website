import { JoiningEmailTemplate } from "@/lib/emailTemplates";
import { sendMail } from "@/lib/sendMail";
import Code from "@/models/Code";
import { NextResponse } from "next/server";

function generateAccessCode() {
    // Define the character set for alphanumeric code
    const charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // Initialize an empty string to store the generated code
    let code = "";

    // Generate 8 random characters from the character set
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        code += charset.charAt(randomIndex);
    }

    return code;
}
export async function POST(req) {

    try {
        const reqBody = await req.json();


        const { roll, role, email } = reqBody;

        if (!roll || !role || !email)
            return NextResponse.json(
                { message: "Please fill all details", type: "error", success: false },
                { status: 400 }
            )

        if (role !== 'admin') {
            return NextResponse.json(
                { message: "Unauthorized Access", type: "error", success: false },
                { status: 401 }
            )
        }

        const alreadyExist = await Code.findOne({ roll });

        const to = email;
        const subject = 'Congratulations! You have been selected to join the Zero One Coding Club.';
        let joiningLink;
        let html;

        if (alreadyExist) {

            joiningLink = `${process.env.NEXTAUTH_URL}/signup/${alreadyExist.code}`;
            html = JoiningEmailTemplate(joiningLink);
            const messageId = await sendMail(to, subject, html);


            if (messageId) {
                return NextResponse.json(
                    { message: "Joining mail has been sent successfully", code: alreadyExist.code, type: "success", success: true },
                    { status: 200 }
                )
            }
            else {
                return NextResponse.json(
                    { message: "Failed to send mail. please try again", type: "error", success: true },
                    { status: 500 }
                )
            }
        }

        let code = generateAccessCode();
        let duplicateCode = await Code.find({ code })

        while (duplicateCode) {
            code = generateAccessCode();
            duplicateCode = await Code.findOne({ code });
        }

        await Code.create({ roll, code });

        joiningLink = `${process.env.NEXTAUTH_URL}/signup/${code}`;
        html = JoiningEmailTemplate(joiningLink);

        const messageId = await sendMail(to, subject, html);


        if (messageId) {
            return NextResponse.json(
                { message: "Joining mail has been sent successfully", code, type: "success", success: true },
                { status: 200 }
            )
        }
        else {
            return NextResponse.json(
                { message: "Failed to send mail", type: "error", success: true },
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
