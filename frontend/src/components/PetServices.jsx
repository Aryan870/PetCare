import React from "react";
import doc1 from "../images/doc1.png";
import doc2 from "../images/doc2.png";
import doc3 from "../images/doc3.png";
import doc4 from "../images/doc4.png";

const PetServices = () => {
  const services = [
    {
      title: "Wellness Exams",
      description:
        "Comprehensive health checkups to keep your pet in optimal condition.",
      icon: doc1, // Using existing doctor image
    },
    {
      title: "Vaccinations",
      description:
        "Protection against common diseases through up-to-date immunizations.",
      icon: doc2,
    },
    {
      title: "Dental Care",
      description:
        "Professional cleaning and dental health maintenance for your pet.",
      icon: doc3,
    },
    {
      title: "Grooming",
      description:
        "Essential care for your pet’s hygiene, health, and overall comfort.",
      icon: doc4,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800">
      <h1 className="text-3xl font-medium">Our Pet Care Services</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Comprehensive veterinary services for your beloved companions.
      </p>
      <div className="flex flex-wrap justify-center gap-8 pt-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center w-48"
          >
            <img
              src={service.icon}
              alt={service.title}
              className="w-16 h-16 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetServices;
