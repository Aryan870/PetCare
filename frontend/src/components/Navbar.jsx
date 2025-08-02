import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Load user & admin details when component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));

    setUser(storedUser);
    setAdmin(storedAdmin);
  }, []);

  // ✅ Listen for login/logout changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
      setAdmin(JSON.parse(localStorage.getItem("admin")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    if (admin) {
      localStorage.removeItem("admin"); // ✅ Logout admin
      setAdmin(null);
      navigate("/admin/login");
    } else {
      localStorage.removeItem("user"); // ✅ Logout user
      setUser(null);
      navigate("/");
    }
    window.location.reload(); // Refresh UI after logout
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-primary cursor-pointer hover:text-blue-600"
        >
          Pet Connect 🐾
        </h1>

      {/* Desktop Navigation Links */}
      <ul className="md:flex items-start gap-5 font-medium hidden">
        <NavLink to="/">
          <li className="py-1">HOME</li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {/* ✅ If Admin is Logged In */}
        {admin ? (
          <div className="relative" ref={dropdownRef}>
            <img
              className="w-8 h-8 rounded-full cursor-pointer"
              src={assets.profile_pic}
              alt="Admin Profile"
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-3 z-50">
                <p className="cursor-pointer font-semibold text-gray-700">
                  Admin: {admin.name}
                </p>

                <p
                  onClick={() => navigate("/admin/dashboard")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  Dashboard
                </p>
                <p
                  onClick={() => navigate("/admin/doctors")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  All Doctors
                </p>
                <p
                  onClick={() => navigate("/admin/patients")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  All Patients
                </p>
                <p
                  onClick={() => navigate("/admin/appointments")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  All Appointments
                </p>
                <p
                  onClick={() => navigate("/admin/prescriptions")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  All Prescriptions
                </p>
                <p
                  onClick={() => navigate("/admin/billings")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  All Billings
                </p>

                <hr className="my-2" />
                <p
                  onClick={handleLogout}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : user ? (
          <div className="relative" ref={dropdownRef}>
            <img
              className="w-8 h-8 rounded-full cursor-pointer"
              src={assets.profile_pic}
              alt="Profile"
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-3 z-50">
                <p
                  onClick={() => navigate("/myprofile")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  My Profile
                </p>

                {user.role.toLowerCase() === "patient" && (
                  <>
                    <p
                      onClick={() => navigate("/patientdashboard")}
                      className="cursor-pointer hover:text-blue-600"
                    >
                      My Dashboard
                    </p>
                    <p
                      onClick={() => navigate("/myappointments")}
                      className="cursor-pointer hover:text-blue-600"
                    >
                      My Appointments
                    </p>
                    <p
                      onClick={() => navigate("/mybillings")}
                      className="hover:text-blue-600 cursor-pointer"
                    >
                      My Billings
                    </p>
                  </>
                )}

                {user.role.toLowerCase() === "doctor" && (
                  <>
                    <p
                      onClick={() => navigate("/doctordashboard")}
                      className="cursor-pointer hover:text-blue-600"
                    >
                      My Dashboard
                    </p>
                    <p
                      onClick={() => navigate("/doctorappointments")}
                      className="cursor-pointer hover:text-blue-600"
                    >
                      Appointments
                    </p>
                  </>
                )}

                <hr className="my-2" />
                <p
                  onClick={handleLogout}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/signup")}
            className="bg-primary text-white px-3 py-1 rounded-full font-light hidden md:block"
          >
            Login/Signup
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
