
import { NextResponse } from "next/server";
import User from "@/models/Users";
import connect from "@/lib/dbConnect";

connect();


export async function PUT(req) {
    try {
        const reqBody = await req.json();

        const { token, password } = reqBody;

        const user = await User.findOne({ token });
        let message = '';

        if (!user)
            return NextResponse.json(
                { message: 'Invalid Token', type: "error", success: false },
                { status: 403 }
            )

        user.password = password;
        user.token = '';

        message = 'Account Activated. Please Login'
        user.active = true;

        await user.save();

        return NextResponse.json(
            { message, type: "success", success: true },
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