"use server";

import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Teams";
import User from "@/models/Users";

dbConnect();

export const getTeams = async () => {
  try {
    const teams = await Team.find({})
      .populate({
        path: "user",
        model: User,
      })
      .lean();
    return teams;
  } catch (error) {
    console.log(error);
    return [];
  }
};
