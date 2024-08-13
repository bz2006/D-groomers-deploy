import React from 'react'

type Props = {}

const NewsLetter = (props: Props) => {
    return (

        <div>

<div className='flex justify-center items-center w-full h-auto md:items-end md:justify-end md:mb-[-3.8rem] mb-[-3rem] md:pr-10'>
    <img
        src="/footer-cont-min.webp"
        className="w-full h-auto md:w-[44%]"
        alt="Background Image"
    />
</div>


<div className='bg-yellow-400 p-10 flex flex-col lg:flex-row items-center justify-between'>
    <div className='mb-5 lg:mb-0 lg:mr-20 text-center lg:text-left'>
        <h2 className='text-4xl font-rowdies text-black font-bold mb-2'>Stay Connected</h2>
        <p className='text-gray-800 text-lg'>Subscribe to our newsletter to receive exclusive updates and promotions.</p>
    </div>

    <div className='flex flex-col lg:flex-row items-center'>
        <input 
            type='text' 
            placeholder='Your Email Address' 
            className='border-0 bg-black px-5 py-3 mb-3 lg:mb-0 lg:mr-5 rounded-md text-white focus:outline-none w-full md:w-11/12 lg:w-3/4' 
        />
        <button className='bg-black text-white px-10 py-3 rounded-md hover:bg-gray-800 hover:text-white'>
            Subscribe
        </button>
    </div>
</div>

        </div>
    )
}

export default NewsLetter
