"use client"
import Footer from '@/app/Components/Footer'
import Header from '@/app/Components/Header'
import HandlePayment from '@/helpers/HandlePayements/HandleNewPayemnt'
import HandleVerifyPayment from '@/helpers/HandlePayements/HandleVerifyPayment'
import React, { useEffect, useState } from 'react'
import { Popconfirm } from 'antd'
import axios from "axios"

type Props = {}

type PaymentProps = {
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
}

type booking = {
    Gpackage: Gpackage;
    amount: amount;
    bookingadrs: bookingadrs;
    bookingdate: string;
    bookingid: string;
    id: string;
    status: string;
    slot: slot;
}

type Gpackage = {
    breedname: string;
    charge: number;
    packageDesc: string;
    packageName: string;
    pid: string;
}

type amount = {
    discount: number;
    fee: number;
    package: number;
    paid: boolean;
    tax: number
    _id: string;
}

type bookingadrs = {
    _id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    phone: string;
}

type slot = {
    time: string;
    date: date;
}

type date = {
    dayName: string;
    dayNumber: number;
    month: string;
    year: number;
    _id: string;
}

const BookingDetails = (props: Props) => {

    const [booking, setBooking] = useState<booking | null>(null)

    const GetBooking = ({ paid = false, cancel = false } = {}) => {
        const data = localStorage.getItem('Singlebooking')
        const booking = data ? JSON.parse(data) : null;

        if (paid) {
            booking.amount.paid = paid
            localStorage.setItem("Singlebooking", JSON.stringify(booking));
        }
        if (cancel) {
            booking.status = "Cancelled"
            localStorage.setItem("Singlebooking", JSON.stringify(booking));
        }
        setBooking(booking)
    }

    const PayNow = async () => {

        try {

            const grandtotal = (booking?.amount?.package ?? 0) + (booking?.amount?.fee ?? 0) + (booking?.amount?.tax ?? 0) - (booking?.amount?.discount ?? 0);

            const payment_res = await HandlePayment(grandtotal) as PaymentProps;
            const verification = await HandleVerifyPayment(payment_res?.razorpay_order_id, payment_res.razorpay_payment_id, payment_res.razorpay_signature)

            if (verification.data.data.verified === true) {
                GetBooking({ paid: true })

                const BKpay_status = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/change-paymentstatus`, {
                    bookingid: booking?.id,
                    status: true
                })
            } else {
                console.log("Payment Failed")
            }


        } catch (error) {
            console.log(error)
        }

    }

    const CancelBooking = async () => {

        try {

            const BKpay_status = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/cancel-booking`, {
                bookingid: booking?.id,
                status: "Cancelled"
            })
            GetBooking({ cancel: true })

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        GetBooking()
    }, [])

    console.log(booking?.status)
    return (
        <>
            <Header />
            <div className='flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 p-5 md:p-20 justify-center'>

                <div className='space-y-5 w-full md:w-3/4'>
                    <div className='w-full bg-white text-black p-5 md:p-7 rounded-md border border-gray-300 shadow-lg'>
                        <div className='flex flex-col md:flex-row md:items-center'>
                            <h1 className='mb-2 md:mb-0 md:mr-20'>Booking ID : {booking?.bookingid}</h1>
                            <h1 className='mb-2 md:mb-0 md:mr-20'>Booking Date : {booking?.bookingdate}</h1>
                            <div className='flex items-center'>
                                <h1>Status :&nbsp;</h1>
                                <h1 className={`font-normal ${booking?.status === "Scheduled" ? "text-yellow-500" :
                                    booking?.status === "Groomed" ? "text-green-500" :
                                        booking?.status === "Cancelled" ? "text-red-500" : ""
                                    }`}>{booking?.status}</h1>
                            </div>
                        </div>
                    </div>
                    <div className='w-full bg-white text-black p-5 md:p-7 rounded-md border border-gray-300 shadow-lg'>
                        <h1 className='mb-5 font-medium'>Booking Details</h1>
                        <div className='flex flex-col md:flex-row  md:space-x-32 space-y-5 md:space-y-0'>

                            <div className='flex flex-col items-start'>
                                <div className='flex '>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                    </svg>

                                    <div>
                                        <h2 className='text-gray-500'>Breed</h2>
                                        <h1 className='font-bold text-gray-800'>Bingo, {booking?.Gpackage?.breedname}</h1>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col items-start'>
                                <div className='flex'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                                    </svg>

                                    <div>
                                        <h2 className='text-gray-500'>Package</h2>
                                        <h1 className='font-bold text-gray-800'>{booking?.Gpackage?.packageName}</h1>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col items-start'>
                                <div className='flex '>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>

                                    <div>
                                        <h2 className='text-gray-500'>Date & Time</h2>
                                        <h1 className='font-bold text-gray-800'>{booking?.slot.date.month} {booking?.slot.date.dayNumber},{booking?.slot.date.year} · {booking?.slot.time}</h1>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='w-full bg-white text-black p-5 md:p-7 rounded-md border border-gray-300 shadow-lg'>
                        <h1 className='mb-5 font-medium'>Address</h1>
                        <p className='text-black '>{booking?.bookingadrs.name}<br />{booking?.bookingadrs.address}<br />
                            {booking?.bookingadrs.city} {booking?.bookingadrs.pin}, {booking?.bookingadrs.state}  {booking?.bookingadrs.country}<br />{booking?.bookingadrs.phone}
                        </p>
                    </div>
                </div>

                <div className='w-full md:w-1/4 text-black bg-white rounded-md p-5 md:p-7 border border-gray-300 shadow-lg'>
                    <h1 className='mb-5 font-medium'>Payment Summary</h1>
                    <div className='space-y-3'>
                        <div className='flex justify-between'>
                            <span>Package</span>
                            <span>₹{booking?.amount.package}.00</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>Convenience Fee</span>
                            <span>₹{booking?.amount.fee}.00</span>
                        </div>
                        <hr />
                        <div className='flex justify-between font-bold mb-10'>
                            <span>Grand Total</span>
                            {/* booking?.amount?.package ?? 0 */}
                            <span>₹{(booking?.amount?.package ?? 0) + (booking?.amount?.fee ?? 0)}.00</span>
                        </div>
                        <div className={`${booking ? "block" : "hidden"}`}>
                            <div
                                className={`${booking?.amount.paid === true || booking?.status === "Cancelled" ? "flex bg-green-100 p-4 w-full rounded-md items-center mt-7 justify-center" : "hidden"} ${booking?.status === "Cancelled" ? "text-red-700" : "text-green-700"}`}
                            >
                                <h1 className='font-medium'>{booking?.status === "Cancelled" ? "Booking Cancelled" : "Payment Success"}</h1>
                            </div>

                            {/* Pay Now Button */}
                            <button
                                onClick={PayNow}
                                className={`${booking?.amount.paid === true || booking?.status === "Cancelled" ? "hidden" : "block"} w-full border border-violet-500 text-violet-500 bg-white py-2 mt-7 px-4 rounded-md hover:bg-violet-600 hover:text-white`}
                            >
                                Pay Now
                            </button>


                            {/* Cancel Booking Button */}
                            <Popconfirm
                                title="Are you sure to cancel this booking"
                                description="This proccess cannot be undone"
                                onConfirm={CancelBooking}
                                okText="Yes"
                                cancelText="No"
                            >
                                <button
                                    className={`${booking?.status === "Cancelled" || booking?.status === "Groomed" ? "hidden" : "block"} w-full border border-red-500 text-red-500 bg-white py-2 mt-7 px-4 rounded-md hover:bg-red-600 hover:text-white`}
                                >
                                    Cancel Booking
                                </button>
                            </Popconfirm>
                        </div>

                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default BookingDetails
