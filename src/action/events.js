"use server";

import { cache } from "react";
import { getContests } from "./contest";
import { convertIdsToString } from "@/utils/helper";

export const getEvents = cache(async () => {
  try {
    const { contests } = await getContests();
    const events = [
      ...contests.map((contest) => ({
        ...contest,
        type: "contest",
      })),
    ];

    return {
      events: convertIdsToString(events),
      message: "Contest fetched successfully",
      type: "success",
      success: true,
    };
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return { message: error.message, type: "error", success: false };
  }
});
