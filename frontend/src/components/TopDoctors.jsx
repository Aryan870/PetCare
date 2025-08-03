import React from "react";
import { useNavigate } from "react-router-dom";
import { doctors } from "../assets/assets";

const TopDoctors = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Our Expert Veterinarians</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Meet our team of compassionate veterinary professionals dedicated to
        your pet's health.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(4, 10).map((item, index) => (
          <div
            className="border border-blue-200 rounded-xl overflow-hidden"
            key={index}
          >
            <img
              className="bg-blue-50"
              src={item.image}
              alt={`Dr. ${item.name} - ${item.speciality}`}
            />
            <div className="p-4">
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        View Available Doctors
      </button>
    </div>
  );
};

export default TopDoctors;
