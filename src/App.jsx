//import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { TaskLists } from './components';
import './App.css';

function App() {
  const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      <main className="main-container">
        <h1 className="title-todo">ToDo app</h1>
        <TaskLists />
      </main>
    </DndProvider>
  );
}

export default App;
