
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'
import User from "@/models/Users";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { deleteFile } from "@/utils/server";

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
        const session = await getServerSession(options);
        const id = session?.user?._id;

        const reqBody = await req.json();
        const { email, phone, profilePic, username } = reqBody;

        if (!session || !id) {
            return NextResponse.json(
                { message: "You are not allowed for this action", type: "error", success: true },
                { status: 401 }
            )
        }

        const user = await User.findById(id).select(['-role', '-updated_at', '-created_at', '-token']);

        if (!user) {
            return NextResponse.json(
                { message: "You don't have an account", type: "error", success: true },
                { status: 404 }
            )
        }

        if (profilePic !== user.profilePic) {
            console.log('asdasd-->', user.profilePic);
            deleteFile(user.profilePic);
            user.profilePic = profilePic;
        }

        user.email = email;
        user.phone = phone;
        user.username = username;

        await user.save();


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