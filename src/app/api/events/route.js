import { NextResponse } from "next/server";
import connect from "@/lib/dbConnect"
import Contest from "@/models/Contests";

connect();

export const GET = async () => {
    try {

        const contests = await Contest.find({}).select(['name', 'date', 'duration']);
        return NextResponse.json(
            { events: contests, type: "success", success: true },
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


export const POST = async (req) => {
    try {
        const reqBody = await req.json();
        const { name, date, link, questions, difficulty, duration, venue, participants = [], type = "contest" } = reqBody;

        if (type === 'contest') {
            // Check if a contest with the same name already exists
            const alreadyExist = await Contest.findOne({ name });

            if (alreadyExist) {
                return NextResponse.json(
                    { message: 'Contest with the same name is already organized.', type: "error", success: false },
                    { status: 409 }
                );
            }


            // If all checks pass, create the contest
            const newContest = await Contest.create({ name, date, link, questions, difficulty, duration, venue, participants });

            return NextResponse.json(
                { contest: newContest, type: "success", success: true },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { message: 'Please specify event type.', type: "error", success: false },
            { status: 400 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        );
    }
};


