import React from 'react';
import { TaskList, TaskForm } from './components';
import './App.css';
function App() {
  const [storedData, setStoredData] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);
  React.useEffect(() => {
    const dataFromStorage = localStorage.getItem('tasks');
    if (dataFromStorage) {
      setStoredData(JSON.parse(dataFromStorage));
    }
  }, []);

  const handleAddTask = newTask => {
    const newTaskList = [...(storedData || []), newTask];
    setStoredData(newTaskList);
    localStorage.setItem('tasks', JSON.stringify(newTaskList));
  };

  return (
    <main className="main-container">
      <h1 className="title-todo">ToDo app</h1>
      <TaskList tasks={storedData} onShowTaskForm={() => setShowForm(true)} />

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
