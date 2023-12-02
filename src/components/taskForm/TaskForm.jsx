import React from 'react';
import PropTypes from 'prop-types';
import { Buttons, InputForm } from '../shared';
import './TaskForm.css';

const TaskForm = ({ onClose, onAddTask, taskToModify }) => {
  const today = new Date().toISOString().split('T')[0];
  const [task, setTask] = React.useState({
    text: '',
    date: today,
    description: '',
    priority: 'medium',
    estimatedDuration: 0,
    color: '#007bff',
    createdDate: today,
  });

  React.useEffect(() => {
    if (taskToModify) {
      setTask(taskToModify);
    }
  }, [taskToModify]);

  const handleChange = event => {
    setTask(oldTask => {
      const newTask = {
        ...oldTask,
        [event.target.name]: event.target.value,
      };
      return newTask;
    });
  };

  const handleAddTask = event => {
    event.preventDefault();
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTaskList = [...storedTasks, task];
    localStorage.setItem('tasks', JSON.stringify(newTaskList));
    onAddTask(task);
    onClose();
  };

  const handleModifyTask = event => {
    console.log(event);
  };

  const { text, date, description, priority, estimatedDuration, color } = task;

  return (
    <form
      className="add-task-form"
      onSubmit={taskToModify ? handleModifyTask : handleAddTask}
    >
      <Buttons
        className="close"
        type="button"
        onClick={onClose}
        label="X"
        ariaLabel="close-form"
      />
      <InputForm
        label="Task"
        className="text-input-container"
        type="text"
        id="text"
        name="text"
        value={text}
        onChange={handleChange}
        ariaLabel="Enter your task"
        required
      />
      <InputForm
        label="Due Date"
        className="text-input-container"
        type="date"
        id="date"
        name="date"
        value={date}
        onChange={handleChange}
        min={today}
        ariaLabel="Select due date"
        required={false}
      />
      <InputForm
        label="Description"
        className="date-input-container"
        type="text"
        id="description"
        name="description"
        value={description}
        onChange={handleChange}
        ariaLabel="Enter your description"
        required={false}
      />
      <div className="priority-input-container">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={priority}
          onChange={handleChange}
          aria-label="Select task priority"
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <InputForm
        label="Estimated Duration (hours)"
        className="duration-input-container"
        type="number"
        id="estimatedDuration"
        name="estimatedDuration"
        value={estimatedDuration}
        onChange={handleChange}
        ariaLabel="Enter estimated duration"
        required={false}
      />
      <InputForm
        label="Color"
        className="color-input-container"
        type="color"
        id="color"
        name="color"
        value={color}
        onChange={handleChange}
        ariaLabel="Select task color"
        required={false}
      />
      {taskToModify ? (
        <Buttons
          label="Modify task"
          ariaLabel="Modify task"
          type="submit"
          className="add-task"
        />
      ) : (
        <Buttons
          label="Add task"
          ariaLabel="Add task"
          type="submit"
          className="add-task"
        />
      )}
    </form>
  );
};

TaskForm.propTypes = {
  onAddTask: PropTypes.func,
  onClose: PropTypes.func,
  taskToModify: PropTypes.object,
};

export default TaskForm;
