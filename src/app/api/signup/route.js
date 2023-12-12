
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'
import User from "@/models/Users";
import Code from "@/models/Code";

dbConnect()

export async function POST(req) {


    try {

        const reqBody = await req.json();
        const { firstName, branch, gender, roll, code, lastName, email, phone, password } = reqBody;

        const isAllowed = await Code.findOne({ $and: [{ roll }, { code }] });
        console.log(roll, code);

        if (!isAllowed) {
            return NextResponse.json(
                { message: "You don't have a valid joining code.", type: "error", success: false },
                { status: 403 }
            )
        }


        // ============= Check if User Exist =============
        const user = await User.findOne({ '$or': [{ email }, { roll }, { phone }] });

        if (user) {
            await Code.deleteOne({ code });
            return NextResponse.json(
                { message: "You are already registered please Login", type: "info", success: false },
                { status: 409 }
            )
        }
        // ============= Check if User Exist =============



        // ============= Inserting the User =============
        User
            .create({ firstName, lastName, roll, email, branch, gender, phone, password })
            .then(async () => {
                await Code.deleteOne({ code });
            })

        // ============= Inserting the User =============

        return NextResponse.json(
            { message: "Registered Succesfully, Please Login", type: "success", success: true },
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