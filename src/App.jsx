import React from 'react';
import { TaskList, TaskForm } from './components';
import storage from './utils/storage';
import './App.css';
function App() {
  const [storedData, setStoredData] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);
  React.useEffect(() => {
    updateData();
  }, []);

  const updateData = () => {
    const dataFromStorage = storage.get('tasks');
    if (dataFromStorage) {
      setStoredData(dataFromStorage);
    }
  };

  const handleAddTask = newTask => {
    const updatedTasks = [...(storedData || []), newTask];
    setStoredData(updatedTasks);
    storage.set('tasks', updatedTasks);
  };

  const deleteTasks = () => {
    storage.remove('tasks');
    setStoredData(null);
  };

  return (
    <main className="main-container">
      <h1 className="title-todo">ToDo app</h1>
      <div className="deleted-created-container">
        <button className="delete-button all" onClick={deleteTasks}>
          Delete all tasks
        </button>
        <button
          className="create-task-button"
          onClick={() => setShowForm(true)}
        >
          Create Task
        </button>
      </div>
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
