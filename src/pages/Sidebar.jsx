import React from 'react';
import { 
  Home, CheckSquare, PlusCircle, UserPlus, List, 
  Users, User, LogOut, ClipboardCheck 
} from 'lucide-react';
import { useNavigate } from "react-router-dom";


const Sidebar = ({ active, setActive }) => {

    const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', icon: <Home size={18} /> },
    { name: 'Take Attendance', icon: <CheckSquare size={18} /> },
    { name: 'View Attendance', icon: <ClipboardCheck size={18} /> },
    { name: 'Add Class', icon: <PlusCircle size={18} /> },
    { name: 'Add Student', icon: <UserPlus size={18} /> },
    { name: 'View Classes', icon: <List size={18} /> },
    { name: 'View Students', icon: <Users size={18} /> },
    { name: 'Manage Account', icon: <User size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col justify-between min-h-screen">
      {/* Top Section */}
      <div className="p-4 flex-1">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-2 p-3 w-full text-left rounded hover:bg-gray-700 transition ${
                active === item.name ? 'bg-gray-700' : ''
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Logout Fixed at Bottom */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-3 bg-red-600 hover:bg-red-700 rounded transition w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
