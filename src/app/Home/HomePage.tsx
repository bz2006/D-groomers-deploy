import Image from "next/image";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import NewsLetter from "./Sections/newsletter";import Link from 'next/link'
import HowWeWork from "./Sections/how-wework";
import Shorts from "./Sections/shorts";
import SkeletonCard from "../breeds/Skeleton";

export default function HomePage() {
  return (
    <>


      <div className="bg-cover bg-no-repeat bg-center pb-[6.5rem] md:pb-[4.5rem] " style={{ backgroundImage: 'url(/home-bg.svg)' }}>
        <Header />

        <div className="w-full">
          <div className="p-6  md:p-12 lg:p-24 items-center ">
            <h1 className="text-black  text-5xl text-center md:text-left md:text-5xl sm:text-[3.3rem] lg:text-[90px] font-extrabold leading-tight">
              Your Pet's<br /> Favourite<br /> <span className="text-violet-600">Groomers</span>
            </h1>
            <p className="text-gray-600 text-center md:text-left text-base md:text-lg lg:text-[20px] font-medium mt-4 ">
              Schedule the best grooming services for<br />your furry friend.
            </p>
            <div className="flex items-center justify-center md:justify-start lg:justify-start md:mb-5">
              <button className="bg-violet-600 justify-center items-center  text-white py-2 px-4 md:py-3 md:px-7 rounded-full mt-8 md:mt-10">
                Explore Now
              </button>
            </div>

          </div>
        </div>

        <div className="flex justify-center items-center w-full h-auto md:items-end md:justify-end md:mt-[-37.5rem] md:pr-10">
          <img
            src="/home-bg-img.png"
            className="w-full h-auto md:w-[44%]"
            alt="Background Image"
          />
        </div>


      </div>
      <div className="flex mt-[-10.5rem] items-center justify-center py-6 ">
        <div className="bg-violet-600   mt-10 w-11/12 md:w-[87.666667%] lg:w-[87.666667%] rounded-3xl p-6 md:p-10 lg:p-12 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left mb-4 md:mb-0">
              <span className="font-bold text-lg md:text-xl sm:2xl lg:text-2xl">Get 10% OFF your first booking!</span>
              <br />
              In consequat, quam id sodales hendrerit, eros mi lacinia risus neque.
            </p>
            <button className="bg-white text-black font-bold py-2 px-4 md:py-3 md:px-7 rounded-full mt-4 md:mt-0">
              TREATS
            </button>
          </div>
        </div>

      </div>
      
      <Shorts/>

      <HowWeWork/>

      <NewsLetter />

      <Footer />
    </>
  );
}
