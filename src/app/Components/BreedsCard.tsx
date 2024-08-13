
import React from 'react'

type Props = {
    range: string;
    bgColor: string;
    imgSrc: string;
    name: string;
    priceColor: string;
    breed: Breeds;
}

type GroomingPackage = {
    pid: string;
    breedname:string;
    packageName: string;
    packageDesc: string;
    services: string[];
    charge: number;
};

type GroomingPackages = {
    puppy: GroomingPackage[];
    teenage: GroomingPackage[];
    adult: GroomingPackage[];
};

type Breeds = {
    groomingPackages: GroomingPackages;
    breedname: string;
};

const BreedsCard: React.FC<Props> = ({ range, name, breed, imgSrc, bgColor, priceColor }) => {
    console.log(breed.groomingPackages.puppy[0].charge)
    return (
        <div className={`flex-shrink-0 m-6 relative overflow-hidden ${bgColor} border border-gray-300  hover:cursor-pointer  rounded-lg max-w-xs shadow-lg`}>
            <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: 'scale(1.5)', opacity: 0.1 }}>
                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
            </svg>
            <div className="relative pt-10 px-10 flex items-center justify-center">
                {/* <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{ background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: 0.2 }}></div> */}
                <img className="relative w-40" src={imgSrc} alt={name} />
            </div>
            <div className="relative text-black px-6 pb-6 mt-6">
            <span className="block font-semibold text-xl">{name}</span>
                <div className="flex justify-between mt-3">
                    
                    <span className="block opacity-75 -mb-1">{range}</span>
                    <span className={`block bg-slate-100 rounded-full ${priceColor} text-xs font-bold px-3 py-2 leading-none flex items-center`}>₹{breed.groomingPackages.puppy[0].charge}.00</span>
                </div>
            </div>
        </div>
    )
}

export default BreedsCard