import { ConnectDB } from "@/config/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/usersModel";



ConnectDB()
export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { userid, adid } = reqBody;
        const id = { adid };
        
        
        const userdata = await User.findById(userid)
        
        if(userdata){

            const petIndex = userdata.addresses.findIndex(
                (adrs: { _id: any }) => adrs._id.toString() === String(id.adid) // Ensure pet._id is treated as a string
            );
              if (petIndex === -1) {
                return NextResponse.json({
                    message: 'Invalid pet details ID',
                    status: 404,
                })
              }
          
          console.log(petIndex,id,adid);
          
          const deletepet = await User.updateOne(
            { _id: userid },
            { $pull: { "addresses": { _id: Object(adid) } } }
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