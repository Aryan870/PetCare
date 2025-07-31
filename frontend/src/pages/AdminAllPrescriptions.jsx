import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminAllPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/prescriptions");

        const updatedPrescriptions = await Promise.all(
          response.data.map(async (prescription) => {
            console.log("📌 Prescription Data:", prescription); // Debugging

            try {
              const doctorResponse = await axios.get(`http://localhost:5000/api/auth/${prescription.doctorId}`);
              const patientResponse = await axios.get(`http://localhost:5000/api/auth/${prescription.patientId}`);

              

              return {
                ...prescription,
                doctorName: doctorResponse.data.name || "Unknown Doctor",
                patientName: patientResponse.data.name || "Unknown Patient",
              };
            } catch (error) {
              console.error(`❌ Error fetching doctor (${prescription.doctorId}) or patient (${prescription.patientId}):`, error);
              return {
                ...prescription,
                doctorName: "❌ API Error (Doctor)",
                patientName: "❌ API Error (Patient)",
              };
            }
          })
        );

        setPrescriptions(updatedPrescriptions);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Prescriptions</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Doctor</th>
              <th className="border p-2">Patient</th>
              <th className="border p-2">Prescription</th>
              <th className="border p-2">Download</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{prescription.doctorName}</td>
                <td className="border p-2">{prescription.patientName}</td>
                <td className="border p-2">{prescription.prescriptionText}</td>
                <td className="border p-2">
                  <button
                    onClick={() =>
                      window.open(`http://localhost:5000/api/prescriptions/${prescription.id}/download`)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Download
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded mx-2"
                  onClick={() => axios.delete(`http://localhost:5000/api/prescriptions/${prescription.id}`)
                    .then(() => setPrescriptions(patients.filter(p => p.id !== prescription.id)))
                    .catch(err => console.error("Error deleting patient:", err))
                  }>
                  Delete
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllPrescriptions;
