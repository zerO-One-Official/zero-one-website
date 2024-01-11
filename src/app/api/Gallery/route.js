import connect from "@/lib/dbConnect";
import Gallery from "@/models/Gallery";
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        connect();

        const gallery = await Gallery.find({});

        return NextResponse.json(
            { gallery, type: "success", success: true },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        );
    }

}