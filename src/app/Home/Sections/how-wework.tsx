import React from 'react'

type Props = {}

const HowWeWork = (props: Props) => {
    return (

        <>
            <div className="mt-8 text-center">
                <h1 className="text-6xl text-black font-bold font-rowdies">How we <span className="text-violet-600">Work</span>?</h1>
                <h2 className="text-xl text-gray-500 mt-2">Simple, Easy, and Stress-Free</h2>
                <span className="block w-1/12 h-1 bg-violet-500 mx-auto mt-4"></span>
            </div>
            <div className="p-4 pt-10 md:px-24 lg:24 h-screen flex flex-col">
                {/* Heading Section */}


                <div className="flex flex-col md:flex-row flex-1">
                    {/* Image Section */}
                    <div className="hidden sm:block md:w-1/2 h-1/2 md:h-full">
                        <img
                            src="/home-cont-1.jpg"
                            alt="Placeholder"
                            className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition duration-300"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 md:w-1/2 mt-4 md:mt-0 md:ml-4 flex flex-col justify-center">
                        <div className="flex-1 flex flex-col space-y-4 justify-center">
                            <div className="flex-grow p-4 bg-white border border-gray-300 shadow-lg rounded flex items-center transform hover:scale-105 transition duration-300">
                                <div className='flex justify-center items-center text-black mr-4'>
                                    <h1 className='text-5xl font-bold'>1</h1>
                                </div>
                                <div className='text-black'>
                                    <p>Schedule your booking online.</p>
                                </div>
                            </div>
                            <div className="flex-grow p-4 bg-white border border-gray-300 shadow-lg rounded flex items-center transform hover:scale-105 transition duration-300">
                                <div className='flex justify-center items-center text-black mr-4'>
                                    <h1 className='text-5xl font-bold'>2</h1>
                                </div>
                                <div className='text-black'>
                                    <p>Professional pet groomer comes to your doorstep.</p>
                                </div>
                            </div>
                            <div className="flex-grow p-4 bg-white border border-gray-300 shadow-lg rounded flex items-center transform hover:scale-105 transition duration-300">
                                <div className='flex justify-center items-center text-black mr-4'>
                                    <h1 className='text-5xl font-bold'>3</h1>
                                </div>
                                <div className='text-black'>
                                    <p>Grooming service happens in your home, So no travel stress for your pets</p>
                                </div>
                            </div>
                            <div className="flex-grow p-4 bg-white border border-gray-300 shadow-lg rounded flex items-center transform hover:scale-105 transition duration-300">
                                <div className='flex justify-center items-center text-black mr-4'>
                                    <h1 className='text-5xl font-bold'>4</h1>
                                </div>
                                <div className='text-black'>
                                    <p>You're all set!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HowWeWork
