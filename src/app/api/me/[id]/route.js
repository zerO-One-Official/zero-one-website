import User from "@/models/Users";
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'

dbConnect()

export async function GET(req, params) {
    try {

        const _id = params.id;

        // ============= Check if User Exist =============

        const user = await User.findOne({ _id });

        if (!user) {
            return NextResponse.json(
                { message: "Unautorised", type: "error", success: false },
                { status: 401 }
            )
        }
        else {
            return NextResponse.json(
                { message: "Authorised successfully", type: "success", success: true, user },
                { status: 500 }
            )
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )
    }
}