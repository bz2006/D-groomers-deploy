import { ConnectDB } from "@/config/dbconfig";
import { NextResponse, NextRequest } from "next/server";
import Bookings from "@/models/bookingsModel";
import { format } from "date-fns";


function generateBookingID() {
    const timestamp = new Date().getTime();
    return `DG-${timestamp}`;
}

function formatBookingDate(date: Date) {
    return format(date, "MMM dd, yyyy");
}

export async function POST(request: NextRequest) {
    await ConnectDB();
    try {
        const reqBody = await request.json();
        const { userid, bookingpackage, bookingadrs, bookingpaymethod,bookingamount, bookingslot } = reqBody;

        const bookingID = generateBookingID();
        const bookingDate = formatBookingDate(new Date());

        const NewBooking = new Bookings({
            userid: userid,
            bookingid: bookingID,
            package: bookingpackage,
            bookingadrs: bookingadrs,
            paymentMethod: bookingpaymethod.paymentMethod,
            amount:bookingamount,
            slot: bookingslot,
            bookingdate: bookingDate
        });

        await NewBooking.save();

        return NextResponse.json({
            message: "New Booking Added",
            bookingID: bookingID,
            bookingDate: bookingDate
        }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
