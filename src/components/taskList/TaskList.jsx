import React from 'react';
import PropTypes from 'prop-types';
import { RenderTask } from './renderTask';
import TaskForm from '../taskForm';
import './TaskList.css';
import { Buttons } from '../shared';
import storage from '../../utils/storage';

const TaskList = ({ listName, tasks, updateData }) => {
  const [showForm, setShowForm] = React.useState(false);
  const renderTasks = (task, index) => {
    return (
      <RenderTask key={index} index={index} {...task} updateData={updateData} />
    );
  };

  // funcion que añade nuevas tareas
  const handleAddTask = newTask => {
    const currentTasks = storage.getListTasks(listName);
    const updatedTasks = [...currentTasks, newTask];
    storage.setListTasks(listName, updatedTasks);
    updateData();
  };

  const handleShowForm = () => {
    setShowForm(true);
  };
  return (
    <div className="tasks-list-container">
      <div>
        {tasks.length > 0 ? (
          <div>{tasks.map((task, index) => renderTasks(task, index))}</div>
        ) : (
          <p className="no-task-message">
            Still no tasks, would you like to create one?
          </p>
        )}
        {showForm && (
          <div>
            <TaskForm
              onClose={() => setShowForm(false)}
              onAddTask={handleAddTask}
            />
          </div>
        )}
      </div>
      <Buttons
        label="Create task"
        ariaLabel="Create task"
        type="button"
        className="create-task-button"
        onClick={handleShowForm}
      />
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  updateData: PropTypes.func,
  listName: PropTypes.string,
};

export default TaskList;
