import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../data/apiPath';

const ViewClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${API_URL}/class/my-classes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(response.data); // assuming response.data is array of classes
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full bg-teal-500">
        <p className="text-white text-lg">Loading classes...</p>
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="flex justify-center items-center h-full bg-teal-500">
        <p className="text-white text-lg">No classes found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-teal-500 min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-6">Your Classes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col justify-between hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-teal-700">{cls.name}</h3>
            <p className="text-gray-600 mt-2">Students: {cls.students?.length || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewClasses;
