import { ConnectDB } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import GroomingSlots from "@/models/groomingslotsModel";


ConnectDB()

export async function GET(request: NextRequest) {

    try {
        const url = new URL(request.url);
        const loc = url.pathname.split('/').pop();
        
        
        const location = await GroomingSlots.findOne({district:loc})
        if (!location) {
            return NextResponse.json({
                message: 'User not found',
            })
          }
        return NextResponse.json({
            message: 'Success',
            data: location
        })

    } catch (error) {
        console.log(error);

    }

}