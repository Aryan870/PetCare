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
      setAppointments(response.data);
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
                <tr key={appointment._id} className="border-b text-center">
                  <td className="py-2 px-4">{appointment.patientId ? appointment.patientId.name : "N/A"}</td>
                  <td className="py-2 px-4">{appointment.doctorId ? appointment.doctorId.name : "N/A"}</td>
                  <td className="py-2 px-4">{new Date(appointment.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{appointment.time}</td>
                  <td className={`py-2 px-4 ${appointment.status === "Confirmed" ? "text-green-600" : "text-red-600"}`}>
                    {appointment.status}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(appointment._id)}
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
