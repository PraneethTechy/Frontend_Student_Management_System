import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../data/apiPath";

const ManageAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // Fetch teacher details to pre-fill the form
  const fetchTeacher = async () => {
    try {
      const res = await axios.get(`${API_URL}/teacher/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({
        name: res.data.name || "",
        email: res.data.email || "",
        password: "",
      });
    } catch (error) {
      console.error("Error fetching teacher:", error);
      setMessage("Failed to load account details.");
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_URL}/teacher/edit`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      setFormData({ ...formData, password: "" }); // clear password after update
    } catch (error) {
      console.error("Error updating teacher:", error);
      setMessage("Failed to update account.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-teal-600">Manage Account</h2>

        {message && (
          <p className="mb-4 text-center text-sm font-semibold text-red-500">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-400"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-400"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-400"
          />

          <button
            type="submit"
            className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition"
          >
            Update Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageAccount;
