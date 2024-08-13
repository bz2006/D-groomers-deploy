import { ConnectDB } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import GroomingSlots from "@/models/groomingslotsModel";


ConnectDB()

export async function GET(request: NextRequest) {

    try {
        const data = await GroomingSlots.find({}).select('-monthlyslots');
        return NextResponse.json({
            message: 'Success',
            data: data
        })
        
    } catch (error) {
        console.log(error);
        
    }

}