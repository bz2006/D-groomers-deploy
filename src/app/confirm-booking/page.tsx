"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import ConfirmHeader from '../Components/ConfirmHeader'
import axios from "axios"
import AddressStep from './Steps/Address'
import TimeSlotSteps from './Steps/TimeSlot'
import PaymentMStep from './Steps/PaymentMethod'
import ReviewBooking from './Steps/ReviewBooking';
import HandlePayment from '@/helpers/HandlePayements/HandleNewPayemnt';
import HandleVerifyPayment from '@/helpers/HandlePayements/HandleVerifyPayment';

type Props = {}

type PaymentProps = {
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
}

const ConfirmBooking = (props: Props) => {

  const [CurrentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const placeBooking = async () => {

    try {

      const userid = await GetUser()
      const Booking = GetBookingDet()
      if (Booking.bookingpayMethod.paymentMethod === "Online-pay") {

        const grandtotal = Booking.bookingamount.package + Booking.bookingamount.fee + Booking.bookingamount.tax - Booking.bookingamount.discount

        const payment_res = await HandlePayment(grandtotal) as PaymentProps;
        const verification = await HandleVerifyPayment(payment_res?.razorpay_order_id, payment_res.razorpay_payment_id, payment_res.razorpay_signature)
        console.log(verification)

        if (verification.data.data.verified === true) {
          Booking.bookingamount.paid = true;

          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/new-booking`, {
            userid: userid,
            bookingpackage: Booking.bookingPKG,
            bookingadrs: Booking.bookingadrs,
            bookingpaymethod: Booking.bookingpayMethod,
            bookingamount: Booking.bookingamount,
            bookingslot: Booking.bookingslot
          })
          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/reserve-slot`, {
            tid:Booking.bookingslot.tid
          })
          router.push("/my-account/schedules")
        } else {
          console.log("Payment Failed")
        }


      } else if (Booking.bookingpayMethod.paymentMethod === "On-groom-pay") {

       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/new-booking`, {
          userid: userid,
          bookingpackage: Booking.bookingPKG,
          bookingadrs: Booking.bookingadrs,
          bookingpaymethod: Booking.bookingpayMethod,
          bookingamount: Booking.bookingamount,
          bookingslot: Booking.bookingslot
        })
         await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/reserve-slot`, {
          tid:Booking.bookingslot.tid
        })
        router.push("/my-account/schedules")
      }

      // localStorage.removeItem("_dgBkPKG");
      // localStorage.removeItem("_dgBkPM");
      // localStorage.removeItem("_dgBkDT");
      // localStorage.removeItem("_dgBkADRS");


    } catch (error) {
      console.log(error)
    }

  }


  const GetBookingDet = () => {
    const PKG = localStorage.getItem("_dgBkPKG");
    const bookingPKG = PKG ? JSON.parse(PKG) : null;

    const payMethod = localStorage.getItem("_dgBkPM");
    const bookingpayMethod = payMethod ? JSON.parse(payMethod) : null;

    const slot = localStorage.getItem("_dgBkDT");
    const bookingslot = slot ? JSON.parse(slot) : null;

    const adrs = localStorage.getItem("_dgBkADRS");
    const bookingadrs = adrs ? JSON.parse(adrs) : null;

    const amount = localStorage.getItem("_dgBkAMT");
    const bookingamount = amount ? JSON.parse(amount) : null;

    return { bookingPKG, bookingpayMethod, bookingamount, bookingslot, bookingadrs };

  }

  const GetUser = async () => {
    try {
      const res = await axios.get('/api/user')
      if (res) {
        return res.data["data"]['_id']
      }


    } catch (error) {
      console.log(error);

    }
  }

  const Steps = [
    <AddressStep />,
    <TimeSlotSteps />,
    <ReviewBooking setCurrentStep={setCurrentStep} placeBooking={placeBooking} />
  ]

  const NextStep = () => {
    if (CurrentStep <= 1) {
      setCurrentStep(CurrentStep + 1)
    }
  }

  const BackStep = () => {
    if (CurrentStep != 0) {
      setCurrentStep(CurrentStep - 1)
    }
  }

  return (
    <>
      <ConfirmHeader />

      <div className='md:hidden'>
        <div className=' flex mb-3 p-5 justify-center'>
          <h1 className='text-xl text-black'>Confirm Booking</h1>
        </div>

        <div className='flex items-center justify-center px-4 mb-5'>
          <div className='flex items-center'>

            <div className='flex flex-col justify-center items-center space-y-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-black size-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>
              <h1 >Booking</h1>
            </div>

            <hr className='w-6 font-extrabold border border-gray-500 rounded-sm mx-5' />

            <div className='flex flex-col justify-center items-center space-y-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`${CurrentStep>0?"text-black":"text-gray-400"} size-8`}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
              <h1 className={`${CurrentStep>0?"text-black":"text-gray-400"}`}>Payment</h1>
            </div>

            <hr className='w-6 font-extrabold border border-gray-500 rounded-sm mx-5' />

            <div className='flex flex-col justify-center items-center space-y-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`${CurrentStep>1?"text-black":"text-gray-400"} size-8`}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" /></svg>
              <h1 className={`${CurrentStep>1?"text-black":"text-gray-400"}`}>Review</h1>
            </div>
          </div>
        </div>

        <div className='mb-20'>
          {Steps[CurrentStep]}
        </div>



        <div className={`fixed bottom-0 left-0 w-full  bg-white ${CurrentStep === 2 ? "hidden" : "flex"} justify-center items-center p-3`}>

          <button onClick={NextStep} className='bg-violet-600 text-white p-2 rounded-md w-full h-12 sm:w-auto md:w-96 hover:bg-violet-400'>
            next
          </button>
        </div>

      </div>

      <div className="hidden sm:block p-10">

        <div className='mb-7'>
          <h1 className='text-2xl text-black'>Confirm Booking</h1>
          <p className='text-gray-400'>Review your booking details to continue to schedule to booking</p>
        </div>

        <div className='flex flex-row space-y-0 space-x-5  justify-center'>



          <div className='space-y-5 w-full md:w-3/4'>
            <div className='w-full bg-white text-black p-5 md:p-7 rounded-md border border-gray-300 shadow-lg'>

              <div>
                <AddressStep />
              </div>

            </div>
            <div className='w-full bg-white text-black p-5 md:p-7 rounded-md border border-gray-300 shadow-lg'>
              <div className='flex items-center justify-between mb-5'>
                <h1 className='font-medium text-xl'>Payment Method</h1>
              </div>

              <div>
                <PaymentMStep />
              </div>

            </div>


            <div className='w-full bg-white text-black p-5 md:p-7 rounded-md border border-gray-300 shadow-lg'>


              <TimeSlotSteps />
            </div>

          </div>
          <div className='flex flex-col' >


            <ReviewBooking placeBooking={placeBooking} setCurrentStep={setCurrentStep} />

          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmBooking