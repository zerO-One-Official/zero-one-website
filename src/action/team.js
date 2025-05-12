"use server";

import connect from "@/utils/dbConnect";
import { convertIdsToString } from "@/utils/helper";
import { cache } from "react";

import { revalidatePath } from "next/cache";
import Team from "@/models/Team";
import User from "@/models/User";

export const getTeams = cache(async () => {
  try {
    await connect();

    const teams = await Team.find({})
      .populate({
        path: "user",
        model: User,
        select: "firstName lastName profilePic username designation",
      })
      .sort({ createdAt: -1 })
      .lean();

    return {
      teams: convertIdsToString(teams),
      type: "success",
      success: true,
    };
  } catch (error) {
    return { message: error.message, type: "error", success: false };
  }
});

export const addTeamMember = async (data) => {
  try {
    await connect();

    const { userId, designation, group } = data;
    const teamMember = await Team.findOne({ user: userId });
    if (teamMember) {
      return {
        type: "error",
        message: "Team member already exists",
        success: false,
      };
    }
    await Team.create({
      user: userId,
      designation,
      group,
    });
    revalidatePath("/misc/teams");
    return {
      type: "success",
      message: "Team member added successfully",
      success: true,
    };
  } catch (error) {
    return { message: error.message, type: "error", success: false };
  }
};
