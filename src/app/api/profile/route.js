import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { checkDuplicateUser, deleteFile } from "@/utils/server";
import { revalidatePath } from "next/cache";

dbConnect();

export async function GET() {
  try {
    const session = await getServerSession(options);
    const id = session?.user?._id;

    if (!session || !id)
      return NextResponse.json(
        { message: "UnAuthorised Access", type: "error", success: true },
        { status: 401 }
      );
    const user = await User.findById(id).select([
      "-role",
      "-updated_at",
      "-created_at",
      "-token",
    ]);

    if (!user)
      return NextResponse.json(
        { message: "Profile not Found", type: "error", success: true },
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

export async function PUT(req) {
  try {
    const session = await getServerSession(options);
    const id = session?.user?._id;

    const reqBody = await req.json();
    const {
      email,
      phone,
      profilePic,
      username,
      gitHub,
      linkedIn,
      bio,
      otherLinks,
    } = reqBody;

    if (!session || !id) {
      return NextResponse.json(
        {
          message: "You are not allowed for this action",
          type: "error",
          success: false,
        },
        { status: 401 }
      );
    }

    const user = await User.findById(id).select([
      "-role",
      "-updated_at",
      "-created_at",
      "-token",
    ]);

    if (!user) {
      return NextResponse.json(
        { message: "You don't have an account", type: "error", success: false },
        { status: 404 }
      );
    }

    if (profilePic && profilePic !== user.profilePic) {
      deleteFile(user.profilePic);
      user.profilePic = profilePic;
    }

    if (
      email &&
      email !== user.email &&
      (await checkDuplicateUser("email", email))
    ) {
      return NextResponse.json(
        {
          message: "Email used in another account!",
          type: "error",
          success: false,
        },
        { status: 409 }
      );
    }
    if (
      phone &&
      phone !== user.phone &&
      (await checkDuplicateUser("phone", phone))
    ) {
      return NextResponse.json(
        {
          message: "Phone no. is used in another account!",
          type: "error",
          success: false,
        },
        { status: 409 }
      );
    }
    if (
      gitHub &&
      gitHub !== user.gitHub &&
      (await checkDuplicateUser("gitHub", gitHub))
    ) {
      return NextResponse.json(
        {
          message: "GitHub Link is used in another account!",
          type: "error",
          success: false,
        },
        { status: 409 }
      );
    }
    if (
      linkedIn &&
      linkedIn !== user.linkedIn &&
      (await checkDuplicateUser("linkedIn", linkedIn))
    ) {
      return NextResponse.json(
        {
          message: "LinkedIn Link is used in another account!",
          type: "error",
          success: false,
        },
        { status: 409 }
      );
    }

    user.phone = phone;
    user.email = email;
    user.gitHub = gitHub;
    user.linkedIn = linkedIn;
    user.bio = bio;
    user.otherLinks = otherLinks;

    if (username !== user.username) {
      const duplicateUsername = await User.findOne({ username }).select([
        "username",
      ]);
      if (duplicateUsername)
        return NextResponse.json(
          {
            message: "Username is already taken",
            type: "error",
            success: false,
          },
          { status: 409 }
        );
      user.username = username;
    }

    const newProfile = await user.save();

    return NextResponse.json(
      {
        profile: newProfile,
        message: "Profile Updated Successfully",
        type: "success",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message, type: "error", success: false },
      { status: 500 }
    );
  }
}
export async function PATCH(req) {
  try {
    const session = await getServerSession(options);
    const id = session?.user?._id;

    const reqBody = await req.json();
    const { profilePic } = reqBody;

    if (!session || !id) {
      return NextResponse.json(
        {
          message: "You are not allowed for this action",
          type: "error",
          success: false,
        },
        { status: 401 }
      );
    }

    const user = await User.findById(id).select(["profilePic"]);

    if (!user) {
      return NextResponse.json(
        { message: "You don't have an account", type: "error", success: false },
        { status: 404 }
      );
    }

    if (profilePic && profilePic !== user.profilePic) {
      deleteFile(user.profilePic);
      user.profilePic = profilePic;
    }

    const newProfile = await user.save();
    revalidatePath("/teams");

    return NextResponse.json(
      {
        profile: newProfile,
        message: "Profile Updated Successfully",
        type: "success",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message, type: "error", success: false },
      { status: 500 }
    );
  }
}
