import React, { useCallback } from 'react';
import { TaskList, TaskForm } from './components';
import storage from './utils/storage';
import Alert from './components/shared/alert/Alert';
import './App.css';
function App() {
  const [storedData, setStoredData] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);
  const [showConfirmAlert, setShowConfirmAlert] = React.useState(false);
  const [message, setMessage] = React.useState('null');
  const [confirmStep, setConfirmStep] = React.useState(0);

  // funcion que añade nuevas tareas
  const handleAddTask = newTask => {
    const updatedTasks = [...(storedData || []), newTask];
    setStoredData(updatedTasks);
    storage.set('tasks', updatedTasks);
  };

  // funcion que hace funcionar el alert correctamente
  const deleteTasks = useCallback(() => {
    setShowConfirmAlert(true);
    if (confirmStep === 0) {
      setMessage('Are you sure you want to delete all tasks?');
    }
    if (confirmStep === 1) {
      setShowConfirmAlert(false);
      setMessage('Are you really, really sure?');
      setShowConfirmAlert(true);
    }
    if (confirmStep === 2) {
      storage.remove('tasks');
      setStoredData(null);
      setShowConfirmAlert(false);
      setConfirmStep(0);
    }
  }, [confirmStep]);

  // funcion que recoge las tareas del local storage
  const updateData = () => {
    const dataFromStorage = storage.get('tasks');
    if (dataFromStorage) {
      setStoredData(dataFromStorage);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  React.useEffect(() => {
    updateData();
    if (confirmStep > 0) {
      deleteTasks();
    }
  }, [confirmStep, deleteTasks]);

  return (
    <main className="main-container">
      <h1 className="title-todo">ToDo app</h1>
      <div className="deleted-created-container">
        {storedData ? (
          <button className="delete-button all" onClick={deleteTasks}>
            Delete all tasks
          </button>
        ) : null}
        <button className="create-task-button" onClick={handleShowForm}>
          Create Task
        </button>
      </div>
      {storedData ? <div>filter</div> : ''}
      {showConfirmAlert ? (
        <Alert
          message={message}
          onClose={() => setShowConfirmAlert(false)}
          onConfirm={() => setConfirmStep(confirmStep + 1)}
        />
      ) : null}
      <TaskList tasks={storedData} updateData={updateData} />

      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onAddTask={handleAddTask}
        />
      )}
    </main>
  );
}

export default App;
