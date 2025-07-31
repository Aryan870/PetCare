import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminAllPatients = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/patients")
      .then(response => setPatients(response.data))
      .catch(error => console.error("Error fetching patients:", error));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Patients</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Id</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Password</th>
            <th className="border p-2">age</th>
            <th className="border p-2">Medical History</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td className="border p-2">{patient.id}</td>
              <td className="border p-2">{patient.name}</td>
              <td className="border p-2">{patient.email}</td>
              <td className="border p-2">{patient.password}</td>
              <td className="border p-2">{patient.age}</td>
              <td className="border p-2">{patient.medicalHistory}</td>
              <td className="border p-2">
              <button
                    onClick={() => navigate(`/admin/editpatient/${patient.id}`)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2"
                  >
                    Edit
                  </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => axios.delete(`http://localhost:5000/api/auth/${patient.id}`)
                    .then(() => setPatients(patients.filter(p => p.id !== patient.id)))
                    .catch(err => console.error("Error deleting patient:", err))
                  }>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllPatients;
