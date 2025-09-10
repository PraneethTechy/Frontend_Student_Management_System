import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../data/apiPath";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // start loading
      const response = await axios.post(
        `${API_URL}/teacher/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;
      alert("Login Success ");
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Invalid credentials ");
      } else {
        alert("Something went wrong ");
      }
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <h3 className="text-2xl font-bold text-center">Teacher Login</h3>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Email</label>
          <input
            type="text"
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
              Logging in...
            </>
          ) : (
            "Submit"
          )}
        </button>

        <p className="text-sm text-center mt-4">
          Didn’t Register?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Click here to Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
