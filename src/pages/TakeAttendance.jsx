import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../data/apiPath';

const TakeAttendance = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]); // default today
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // {studentId: 'Present'/'Absent'}
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  // Fetch all classes
  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${API_URL}/class/my-classes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(response.data);
    } catch (error) {
      console.error('Failed to fetch classes:', error);
    }
  };

  // Fetch students for the selected class
  const fetchStudents = async (classId) => {
    if (!classId) return;
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/student/my-students?classId=${classId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);

      // Initialize attendance state
      const initialAttendance = {};
      response.data.forEach((s) => (initialAttendance[s._id] = 'Present'));
      setAttendance(initialAttendance);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [token]);

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setSelectedClass(classId);
    fetchStudents(classId);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async () => {
    if (!selectedClass) {
      setMessage('Please select a class.');
      return;
    }

    try {
      setSubmitting(true);
      setMessage('');

      for (const s of students) {
        await axios.post(
          `${API_URL}/attendance/mark`,
          {
            studentId: s._id,
            status: attendance[s._id],
            date: selectedDate, // send selected date
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setMessage('Attendance marked successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to mark attendance. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-teal-500 min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-4">Take Attendance</h2>

      {/* Class & Date selection */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 ">
        <select
          value={selectedClass}
          onChange={handleClassChange}
          className="px-3 py-2 rounded focus:outline-none w-full max-w-sm mb-2 sm:mb-0 bg-white"
        >
          <option value="">Select Class</option>
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
          className="px-3 py-2 rounded focus:outline-none w-full max-w-xs bg-white"
        />
      </div>

      {/* Loading or no students */}
      {loading ? (
        <p className="text-white">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-white">No students found for this class.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Roll No</th>
                <th className="px-4 py-2">Present</th>
                <th className="px-4 py-2">Absent</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-b">
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.rollno}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleAttendanceChange(student._id, 'Present')}
                      className={`px-3 py-1 rounded ${
                        attendance[student._id] === 'Present'
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-200'
                      }`}
                    >
                      Present
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleAttendanceChange(student._id, 'Absent')}
                      className={`px-3 py-1 rounded ${
                        attendance[student._id] === 'Absent'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200'
                      }`}
                    >
                      Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Submit button */}
      {students.length > 0 && (
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
          >
            {submitting ? 'Submitting...' : 'Submit Attendance'}
          </button>
        </div>
      )}

      {/* Feedback message */}
      {message && <p className="mt-4 text-white font-semibold">{message}</p>}
    </div>
  );
};

export default TakeAttendance;
