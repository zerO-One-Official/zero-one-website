'use server'

import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users";

dbConnect()

export const getUser = async (username) => {
    try {
        const user = await User.findOne({ username });
        return user;
    } catch (error) {
        console.log(error)
        return null;
    }
}