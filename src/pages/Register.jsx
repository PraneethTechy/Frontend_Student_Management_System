import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../data/apiPath";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // start loading
      const response = await fetch(`${API_URL}/teacher/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        alert("Teacher Registered Successfully ✅");
        navigate("/login"); // redirect to login after success
      } else {
        alert(data.message || "Registration failed ❌");
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-bold text-center">Teacher Register</h3>

        {/* Username */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your username"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
            disabled={loading}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 py-2 rounded-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
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
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>

        {/* Link to Login */}
        <p className="text-sm text-center mt-4">
          Already Registered?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
