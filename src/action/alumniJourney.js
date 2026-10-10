"use server";

import { createHash } from "node:crypto";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import AlumniJourney from "@/models/AlumniJourney";
import Company from "@/models/Company";
import Institute from "@/models/Institute";
import User from "@/models/User";
import { normalizeDesignations } from "@/lib/designations";
import { convertIdsToString } from "@/utils/helper";
import connect from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";
import { getUserBatch } from "@/lib/userBatch";

function normalizeJourney(input) {
  if (!input || !Array.isArray(input.timeline) || input.timeline.length > 30) {
    throw new Error("Provide at most 30 valid timeline entries.");
  }
  const timeline = input.timeline.map((step) => {
    const year = Number(step.year);
    if (!Number.isInteger(year) || year < 1950 || year > 2100) throw new Error("Each timeline entry needs a valid year.");
    const month = Number(step.month);
    if (!Number.isInteger(month) || month < 1 || month > 12) throw new Error("Each timeline entry needs a valid month.");
    if (Boolean(step.company) === Boolean(step.institute)) throw new Error("Each timeline entry must have exactly one company or institute.");
    if (step.company && !mongoose.isObjectIdOrHexString(step.company)) throw new Error("Invalid company selection.");
    if (step.institute && !mongoose.isObjectIdOrHexString(step.institute)) throw new Error("Invalid institute selection.");
    const gateScore = step.gateScore === "" || step.gateScore == null ? undefined : Number(step.gateScore);
    if (gateScore !== undefined && (!Number.isFinite(gateScore) || gateScore < 0 || gateScore > 1000)) {
      throw new Error("GATE score must be between 0 and 1000.");
    }
    const roleOrProgram = typeof step.roleOrProgram === "string" ? step.roleOrProgram.trim() : "";
    if (roleOrProgram.length > 120) throw new Error("Role or program must be 120 characters or fewer.");
    const details = step.details ?? "";
    if (typeof details !== "string" || details.length > 6000) throw new Error("Milestone notes must be text with at most 6000 characters.");
    return {
      month,
      year,
      ...(step.company ? { company: step.company } : {}),
      ...(step.institute ? { institute: step.institute } : {}),
      roleOrProgram,
      ...(gateScore !== undefined ? { gateScore } : {}),
      details: details.trim(),
    };
  });
  const markdown = {};
  for (const [key, maxLength] of [["journey", 20000], ["insights", 12000], ["advice", 12000]]) {
    const value = input[key] ?? "";
    if (typeof value !== "string" || value.length > maxLength) throw new Error(`${key} must be text with at most ${maxLength} characters.`);
    markdown[key] = value.trim();
  }
  return { timeline, ...markdown };
}

async function findAlumni(username) {
  const user = await User.findOne({ username }).select("_id username firstName lastName designation profilePic").lean();
  if (!user || !normalizeDesignations(user.designation).includes("ALUMNI")) {
    throw new Error("Alumni profile not found.");
  }
  return user;
}

function hashInviteToken(token) {
  if (typeof token !== "string" || !/^[a-f0-9]{64}$/i.test(token)) return null;
  return createHash("sha256").update(token).digest("hex");
}

export async function getAlumniJourney(username) {
  await connect();
  const session = await getServerSession(options);
  const user = await findAlumni(username);
  const ownProfile = session?.user?.username === username;
  const canEdit = ownProfile;
  const [journey, directories] = await Promise.all([
    AlumniJourney.findOne({ user: user._id })
      .populate("timeline.company", "name logo image url")
      .populate("timeline.institute", "name type logo image")
      .lean(),
    canEdit ? Promise.all([
      Company.find({}).select("name logo image url").collation({ locale: "en", strength: 2 }).sort({ name: 1 }).lean(),
      Institute.find({}).select("name type logo image").collation({ locale: "en", strength: 2 }).sort({ name: 1 }).lean(),
    ]) : Promise.resolve([[], []]),
  ]);
  return {
    user: convertIdsToString(user),
    journey: convertIdsToString(journey || { timeline: [], journey: "", insights: "", advice: "" }),
    companies: convertIdsToString(directories[0]),
    institutes: convertIdsToString(directories[1]),
    canEdit,
  };
}

export async function getAlumniJourneyByInvite(token) {
  const inviteTokenHash = hashInviteToken(token);
  if (!inviteTokenHash) return null;
  await connect();
  const journey = await AlumniJourney.findOne({
    inviteTokenHash,
    inviteTokenExpiresAt: { $gt: new Date() },
  })
    .select("+inviteTokenHash +inviteTokenExpiresAt")
    .populate("user", "_id username firstName lastName profilePic designation")
    .populate("timeline.company", "name logo image url")
    .populate("timeline.institute", "name type logo image")
    .lean();
  const user = journey?.user;
  if (!user || !normalizeDesignations(user.designation).includes("ALUMNI")) return null;
  const [companies, institutes] = await Promise.all([
    Company.find({}).select("name logo image url").collation({ locale: "en", strength: 2 }).sort({ name: 1 }).lean(),
    Institute.find({}).select("name type logo image").collation({ locale: "en", strength: 2 }).sort({ name: 1 }).lean(),
  ]);
  const journeyData = { ...journey };
  delete journeyData.inviteTokenHash;
  delete journeyData.inviteTokenExpiresAt;
  return {
    user: convertIdsToString(user),
    journey: convertIdsToString(journeyData),
    companies: convertIdsToString(companies),
    institutes: convertIdsToString(institutes),
  };
}

