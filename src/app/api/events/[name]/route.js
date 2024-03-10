import { NextResponse } from "next/server";
import connect from "@/lib/dbConnect"
import Contest from "@/models/Contests";
import Question from "@/models/Questions";
import User from "@/models/Users";

connect();

export const GET = async (req, { params }) => {
    try {

        const { name } = params;

        const contest = await Contest.findOne({ name }).populate({
            path: 'questions',
            model: Question
        })
            .populate({
                path: 'participants.user',
                model: User, // Assuming 'User' is the model name for your users
            });
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

