import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../data/apiPath";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Overview = () => {
  const [summary, setSummary] = useState({ present: 0, absent: 0, total: 0 });
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Fetch all classes
  const fetchClasses = async () => {
    try {
      const res = await axios.get(`${API_URL}/class/my-classes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(res.data);
    } catch (error) {
      console.error("Failed to fetch classes", error);
    }
  };

  // Fetch attendance summary
  const fetchSummary = async () => {
    try {
      let url = `${API_URL}/attendance/summary?`;
      if (selectedClass) url += `classId=${selectedClass}&`;
      if (date) url += `date=${date}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.data || res.data.total === 0) {
        setMessage(
          "Attendance has not been recorded for the selected class and date."
        );
        setSummary({ present: 0, absent: 0, total: 0 });
      } else {
        setMessage("");
        setSummary(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch summary", error);
      setMessage("Error fetching attendance data.");
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchSummary();
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [selectedClass, date]);

  const data = [
    { name: "Present", value: summary.present, color: "#16a34a" },
    { name: "Absent", value: summary.absent, color: "#dc2626" },
  ];

  // Custom legend
  const renderLegend = () => {
    return (
      <div className="flex justify-center gap-6 mt-4">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-1 ">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-black font-semibold pl-1">{entry.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-5 bg-gradient-to-r from-teal-600 to-teal-400 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6">Attendance Overview</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-3 py-2 rounded text-black bg-white w-60"
        >
          <option value="">All Classes</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-3 py-2 rounded text-black bg-white w-60"
        />
      </div>

      {/* If no data */}
      {message ? (
        <div className="bg-white text-red-600 p-6 rounded-lg shadow text-center font-semibold">
          {message}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Chart left */}
          <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  animationBegin={0}
                  animationDuration={1200}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Custom Legend */}
            {renderLegend()}
          </div>

          {/* Stats right */}
          <div className="w-full md:w-1/2 bg-white text-black p-6 rounded-lg shadow flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">📌 Summary</h3>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {summary.date || date || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Total Records:</span>{" "}
              {summary.total}
            </p>
            <p className="text-green-600 font-semibold">Present: {summary.present}</p>
            <p className="text-red-600 font-semibold">Absent: {summary.absent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
