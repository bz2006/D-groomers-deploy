"use client"
import GPackages from '@/app/Components/GPackages'
import React, { useState, useEffect } from 'react'
import { Segmented } from 'antd';

// _dgBkDet

type GroomingPackage = {
    pid: string;
    breedname:string;
    img:string;
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
    img:string;
};

type Props = {
    breeds: Breeds;
};

const SBRenderer: React.FC<Props> = ({ breeds }) => {
    const [Details, setDetails] = useState<GroomingPackages | null>(null);
    const [currentAgePack, setCurrentAgePack] = useState<GroomingPackage[]>([]);


    useEffect(() => {
        if (breeds) {
            setDetails(breeds.groomingPackages);
            setCurrentAgePack(breeds.groomingPackages.puppy);
        }
    }, []);
    
    const filterByPid = (pid: string) => {
        if (Details) {
            // Search in all grooming packages for the specific pid
            let foundPackage: GroomingPackage | undefined;
    
            // Check each category
            for (let category in Details) {
                foundPackage = Details[category as keyof GroomingPackages].find(pkg => pkg.pid === pid);
                if (foundPackage) {
                    // Add breedname: breeds.breedname to the array
                    foundPackage.breedname = breeds.breedname;
                    foundPackage.img=breeds.img
                    break;
                }
            }
    
            return foundPackage;
        }
    
        return undefined;
    };
    
    const handleAgeChange = (value: string) => {

        if (Details) {
            if (value === "Puppy") {
                setCurrentAgePack(Details.puppy);
            } else if (value === "Teenage") {
                setCurrentAgePack(Details.teenage);
            } else if (value === "Adult") {
                setCurrentAgePack(Details.adult);
            }
        }
    };

    const ProccedToBooking = (keyProp:string)=>{
        const fd = filterByPid(keyProp)
        localStorage.setItem("_dgBkPKG", JSON.stringify(fd));
        
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-black sm:text-5xl">Grooming Packages for <span className='text-violet-700'>{breeds?.breedname}</span></h2>
            <p className="mt-4 text-xl text-gray-500">Simple, transparent charges for your furry friend.</p>
            <p className="mt-4 text-sm text-gray-500">Puppy {">"}6 Months | Teenage 7-18 Months | Adult {">"}19 Months</p>
          </div>
            <div className=' flex m-10 justify-center items-center '>
                <Segmented
                    size="large"
                    options={['Puppy', 'Teenage', 'Adult']}
                    onChange={(value) => {
                        handleAgeChange(value);
                    }}
                />
            </div>
        
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {currentAgePack.map((pkg) => (
                    <GPackages
                        key={pkg.pid}
                        packagename={pkg.packageName}
                        packagedescription={pkg.packageDesc}
                        services={pkg.services}
                        charge={pkg.charge}
                        keyProp={pkg.pid} 
                        onClick={ProccedToBooking}
                    />
                ))}
            </div>
        </div>
    );
};

export default SBRenderer;
