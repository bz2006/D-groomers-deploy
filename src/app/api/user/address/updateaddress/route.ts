import { ConnectDB } from "@/config/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/usersModel";



ConnectDB()
export async function PUT(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { userid, adid, newAddress } = reqBody;
        const id = { adid };
        
        const userdata = await User.findById(userid)
        
        if(userdata){

            const adrsIndex = userdata.addresses.findIndex(
                (adrs: { _id: any }) => adrs._id.toString() === String(id.adid) // Ensure pet._id is treated as a string
            );
              if (adrsIndex === -1) {
                return NextResponse.json({
                    message: 'Invalid pet details ID',
                    status: 404,
                })
              }
          
          
              const updatedUser = await User.updateOne(
                { _id: userid, "addresses._id": Object(adid) },
                { $set: { "addresses.$": newAddress } }
              );
          

              if (updatedUser.modifiedCount === 0) {
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