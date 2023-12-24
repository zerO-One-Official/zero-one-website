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
        const { name, date, link, questions, difficulty, duration, participants = [], type = "contest" } = reqBody;

        if (type === 'contest') {
            // Check if a contest with the same name already exists
            const alreadyExist = await Contest.findOne({ name });

            if (alreadyExist) {
                return NextResponse.json(
                    { message: 'Contest with the same name is already organized.', type: "error", success: false },
                    { status: 409 }
                );
            }

            // Manually check uniqueness within the questions array
            const questionNames = new Set();
            for (const question of questions) {
                if (questionNames.has(question.name)) {
                    return NextResponse.json(
                        { message: 'Question with same name already exists.', type: "error", success: false },
                        { status: 400 }
                    );
                }
                questionNames.add(question.name);

                // Manually check uniqueness within the testCases array for each question
                const testCaseInputs = new Set();
                for (const testCase of question.testCases) {
                    if (testCaseInputs.has(testCase.input)) {
                        return NextResponse.json(
                            { message: 'One or More test case is repeating.', type: "error", success: false },
                            { status: 400 }
                        );
                    }
                    testCaseInputs.add(testCase.input);
                }
            }

            // If all checks pass, create the contest
            const newContest = await Contest.create({ name, date, link, questions, difficulty, duration, participants });

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


