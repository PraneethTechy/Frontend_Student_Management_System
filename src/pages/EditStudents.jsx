// src/pages/EditStudents.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../data/apiPath";


const EditStudents = () => {


  const { id } = useParams(); // student ID
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    rollno: "",
    class: "",
  });
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch student details
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`${API_URL}/student/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent({
          name: res.data.name,
          rollno: res.data.rollno,
          class: res.data.class?._id || "",
        });
      } catch (err) {
        console.error("Error fetching student:", err);
      }
    };

    const fetchClasses = async () => {
      try {
        const res = await axios.get(`${API_URL}/class/my-classes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(res.data);
      } catch (err) {
        console.error("Error fetching classes:", err);
      }
    };

    const loadData = async () => {
      setLoading(true);
      await fetchStudent();
      await fetchClasses();
      setLoading(false);
    };

    loadData();
  }, [id, token]);

  // Handle form change
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}/student/${id}`,
        {
          name: student.name,
          rollno: student.rollno,
          class: student.class,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Student updated successfully!");
      navigate("/");  
    } catch (err) {
      console.error("Error updating student:", err);
      alert(err.response?.data?.message || "Failed to update student.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full bg-teal-500">
        <p className="text-white text-lg">Loading student data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Student Name */}
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={handleChange}
          placeholder="Student Name"
          className="w-full border px-3 py-2 rounded"
        />

        {/* Roll Number */}
        <input
          type="text"
          name="rollno"
          value={student.rollno}
          onChange={handleChange}
          placeholder="Roll Number"
          className="w-full border px-3 py-2 rounded"
        />

        {/* Class Dropdown */}
        <select
          name="class"
          value={student.class}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Select Class --</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditStudents;
