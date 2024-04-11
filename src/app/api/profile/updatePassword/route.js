
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'
import User from "@/models/Users";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";

dbConnect();

export async function PUT(req) {
    try {
        const session = await getServerSession(options);
        const id = session?.user?._id;

        const reqBody = await req.json();
        const { oldPass, newPass } = reqBody;

        if (!session || !id) {
            return NextResponse.json(
                { message: "You are not allowed for this action", type: "error", success: true },
                { status: 401 }
            )
        }

        const user = await User.findById(id).select(['password']);

        if (!user) {
            return NextResponse.json(
                { message: "You don't have an account", type: "error", success: true },
                { status: 404 }
            )
        }

        const passwordMatched = await bcrypt.compare(oldPass, user.password);

        if (!passwordMatched) {
            return NextResponse.json(
                { message: "Incorrect Password", type: "error", success: true },
                { status: 400 }
            )
        }
        user.password = newPass;

        await user.save();


        return NextResponse.json(
            { message: "Password Updated Successfully", type: "success", success: true },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )

    }
}