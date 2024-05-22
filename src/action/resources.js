'use server'

import dbConnect from "@/lib/dbConnect";
import Resource from "@/models/Resouces";

dbConnect()
export const getResource = async () => {
    try {

        const resources = await Resource.find({});
        return resources

    } catch (error) {
        console.log(error)
        return []
    }
}