import React from 'react';
import storage from '../../utils/storage';
import NameListForm from './nameListForm/NameListForm';
import TaskList from './TaskList';

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
      <button onClick={() => setShowNameForm(true)}>Create list</button>
      {showNameForm ? (
        <NameListForm
          onClose={() => setShowNameForm(false)}
          onAddNameList={handleAddTask}
        />
      ) : null}

      <div>
        {storedData.map((list, index) => (
          <div key={index}>
            <h3>{list.name}</h3>
            <TaskList />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskLists;
