import React from 'react';

const EmployeeList = ({ employees, currentPage, employeesPerPage, totalEmployees, paginate, onEdit, onDelete }) => {
  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.name} - {employee.position}
            <button onClick={() => onEdit(employee.id)}>Edit</button>
            <button onClick={() => onDelete(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default EmployeeList;
