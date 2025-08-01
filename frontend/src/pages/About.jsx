import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px] rounded-lg"
          src="src/images/about.png"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p className="text-gray-600 text-sm leading-relaxed">
            PetConnect Clinic was founded on a simple principle: the bond
            between pets and their families deserves the best possible support.
            We believe that managing your companion's health should be a
            seamless and stress-free experience. That's why we've built our
            practice around providing accessible, compassionate care,
            simplifying everything from scheduling appointments to accessing
            their health history
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our commitment is to provide nothing less than excellence in
            veterinary medicine. Our dedicated team continuously enhances our
            services by integrating the latest advancements to deliver superior,
            effective care during every visit. From their very first check-up to
            managing ongoing health in their senior years, our promise is to be
            your trusted partner through every step of your pet's life journey.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p className="text-gray-600 text-sm leading-relaxed">
            To set a new standard in veterinary medicine where advanced,
            compassionate care is accessible to every pet. We envision a future
            where proactive wellness helps pets live longer, healthier, and
            happier lives. Our ultimate goal is to be the most trusted partner
            in strengthening the bond you share with your companion.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] m-1 hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFFICIENCY:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] m-1 hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CONVENIENCE: </b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] m-1 hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>PERSONALIZATION:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
