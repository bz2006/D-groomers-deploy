import { ConnectDB } from "@/config/dbconfig";
import { NextResponse,NextRequest } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import User from "@/models/usersModel";
import dotenv from "dotenv";
dotenv.config();

const s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_S3_KEY_ID as string,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
    },
});

async function uploadFileToS3(fileBuffer: Buffer, fileName: string) {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
        ContentType: "image/jpeg" // Default to JPEG for images
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        return fileName;
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw new Error("Failed to upload file.");
    }
}

export async function POST(request: NextRequest) {
    try {
        // Connect to the database
        await ConnectDB();

        const formData = await request.formData();
        const file = formData.get("image") as File | null;
      
        if (!file) {
            return new NextResponse(
                JSON.stringify({ error: "File is required." }),
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = await uploadFileToS3(buffer, file.name);

        // Uncomment and complete if you want to use this section
       
        const userid = formData.get("userid")
        const name = formData.get("petname")
        const dob = formData.get("dob")
        const breed = formData.get("breed")
        
        const pet = { petname: name, dob: dob, breed: breed,image:fileName };

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
            JSON.stringify({ message: 'Success' }),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error handling POST request:", error);
        return new NextResponse(
            JSON.stringify({ message: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}
