// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard"; // don’t forget to import
// import ProtectedRoute from "./components/ProtectedRoute.jsx"; // create this file
// import './index.css'
// import EditStudents from "./pages/EditStudents.jsx";
// const App = () => {
//   return (
//     <div>
//       <Routes>
//         {/* Default route → Dashboard but protected */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//       <Route path="/students/edit/:id" element={<EditStudents />} />
//             </ProtectedRoute>
//           }
//         />

//         {/* Public routes */}
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;


import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./index.css";
import EditStudents from "./pages/EditStudents.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Protected dashboard route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students/edit/:id"
          element={
            <ProtectedRoute>
              <EditStudents />
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;

