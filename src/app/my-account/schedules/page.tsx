"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Footer from '@/app/Components/Footer'
import Header from '@/app/Components/Header'
import OrderSection from '@/app/Components/OrderSection'
import BksSkeleton from './BksSkeleton'

type bookingprops = {
    _id: string;
    userid: string;
    bookingid: string;
    bookingdate: string;
    img:string;
    status: string;
    cancelDate: string;
    groomedDate: string;
    amount: Amount;
    package: GroomingPackage;
    bookingadrs: Address;
    paymentMethod: string;
    slot: Slot;
}

type Slot = {
    time: string;
    date: Sdate;
}

type Sdate = {
    dayName: string;
    dayNumber: number;
    month: string;
    year: string;
}

type Amount = {
    package: number;
    fee: number;
    tax: number;
    discount: number;
    paid: boolean;
}

type Address = {
    _id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    phone: string;
}

type GroomingPackage = {
    pid: string;
    breedname: string;
    img:string;
    packageName: string;
    packageDesc: string;
    services: string[];
    charge: number;
};

type Props = {}

const Schedules = (props: Props) => {

    const [Bookings, setBookings] = useState<bookingprops[] | null>(null)
    const [loading, setLoading] = useState(true);

    const GetUser = () => {
        try {
            const user = localStorage.getItem("_dgUSR")

            const userdet = user ? JSON.parse(user) : null;
            if (userdet) {
                return userdet.id
            }
        } catch (error) {
            console.log(error);
        }
    }

    const GetAllBookings = async () => {
        try {
            const userid = GetUser();
            if (userid) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/user-bookings/${userid}`);
                console.log(response.data.data)
                setBookings(response.data.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        } 
    }

    useEffect(() => {
        GetAllBookings()
    }, [])

    return (
        <>
            <Header />
            <div className='flex pt-7 items-center justify-center flex-col '>
                {loading === false ? (
                    <>
                        {Bookings?.map((sch) => (
                            <OrderSection
                                key={sch._id}
                                id={sch._id}
                                img={sch.package.img}
                                bookingid={sch.bookingid}
                                bookingdate={sch.bookingdate}
                                Gpackage={sch.package}
                                amount={sch.amount}
                                bookingadrs={sch.bookingadrs}
                                slot={sch.slot}
                                cancelDate={sch.cancelDate}
                                groomedDate={sch.groomedDate}
                                status={sch.status}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <BksSkeleton />
                        <BksSkeleton />
                    </>

                )}
            </div>
            <Footer />
        </>
    )
}

export default Schedules
