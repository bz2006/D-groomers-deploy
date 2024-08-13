import { ConnectDB } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import Bookings from "@/models/bookingsModel";



export async function GET(request: NextRequest) {
    await ConnectDB();
    try {
        const url = new URL(request.url);
        const userId = url.pathname.split('/').pop();
        
        if (!userId) {
            return NextResponse.json({
                message: 'User ID is required',
            }, { status: 400 });
        }

        // Find all bookings by user ID
        const data = await Bookings.find({ userid: userId });

        if (data.length === 0) {
            return NextResponse.json({
                message: 'No bookings found for this user',
            }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Success',
            data: data
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'Internal Server Error',
        }, { status: 500 });
    }
}
