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

  console.log(storedData, showForm);
  return (
    <main className="main-container">
      <h1 className="title-todo">ToDo app</h1>
      <TaskList tasks={storedData} onShowTaskForm={() => setShowForm(true)} />

      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
    </main>
  );
}

export default App;
