import { ConnectDB } from "@/config/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/usersModel";



ConnectDB()
export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { userid,NewAddress } = reqBody;
        console.log(userid, NewAddress);
        
        
        const userdata = await User.findOne({_id:userid})
        
        if(userdata){

            userdata.addresses.push(NewAddress);
            await userdata.save();

            return NextResponse.json({
                message: 'Success',
                data: userdata
            })
        }else{
            return NextResponse.json({
                message: 'false',
                status: 404,
            })
        }
        

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'Internal Server Error',
            status: 500,
        });

    }

}