import { NextResponse } from "next/server";
import connect from "@/lib/dbConnect"
import Resource from "@/models/Resouces";

connect();

export const GET = async () => {
    try {

        const resources = await Resource.find({});
        return NextResponse.json(
            { resources, type: "success", success: true },
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

        const { domain, image } = reqBody;

        const alreadyExist = await Resource.findOne({ domain });

        if (alreadyExist) {
            return NextResponse.json(
                { message: 'This Domain already Exist', type: "error", success: false },
                { status: 409 }
            )
        }

        const newResource = await Resource.create({ domain, image })

        return NextResponse.json(
            { resource: newResource, type: "success", success: true },
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