import React from 'react';
import PropTypes from 'prop-types';
import { RenderTask } from './renderTask';
import TaskForm from '../taskForm';
import './TaskList.css';
import { Buttons } from '../shared';
import storage from '../../utils/storage';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/constants';

const TaskList = ({ listName, tasks, updateData }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: item => {
      const { listName: sourceList, id: taskId } = item;

      if (sourceList !== listName) {
        const sourceTasks = storage.getListTasks(sourceList);
        const destinationTasks = storage.getListTasks(listName);

        const taskToMove = sourceTasks.find(task => task.id === taskId);

        if (taskToMove) {
          storage.setListTasks(listName, [...destinationTasks, taskToMove]);

          const updatedSourceTasks = sourceTasks.filter(
            task => task.id !== taskId,
          );

          storage.setListTasks(sourceList, updatedSourceTasks);
        }

        updateData();
      }
    },
  });

  const renderTasks = (task, index) => {
    return (
      <RenderTask
        key={index}
        index={index}
        listName={listName}
        {...task}
        updateData={updateData}
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

  // funcion que muestra el formulario para modificar tareas
  const handleModifyTask = task => {
    setTaskToModify(task);
    setShowForm(true);
  };

  // funcion que modifica tareas
  const handleUpdateTask = updatedTask => {
    const currentTasks = storage.getListTasks(listName);
    const updatedTasks = currentTasks.map(t =>
      t.id === taskToModify.id ? updatedTask : t,
    );
    storage.setListTasks(listName, updatedTasks);
    updateData();
    setShowForm(false);
    setTaskToModify(null);
  };

  // funcion que muestra el formulario para crear tareas
  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div className="tasks-list-container" ref={drop}>
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
