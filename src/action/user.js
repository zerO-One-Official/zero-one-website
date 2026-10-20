"use server";

import Contest from "@/models/Contest";
import ContestAttempt from "@/models/ContestAttempt";
import User from "@/models/User";
import connect from "@/utils/dbConnect";
import { convertIdsToString, generateAccessCode } from "@/utils/helper";
import { deleteFile, uploadFile } from "@/utils/server";
import { cache } from "react";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { joiningEmail, resetEmail } from "@/utils/emailTemplates";
import { sendMail } from "./mail";
import { validateAndNormalizeOtherLinks, validateSignup } from "@/lib/validators";
import bcrypt from "bcryptjs";

export const getUsers = cache(async () => {
  try {
    await connect();

    const users = await User.find({}).sort({ firstName: 1, batch: 1 }).lean();
    return convertIdsToString(users);
  } catch (error) {
    console.log(error);
    return [];
  }
});

export const getUser = cache(async (username) => {
  try {
    await connect();

    const user = await User.findOne({ username }).lean();
    return convertIdsToString(user);
  } catch (error) {
    console.log("Error fetching user:", error);
    console.log(error);
    return null;
  }
});

export const getUserContests = cache(async (userId) => {
  try {
    await connect();

    const contests = await Contest.find({
      participants: { $elemMatch: { user: userId } },
    })
      .select(
        "name slug description status startDate lastRegistrationDate durationMinutes"
      )
      .sort({ startDate: 1 })
      .lean();
    const attempts = await ContestAttempt.find({
      user: userId,
      contest: { $in: contests.map((contest) => contest._id) },
    })
      .select("contest status")
      .lean();
    const attemptsByContest = new Map(
      attempts.map((attempt) => [String(attempt.contest), attempt])
    );
    return contests.map((contest) => {
      const attempt = attemptsByContest.get(String(contest._id));

      return {
        ...convertIdsToString(contest),
        attempt: attempt
          ? {
              status: attempt.status,
            }
          : null,
      };
    });
  } catch (error) {
    console.log("Error fetching user contests:", error);
    return [];
  }
});

export const updateProfilePic = async ({ profilePic }) => {
  let pendingProfilePic = "";
  let profilePicSaved = false;
  try {
    await connect();

    const session = await getServerSession(options);
    const userId = session?.user?._id;
    if (!userId) throw new Error("You are not allowed to update this profile photo.");
    if (typeof profilePic !== "string" || !profilePic.trim()) throw new Error("Profile photo URL is required.");
    pendingProfilePic = profilePic;
    const user = await User.findById(userId).select("profilePic username");
    if (!user) throw new Error("User not found.");
    const previousProfilePic = user.profilePic;
    if (profilePic === previousProfilePic) {
      pendingProfilePic = "";
      return { type: "success", message: "Profile picture is unchanged.", success: true };
    }
    user.profilePic = profilePic;
    await user.save();
    profilePicSaved = true;
    pendingProfilePic = "";
    revalidatePath(`/user/${user.username}`);
    revalidatePath("/teams");
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

    return {
      type: cleanupWarning ? "warning" : "success",
      message: `Profile picture updated successfully.${cleanupWarning}`,
      success: true,
    };
  } catch (error) {
    if (pendingProfilePic && !profilePicSaved) {
      try {
        await deleteFile(pendingProfilePic);
      } catch (cleanupError) {
        console.error("Unattached profile photo cleanup failed:", cleanupError);
      }
    }
    return {
      type: "error",
      message: error.message,
      success: false,
    };
  }
};

export const updateUser = async (user) => {
  try {
    await connect();

    const { email, phone, gitHub, linkedIn, username, bio, otherLinks } = user;
    const existingUser = await User.findOne({ username }).select("username");

    if (!existingUser) {
      return {
        message: "You don't have an account",
        type: "error",
        success: false,
      };
    }
    await User.updateOne(
      { username: existingUser.username },
      {
        $set: {
          email,
          phone,
          gitHub,
          linkedIn,
          bio,
          otherLinks,
        },
      }
    );
    return {
      type: "success",
      message: "Profile Updated successfully",
      success: true,
    };
  } catch (error) {
    return {
      type: "error",
      message: error.message,
      success: false,
    };
  }
};

