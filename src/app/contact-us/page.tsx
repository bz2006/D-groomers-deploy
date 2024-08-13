"use client"
import React from 'react'
import { Input } from "antd"
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const { TextArea } = Input;

type Props = {}

const Contactus = (props: Props) => {
    return (
        <>
            <Header />
            <div className="mt-8 text-center p-3">
                <h1 className="text-6xl text-black font-bold font-rowdies">Let’s keep in touch</h1>
                <h2 className="text-xl text-gray-500 mt-2">Reach Out for Any Questions, Feedback, or Assistance</h2>
                <span className="block w-1/12 h-1 bg-violet-500 mx-auto mt-4"></span>
            </div>
            <div className="p-10 pt-10 md:px-24 lg:px-24 h-auto md:h-screen flex flex-col">
                {/* Heading Section */}

                <div className="flex flex-col md:flex-row flex-1">
                    {/* Image Section */}
                    <div className="md:w-1/2 h-64 md:h-full">
                        <img
                            src="/images/contact-us.jpg"
                            alt="Placeholder"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 md:w-1/2 mt-4 md:mt-0 md:ml-4 flex flex-col space-y-12">
                        <Input placeholder="Name" name='Name' size='large' className='border border-gray-400 h-fit rounded-[0.300rem]' />
                        <Input placeholder="Email Address" name='Email Address' size='large' className='border border-gray-400 h-fit rounded-[0.300rem]' />
                        <Input placeholder="Phone Number" name='Phone Number' size='large' className='border border-gray-400 h-fit rounded-[0.300rem]' />
                        <TextArea placeholder="Your Message" className='border border-gray-400 h-fit rounded-[0.300rem]' rows={4} />
                        <button
                            className="w-full border border-violet-500 text-violet-500 bg-white py-2 px-4 rounded-md hover:bg-violet-600 hover:text-white"
                        >
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contactus
