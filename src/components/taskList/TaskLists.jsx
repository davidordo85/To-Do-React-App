import React from 'react';
import storage from '../../utils/storage';
import NameListForm from './nameListForm/NameListForm';
import TaskList from './TaskList';
import { Buttons, Alert } from '../shared';
import { FaTrashAlt } from 'react-icons/fa';
import './TaskLists.css';

function TaskLists() {
  const [storedData, setStoredData] = React.useState([]);
  const [showNameForm, setShowNameForm] = React.useState(false);
  const [showConfirmAlert, setShowConfirmAlert] = React.useState(false);
  const [message, setMessage] = React.useState('null');
  const [confirmStep, setConfirmStep] = React.useState(0);

  const updateData = () => {
    const dataFromStorage = storage.getList('lists');
    if (dataFromStorage) {
      setStoredData(dataFromStorage);
    }
  };

  const handleAddTask = newList => {
    const updatedTasks = [
      ...(storedData || []),
      { name: newList.name, tasks: [] },
    ];
    setStoredData(updatedTasks);
    storage.setList('lists', updatedTasks);
  };

  // funcion que hace funcionar el alert correctamente
  const deleteTasks = React.useCallback(() => {
    setShowConfirmAlert(true);
    if (confirmStep === 0) {
      setMessage('Are you sure you want to delete all lists?');
    }
    if (confirmStep === 1) {
      setShowConfirmAlert(false);
      setMessage('Are you really, really sure?');
      setShowConfirmAlert(true);
    }
    if (confirmStep === 2) {
      storage.removeLists('lists');
      setStoredData(null);
      setShowConfirmAlert(false);
      setConfirmStep(0);
    }
  }, [confirmStep]);

  React.useEffect(() => {
    updateData();
    if (confirmStep > 0) {
      deleteTasks();
    }
  }, [confirmStep, deleteTasks]);

  return (
    <div>
      <div className="deleted-created-container">
        {storedData && Array.isArray(storedData) && storedData.length > 0 ? (
          <Buttons
            label="Delete all Lists"
            ariaLabel="Delete all Lists"
            className="delete-button all"
            onClick={deleteTasks}
            type="button"
          />
        ) : null}
        <Buttons
          label="Create list"
          type="submit"
          className="create-lists-button"
          ariaLabel="Create a new list"
          onClick={() => setShowNameForm(true)}
        >
          Create list
        </Buttons>
      </div>

      {showConfirmAlert ? (
        <Alert
          message={message}
          onClose={() => setShowConfirmAlert(false)}
          onConfirm={() => setConfirmStep(confirmStep + 1)}
        />
      ) : null}

      {showNameForm ? (
        <NameListForm
          onClose={() => setShowNameForm(false)}
          onAddNameList={handleAddTask}
        />
      ) : null}

      {Array.isArray(storedData) && storedData.length > 0 ? (
        <div className="lists-container">
          {storedData.map((list, index) => (
            <div key={index} className={`list-container ${index}`}>
              <div className="list-container-header">
                <h1>{list.name}</h1>
                <Buttons
                  label={<FaTrashAlt className="delete-list-icon" />}
                  ariaLabel="delete-list"
                  className="delete-list-button"
                  type="button"
                />
              </div>

              <TaskList
                listName={list.name}
                tasks={list.tasks}
                updateData={updateData}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No lists available. Create lists!!!</p>
      )}
    </div>
  );
}

export default TaskLists;
