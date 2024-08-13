import Image from 'next/image';
import React from 'react';

type Props = {
    key: string;
    petname: string;
    image: string;
    breed:string;
    onClick: () => void;
}

const MypetsCard: React.FC<Props> = ({ petname,breed, onClick ,image}) => {
    const cloudurl = "https://static-vision.s3.ap-south-1.amazonaws.com/"
    return (
        <div 
            onClick={onClick} 
            className="min-h-28 h-48 md:h-48 w-full md:w-72 lg:w-80 flex flex-row justify-between items-center bg-white rounded-lg border border-gray-300 shadow-lg p-4 md:p-6 transform hover:scale-105 transition duration-300 cursor-pointer"
        >
            <div className="mb-4 md:mb-5 flex justify-center items-center mr-5">
                <Image
                    src={cloudurl+image}
                    alt="Golden Retriever"
                    width={120}
                    height={120}
                    className="rounded-full"
                />
            </div>
            <div className='flex flex-col items-center pr-10'>
                <h1 className='text-lg text-black md:text-2xl font-bold text-center'>{petname}</h1>
                <h4 className='text-sm text-black md:text-base text-center'>{breed}</h4>
            </div>
        </div>
    );
}

export default MypetsCard;
