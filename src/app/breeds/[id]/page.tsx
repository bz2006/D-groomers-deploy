"use client"
import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import axios from 'axios';
import SBRenderer from './renderer';
import Loading from './loading';

type Props = {
  params: {
    id: string;
  };
};

type GroomingPackage = {
  pid: string;
  breedname: string;
  img: string;
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
  img: string;
};

const SingleBreed = ({ params }: Props) => {
  const [breed, setBreed] = useState<Breeds | null>(null);

  const fetchBreed = async (id: string) => {
    try {
      const res = await axios.get(`/api/breeds/getsinglebreed/${id}`);
      setBreed(res.data['data']);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchBreed(params.id);
    }
  }, [params.id]);

  return (
    <>
      <Header bgcolor={"bg-white"} />

      <section className="bg-white py-12">
        {breed ? (
          <SBRenderer breeds={breed} />
        ) : (
          <Loading/>
        )}
      </section>

      <Footer />
    </>
  );
};

export default SingleBreed;