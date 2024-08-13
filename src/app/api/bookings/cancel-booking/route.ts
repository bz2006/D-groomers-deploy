import { ConnectDB } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import Bookings from "@/models/bookingsModel";
import { format } from "date-fns";


function formatcancelDate(date: Date) {
    return format(date, "MMM dd, yyyy");
}

export async function PUT(request: NextRequest) {
    await ConnectDB();
    try {
        const reqBody = await request.json();
        const { bookingid, status } = reqBody;
        const cancelDate = formatcancelDate(new Date());

        const booking = await Bookings.findByIdAndUpdate(
            bookingid,
            { $set: { "status": status, "cancelDate": cancelDate } },
            { new: true }
        );

        if (booking) {
            return NextResponse.json({
                message: 'Booking Cancelled',
                status: 200,
            }, { status: 200 });
        } else {
            return NextResponse.json({
                message: 'Booking not found',
                status: 404,
            }, { status: 404 });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'Internal Server Error',
            status: 500,
        }, { status: 500 });
    }
}
