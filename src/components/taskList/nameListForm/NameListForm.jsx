import React from 'react';
import { Buttons, InputForm } from '../../shared';
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
    <form className="add-list-form" onSubmit={handleAddList}>
      <Buttons
        label="X"
        type="button"
        className="close form-list"
        ariaLabel="close-form"
        onClick={onClose}
      />
      <InputForm
        label="Enter task name:"
        className="text-input-container"
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        ariaLabel="Enter your task"
        required
      />
      <Buttons
        label="Create list"
        className="create-lists-button"
        ariaLabel="Create new list"
        type="submit"
      />
    </form>
  );
};

NameListForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddNameList: PropTypes.func.isRequired,
};

export default NameListForm;
