import { NextResponse } from "next/server";

const LANGUAGE_ID = {
  c: 50,
  cpp: 54,
  java: 62,
  python: 71,
  javascript: 63,
};

export const POST = async (req) => {
  try {
    const reqBody = await req.json();

    const { code, testCases, language } = reqBody;

    if (!code || !testCases || !language || !testCases.length) {
      return NextResponse.json(
        {
          message: "Invalid Request for code execution.",
          success: false,
          type: "error",
        },
        { status: 400 }
      );
    }

    const payload = testCases.map((testCase) => {
      const { input, output } = testCase;
      return {
        source_code: code,
        language_id: LANGUAGE_ID[language],
        stdin: input,
        expected_output: output,
      };
    });

    console.log(payload);

    // const URL = 'https://judge0-ce.p.rapidapi.com'
    const URL = "http://13.203.158.214:2358";

    const res = await fetch(
      `${URL}/submissions/batch?base64_encoded=false&wait=false`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "x-rapidapi-key": "fa0908be8dmsh0af843b3f6aac78p179e57jsnae94a194540a",
          // "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({ submissions: payload }),
      }
    );

    const data = await res.json();

    return NextResponse.json(
      {
        data,
        token: data.token,
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

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token)
      return NextResponse.json({
        message: "Invalid Submission token",
        success: false,
        type: "error",
      });

    const URI = "http://13.203.158.214:2358";

    const res = await fetch(
      `${URI}/submissions/${token}?base64_encoded=true&fields=*`
    );

    let data = await res.json();

    if (data?.error)
      return NextResponse.json(
        {
          message: data.error,
          success: false,
          type: "error",
        },
        { status: 400 }
      );

    return NextResponse.json(
      {
        data,
        message: "Code Compiled",
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
