import React from 'react'


const BksSkeleton = () => {
    
    return (
        <>
            {/* SM */}
            <div className='block md:hidden'>
                <div className="animate-pulse space-x-4 py-3">
                    <div className=" h-[8rem] w-full bg-gray-300 rounded-md  shadow-lg"></div>
                </div>
            </div>

            {/* MD */}
            <div className='hidden md:block'>
                <div className="animate-pulse space-x-4 py-3">
                    <div className=" h-[17rem] w-[60rem] bg-gray-300 rounded-md  shadow-lg"></div>
                </div>
            </div>
        </>
    )
}

export default BksSkeleton
