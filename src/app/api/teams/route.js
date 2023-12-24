import { NextResponse } from "next/server";
import connect from "@/lib/dbConnect"
import Team from "@/models/Teams";

connect();

export const GET = async () => {
    try {

        const teams = await Team.find({});
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

export const POST = async (req) => {
    try {
        const reqBody = await req.json();

        const { roll, firstName, lastName, profilePic, position, email, gitHub, linkedIn, otherLinks } = reqBody;

        const alreadyExist = await Team.findOne({ roll });

        if (alreadyExist) {
            return NextResponse.json(
                { message: 'This Team member is already added', type: "error", success: false },
                { status: 409 }
            )
        }

        const newTeamMember = await Team.create({ roll, firstName, lastName, profilePic, position, email, gitHub, linkedIn, otherLinks })

        return NextResponse.json(
            { team: newTeamMember, type: "success", success: true },
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

export const PUT = async (req) => {
    try {
        const reqBody = await req.json();

        const { roll, firstName, lastName, profilePic, position, email, gitHub, linkedIn, otherLinks } = reqBody;

        if (!roll) {
            return NextResponse.json(
                { message: `Please provide Roll no.`, type: "error", success: false },
                { status: 400 }
            )
        }

        const user = await Team.findOne({ roll });

        if (!user) {
            return NextResponse.json(
                { message: `Roll no. ${roll} Doesn't Exist`, type: "error", success: false },
                { status: 404 }
            )
        }

        const updatedMember = await Team.updateOne({ $set: { roll, firstName, lastName, profilePic, position, email, gitHub, linkedIn, otherLinks } })

        return NextResponse.json(
            { team: updatedMember, type: "success", success: true },
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