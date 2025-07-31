import React, { useState, useEffect } from "react";


const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("admin"));
    if (storedUser && storedUser.role === "ADMIN") {
        setAdmin(storedUser);
  
        
      }
  },[])

  return (
    <div className="p-8 min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, Admin : {admin ? admin.name : "Admin"}
      </h1>
      <h4><em>The Admin has control of overall Web App : Telemedicine</em></h4>

      
    </div>
  );
};

export default AdminDashboard;
