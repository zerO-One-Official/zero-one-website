import { emailTemplate } from "@/lib/emailTemplate";
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
export async function POST(req, { host }) {

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

        if (alreadyExist) {
            return NextResponse.json(
                { message: "Code is already generated for this roll no.", type: "info", success: false, code: alreadyExist.code },
                { status: 409 }
            )
        }

        let code = generateAccessCode();
        let duplicateCode = await Code.find({ code })

        while (duplicateCode) {
            code = generateAccessCode();
            duplicateCode = await Code.findOne({ code });
        }

        await Code.create({ roll, code });

        const joiningLink = `${process.env.NEXTAUTH_URL}/signup/${code}`;

        const to = email;
        const subject = 'Congratulations! You have been selected to join the Zero One Coding Club.';
        const html = emailTemplate(joiningLink);

        const messageId = await sendMail(to, subject, html);

        return NextResponse.json(
            { message: "Code has been sent successfully messageId:" + messageId, code, type: "success", success: true },
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
