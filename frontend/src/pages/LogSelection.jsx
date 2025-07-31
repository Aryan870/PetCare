import React from "react";
import { useNavigate } from "react-router-dom";

const LogSelection = () => {
  const navigate = useNavigate();

  const togglePatient = () => {
    navigate("/patientLogin");
  };

  const toggleDoctor = () => {
    navigate("/doctorLogin");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Login As</h1>
      <p className="text-lg text-gray-600 mb-10">Select your designation to proceed</p>
      <div className="flex flex-wrap justify-center gap-8">
        {/* Doctor Card */}
        <div
          className="w-60 p-6 bg-blue-50 border-2 border-blue-600 rounded-xl shadow-md text-center cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
          onClick={toggleDoctor}
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Doctor</h2>
          <p className="text-gray-600">Login for Doctors</p>
        </div>

        {/* Patient Card */}
        <div
          className="w-60 p-6 bg-green-50 border-2 border-green-600 rounded-xl shadow-md text-center cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
          onClick={togglePatient}
        >
          <h2 className="text-2xl font-bold text-green-600 mb-2">Patient</h2>
          <p className="text-gray-600">Login for Patients</p>
        </div>
      </div>
    </div>
  );
};

export default LogSelection;