export async function getPublicAlumniDirectory() {
  await connect();
  const users = await User.find({ designation: "ALUMNI", showOnWebsite: true })
    .select("_id username firstName lastName profilePic branch roll lateralEntry")
    .sort({ roll: 1, firstName: 1, lastName: 1 })
    .lean();
  if (!users.length) return [];

  const journeys = await AlumniJourney.find({ user: { $in: users.map((user) => user._id) } })
    .populate("timeline.company", "name logo image")
    .populate("timeline.institute", "name type logo image")
    .select("user timeline")
    .lean();
  const serializedUsers = convertIdsToString(users);
  const serializedJourneys = convertIdsToString(journeys);
  const journeysByUser = new Map(journeys.map((journey, index) => [
    String(journey.user),
    serializedJourneys[index]?.timeline || [],
  ]));

  return serializedUsers.map((user) => ({
    ...user,
    batch: getUserBatch(user),
    timeline: journeysByUser.get(user._id) || [],
  }));
}

export async function saveAlumniJourney(username, input) {
  try {
    await connect();
    const session = await getServerSession(options);
    if (!session?.user?.username) throw new Error("Please sign in to manage an alumni journey.");
    if (session.user.username !== username) throw new Error("You can only edit your own alumni journey.");
    const user = await findAlumni(username);
    const value = normalizeJourney(input);
    const companyIds = [...new Set(value.timeline.filter((step) => step.company).map((step) => String(step.company)))];
    const instituteIds = [...new Set(value.timeline.filter((step) => step.institute).map((step) => String(step.institute)))];
    if (companyIds.length && await Company.countDocuments({ _id: { $in: companyIds } }) !== companyIds.length) {
      throw new Error("A selected company no longer exists.");
    }

    if (instituteIds.length && await Institute.countDocuments({ _id: { $in: instituteIds } }) !== instituteIds.length) {
      throw new Error("A selected institute no longer exists.");
    }
    await AlumniJourney.findOneAndUpdate(
      { user: user._id },
      { $set: { user: user._id, ...value } },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
    );
    revalidatePath(`/user/${username}`);
    revalidatePath(`/user/${username}/journey`);
    revalidatePath(`/alumni/${username}`);
    revalidatePath("/alumni");
    return { success: true, type: "success", message: "Alumni journey saved." };
  } catch (error) {
    console.error("Alumni journey save failed:", error);
    return { success: false, type: "error", message: error.message };
  }
}

export async function saveAlumniJourneyByInvite(token, input) {
  try {
    const inviteTokenHash = hashInviteToken(token);
    if (!inviteTokenHash) throw new Error("This alumni invitation link is invalid or expired.");
    await connect();
    const invite = await AlumniJourney.findOne({
      inviteTokenHash,
      inviteTokenExpiresAt: { $gt: new Date() },
    }).select("+inviteTokenHash +inviteTokenExpiresAt user").lean();
    if (!invite) throw new Error("This alumni invitation link is invalid or expired.");
    const user = await User.findById(invite.user)
      .select("_id username designation")
      .lean();
    if (!user || !normalizeDesignations(user.designation).includes("ALUMNI")) {
      throw new Error("Alumni profile not found.");
    }
    const value = normalizeJourney(input);
    const companyIds = [...new Set(value.timeline.filter((step) => step.company).map((step) => String(step.company)))];
    const instituteIds = [...new Set(value.timeline.filter((step) => step.institute).map((step) => String(step.institute)))];
    if (companyIds.length && await Company.countDocuments({ _id: { $in: companyIds } }) !== companyIds.length) {
      throw new Error("A selected company no longer exists.");
    }
    if (instituteIds.length && await Institute.countDocuments({ _id: { $in: instituteIds } }) !== instituteIds.length) {
      throw new Error("A selected institute no longer exists.");
    }
    const saved = await AlumniJourney.findOneAndUpdate(
      { _id: invite._id, inviteTokenHash, inviteTokenExpiresAt: { $gt: new Date() } },
      { $set: { user: user._id, ...value } },
      { new: true, runValidators: true }
    );
    if (!saved) throw new Error("This alumni invitation link is invalid or expired.");
    const visibilityResult = await User.updateOne(
      { _id: user._id },
      { $set: { showOnWebsite: true } },
      { runValidators: true }
    );
    if (!visibilityResult.matchedCount) {
      throw new Error("Journey saved, but the alumni profile could not be published. Please contact an administrator.");
    }
    revalidatePath(`/user/${user.username}`);
    revalidatePath(`/user/${user.username}/journey`);
    revalidatePath(`/alumni/${user.username}`);
    revalidatePath("/alumni");
    return { success: true, type: "success", message: "Alumni journey saved." };
  } catch (error) {
    console.error("Alumni journey invitation save failed:", error);
    return { success: false, type: "error", message: error.message };
  }
}
