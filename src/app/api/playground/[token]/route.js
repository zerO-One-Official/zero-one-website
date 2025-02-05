import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    // const { token } = reqBody;

    console.log(req);

    // const URL = 'https://judge0-ce.p.rapidapi.com'
    const URL = "http://13.203.158.214:2358";

    const res = await fetch(
      `${URL}/submissions/${""}?base64_encoded=true&fields`
    );

    const data = await res.json();

    return NextResponse.json(
      {
        token: data,
        message: "",
        success: true,
        type: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
        success: false,
        type: "error",
      },
      { status: 500 }
    );
  }
};
