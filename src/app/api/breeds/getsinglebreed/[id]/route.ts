import { ConnectDB } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import Breeds from "@/models/breedsModel"


export async function GET(request: NextRequest) {
    await ConnectDB();
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        
        const data = await Breeds.findOne({ _id: id })
        
        if(data){
            return NextResponse.json({
                message: 'Success',
                data: data
            })
        }else{
            return NextResponse.json({
                message: 'false'
            })
        }
        
        

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error
        },
            { status: 500 })
    }

}