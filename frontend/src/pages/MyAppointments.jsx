import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState({});

  useEffect(() => {
    // ✅ Get logged-in patient from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.role !== "PATIENT") {
      alert("Unauthorized access. Redirecting...");
      navigate("/login");
      return;
    }

    // ✅ Fetch Appointments
    axios
      .get(`http://localhost:5000/api/appointments/patient/${storedUser.id}`)
      .then((response) => {
        console.log("Fetched Appointments:", response.data); // ✅ Debugging
        if (Array.isArray(response.data)) {
          setAppointments(response.data);

          // ✅ Fetch prescriptions for appointments that have a prescriptionId
          response.data.forEach((appointment) => {
            if (appointment.prescriptionId) {
              axios
                .get(`http://localhost:5000/api/prescriptions/${appointment.prescriptionId}`)
                .then((res) => {
                  setPrescriptions((prev) => ({
                    ...prev,
                    [appointment.prescriptionId]: res.data,
                  }));
                })
                .catch((err) => console.error("Error fetching prescription:", err));
            }
          });
        } else {
          setAppointments([]);
        }
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  }, [navigate]);

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Appointments</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Your Appointments</h2>
        {appointments.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {appointments.map((appointment, index) => (
              <li key={index} className="py-4 flex flex-col md:flex-row md:justify-between">
                <div>
                  <p className="text-gray-600">
                    <strong>Doctor:</strong> {appointment.doctorName} | 
                    <strong> Specialization: </strong> {appointment.specialization} | 
                    <strong> Date:</strong> {appointment.date} | 
                    <strong> Time:</strong> {appointment.time}
                  </p>
                </div>

                {/* 🔹 Show Download Prescription Button Only if Prescription Exists */}
                {appointment.prescriptionId && prescriptions[appointment.prescriptionId] && (
                  <button
                    className="bg-blue-500 text-white px-3 py-2 rounded mt-2 md:mt-0"
                    onClick={() =>
                      window.open(`http://localhost:5000/api/prescriptions/${appointment.prescriptionId}/download`)
                    }
                  >
                    Download Prescription
                  </button>
                )}

                {/* 🔹 Connect Button (Only if CONFIRMED & has a roomId) */}
                {appointment.status === "Confirmed" && appointment.roomId && (
                  <button
                    onClick={() => navigate(`/videocall/${appointment.roomId}`)}
                    className="mt-2 md:mt-0 px-4 py-2 bg-green-500 text-white rounded-lg"
                  >
                    Connect
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
