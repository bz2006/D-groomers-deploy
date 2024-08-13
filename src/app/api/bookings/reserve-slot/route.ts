import { ConnectDB } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import GroomingSlots from "@/models/groomingslotsModel";

export async function PUT(request: NextRequest) {
    await ConnectDB();

    const reqBody = await request.json();
    const {tid} = reqBody;
        try {
            const result = await GroomingSlots.updateOne(
                { 'monthlyslots.slots.time._id': tid },
                { $set: { 'monthlyslots.$[].slots.$[].time.$[timeElem].available': false } },
                { arrayFilters: [{ 'timeElem._id': tid }] }
            );

            if (result.modifiedCount > 0) {
                return NextResponse.json({
                   message: 'Time slot updated successfully',
                    status: 200,
                });
            } else {
                return NextResponse.json({
                    message: 'Time slot not found',
                     status: 404,
                 });
            }
        } catch (error) {
            return NextResponse.json({
                message: 'Error updating time slot',
                 status: 500,
             });
        }
  
}
