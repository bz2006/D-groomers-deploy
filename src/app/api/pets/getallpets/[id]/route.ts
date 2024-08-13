import { ConnectDB } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usersModel";


ConnectDB()

export async function GET(request: NextRequest) {

    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        
        
        const user = await User.findById(id)
        if (!user) {
            return NextResponse.json({
                message: 'User not found',
            })
          }
          const pets = user.pets
        return NextResponse.json({
            message: 'Success',
            data: pets
        })

    } catch (error) {
        console.log(error);

    }

}