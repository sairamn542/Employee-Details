import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import EmployeeList from './Employeelist'
import EditEmployeeModal from './EditEmployeeModal'
import DeleteEmployeePrompt from './DeleteEMployee'
const Data = () => {
  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [availableEmployees, setAvailableEmployees] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5); // Number of employees to show per page
  const [showEditModal, setShowEditModal] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState(null);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);

  useEffect(() => {
    // Load employee data from local storage on component mount
    const savedEmployees = JSON.parse(localStorage.getItem('employees'));
    if (savedEmployees) {
      setEmployees(savedEmployees);
      // Update total and available employees count
      setTotalEmployees(savedEmployees.length);
      const availableCount = savedEmployees.filter(employee => employee.available).length;
      setAvailableEmployees(availableCount);
    }
  }, []);

  useEffect(() => {
    // Update local storage when employees state changes
    localStorage.setItem('employees', JSON.stringify(employees));
    // Filter employees based on search term
    const filtered = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [employees, searchTerm]);

  const editEmployee = (employeeId, updatedEmployee) => {
    const updatedEmployees = employees.map(employee => {
      if (employee.id === employeeId) {
        return updatedEmployee;
      }
      return employee;
    });
    setEmployees(updatedEmployees);
    // Close edit employee modal
    setShowEditModal(false);
  };

  const deleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
    setEmployees(updatedEmployees);
    setTotalEmployees(prevTotal => prevTotal - 1);
    // Check if the deleted employee was available
    // and update available employees count accordingly
    const deletedEmployee = employees.find(employee => employee.id === employeeId);
    if (deletedEmployee && deletedEmployee.available) {
      setAvailableEmployees(prevAvailable => prevAvailable - 1);
    }
    // Close delete prompt
    setShowDeletePrompt(false);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Get current employees
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  return (
    <div className="App">
      <Dashboard 
        totalEmployees={totalEmployees}
        availableEmployees={availableEmployees}
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />
      <EmployeeList
        employees={currentEmployees}
        currentPage={currentPage}
        employeesPerPage={employeesPerPage}
        totalEmployees={filteredEmployees.length}
        paginate={paginate}
        onEdit={(employeeId) => {
          setEditEmployeeData(employees.find(employee => employee.id === employeeId));
          setShowEditModal(true);
        }}
        onDelete={(employeeId) => {
          setDeleteEmployeeId(employeeId);
          setShowDeletePrompt(true);
        }}
      />
      {showEditModal && <EditEmployeeModal employee={editEmployeeData} onSave={editEmployee} onClose={() => setShowEditModal(false)} />}
      {showDeletePrompt && <DeleteEmployeePrompt onDelete={() => deleteEmployee(deleteEmployeeId)} onClose={() => setShowDeletePrompt(false)} />}
    </div>
  );
};

export default Data;
