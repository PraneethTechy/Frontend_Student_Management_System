import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../data/apiPath';
import { Sliders } from 'lucide-react';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false); // filter change loader
  const [initialLoad, setInitialLoad] = useState(true); // initial page load
  const [selectedClass, setSelectedClass] = useState('all');
  const token = localStorage.getItem('token');

  // Fetch students (optionally filtered)
  const fetchStudents = async (classId = 'all') => {
    try {
      let url = `${API_URL}/student/my-students`;
      if (classId !== 'all') url += `?classId=${classId}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      setStudents([]);
    }
  };

  // Fetch classes for filter
  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${API_URL}/class/my-classes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(response.data);
    } catch (error) {
      console.error('Failed to fetch classes:', error);
      setClasses([]);
    }
  };

  // Initialize on mount
  useEffect(() => {
    const initialize = async () => {
      setInitialLoad(true);
      await fetchClasses();
      await fetchStudents();
      setInitialLoad(false);
    };
    initialize();
  }, [token]);

  // Handle filter change
  const handleFilterChange = async (e) => {
    const classId = e.target.value;
    setSelectedClass(classId);
    setLoading(true);
    await fetchStudents(classId);
    setLoading(false);
  };

  if (initialLoad) {
    return (
      <div className="flex justify-center items-center h-full bg-teal-500">
        <p className="text-white text-lg">Loading students...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-teal-500 min-h-screen">
      {/* Header + Filter */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Your Students</h2>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded text-black">
          <Sliders className="text-black" />
          <select
            value={selectedClass}
            onChange={handleFilterChange}
            className="px-2 py-1 rounded focus:outline-none bg-white"
          >
            <option value="all" >All Students</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id} >
                {cls.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Grid */}
      {students.length === 0 ? (
        <p className="text-white text-lg">No students found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
          {students.map((student) => (
            <div
              key={student._id}
              className="bg-white rounded-lg shadow p-4 flex flex-col justify-between hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-teal-700">{student.name}</h3>
              <p className="text-gray-600 mt-2">Roll No: {student.rollno}</p>
              <p className="text-gray-600 mt-1">
                Class: {student.class?.name || 'N/A'}
              </p>
            </div>
          ))}

          {/* Overlay loader during filter change */}
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center  rounded-lg text-white ">
              <p className="text-teal-700 font-semibold">Loading...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewStudents;
