import { NextResponse } from "next/server";
import connect from "@/lib/dbConnect"
import Team from "@/models/Teams";

connect();

export const GET = async () => {
    try {

        const teams = await Team.find({}).populate('user');
        return NextResponse.json(
            { teams, type: "success", success: true },
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
