import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { checkDuplicateUser, deleteFile } from "@/utils/server";
import { revalidatePath } from "next/cache";
import { validateAndNormalizeOtherLinks } from "@/lib/validators";

export async function GET() {
  try {
    await dbConnect();
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
    await dbConnect();
    const session = await getServerSession(options);
    const id = session?.user?._id;

    const reqBody = await req.json();
    const {
      email,
      phone,
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

    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : email;
    const normalizedPhone =
      phone === "" || phone == null ? phone : Number(phone);
    const normalizedUsername =
      typeof username === "string" ? username.trim().toLowerCase() : username;
    const normalizedGitHub =
      typeof gitHub === "string" ? gitHub.trim() : gitHub;
    const normalizedLinkedIn =
      typeof linkedIn === "string" ? linkedIn.trim() : linkedIn;
    const normalizedBio = typeof bio === "string" ? bio.trim() : bio;
    let normalizedOtherLinks;
    if (otherLinks !== undefined) {
      try {
        normalizedOtherLinks = validateAndNormalizeOtherLinks(otherLinks);
      } catch (error) {
        return NextResponse.json(
          { message: error.message, type: "error", success: false },
          { status: 400 }
        );
      }
    }

    if (
      normalizedEmail &&
      normalizedEmail !== user.email &&
      (await checkDuplicateUser("email", normalizedEmail, user._id))
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
      normalizedPhone != null &&
      normalizedPhone !== "" &&
      normalizedPhone !== user.phone &&
      (await checkDuplicateUser("phone", normalizedPhone, user._id))
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
      normalizedGitHub &&
      normalizedGitHub !== user.gitHub &&
      (await checkDuplicateUser("gitHub", normalizedGitHub, user._id))
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
      normalizedLinkedIn &&
      normalizedLinkedIn !== user.linkedIn &&
      (await checkDuplicateUser("linkedIn", normalizedLinkedIn, user._id))
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

    user.phone = normalizedPhone;
    user.email = normalizedEmail;
    user.gitHub = normalizedGitHub;
    user.linkedIn = normalizedLinkedIn;
    user.bio = normalizedBio;
    if (normalizedOtherLinks) user.otherLinks = normalizedOtherLinks;

    if (normalizedUsername !== user.username) {
      const duplicateUsername = await User.findOne({
        username: normalizedUsername,
        _id: { $ne: user._id },
      }).select(["username"]);
      if (duplicateUsername)
        return NextResponse.json(
          {
            message: "Username is already taken",
            type: "error",
            success: false,
          },
          { status: 409 }
        );
      user.username = normalizedUsername;
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
      {
        status:
          error.name === "ValidationError" || error.name === "CastError"
            ? 400
            : error.code === 11000
              ? 409
              : 500,
      }
    );
  }
}
export async function PATCH(req) {
  let pendingProfilePic = "";
  let profilePicSaved = false;
  try {
    await dbConnect();
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

    if (typeof profilePic !== "string" || !profilePic.trim()) {
      throw new Error("Profile photo URL is required.");
    }
    pendingProfilePic = profilePic;

    const user = await User.findById(id).select(["profilePic", "username"]);

    if (!user) {
      try {
        await deleteFile(pendingProfilePic);
      } catch (cleanupError) {
        console.error("Unattached profile photo cleanup failed:", cleanupError);
      }
      pendingProfilePic = "";
      return NextResponse.json(
        { message: "You don't have an account", type: "error", success: false },
        { status: 404 }
      );
    }

    const previousProfilePic = user.profilePic;
    if (profilePic === previousProfilePic) {
      pendingProfilePic = "";
      return NextResponse.json(
        { profile: user, message: "Profile photo is unchanged.", type: "success", success: true },
        { status: 200 },
      );
    }

    user.profilePic = profilePic;
    const newProfile = await user.save();
    profilePicSaved = true;
    pendingProfilePic = "";
    revalidatePath("/teams");
    revalidatePath(`/user/${user.username}`);

    let cleanupWarning = "";
    if (previousProfilePic) {
      try {
        if (!await deleteFile(previousProfilePic)) {
          cleanupWarning = " The previous photo is not an UploadThing file and could not be removed automatically.";
        }
      } catch (cleanupError) {
        console.error("Previous profile photo cleanup failed:", cleanupError);
        cleanupWarning = " The new photo is saved, but the previous photo could not be removed.";
      }
    }

    return NextResponse.json(
      {
        profile: newProfile,
        message: `Profile photo updated successfully.${cleanupWarning}`,
        type: cleanupWarning ? "warning" : "success",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    if (pendingProfilePic && !profilePicSaved) {
      try {
        await deleteFile(pendingProfilePic);
      } catch (cleanupError) {
        console.error("Unattached profile photo cleanup failed:", cleanupError);
      }
    }
    return NextResponse.json(
      { message: error.message, type: "error", success: false },
      { status: 500 }
    );
  }
}
