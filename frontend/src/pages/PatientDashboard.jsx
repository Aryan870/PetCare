import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || storedUser.role !== "patient") {
        alert("Unauthorized access. Redirecting...");
        navigate("/login");
        return;
      }

      setPatient(storedUser);

      try {
        const doctorsRes = await axios.get("http://localhost:5000/api/admin/doctors");
        setDoctors(doctorsRes.data);

        const [appointmentsRes, prescriptionsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/appointments/patient/${storedUser._id}`),
          axios.get(`http://localhost:5000/api/prescriptions/patient/${storedUser._id}`),
        ]);

        setAppointments(appointmentsRes.data);
        setPrescriptions(prescriptionsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleBookAppointment = (doctor) => {
    navigate("/bookappointment", { state: { doctor } });
  };

  const getDoctorName = (doctorId) => {
    console.log("Looking for doctorId:", doctorId);
    console.log("Doctors list:", doctors);
    const doctor = doctors.find((doc) => {
      console.log("Comparing with doctor _id:", doc._id);
      return doc._id === doctorId || doc._id === doctorId?._id;
    });
    return doctor ? doctor.name : "Unknown Doctor";
  };

  if (loading) return <div className="text-center p-4">Loading patient details...</div>;

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Patient Dashboard</h1>

      {/* Patient Info */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Patient Details</h2>
        <p className="text-gray-600"><strong>Name:</strong> {patient.name}</p>
        <p className="text-gray-600"><strong>Email:</strong> {patient.email}</p>
        <p className="text-gray-600"><strong>Phone:</strong> {patient.phone}</p>
        <p className="text-gray-600"><strong>Age:</strong> {patient.age}</p>
        <p className="text-gray-600"><strong>Breed:</strong> {patient.breed}</p>
        <p className="text-gray-600"><strong>Medical History:</strong> {patient.medicalHistory}</p>
        <p className="text-gray-600"><strong>Address:</strong> {patient.address}</p>
      </div>

      {/* Available Doctors */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Available Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="p-4 shadow-xl border rounded-md">
              <h3 className="text-lg font-bold">{doctor.name}</h3>
              <p className="text-gray-600">Specialization: {doctor.speciality}</p>
              <p className="text-gray-600">Consultation Fee: ₹{doctor.fee}</p>

              <div className="mt-2">
                <button 
                  className="w-full p-2 bg-primary text-white rounded-md"
                  onClick={() => handleBookAppointment(doctor)}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Appointments */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">My Appointments</h2>
        {appointments.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <li key={appointment._id} className="py-4">
                <p><strong>Doctor:</strong> {getDoctorName(appointment.doctorId)}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Status:</strong> {appointment.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No appointments found.</p>
        )}
      </div>

      {/* Patient Prescriptions */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">My Prescriptions</h2>
        {prescriptions.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {prescriptions.map((prescription) => (
              <li key={prescription._id} className="py-4">
                <p><strong>Doctor:</strong> {getDoctorName(prescription.doctorId)}</p>
                <p><strong>Date:</strong> {prescription.date}</p>
                <p><strong>Medication:</strong> {prescription.medication}</p>
                <p><strong>Dosage:</strong> {prescription.dosage}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No prescriptions found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;