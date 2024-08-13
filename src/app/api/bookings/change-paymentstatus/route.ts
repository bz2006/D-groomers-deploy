import { ConnectDB } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import Bookings from "@/models/bookingsModel";


export async function PUT(request: NextRequest) {
    await ConnectDB();
    try {
        const reqBody = await request.json();
        const { bookingid, status } = reqBody;
        console.log(reqBody)

        const booking = await Bookings.findByIdAndUpdate(
            bookingid,
            { $set: { "amount.paid": status } },
            { new: true }
        );

        if (booking) {
            return NextResponse.json({
                message: 'Payment status changed',
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
