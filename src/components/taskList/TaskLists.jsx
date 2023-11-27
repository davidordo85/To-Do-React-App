import React from 'react';
import storage from '../../utils/storage';
import NameListForm from './nameListForm/NameListForm';
import TaskList from './TaskList';
import { Buttons, Alert } from '../shared';
import './TaskLists.css';

function TaskLists() {
  const [storedData, setStoredData] = React.useState([]);
  const [showNameForm, setShowNameForm] = React.useState(false);
  const [showConfirmAlert, setShowConfirmAlert] = React.useState(false);
  const [message, setMessage] = React.useState('null');
  const [confirmStep, setConfirmStep] = React.useState(0);

  const updateData = () => {
    const dataFromStorage = storage.get('lists');
    console.log(dataFromStorage);
    if (dataFromStorage) {
      setStoredData(dataFromStorage);
    }
  };

  const handleAddTask = newList => {
    const updatedTasks = [...(storedData || []), newList];
    setStoredData(updatedTasks);
    storage.set('lists', updatedTasks);
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
      storage.remove('lists');
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
              <h3>{list.name}</h3>
              <TaskList />
            </div>
          ))}
        </div>
      ) : (
        <p>No lists available.</p>
      )}
    </div>
  );
}

export default TaskLists;
