import React from 'react';
import { CloseFormButton } from '../../shared';
import PropTypes from 'prop-types';

const NameListForm = ({ onAddNameList, onClose }) => {
  const [formData, setFormData] = React.useState({ name: '' });

  const handleChange = event => {
    setFormData(oldTask => {
      const newTask = {
        ...oldTask,
        [event.target.name]: event.target.value,
      };
      return newTask;
    });
  };

  const handleAddList = event => {
    event.preventDefault();
    onAddNameList(formData);
    onClose();
  };

  return (
    <form className="add-task-form" onSubmit={handleAddList}>
      <CloseFormButton onClose={onClose} />
      <div className="text-input-container">
        <label htmlFor="name">Enter task name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          aria-label="Enter your task"
          required
        />
      </div>
      <button type="submit">Create List</button>
    </form>
  );
};

NameListForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddNameList: PropTypes.func.isRequired,
};

export default NameListForm;
