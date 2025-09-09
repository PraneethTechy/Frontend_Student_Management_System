import React, { useState } from "react";
import axios from "axios";
import API_URL from "../data/apiPath";

const AddClass = () => {
  const [className, setClassName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ New state

  const handleCreateClass = async () => {
    if (!className.trim()) {
      setMessage("Please enter a class name");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true); // ✅ Start loading
      setMessage("");

      const response = await axios.post(
        `${API_URL}/class/create`,
        { name: className },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Class created successfully!");
      setClassName("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to create class. Please try again.");
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-teal-600">Add Class</h2>
        <input
          type="text"
          placeholder="Enter class name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading} // disable input while loading
        />
        <button
          onClick={handleCreateClass}
          disabled={loading} // disable button
          className={`w-full flex justify-center items-center gap-2 px-4 py-2 rounded transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-blue-700 text-white"
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
              Creating...
            </>
          ) : (
            "Create Class"
          )}
        </button>
        {message && (
          <p className="mt-4 text-sm font-medium text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddClass;
