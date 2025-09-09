import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../data/apiPath';
import { ListChecks } from 'lucide-react';

const ViewAttendance = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  // Fetch classes for dropdown
  const fetchClasses = async () => {
    try {
      const res = await axios.get(`${API_URL}/class/my-classes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(res.data);
    } catch (error) {
      console.error('Failed to fetch classes:', error);
    }
  };

  // Fetch attendance records based on filters
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setMessage('');
      let url = `${API_URL}/attendance/teacher`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      let records = res.data;

      // Filter by class
      if (selectedClass) {
        records = records.filter((r) => r.class._id === selectedClass);
      }

      // Filter by date
      if (selectedDate) {
        const selected = new Date(selectedDate).toDateString();
        records = records.filter(
          (r) => new Date(r.date).toDateString() === selected
        );
      }

      setAttendanceRecords(records);

      if (records.length === 0) {
        setMessage('No attendance records found.');
      }
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
      setMessage('Failed to load attendance records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [token]);

  // Fetch whenever filters change
  useEffect(() => {
    fetchAttendance();
  }, [selectedClass, selectedDate]);

  return (
    <div className="p-6 bg-teal-500 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <ListChecks className="text-white" />
        <h2 className="text-2xl font-bold text-white">View Attendance</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6" bg-white>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-3 py-2 rounded focus:outline-none w-full sm:w-64 bg-white"
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
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 rounded focus:outline-none w-full sm:w-64 bg-white"
        />
      </div>

      {/* Loading */}
      {loading && <p className="text-white">Loading attendance...</p>}

      {/* Message */}
      {!loading && message && (
        <p className="text-white font-semibold">{message}</p>
      )}

      {/* Attendance Table */}
      {!loading && attendanceRecords.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2">Roll No</th>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((rec) => (
                <tr key={rec._id} className="border-b">
                  <td className="px-4 py-2">{rec.student.name}</td>
                  <td className="px-4 py-2 text-center">{rec.student.rollno}</td>
                  <td className="px-4 py-2 text-center">{rec.class.name}</td>
                  <td
                    className={`px-4 py-2 text-center font-semibold ${
                      rec.status === 'Present'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {rec.status}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {new Date(rec.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewAttendance;
