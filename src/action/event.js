'use server'

import dbConnect from "@/lib/dbConnect";
import Contest from "@/models/Contests";
import Question from "@/models/Questions";
import User from "@/models/Users";

dbConnect()

export const getEvents = async () => {

    try {
        const contests = await Contest.find({}).select(['name', 'date', 'duration']);
        return contests

    } catch (error) {
        console.log(error)
        return []
    }
}
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
            });
        return contest

    } catch (error) {
        console.log(error);
        return null
    }
}