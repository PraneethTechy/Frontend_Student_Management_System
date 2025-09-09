import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../data/apiPath";
import { LogOut } from 'lucide-react';


const Navbar = () => {
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState("Teacher");

  useEffect(() => {
    const fetchTeacher = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${API_URL}/teacher/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setProfileName(data.teacher.name);
        }
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };

    fetchTeacher();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-teal-500 px-6 py-4 shadow-md h-18">
      <h1 className="text-white text-2xl font-bold">Attendify</h1>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-white">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-800 font-semibold">
            {profileName.charAt(0).toUpperCase()}
          </span>
          <span className="text-lg font-bold">{profileName}</span>
        </div>

        <button
  onClick={handleLogout}
  className="flex items-center gap-2 bg-white text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
>
  <LogOut size={18} />
  Logout
</button>
      </div>
    </nav>
  );
};

export default Navbar;
