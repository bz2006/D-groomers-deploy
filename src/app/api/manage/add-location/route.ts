import { ConnectDB } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import GroomingSlots from "@/models/groomingslotsModel";



ConnectDB()
export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { district, genSlots, defavslt } = reqBody;
        console.log(district, genSlots, defavslt);


        const location = await GroomingSlots.findOne({ district: district })

        if (!location) {

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth(); // 0-indexed
            const currentYear = currentDate.getFullYear();
            
            const monthlySlots = [];
            
            for (let i = 0; i < genSlots; i++) {
                const monthDate = new Date(currentYear, currentMonth + i, 1);
                const monthName = monthDate.toLocaleString('default', { month: 'long' });
                const year = monthDate.getFullYear();
                const daysInMonth = new Date(year, monthDate.getMonth() + 1, 0).getDate();
            
                const slots = [];
                const time = [{ time: "10:30 AM" }, { time: "02:00 PM" },{ time: "04:30 PM" }];
                
                for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(year, monthDate.getMonth(), day);
                    const dayname = date.toLocaleString('default', { weekday: 'long' });
                    slots.push({ day, dayname:dayname, avsl: true, time: time });
                }
            
                monthlySlots.push({ month: monthName, year, slots });
            }
            
            console.log(monthlySlots);
            

            const newGroomingSlot = new GroomingSlots({
                district,
                monthlyslots: monthlySlots,
            });

           await newGroomingSlot.save();


            return NextResponse.json({
                message: "Location and Slots Added",

            }, { status: 200 })

        }else{
            return NextResponse.json(
                {
                    error: 'breed exist'
                }, { status: 400 }
            )
        }


    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'Internal Server Error',
            status: 500,
        });

    }

}