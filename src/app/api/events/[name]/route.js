import { NextResponse } from "next/server";
import connect from "@/lib/dbConnect"
import Contest from "@/models/Contests";

connect();

export const GET = async (req, { params }) => {
    try {

        const { name } = params;

        const contest = await Contest.findOne({ name }).populate('participants.user');
        return NextResponse.json(
            { event: contest, type: "success", success: true },
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

