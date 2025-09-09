import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../data/apiPath";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const token = localStorage.getItem("token");

  // Fetch classes to populate the class dropdown
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${API_URL}/class/my-classes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(response.data);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };

    fetchClasses();
  }, [token]);

  const handleAddStudent = async () => {
    if (!name.trim() || !rollno.trim() || !classId) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true); // start loading
      setMessage("");

      await axios.post(
        `${API_URL}/student/add`,
        { name, rollno, classId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Student added successfully!");
      setName("");
      setRollno("");
      setClassId("");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage(
        error.response?.data?.message || "❌ Failed to add student. Please try again."
      );
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="flex justify-center items-center h-full p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-teal-700">Add Student</h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={loading}
        />

        {/* Roll Number */}
        <input
          type="text"
          placeholder="Enter roll number"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={loading}
        />

        {/* Class Selection */}
        <select
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={loading}
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          onClick={handleAddStudent}
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 px-4 py-2 rounded transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 text-white"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 
                    0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Adding...
            </>
          ) : (
            "Add Student"
          )}
        </button>

        {/* Message */}
        {message && <p className="mt-4 text-sm font-medium text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default AddStudent;
