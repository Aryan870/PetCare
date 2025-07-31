import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [parsedAvailability, setParsedAvailability] = useState([]);

  useEffect(() => {
    // ✅ Get logged-in doctor from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Stored User in DoctorDashboard:", storedUser);

    if (storedUser && storedUser.role === "doctor") {
      setDoctor(storedUser);

      // Parse timings string into availability array
      if (storedUser.timings) {
        const availabilityArray = storedUser.timings.split('; ').map(slot => {
          const [day, timeRange] = slot.split(': ');
          const [startTime, endTime] = timeRange.split('-');
          return { day, startTime, endTime };
        });
        setParsedAvailability(availabilityArray);
      }

      // ✅ Fetch doctor's appointments
      axios
        .get(`http://localhost:5000/api/appointments/doctors/${storedUser._id}`)
        .then((response) => setAppointments(response.data))
        .catch((error) => console.error("Error fetching appointments:", error));
    }
  }, []);
 

  if (!doctor) return <div className="text-center p-4">Loading doctor details...</div>;

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Doctor Dashboard</h1>

      {/* Doctor Info */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Doctor Details</h2>
        <p className="text-gray-600"><strong>Name:</strong> {doctor.name}</p>
        <p className="text-gray-600"><strong>Specialization:</strong> {doctor.speciality}</p>
        <p className="text-gray-600"><strong>Fees:</strong> ₹{doctor.fee}</p>
      </div>

      {/* Available Slots */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Available Time Slots</h2>
        <ul className="flex gap-3 flex-wrap">
          {parsedAvailability.map((slot, index) => (
            <li key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm shadow-md">
              {slot.day} ({slot.startTime} - {slot.endTime})
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Appointments Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Appointments</h2>
        {appointments.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="py-4 flex justify-between">
                <div>
                  <p><strong>Appointment ID:</strong>{appointment.id}</p>
                  <p><strong>Patient ID:</strong> {appointment.patientId}</p>
                  <p><strong>Date:</strong> {appointment.date}</p>
                  <p><strong>Time:</strong> {appointment.time}</p>
                  <p><strong>Status:</strong> {appointment.status || "Pending"}</p>
                </div>
                
                {/* ✅ Video Call Button */}
                {appointment.status === "Confirmed" && (
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    onClick={() => navigate(`/videocall/${appointment.roomId}`)}
                  >
                    Start Video Call
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No appointments yet.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
