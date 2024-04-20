import React from 'react';

const Dashboard = ({ totalEmployees, availableEmployees, searchTerm, onSearch }) => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Total Employees: {totalEmployees}</p>
      <p>Available Employees: {availableEmployees}</p>
      <input type="text" value={searchTerm} onChange={(e) => onSearch(e.target.value)} placeholder="Search..." />
    </div>
  );
};

export default Dashboard;
