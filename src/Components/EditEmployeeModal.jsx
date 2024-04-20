import React, { useState } from 'react';

const EditEmployeeModal = ({ employee, onSave, onClose }) => {
  const [editedEmployee, setEditedEmployee] = useState({ ...employee });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedEmployee.id, editedEmployee);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={editedEmployee.name} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={editedEmployee.email} onChange={handleChange} />
          </label>
          <label>
            Department:
            <input type="text" name="department" value={editedEmployee.department} onChange={handleChange} />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
