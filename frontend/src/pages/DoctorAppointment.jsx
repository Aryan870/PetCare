import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const doctor = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      // Check for doctor authorization
      if (!doctor || doctor.role !== "doctor") {
        alert("Unauthorized access. Redirecting...");
        navigate("/login");
        return;
      }

      try {
        // Fetch appointments and patient data concurrently
        const [appointmentsRes, patientsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/appointments/doctors/${doctor._id}`),
          // Change this to fetch only the necessary patient data, or all if needed
          axios.get("http://localhost:5000/api/admin/patients"),
        ]);

        setAppointments(appointmentsRes.data);
        setPatients(patientsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle unauthorized access or other errors
        if (error.response && error.response.status === 401) {
          alert("Session expired or unauthorized. Please log in again.");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Depend on doctor._id to re-fetch if the user changes
  }, [navigate, doctor?._id]);

  // Use useCallback to memoize the function, preventing re-creation on every render
  const getPatientName = useCallback((patientId) => {
    // The find method is correct, but let's ensure it's robust
    const patient = patients.find((p) => p._id === patientId);
    return patient ? patient.name : "Unknown Patient";
  }, [patients]); // Depend on the 'patients' state

  if (loading) {
    return <div className="text-center p-4">Loading appointments...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">My Appointments</h2>
      {appointments.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <li key={appointment._id} className="p-4 bg-white rounded-md shadow mb-3">
              {console.log(appointment.patientId.name)}
              {/* <p><strong>Patient:</strong> {getPatientName(appointment.patientId)}</p> */}
              <p><strong>Patient:</strong> {appointment.patientId.name}</p>
              <p><strong>Date:</strong> {appointment.date} | <strong>Time:</strong> {appointment.time}</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => navigate("/addprescription", { state: { appointment } })}
              >
                Add Prescription
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No appointments found.</p>
      )}
    </div>
  );
};

export default DoctorAppointments;