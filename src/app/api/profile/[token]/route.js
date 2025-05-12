import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

dbConnect();

export async function GET(req, { params }) {
  try {
    const { token } = params;
    const user = await User.findOne({ token }).select("firstName");

    if (!user)
      return NextResponse.json(
        { message: "Invalid Token or Expired", type: "error", success: false },
        { status: 404 }
      );

    return NextResponse.json(
      { user, type: "success", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message, type: "error", success: false },
      { status: 500 }
    );
  }
}
