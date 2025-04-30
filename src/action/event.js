"use server";

import dbConnect from "@/lib/dbConnect";
import CodingContest from "@/models/CodingContests";
import CodingQuestion from "@/models/CodingQuestions";
import QuizContest from "@/models/QuizContests";
import QuizQuestion from "@/models/QuizQuestion";
import User from "@/models/Users";
import { convertIdsToString } from "@/utils/helper";

dbConnect();

export const getEvents = async () => {
  try {
    const contests = await CodingContest.find({})
      .select(["name", "date", "duration", "slug"])
      .lean();
    const quizContests = await QuizContest.find({})
      .select(["name", "contestDate", "duration", "slug"])
      .lean();

    return [
      ...contests.map((contest) => ({
        ...contest,
        _id: contest._id.toString(),
        type: "contest",
      })),
      ...quizContests.map((quiz) => ({
        ...quiz,
        _id: quiz._id.toString(),
        date: quiz.contestDate,
        type: "quiz",
      })),
    ];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getEvent = async (slug) => {
  try {
    const contest = await CodingContest.findOne({ slug })
      .populate({
        path: "questions",
        model: CodingQuestion,
      })
      .populate({
        path: "participants.user",
        model: User,
        select: "firstName lastName username email roll profilePic",
      })
      .lean();

    if (contest) {
      return convertIdsToString({ ...contest, type: "contest" });
    }

    const quizContest = await QuizContest.findOne({ slug })
      .populate({
        path: "quizSections.questions.question",
        model: QuizQuestion,
      })
      .populate({
        path: "participants.user",
        model: User,
        select: "firstName lastName username email roll profilePic",
      })
      .lean();

    if (quizContest) {
      return {
        ...quizContest,
        date: quizContest.contestDate,
        type: "quiz",
        _id: quizContest._id.toString(),
        participants: quizContest?.participants?.map((participant) => ({
          ...participant,
          user: {
            ...participant.user,
            _id: participant.user._id.toString(),
          },
        })),

        questions: [
          ...quizContest?.quizSections?.map((sec) =>
            sec?.questions?.map((q) => ({
              ...q.question,
              options: q.question?.options?.map((option) => ({
                ...option,
                _id: option?._id?.toString(),
              })),
              _id: q.question?._id?.toString(),
            }))
          ),
        ].flat(),
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserEvents = async (userId) => {
  try {
    // const contest = await CodingContest.find({});
    // const events = contest.filter(event => {
    //     return event.participants.some(participant => {
    //         return participant.user.toString() === userId.toString()
    //     })
    // })
    // return events;
    const contest = await CodingContest.find({
      "participants.user": userId,
    }).lean();
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
