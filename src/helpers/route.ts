import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
type tokenData={
    _id:string,
    username: string,
    email: string,
}

export async function GetuserTK(request:NextRequest) {

    try {
        const token = request.cookies.get('_grt5634')?.value || ''
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as tokenData
            return decoded._id
        }else{
            return null
        }
        
        
        
    } catch (error) {
        console.log(error);

    }

}