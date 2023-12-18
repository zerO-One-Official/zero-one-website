
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

        if (!session || !id) {
            return NextResponse.json(
                { message: "Session Expired", type: "error", success: false },
                { status: 440 }
            );
        }

        const admin = await User.findById(id);

        if (!admin || admin.role !== 'admin') {
            return NextResponse.json(
                { message: "You are not allowed to perform this action", type: "error", success: false },
                { status: 403 }
            )
        }

        const users = await User.find({}).sort({ firstName: 1 });


        return NextResponse.json(
            { users, type: "success", success: true },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )
    }
}
