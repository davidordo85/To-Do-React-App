import React from 'react';
import storage from '../../utils/storage';
import NameListForm from './nameListForm/NameListForm';
import TaskList from './TaskList';
import { Buttons } from '../shared';
import './TaskLists.css';

function TaskLists() {
  const [storedData, setStoredData] = React.useState([]);
  const [showNameForm, setShowNameForm] = React.useState(false);

  const updateData = () => {
    const dataFromStorage = storage.get('lists');
    console.log(dataFromStorage);
    if (dataFromStorage) {
      setStoredData(dataFromStorage);
    }
  };

  const handleAddTask = newList => {
    const updatedTasks = [...storedData, newList];
    setStoredData(updatedTasks);
    storage.set('lists', updatedTasks);
  };

  React.useEffect(() => {
    updateData();
  }, []);

  return (
    <div>
      <Buttons
        label="Create list"
        type="submit"
        className="create-lists-button"
        ariaLabel="Create a new list"
        onClick={() => setShowNameForm(true)}
      >
        Create list
      </Buttons>
      {showNameForm ? (
        <NameListForm
          onClose={() => setShowNameForm(false)}
          onAddNameList={handleAddTask}
        />
      ) : null}

      <div className="lists-container">
        {storedData.map((list, index) => (
          <div key={index} className={`list-container ${index}`}>
            <h3>{list.name}</h3>
            <TaskList />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskLists;
