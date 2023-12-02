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
    const handleDragTask = (taskIndex, dragData) => {
      console.log('handleDragTask: ', taskIndex, dragData);
      // Lógica para manejar el arrastre del task en la lista
      // Actualizar la posición del task en el estado local
    };

    const handleStopTask = (taskIndex, dragData) => {
      console.log('handleStopTask: ', taskIndex, dragData);
      // Lógica para manejar el soltar del task en la lista
      // Actualizar la posición final del task en el estado local
    };

    return (
      <RenderTask
        key={index}
        index={index}
        listName={listName}
        {...task}
        updateData={updateData}
        onDrag={handleDragTask}
        onStop={handleStopTask}
        modifyTask={() => handleModifyTask(task)}
      />
    );
  };

  const [taskToModify, setTaskToModify] = React.useState(null);

  // funcion que añade nuevas tareas
  const handleAddTask = newTask => {
    const currentTasks = storage.getListTasks(listName);
    const updatedTasks = [...currentTasks, newTask];
    storage.setListTasks(listName, updatedTasks);
    updateData();
  };

  // funcion que modifica teras
  const handleModifyTask = task => {
    setTaskToModify(task);
    setShowForm(true);
  };

  const handleUpdateTask = updatedTask => {
    const currentTasks = storage.getListTasks(listName);
    const updatedTasks = currentTasks.map(t =>
      t.text === taskToModify.text ? updatedTask : t,
    );
    storage.setListTasks(listName, updatedTasks);
    updateData();
    setShowForm(false);
    setTaskToModify(null);
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
              onClose={() => {
                setShowForm(false), setTaskToModify(null);
              }}
              onAddTask={handleAddTask}
              onModifyTask={handleUpdateTask}
              taskToModify={taskToModify}
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
