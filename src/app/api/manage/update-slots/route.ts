import { ConnectDB } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import GroomingSlots from "@/models/groomingslotsModel";

ConnectDB()


export async function PUT(request: NextRequest) {

    const reqBody = await request.json();
    const { locid, slotid, NewSlots,selectedMid } = reqBody;

    try {
        // Find the document by location id
        const groomingSlots = await GroomingSlots.findById(locid);

        if (groomingSlots) {
            // Use the correct method to find the monthly slot
            const monthlySlot = groomingSlots.monthlyslots.find((slot: { _id: { toString: () => string; }; }) => slot._id.toString() === selectedMid);

            if (monthlySlot) {
                console.log("monthlySlot", monthlySlot);
                const slot = monthlySlot.slots.id(slotid);

                if (slot) {
                    Object.assign(slot, NewSlots);

                   
                    await groomingSlots.save();

                    return NextResponse.json({
                        message: 'Updated slot',
                        status: 200,
                    });
                } else {
                    return NextResponse.json({
                        message: 'Slot not found',
                        status: 404,
                    });
                }
            } else {
                return NextResponse.json({
                    message: 'Monthly slot not found',
                    status: 404,
                });
            }
        } else {
            return NextResponse.json({
                message: 'Grooming slots not found',
                status: 404,
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'Internal Server Error',
            status: 500,
        });
    }
}
