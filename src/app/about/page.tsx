import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

type Props = {}

const Aboutus = (props: Props) => {
    return (
        <>
            <Header />
            <div className="mt-8 text-center p-3 mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl text-black font-bold font-rowdies">Who are we ?</h1>
                <h2 className="text-lg sm:text-xl text-gray-500 mt-2">We are the top dog groomers providing our best services at your home</h2>
                <span className="block w-1/12 h-1 bg-violet-500 mx-auto mt-4"></span>
            </div>

            <div className="flex justify-center items-center mb-24 p-7 md:p-0 lg:p-0">
                <div className="flex flex-col sm:flex-row bg-yellow-500 w-full sm:w-4/5 items-center rounded-3xl py-8 sm:py-12 justify-center space-y-8 sm:space-y-0 sm:space-x-6  md:space-x-28">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-rowdies">5k+</h1>
                        <p className="text-lg sm:text-xl font-bold">Happy Pets</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-rowdies">10+</h1>
                        <p className="text-lg sm:text-xl font-bold">Professional Groomers</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-rowdies">20+</h1>
                        <p className="text-lg sm:text-xl font-bold">Cities</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-rowdies">5k+</h1>
                        <p className="text-lg sm:text-xl font-bold">Happy Pets</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Aboutus
