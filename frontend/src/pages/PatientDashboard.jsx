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
  const [showEmergency, setShowEmergency] = useState(false);
  const [availableDoctors, setAvailableDoctors] = useState([]);

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

  useEffect(() => {
    if (showEmergency) {
      const fetchAvailableDoctors = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/doctors/available");
          setAvailableDoctors(res.data);
        } catch (error) {
          console.error("Error fetching available doctors:", error);
        }
      };
      fetchAvailableDoctors();
    }
  }, [showEmergency]);

  const handleBookAppointment = (doctor, isEmergency = false) => {
    navigate("/bookappointment", { state: { doctor, isEmergency } });
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

  const isAppointmentActive = (appointment) => {
    if (!appointment || !appointment.time || typeof appointment.time !== 'string') {
      return false;
    }

    const now = new Date();
    const appointmentDate = new Date(appointment.date);

    if (isNaN(appointmentDate.getTime())) {
      return false;
    }

    const timeParts = appointment.time.split(' - ');
    if (timeParts.length !== 2) {
      return false;
    }

    const [startTime, endTime] = timeParts;

    const startHourParts = startTime.split(':');
    const endHourParts = endTime.split(':');

    if (startHourParts.length < 2 || endHourParts.length < 2) {
      return false;
    }

    const startHour = parseInt(startHourParts[0], 10);
    const startMinute = parseInt(startHourParts[1], 10);
    const endHour = parseInt(endHourParts[0], 10);
    const endMinute = parseInt(endHourParts[1], 10);

    if (isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute)) {
      return false;
    }

    const startDate = new Date(appointmentDate.getTime());
    startDate.setHours(startHour, startMinute, 0, 0);

    const endDate = new Date(appointmentDate.getTime());
    endDate.setHours(endHour, endMinute, 0, 0);

    return now.getTime() >= startDate.getTime() && now.getTime() <= endDate.getTime();
  };

  if (loading) return <div className="text-center p-4">Loading patient details...</div>;

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Patient Dashboard</h1>

      {showEmergency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Available Doctors for Emergency</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableDoctors.map((doctor) => (
                <div key={doctor._id} className="p-4 shadow-xl border rounded-md">
                  <h3 className="text-lg font-bold">{doctor.name}</h3>
                  <p className="text-gray-600">Specialization: {doctor.speciality}</p>
                  <p className="text-gray-600">Consultation Fee: ₹{doctor.fee}</p>
                  <button 
                    className="mt-2 w-full p-2 bg-primary text-white rounded-md"
                    onClick={() => handleBookAppointment(doctor, true)}
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
            <button 
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => setShowEmergency(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Patient Info */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-800">Patient Details</h2>
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => setShowEmergency(true)}
          >
            Emergency Booking
          </button>
        </div>
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
                {appointment.status !== 'completed' && (
                  <button
                    className={`mt-2 px-4 py-2 text-white rounded-md ${
                      isAppointmentActive(appointment)
                        ? "bg-green-500"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={() => navigate(`/chat/${appointment._id}/${patient._id}/${appointment.doctorId._id}`)}
                    disabled={!isAppointmentActive(appointment)}
                  >
                    Chat
                  </button>
                )}
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
                <p><strong>Date:</strong> {prescription.appointmentId?.date || 'N/A'}</p>
                <p><strong>Notes:</strong> {prescription.notes}</p>
                <p className="font-semibold mt-2">Medicines:</p>
                {prescription.medicines && prescription.medicines.length > 0 ? (
                  <ul className="list-disc list-inside ml-4">
                    {prescription.medicines.map((med, idx) => (
                      <li key={idx}>{med.name} - {med.dosage} ({med.frequency})</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 ml-4">No medicines prescribed.</p>
                )}
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