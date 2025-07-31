import React from "react";
import { useNavigate } from "react-router-dom";

const SignupSelection = () => {
  const navigate = useNavigate();

  const togglePatient = () => {
    navigate("/patientSignup");
  };

  const toggleDoctor = () => {
    navigate("/doctorSignup");
  };

  return (
    <div className="flex flex-col items-center py-16 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Signup As</h1>
      <p className="text-lg text-gray-600 mb-8">Select your designation to proceed</p>

      <div className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-2xl">
        {/* Doctor Card */}
        <div
          className="w-full md:w-1/2 p-6 bg-blue-50 border-2 border-blue-600 rounded-2xl shadow-md text-center cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
          onClick={toggleDoctor}
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Doctor</h2>
          <p className="text-gray-600">Signup for Doctors</p>
        </div>

        {/* Patient Card */}
        <div
          className="w-full md:w-1/2 p-6 bg-green-50 border-2 border-green-600 rounded-2xl shadow-md text-center cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
          onClick={togglePatient}
        >
          <h2 className="text-2xl font-bold text-green-600 mb-2">Patient</h2>
          <p className="text-gray-600">Signup for Patients</p>
        </div>
      </div>

      <p className="mt-8 text-gray-600">Already have an account?</p>
      <button
        onClick={() => navigate("/login")}
        className="mt-2 bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary-dark transition"
      >
        Log In
      </button>
    </div>
  );
};

export default SignupSelection;
