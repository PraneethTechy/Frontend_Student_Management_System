import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TakeAttendance from './TakeAttendance';
import AddClass from './AddClass';
import AddStudent from './AddStudent';
import ViewClasses from './ViewClasses';
import ViewStudents from './ViewStudents';
import ManageAccount from './ManageAccount';
import Navbar from '../components/Navbar';
import ViewAttendence from './ViewAttendence';
import Overview from './Overview';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Home');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Home':
        return <Overview />;
      case 'Take Attendance':
        return <TakeAttendance />;
      case 'View Attendance':
        return <ViewAttendence />
      case 'Add Class':
        return <AddClass />;
      case 'Add Student':
        return <AddStudent />;
      case 'View Classes':
        return <ViewClasses />;
      case 'View Students':
        return <ViewStudents />;
      case 'Manage Account':
        return <ManageAccount />;
      default:
        return <Home />;
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex">
      <Sidebar active={activeComponent} setActive={setActiveComponent} />
      <div className="flex-1 p-6">
        {renderComponent()}
      </div>
    </div>
        </>

  );
};

export default Dashboard;
