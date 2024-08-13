import { ConnectDB } from "@/config/dbconfig";
import User from "@/models/usersModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";



export async function POST(request: NextRequest) {
    dotenv.config();
    await ConnectDB();
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log('JWT_SECRET:', process.env.JWT_SECRET);

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json(
                {
                    error: 'User does not exist',
                },
                { status: 400 }
            );
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            return NextResponse.json(
                {
                    error: 'Wrong password',
                },
                { status: 400 }
            );
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

        const response = NextResponse.json(
            {
                message: "Log in successful",
                user:tokenData
            },
            { status: 200 }
        );

        response.cookies.set("_grt5634", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ensure secure in production
            sameSite: "strict",
            path: "/",
        });

        return response;
    } catch (error: any) {
        console.error(error); // Proper error logging
        return NextResponse.json(
            {
                error: 'Internal server error',
            },
            { status: 500 }
        );
    }
}
