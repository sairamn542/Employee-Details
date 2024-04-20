import React from 'react';

const DeleteEmployeePrompt = ({ onDelete, onClose }) => {
  const handleDelete = () => {
    onDelete(); // Trigger delete action
    onClose(); // Close prompt after deleting
  };

  return (
    <div className="prompt">
      <p>Are you sure you want to delete this employee?</p>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
};

export default DeleteEmployeePrompt;
