import React from 'react'
import Link from 'next/link'

type Props = {
  key: string;
  packagename: string;
  packagedescription: string;
  charge: number;
  services: string[];
  keyProp: string;
  onClick: (key: string) => void;
}

const GPackages: React.FC<Props> = ({ packagename, packagedescription, charge, services,onClick,keyProp }) => {
  return (


    <div className="bg-white rounded-lg  min-w-64 border border-gray-300 shadow-lg p-6 transform hover:scale-105 transition duration-300">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-black">{packagename}</h3>
        <p className="mt-4 text-gray-400">{packagedescription}</p>
      </div>
      <div className="mb-8">
        <span className="text-5xl font-extrabold text-black">₹{charge}</span>
      </div>
      <ul className="mb-8 space-y-4 text-gray-400">
        {services.length > 0 && services.map((srv,index) => (
          <li className="flex items-center" key={index}>
            <svg
              className="h-6 w-6 text-green-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{srv}</span>
          </li>
        ))}

      </ul>
      <Link
        href="/confirm-booking"
        onClick={()=>onClick(keyProp)}
        className="block w-full py-3 px-6 text-center rounded-md text-violet-600 font-medium bg-white border border-violet-600 hover:bg-violet-100"
      >
        Book Now
      </Link>
    </div>

  )
}

export default GPackages