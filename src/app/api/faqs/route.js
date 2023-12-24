import { NextResponse } from "next/server";
import connect from "@/lib/dbConnect"
import Faq from "@/models/Faqs";

connect();

export const GET = async () => {
    try {

        const faqs = await Faq.find({});
        return NextResponse.json(
            { faqs, type: "success", success: true },
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
