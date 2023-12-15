
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'
import User from "@/models/Users";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

dbConnect()

export async function GET(req) {

    try {
        const session = await getServerSession(options);
        const id = session?.user?._id;

        if (!session || !id)
            return NextResponse.json(
                { message: "UnAuthorised Access", type: "error", success: true },
                { status: 401 }
            )
        const user = await User.findById(id).select(['-role', '-updated_at', '-created_at', '-token']);

        if (!user)
            return NextResponse.json(
                { message: "Profile not Found", type: "error", success: true },
                { status: 404 }
            )


        return NextResponse.json(
            { user, type: "error", success: true },
            { status: 401 }
        )

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
        const { email, phone, profilePic } = reqBody;

        console.log(reqBody);
        return NextResponse.json(
            { message: "Profile not Found", type: "error", success: true },
            { status: 404 }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )

    }
}