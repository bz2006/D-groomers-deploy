import { NextRequest, NextResponse } from "next/server";
import multer from 'multer';
import {upload} from "@/helpers/aws-s3-middleware/awsConfig"

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userid, petname, dob, breed, imageUrl } = reqBody;
        const pet = { petname, dob, breed, imageUrl };
        console.log(userid, petname, dob, breed, imageUrl);

        const userdata = await User.findOne({ _id: userid });
        
        if (!userdata) {
            return new NextResponse(
                JSON.stringify({ message: 'User not found', status: 404 }),
                { status: 404 }
            );
        }

        userdata.pets.push(pet);
        await userdata.save();

        return new NextResponse(
            JSON.stringify({ message: 'Success', data: userdata }),
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: 'Internal Server Error', status: 500 }),
            { status: 500 }
        );
    }
}

