import Code from "@/models/Code";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

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
    const session = await getServerSession(options);

    if (!session || session.role !== 'admin') {

        return NextResponse.json(
            { message: "Unauthorized Access", type: "error", success: false },
            { status: 401 }
        )
    }

    try {
        const reqBody = await req.json();

        const { roll } = reqBody;

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


        return NextResponse.json(
            { message: "Code generated successfully", code, type: "success", success: true },
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
