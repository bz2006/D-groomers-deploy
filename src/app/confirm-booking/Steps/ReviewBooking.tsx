import React, { useEffect, useState } from 'react'

type Props = {
    setCurrentStep: (step: number) => void;
    placeBooking: () => void;
}

type Adrs = {
    name: string;
    address: string;
}

type PKGprop = [{
    charge: number
    packageDesc: string;
    packageName: string;
    pid: string;
    services: []
    _id: string;
}]

type Subtotal = [{
    charge: number
    tax?: number;
    fee?: number;
}]

const ReviewBooking = ({ setCurrentStep, placeBooking }: Props) => {

    const [PaymentMethod, setPaymentMethod] = useState()
    const [PKG, setPKG] = useState<PKGprop>([{
        charge: 0,
        packageDesc: "",
        packageName: "",
        pid: "",
        services: [],
        _id: ""
    }])
    const [subtotal, setsubtotal] = useState<Subtotal>([{
        charge: 0,
        tax: 0,
        fee: 0
    }])
    const [Sch, setSch] = useState("")
    const [Address, setAddress] = useState<Adrs>({
        name: "string",
        address: ""
    })

    const GetAddress = () => {
        const adrs = localStorage.getItem("_dgBkADRS");
        const address = adrs ? JSON.parse(adrs) : null;
        setAddress({
            name: address?.name || "",
            address: address?.address || ""
        })

    }

    const GetSlot = () => {

        const data = localStorage.getItem("_dgBkDT");
        const slot = data ? JSON.parse(data) : null;

        const date = slot?.date
        const formattedDate = `${date?.month}, ${date?.dayNumber} ${date?.year}`
        setSch(`${formattedDate} ${slot?.time}`)
    }

    const GetPayM = () => {
        const payMethod = localStorage.getItem("_dgBkPM");
        const parsedPayMethod = payMethod ? JSON.parse(payMethod) : null;
        setPaymentMethod(parsedPayMethod?.paymentMethod)
    }

    const GetPKG = () => {
        //packageName
        const data = localStorage.getItem("_dgBkPKG");
        const pkg = data ? JSON.parse(data) : null;
        setPKG([{
            charge: pkg.charge,
            packageDesc: pkg.packageDesc,
            packageName: pkg.packageName,
            pid: pkg.pid,
            services: pkg.services,
            _id: pkg._id
        }]);
        calAmount(pkg)

        setsubtotal([{
            charge: pkg.charge,
        }]);


    }
    const calAmount = (pkg: any) => {
        const amount = {
            package: pkg?.charge,
            fee: 50,
            tax: 0,
            paid: false,
            discount: 0
        }
        localStorage.setItem("_dgBkAMT", JSON.stringify(amount));

    }
    console.log(PKG);

    useEffect(() => {
        GetPayM()
        GetAddress()
        GetSlot()
        GetPKG()
    }, [])




    return (
        <>
            <div className="flex flex-col p-4 space-y-5 pt-10 w-full sm:block md:hidden">
                <div className='w-full space-y-5'>

                    <div onClick={() => setCurrentStep(0)} className='bg-white h-[6rem] flex flex-row items-center justify-between p-3 border-b rounded-md border border-gray-300 shadow-lg hover:cursor-pointer'>
                        <h1 className='text-black'>ADDRESS</h1>
                        <p className='text-black'>{Address.name},<br />{Address.address.length > 20 ? Address.address.substring(0, 20) : Address.address}..</p>
                        <h1 className='text-black'>&gt;</h1>
                    </div>

                    <div onClick={() => setCurrentStep(1)} className=' bg-white flex h-[6rem] flex-row items-center justify-between p-3 border-b rounded-md border border-gray-300 shadow-lg hover:cursor-pointer'>
                        <h1 className='text-black'>SCHEDULE</h1>
                        <p className='text-black'>{Sch}</p>
                        <h1 className='text-black'>&gt;</h1>
                    </div>

                    <div onClick={() => setCurrentStep(1)} className='bg-white flex h-[6rem] flex-row items-center justify-between p-3 border-b rounded-md border border-gray-300 shadow-lg hover:cursor-pointer'>
                        <h1 className='text-black'>PAYMENT</h1>
                        <p className='text-black'>{PaymentMethod}</p>
                        <h1 className='text-black'>&gt;</h1>
                    </div>

                    <div className='bg-white flex h-[6rem] flex-row items-center justify-between p-3 border-b rounded-md border border-gray-300 shadow-lg hover:cursor-pointer'>
                        <h1 className='text-black'>PACKAGE</h1>
                        <p className='text-black'>{PKG[0].packageName}</p>
                        <h1 className='text-white'>&gt;</h1>
                    </div>
                </div>

                {/* Subtotal */}

                <div className='bg-white w-full p-5 border-b rounded-md border border-gray-300 shadow-lg'>

                    <div className='mb-3 mt-3'>
                        <h2 className='text-black font-medium'>SUB TOTAL</h2>
                    </div>

                    <div className='flex flex-row items-center justify-between pb-2'>
                        <h3 className='text-black'>Package</h3>
                        <h3 className='text-black'>₹{PKG[0].charge}</h3>
                    </div>

                    <div className='flex flex-row items-center justify-between pb-2'>
                        <h3 className='text-black'>Convenience Fee</h3>
                        <h3 className='text-black'>₹50.00</h3>
                    </div>

                    <div className='flex flex-row items-center justify-between border-b border-gray-400 pb-3 mb-3'>
                        <h3 className='text-black'>Tax (5%)</h3>
                        <h3 className='text-black'>₹30.00</h3>
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-black'>Grand Total</h3>
                        <h3 className='text-black font-bold text-xl'>₹{PKG[0].charge}</h3>
                    </div>


                </div>
                <div className={`fixed bottom-0 left-0 w-full  bg-white justify-center items-center p-3`}>

                        <button onClick={placeBooking} className='bg-violet-600 text-white p-2 rounded-md w-full h-12 sm:w-auto md:w-96 hover:bg-violet-400'>
                            Place booking
                        </button>
                    </div>
            </div>

            {/* ====================== */}

            <div className=' hidden md:block w-full text-black bg-white rounded-md p-7 mb-5 border border-gray-300 shadow-lg'>
                <h1 className='mb-5 text-xl font-medium'>Payment Summary</h1>
                <div className='space-y-3'>
                    <div className='flex justify-between space-x-28'>
                        <span>Package</span>
                        <span>₹{PKG[0].charge}.00</span>
                    </div>
                    <div className='flex justify-between space-x-28'>
                        <span>Convenience Fee</span>
                        <span>₹50.00</span>
                    </div>
                    <hr />
                    <div className='flex justify-between font-bold mb-10 space-x-2'>
                        <span>Grand Total</span>
                        <span>₹{PKG[0].charge}</span>
                    </div>
                    <div>

                        {/* Pay Now Button */}
                        <button
                            onClick={placeBooking}
                            className={` w-full border border-violet-500 text-violet-500 bg-white py-2 mt-7 px-4 rounded-md hover:bg-violet-600 hover:text-white`}
                        >
                            Pay Now
                        </button>
                    </div>

                </div>
            </div>

            <div className='hidden md:block w-full text-black bg-white rounded-md p-7 border border-gray-300 shadow-lg'>
                <div className='flex justify-between items-center space-x-24 mb-5'>
                    <h1 className='font-medium text-xl'>Package</h1>
                    {/* <button className="className='hidden hover:bg-slate-100 md:block bg-white px-3 py-1 mr-2  text-black rounded-md border border-gray-300">
                        Change
                    </button> */}
                </div>
                <div >
                    <div className='flex justify-between space-x-24 mb-3'>
                        <span className='text-[16px]'>{PKG[0].packageName}</span>
                        <span className='text-[16px]'>₹{PKG[0].charge}</span>
                    </div>

                    <div className='flex-wrap'>
                        {PKG[0].services.map((srv, index) => (
                            <span key={index}>
                                {srv}{index < PKG[0].services.length - 1 && ',\u00A0'}
                            </span>
                        ))}
                    </div>
                </div>
            </div>




        </>



    )
}
export default ReviewBooking