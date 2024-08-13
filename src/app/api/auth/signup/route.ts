import { ConnectDB } from "@/config/dbconfig";
import User from "@/models/usersModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"



export async function POST(request: NextRequest) {

    await ConnectDB();

    try {

        const reqBody = await request.json()
        const { username, email, password } =reqBody
        console.log(reqBody);

        const user=await User.findOne({email:email})

        if(user){
            return NextResponse.json(
                {
                    error:'user exist'
                },{status:400}
            )
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

       const NewUser= new User({
            username,
            email,
            password:hashedpassword
        })

        const savedUser=await NewUser.save()

       return NextResponse.json({
        message:"user Created",
        
       },{status:200})

    } catch (error: any) {
        console.log(Error);
        return NextResponse.json({
            error
        },
            { status: 500 })

    }

}
