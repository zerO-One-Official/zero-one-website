
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'
import User from "@/models/Users";
import { generateAccessCode } from "@/utils/helper";
import { joiningEmail } from "@/lib/emailTemplates";
import { sendMail } from "@/lib/sendMail";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { deleteFile } from "@/utils/server";

dbConnect()

export async function POST(req) {

    try {

        const session = await getServerSession(options);
        const id = session?.user?._id;

        const reqBody = await req.json();
        const { firstName, branch, gender, roll, lastName, email, phone, profilePic } = reqBody;

        if (!session || !id) {

            deleteFile(profilePic);
            return NextResponse.json(
                { message: "Session Expired", type: "error", success: true },
                { status: 440 }
            );
        }

        const admin = await User.findById(id);

        if (!admin || admin.role !== 'admin') {
            deleteFile(profilePic);
            return NextResponse.json(
                { message: "You are not allowed to perform this action", type: "error", success: true },
                { status: 403 }
            )
        }

        const password = process.env.DEFAULT_PASSWORD;

        const to = email;
        const subject = 'Congratulations! You have been selected to join the Zero One Coding Club.';
        let html;

        const user = await User.findOne({ $or: [{ roll }, { email }] });

        // // ============= Check if User Exist =============
        if (user) {
            let token = user.token;
            if (token === '') {
                token = generateAccessCode();
                user.token = token;
            }
            if (user.firstName !== firstName)
                user.firstName = firstName;
            if (user.lastName !== lastName)
                user.lastName = lastName;
            if (user.profilePic !== profilePic) {
                deleteFile(profilePic);
                user.profilePic = profilePic;
            }
            if (user.email !== email)
                user.email = email;
            if (user.roll !== roll)
                user.roll = roll;
            if (user.branch !== branch)
                user.branch = branch;
            if (user.gender !== gender)
                user.gender = gender;
            if (user.phone !== phone)
                user.phone = phone;

            html = joiningEmail(token, process.env.NEXTAUTH_URL);
            const messageId = await sendMail(to, subject, html);

            await user.save();

            if (messageId) {
                return NextResponse.json(
                    { message: "Joining mail has been sent (Duplicate).", type: "success", success: false },
                    { status: 200 }
                )
            }
            else {
                return NextResponse.json(
                    { message: "Failed to send mail. please try again", type: "error", success: true },
                    { status: 500 }
                )
            }
        }
        // ============= Check if User Exist =============



        // ============= Generate the Code =============
        const token = generateAccessCode();
        // ============= Generate the Code =============


        // ============= Creating Username =============
        const username = `${firstName}_${roll}`;
        // ============= Creating Username =============


        // ============= Inserting the User =============
        await User.create({ firstName, lastName, roll, email, branch, gender, phone, username, profilePic, password, token })
        // ============= Inserting the User =============


        // ============= Sending the Mail =============
        html = joiningEmail(token, process.env.NEXTAUTH_URL);
        const messageId = await sendMail(to, subject, html);
        // ============= Sending the Mail =============

        if (messageId) {
            return NextResponse.json(
                { message: "Joining mail has been sent.", type: "success", success: false },
                { status: 200 }
            )
        }
        else {
            return NextResponse.json(
                { message: "Failed to send mail. please try again", type: "error", success: true },
                { status: 500 }
            )
        }

    } catch (error) {
        console.log(error);
        deleteFile(profilePic);
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )
    }
}


export async function PUT(req) {
    try {
        const reqBody = await req.json();

        const { token, password } = reqBody;

        const user = await User.findOne({ token });
        let message = '';

        if (!user)
            return NextResponse.json(
                { message: 'Invalid Token', type: "error", success: false },
                { status: 403 }
            )

        user.password = password;
        user.token = '';

        message = 'Account Activated. Please Login'
        user.active = true;

        await user.save();

        return NextResponse.json(
            { message, type: "success", success: false },
            { status: 200 }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )
    }
}