import React from 'react';
import PropTypes from 'prop-types';
import { Buttons } from '../shared';
import './TaskForm.css';

const TaskForm = ({ onClose, onAddTask }) => {
  const today = new Date().toISOString().split('T')[0];
  const [task, setTask] = React.useState({
    text: '',
    date: today,
    description: '',
    priority: 'medium',
    estimatedDuration: 0,
    status: 'pending',
    color: '#007bff',
    createdDate: today,
  });

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

  const {
    text,
    date,
    description,
    priority,
    estimatedDuration,
    status,
    color,
  } = task;

  return (
    <form className="add-task-form" onSubmit={handleAddTask}>
      <Buttons
        className="closed"
        type="button"
        onClick={onClose}
        label="X"
        aria-label="close-form"
      />
      <div className="text-input-container">
        <label htmlFor="text">Task</label>
        <input
          type="text"
          id="text"
          name="text"
          value={text}
          onChange={handleChange}
          aria-label="Enter your task"
          required
        />
      </div>
      <div className="date-input-container">
        <label htmlFor="date">Due Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={handleChange}
          min={today}
          aria-label="Select due date"
        />
      </div>
      <div className="date-input-container">
        <label htmlFor="date">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={handleChange}
          aria-label="Enter your description"
          required
        />
      </div>
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
      <div className="duration-input-container">
        <label htmlFor="estimatedDuration">Estimated Duration (hours)</label>
        <input
          type="number"
          id="estimatedDuration"
          name="estimatedDuration"
          value={estimatedDuration}
          onChange={handleChange}
          aria-label="Enter estimated duration"
        />
      </div>
      <div className="status-input-container">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={handleChange}
          aria-label="Select task status"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
        </select>
      </div>
      <div className="color-input-container">
        <label htmlFor="color">Color</label>
        <input
          type="color"
          id="color"
          name="color"
          value={color}
          onChange={handleChange}
          aria-label="Select task color"
        />
      </div>
      <button type="submit" className="add-task">
        Add task
      </button>
    </form>
  );
};

TaskForm.propTypes = {
  onAddTask: PropTypes.func,
  onClose: PropTypes.func,
};

export default TaskForm;
