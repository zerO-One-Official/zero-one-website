"use server";

import dbConnect from "@/lib/dbConnect";
import Contest from "@/models/Contests";
import Question from "@/models/Questions";
import User from "@/models/Users";

dbConnect();

export const getEvents = async () => {
  try {
    const contests = await Contest.find({})
      .select(["name", "date", "duration"])
      .lean();
    return contests;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getEvent = async (eventName) => {
  try {
    const contest = await Contest.findOne({ name: eventName })
      .populate({
        path: "questions",
        model: Question,
      })
      .populate({
        path: "participants.user",
        model: User, // Assuming 'User' is the model name for your users
      })
      .lean();
    return contest;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserEvents = async (userId) => {
  try {
    // const contest = await Contest.find({});
    // const events = contest.filter(event => {
    //     return event.participants.some(participant => {
    //         return participant.user.toString() === userId.toString()
    //     })
    // })
    // return events;
    const contest = await Contest.find({ "participants.user": userId }).lean();
    return contest
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((event) => {
        return {
          name: event.name,
          date: event.date,
          rank: event.participants.find(
            (participant) => participant.user.toString() === userId.toString()
          ).rank,
        };
      });
  } catch (error) {
    console.log(error);
    return [];
  }
};