export const updatePassword = async (user) => {
  try {
    await connect();

    const { oldPass, newPass, username } = user;
    const existingUser = await User.findOne({ username }).select(
      "username password"
    );
    if (!existingUser) {
      return {
        message: "You don't have an account",
        type: "error",
        success: false,
      };
    }
    const passwordMatched = await bcrypt.compare(
      oldPass,
      existingUser.password
    );
    if (!passwordMatched) {
      return {
        message: "Incorrect Password",
        type: "error",
        success: false,
      };
    }
    existingUser.password = newPass;
    await existingUser.save();
    return {
      type: "success",
      message: "Password Updated Successfully",
      success: true,
    };
  } catch (error) {
    return {
      type: "error",
      message: error.message,
      success: false,
    };
  }
};

export async function sendPasswordResetLink(emailOrRoll) {
  try {
    await connect();

    // Check if User Exists
    let user = null;

    if (isNaN(parseInt(emailOrRoll))) {
      user = await User.findOne({ email: emailOrRoll });
    } else {
      user = await User.findOne({ roll: emailOrRoll });
    }

    if (!user) {
      return {
        message: "You are not registered",
        type: "error",
        success: false,
      };
    }

    // Generate the Code
    const token = generateAccessCode();
    user.token = token;
    await user.save();

    // Send the Email
    const subject = "Password Reset Link";
    const html = resetEmail(token);
    const messageId = await sendMail(user.email, subject, html);

    if (messageId) {
      return {
        message: "Reset Link has been sent.",
        type: "success",
        success: true,
      };
    } else {
      return {
        message: "Failed to send Reset Link. Please try again",
        type: "error",
        success: false,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: error.message,
      type: "error",
      success: false,
    };
  }
}

export async function resetPassword(token, password) {
  try {
    await connect();

    const user = await User.findOne({ token });

    if (!user) {
      return {
        message: "Invalid Token",
        type: "error",
        success: false,
      };
    }

    user.password = password;
    user.token = "";
    await user.save();

    return {
      message: "Password Updated. Please Login",
      type: "success",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: error.message,
      type: "error",
      success: false,
    };
  }
}

export async function signup(form) {
  try {
    await connect();

    //  Data Extraction and Validation
    const {
      username,
      firstName,
      lastName,
      roll,
      registrationNumber,
      email,
      phone,
      branch,
      designations,
      role,
      gender,
      profilePic,
      otherLinks = [],
    } = form;

    validateSignup(form);
    const normalizedOtherLinks = validateAndNormalizeOtherLinks(otherLinks);

    // 3. Check for Existing User
    const existingUser = await User.findOne({
      $or: [{ roll }, { email }, { phone }],
    });

    if (existingUser) {
      return {
        message: "User with this roll, email or phone already exists",
        type: "error",
        success: false,
      };
    }
    let picUrl = "";
    if (profilePic !== "" && profilePic instanceof File) {
      const fileUrl = await uploadFile(profilePic);
      if (!fileUrl) {
        return {
          message: "Failed to upload profile picture",
          type: "error",
          success: false,
        };
      }
      picUrl = fileUrl;
    }

    const token = generateAccessCode();
    const hasedPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD, 12);

    await User.create({
      username,
      firstName: firstName.trim().toLowerCase(),
      lastName: lastName?.trim().toLowerCase(),
      roll,
      registrationNumber,
      email,
      branch,
      gender,
      phone: Number(phone),
      profilePic: picUrl,
      password: hasedPassword,
      token,
      role,
      designations,
      otherLinks: normalizedOtherLinks,
    });

    // 5. Send Welcome Email
    const subject = "Welcome to Zero One Coding Club!";
    const html = joiningEmail(token);
    const emailSent = await sendMail(email, subject, html);

    if (!emailSent) {
      console.warn("Failed to send welcome email to:", email);
    }

    return {
      message: emailSent
        ? "Member created successfully. Welcome email sent."
        : "Failed to send welcome email. Please Contact to Club Lead",
      type: emailSent ? "success" : "error",
      success: true,
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      message: error.message,
      type: "error",
      success: false,
    };
  }
}
