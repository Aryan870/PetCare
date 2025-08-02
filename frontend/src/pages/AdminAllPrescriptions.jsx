import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminAllPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/prescriptions");
      setPrescriptions(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching prescriptions.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this prescription?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/prescriptions/${id}`);
      alert("Prescription deleted successfully!");
      setPrescriptions(prescriptions.filter((p) => p._id !== id));
    } catch (err) {
      alert("Error deleting prescription.");
    }
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Prescriptions</h1>

      {loading ? (
        <p>Loading prescriptions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Doctor</th>
                <th className="border p-2">Patient</th>
                <th className="border p-2">Prescription</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription) => (
                <tr key={prescription._id} className="text-center">
                  <td className="border p-2">{prescription.doctorId ? prescription.doctorId.name : "N/A"}</td>
                  <td className="border p-2">{prescription.patientId ? prescription.patientId.name : "N/A"}</td>
                  <td className="border p-2">{prescription.notes}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(prescription._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded mx-2"
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

export default AdminAllPrescriptions;
