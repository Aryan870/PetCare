import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      alert("Unauthorized access. Redirecting...");
      navigate("/login");
      return;
    }

    axios.get(`http://localhost:5000/api/auth/${storedUser._id}`)
      .then(response => {
        setUser(response.data);
        setFormData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
        setLoading(false);
      });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle profile update
  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/auth/${user._id}`, formData)
      .then(() => {
        alert("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(formData));
        navigate("/myprofile");
      })
      .catch(error => console.error("Error updating profile:", error));
  };

  // ✅ Handle account deletion
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible!")) {
      axios.delete(`http://localhost:5000/api/auth/${user._id}`)
        .then(() => {
          alert("Account deleted successfully.");
          localStorage.removeItem("user");
          navigate("/login");
        })
        .catch(error => console.error("Error deleting account:", error));
    }
  };

  if (loading) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <form className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input type="text" name="name" value={formData.name || ""} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input type="email" name="email" value={formData.email || ""} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>

        {/* Doctor-specific fields */}
        {user.role === "DOCTOR" && (
          <>
            <div>
              <label className="block font-medium">Specialization</label>
              <input type="text" name="specialization" value={formData.specialization || ""} onChange={handleChange} className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block font-medium">Consultation Fees</label>
              <input type="number" name="fees" value={formData.fees || ""} onChange={handleChange} className="w-full p-2 border rounded-md" />
            </div>
          </>
        )}

        {/* Patient-specific fields */}
        {user.role === "PATIENT" && (
          <>
            <div>
              <label className="block font-medium">Age</label>
              <input type="number" name="age" value={formData.age || ""} onChange={handleChange} className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block font-medium">Medical History</label>
              <textarea name="medicalHistory" value={formData.medicalHistory || ""} onChange={handleChange} className="w-full p-2 border rounded-md"></textarea>
            </div>
          </>
        )}

        {/* Patient-specific fields */}
        {user.role === "ADMIN" && (
          <>
            
            
          </>
        )}

        <button type="button" onClick={handleUpdate} className="w-full bg-primary text-white py-2 rounded-md">Update Profile</button>
        <button type="button" onClick={handleDeleteAccount} className="w-full bg-red-500 text-white py-2 rounded-md mt-2">Delete Account</button>
      </form>
    </div>
  );
};

export default MyProfile;
