import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminAllBillings = () => {
  const [billings, setBillings] = useState([]);

  useEffect(() => {
    const fetchBillings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/billings");
        setBillings(response.data);
      } catch (error) {
        console.error("Error fetching billings:", error);
      }
    };

    fetchBillings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this billing record?")) {
      try {
        await axios.delete(`http://localhost:5000/api/billings/${id}`);
        setBillings(billings.filter((bill) => bill.id !== id));
        alert("Billing record deleted successfully!");
      } catch (error) {
        console.error("Error deleting billing record:", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Billings</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Patient</th>
              <th className="border p-2">Doctor</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Issued At</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {billings.map((bill) => (
              <tr key={bill.id} className="text-center">
                <td className="border p-2">{bill.id}</td>
                <td className="border p-2">{bill.patientName}</td>
                <td className="border p-2">{bill.doctorName}</td>
                <td className="border p-2">₹{bill.amount}</td>
                <td className="border p-2">{bill.status}</td>
                <td className="border p-2">{new Date(bill.issuedAt).toLocaleString()}</td>
                <td className="border p-2">
                  <button
                    onClick={() => window.open(`http://localhost:5000/api/billings/${bill.id}/download`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(bill.id)}
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

export default AdminAllBillings;
