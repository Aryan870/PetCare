import React, { useState, useEffect } from "react";
import axios from "axios";


const AdminAllAppointments = () => {
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/appointments");
      
      // ✅ Fetch doctor and patient names
      const updatedAppointments = await Promise.all(
        response.data.map(async (appointment) => {
          try {
            // ✅ Log Appointment Details
            console.log("Fetching details for Appointment:", appointment);
      
            // ✅ Fetch Doctor & Patient Data
            const doctorResponse = await axios.get(`http://localhost:5000/api/auth/${appointment.doctorId}`);
            const patientResponse = await axios.get(`http://localhost:5000/api/auth/${appointment.patientId}`);
      
            console.log("Doctor Response:", doctorResponse.data);
            console.log("Patient Response:", patientResponse.data);
      
            // ✅ Ensure valid responses before accessing properties
            const doctor = doctorResponse.data && doctorResponse.data.role === "DOCTOR" ? doctorResponse.data.name : "❌ No Doctor Found";
            const patient = patientResponse.data && patientResponse.data.role === "PATIENT" ? patientResponse.data.name : "❌ No Patient Found";
      
            return {
              ...appointment,
              doctorName: doctor,
              patientName: patient,
            };
          } catch (error) {
            console.error("❌ Error fetching doctor or patient details:", error);
            return {
              ...appointment,
              doctorName: "❌ API Error (Doctor)",
              patientName: "❌ API Error (Patient)",
            };
          }
        })
      );
      
      
      

      setAppointments(updatedAppointments);
      setLoading(false);
    } catch (err) {
      setError("Error fetching appointments.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      alert("Appointment deleted successfully!");
      fetchAppointments(); // Refresh list
    } catch (err) {
      alert("Error deleting appointment.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">All Appointments</h1>

      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4">Patient</th>
                <th className="py-2 px-4">Doctor</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Time</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b text-center">
                  <td className="py-2 px-4">{appointment.patientName}</td>
                  <td className="py-2 px-4">{appointment.doctorName}</td>
                  <td className="py-2 px-4">{appointment.date}</td>
                  <td className="py-2 px-4">{appointment.time}</td>
                  <td className={`py-2 px-4 ${appointment.status === "Confirmed" ? "text-green-600" : "text-red-600"}`}>
                    {appointment.status}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAllAppointments;
