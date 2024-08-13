
import React from 'react';

function AdrsSkeleton() {
    return (
        <>
            {/* SM */}
            <div className='sm:block md:hidden'>
                <div className="animate-pulse space-x-4 ">
                    <div className=" h-[110px] w-full bg-gray-300 rounded-md  shadow-lg"></div>
                </div>
            </div>

            {/* MD */}
            <div className='hidden md:block'>
                <div className="animate-pulse space-x-4 ">
                    <div className=" h-[141.28px] w-[225px] bg-gray-300 rounded-md  shadow-lg"></div>
                </div>
            </div>
        </>
    );
}

export default AdrsSkeleton;
