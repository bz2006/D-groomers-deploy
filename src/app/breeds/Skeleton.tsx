
import React from 'react';

function SkeletonCard() {
    return (
        <div>
            <div className="animate-pulse flex m-6 space-x-4 ">
                <div className=" h-[341.28px] w-[241.6px] bg-gray-300 rounded-lg  shadow-lg"></div>
            </div>
        </div>
    );
}

export default SkeletonCard;
