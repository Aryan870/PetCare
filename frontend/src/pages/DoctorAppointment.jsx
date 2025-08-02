import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const DoctorAppointment = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const doctor = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      if (!doctor || doctor.role !== "doctor") {
        alert("Unauthorized access. Redirecting...");
        navigate("/login");
        return;
      }

      try {
        const appointmentsRes = await axios.get(`http://localhost:5000/api/appointments/doctors/${doctor._id}`);
        setAppointments(appointmentsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 401) {
          alert("Session expired or unauthorized. Please log in again.");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, doctor?._id]);

  const handleAddPrescription = (appointment) => {
    navigate('/addprescription', { state: { appointment } });
  };

  if (loading) {
    return <div className="text-center p-4">Loading appointments...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">My Appointments</h2>
      {appointments.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {appointments.filter(appointment => appointment.status !== 'completed').map((appointment) => (
            <li key={appointment._id} className="p-4 bg-white rounded-md shadow mb-3">
              <p><strong>Patient:</strong> {appointment.patientId.name}</p>
              <p><strong>Date:</strong> {appointment.date} | <strong>Time:</strong> {appointment.time}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
              {appointment.status !== 'completed' && (
                <div className="flex space-x-2 mt-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={() => handleAddPrescription(appointment)}
                  >
                    Add Prescription
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                    onClick={() => navigate(`/chat/${appointment._id}/${doctor._id}/${appointment.patientId._id}`)}
                  >
                    Chat
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No appointments found.</p>
      )}
    </div>
  );
};

export default DoctorAppointment;
