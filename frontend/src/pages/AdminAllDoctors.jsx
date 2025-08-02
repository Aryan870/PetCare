import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminAllDoctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
        setDoctors(doctors.filter((doctor) => doctor._id !== id));
        alert("Doctor deleted successfully!");
      } catch (error) {
        console.error("Error deleting doctor:", error);
        alert("Error deleting doctor.");
      }
    }
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Doctors</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Specialization</th>
              <th className="border p-2">Fees</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id} className="text-center">
                <td className="border p-2">{doctor.name}</td>
                <td className="border p-2">{doctor.email}</td>
                <td className="border p-2">{doctor.speciality}</td>
                <td className="border p-2">₹{doctor.fee}</td>
                <td className="border p-2">
                  <button
                    onClick={() => navigate(`/admin/edit-doctor/${doctor._id}`)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(doctor._id)}
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
    </div>
  );
};

export default AdminAllDoctors;
