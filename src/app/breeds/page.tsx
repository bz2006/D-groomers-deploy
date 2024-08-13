"use client"
import React, { useState, useEffect } from 'react';
import{Input} from "antd"
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import BreedsCard from '../Components/BreedsCard';
import axios from 'axios';
import Navigator from "@/app/Components/DivNav"; // Assuming Navigator component is imported
import SkeletonCard from './Skeleton';

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
  _id:string;
  groomingPackages: GroomingPackages;
  breedname: string;
  img:string;
};

const BreedsPage = () => {
  const [breeds, setBreeds] = useState<Breeds[]>([]);
  const [filteredBreeds, setFilteredBreeds] = useState<Breeds[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBreeds = async () => {
      
      try {
        const res = await axios.get("/api/breeds/getallbreeds");
        setBreeds(res.data.data);
        setFilteredBreeds(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    setLoading(true);
    fetchBreeds();
  }, []);

  useEffect(() => {
    const filterBreeds = () => {
      const filtered = breeds.filter(breed =>
        breed.breedname.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBreeds(filtered);
    };

    filterBreeds();
  }, [searchQuery, breeds]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="bg-cover bg-repeat bg-center sm:bg-[url('/wave-1-md.svg')] bg-[url('/wave-1-sm.svg')]">
        <Header bgcolor={"bg-white"} />

        <div className="p-3 mt-4 sm:mt-16">
          <div className='px-4 sm:px-12 mb-4 mt-4'>
            <Input
              type="text"
              placeholder="Search breeds..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 border border-gray-400 h-fit rounded-[0.300rem] w-full sm:w-1/3"
            />
          </div>

          <div className='flex flex-wrap justify-center items-center'>

            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              filteredBreeds.length > 0 ? (
                filteredBreeds.map((breed: Breeds) => (
                  <div key={breed._id}>
                    <Navigator path={`/breeds/${breed._id}`}>
                      <BreedsCard
                        range="Starting from"
                        name={breed.breedname}
                        breed={breed}
                        imgSrc={breed.img}
                        bgColor="bg-white"
                        priceColor="text-violet-600"
                      />
                    </Navigator>
                  </div>
                ))
              ) : (
                <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
              )
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BreedsPage;
