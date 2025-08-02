import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm">
        <div>
          {/* <img className='mb-5 w-40' src={assets.logo} alt="" /> */}
          <h1 className="text-2xl font-bold text-primary cursor-pointer hover:text-blue-600">
            Pet Connect
          </h1>
          <p className="w-full md:w-2/3 text-gray-600 leading-relaxed">
            At PetConnect Clinic, we provide compassionate, advanced veterinary
            care for every stage of your pet's life. We simplify health
            management with easy access to appointments and records. As your
            trusted partner, our team uses the latest technology to ensure your
            pet lives a long, healthy, and happy life
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>greatstackdev@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025 @ Telemedicine.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
