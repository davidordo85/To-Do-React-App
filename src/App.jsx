import { TaskList, TaskForm } from './components';
import './App.css';
function App() {
  return (
    <main className="main-container">
      <h1 className="title-todo">ToDo app</h1>
      <TaskList />
      <TaskForm />
    </main>
  );
}

export default App;
