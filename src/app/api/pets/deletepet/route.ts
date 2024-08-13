import { ConnectDB } from "@/config/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/usersModel";



ConnectDB()
export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { userid, upid } = reqBody;
        const id = { upid };
        
        
        const userdata = await User.findById(userid)
        
        if(userdata){

            const petIndex = userdata.pets.findIndex(
                (pet: { _id: any }) => pet._id.toString() === String(id.upid) // Ensure pet._id is treated as a string
            );
              if (petIndex === -1) {
                return NextResponse.json({
                    message: 'Invalid pet details ID',
                    status: 404,
                })
              }
          
          console.log(petIndex,id,upid);
          
          const deletepet = await User.updateOne(
            { _id: userid },
            { $pull: { "pets": { _id: Object(upid) } } }
          );
          

              if (!deletepet) {
                return NextResponse.json({
                    message: 'Details not found',
                    status: 404,
                })
              }else{
                return NextResponse.json({
                    message: 'Success',
                    status: 200
                })
              }

            
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