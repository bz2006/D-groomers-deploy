import { Radio, Checkbox } from 'antd'
import React, { useState, ChangeEvent, useEffect } from 'react'

type Props = {}

type PaymentMethod = {
    paynowonline: boolean;
    payongroom: boolean;
}

const PaymentMStep = (props: Props) => {

    const [OnlineMethod, setOnlineMethod] = useState(true)
    const [OngroomMethod, setOngroomMethod] = useState(false)

    const ChangeOngroom = (target: boolean) => {
        setOngroomMethod(target)
        setOnlineMethod(false)
        const method = {
            paymentMethod: "On-groom-pay"
        }
        localStorage.setItem("_dgBkPM", JSON.stringify(method));
    }

    const ChangeOnline = (target: boolean) => {
        setOnlineMethod(target)
        setOngroomMethod(false)
        const method = {
            paymentMethod: "Online-pay"
        }
        localStorage.setItem("_dgBkPM", JSON.stringify(method));
    }

    useEffect(() => {
        const payMethod = localStorage.getItem("_dgBkPM");
        const parsedPayMethod = payMethod ? JSON.parse(payMethod) : null;
        if (parsedPayMethod) {
            if (parsedPayMethod.paymentMethod === "On-groom-pay") {
                ChangeOngroom(true)
            }
        }
    }, [])


    return (
        <>
            <div className='sm:block md:hidden  flex mt-7 items-center justify-center w-full'>
                <div className=" w-full space-y-5 items-center ">

                    <div onClick={() => ChangeOnline(OnlineMethod === false ? true : false)} className="flex  justify-between bg-white rounded-md border border-gray-300 shadow-lg p-9 hover:cursor-pointer md:w-full sm:w-full ">
                        <div className=''>
                            <h2 className='text-xl text-black'>Pay Online Now</h2>
                        </div>
                        <div className='flex items-center '>
                            <div className="p-1 px-2">
                                <Checkbox checked={OnlineMethod} value={OnlineMethod} className='border border-black h-[18px] rounded-[0.300rem]' onChange={() => ChangeOnline(OnlineMethod === false ? true : false)} />
                            </div>
                        </div>
                    </div>

                    <div onClick={() => ChangeOngroom(OngroomMethod === false ? true : false)} className="flex  justify-between bg-white rounded-md border border-gray-300 shadow-lg p-9 hover:cursor-pointer md:w-full sm:w-full ">
                        <div className=''>
                            <h2 className='text-xl text-black'>Pay On Groom </h2>
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className=" p-1 px-4 ">
                                <Checkbox checked={OngroomMethod} className='border border-black h-[18px] rounded-[0.300rem]' value={OngroomMethod} onChange={() => ChangeOngroom(OngroomMethod === false ? true : false)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ====== */}

            <div className='hidden md:block'>
                <div className="flex space-x-5 justify-start">

                    <div onClick={() => ChangeOnline(OnlineMethod === false ? true : false)} className="flex hover:bg-slate-50 justify-between bg-white rounded-md border border-gray-300 shadow-lg p-6 hover:cursor-pointer w-72 ">
                        <div className=''>
                            <h2 className='text-xl text-black'>Pay Online Now</h2>
                        </div>
                        <div className='flex items-center '>
                            <div className="p-1 px-2">
                                <Checkbox checked={OnlineMethod} value={OnlineMethod} className='border border-black h-[17.5px] rounded-[0.300rem]' onChange={() => ChangeOnline(OnlineMethod === false ? true : false)} />
                            </div>
                        </div>
                    </div>

                    <div onClick={() => ChangeOngroom(OngroomMethod === false ? true : false)} className="flex hover:bg-slate-50 justify-between bg-white rounded-md border border-gray-300 shadow-lg p-6 hover:cursor-pointer w-72 ">
                        <div className=''>
                            <h2 className='text-xl text-black'>Pay On Groom </h2>
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className=" p-1 px-4 ">
                                <Checkbox checked={OngroomMethod} className='border border-black h-[17.5px] rounded-[0.300rem]' value={OngroomMethod} onChange={() => ChangeOngroom(OngroomMethod === false ? true : false)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentMStep