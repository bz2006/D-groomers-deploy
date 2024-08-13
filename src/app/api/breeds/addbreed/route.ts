import { ConnectDB } from "@/config/dbconfig";
import { NextResponse, NextRequest } from "next/server";
import Breeds from "@/models/breedsModel";



ConnectDB()

export async function POST(request: NextRequest) {

    try {

        const reqBody = await request.json()
        const { breedname, packages } = reqBody
        //console.log(reqBody);

        const breed = await Breeds.findOne({ breedname: breedname })

        if (breed) {
            return NextResponse.json(
                {
                    error: 'breed exist'
                }, { status: 400 }
            )
        }


        const NewBreed = new Breeds({
            breedname: breedname,
            groomingPackages: {
                puppy: packages.puppy,
                teenage: packages.teenage,
                adult: packages.adult
            }
        })

        console.log(NewBreed);

        await NewBreed.save()

        return NextResponse.json({
            message: "Breed Added",

        }, { status: 200 })

    } catch (error: any) {
        console.log(Error);
        return NextResponse.json({
            error
        },
            { status: 500 })

    }

}
