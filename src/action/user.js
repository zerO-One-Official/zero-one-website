'use server'

import { options } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Teams";
import User from "@/models/Users";
import { getServerSession } from "next-auth";

dbConnect()

export const getUser = async (username) => {
    try {
        const user = await User.findOne({ username });
        const team = await Team.findOne({ user: user._id });
        user.position = team?.position || 'member';
        return user;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getProfile = async () => {

    try {
        const session = await getServerSession(options)
        const id = session?.user?._id

        if (!id) return null
        const user = await User.findById(id).select(['-role', '-updated_at', '-created_at', '-token', '-active']);
        if (!user)
            return null

        return user
    } catch (error) {
        console.log(error);
        return null
    }
}
