import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 ">
      {/* --------- Header Left --------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Expert Care for <br /> Your Furry Friends
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src="src/images/group.png" alt="Happy pets and owners" />
          <p>
            Comprehensive veterinary services for all your beloved pets.{" "}
            <br className="hidden sm:block" /> Schedule appointments with our caring professionals today.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book Appointment{" "}
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* --------- Header Right --------- */}
      <div className="md:w-1/2 relative overflow-hidden">
        <img
          className="w-3/4 md:absolute bottom-0 h-auto rounded-lg ml-20"
          src="src/images/homepage.png"
          alt="Veterinary care for pets"
        />
      </div>
    </div>
  );
};

export default Header;
