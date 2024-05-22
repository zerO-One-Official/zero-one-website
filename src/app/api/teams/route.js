import { NextResponse } from "next/server";
import Team from "@/models/Teams";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users";

dbConnect()

export const GET = async () => {
    try {

        const teams = await Team.find({}).populate({
            path: "user",
            model: User,
        });
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
