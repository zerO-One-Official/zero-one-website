
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'
import User from "@/models/Users";
import { isValidMongooseId } from "@/utils/server";

dbConnect()

export async function GET(req, { params }) {

    try {
        const { _id } = params;
        if (!_id || !isValidMongooseId(_id)) {
            return NextResponse.json(
                { message: "Invalid UserId", type: "error", success: true },
                { status: 400 }
            )
        }

        const user = await User.findById({ _id });

        if (!user)
            return NextResponse.json(
                { message: "User Not Found", type: "error", success: true },
                { status: 404 }
            )

        return NextResponse.json(
            { user, type: "success", success: true },
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


export async function PUT(req, { params }) {
    try {

        const { _id } = params;
        if (!_id || !isValidMongooseId(_id)) {
            return NextResponse.json(
                { message: "Invalid UserId", type: "error", success: false },
                { status: 400 }
            )
        }

        const user = await User.findById({ _id });

        if (!user)
            return NextResponse.json(
                { message: "User Not Found", type: "error", success: false },
                { status: 404 }
            )



        return NextResponse.json(
            { message: "Profile Updated Successfully", type: "success", success: true },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )

    }
}

