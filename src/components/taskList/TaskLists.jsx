import React from 'react';
import NameListForm from './nameListForm/NameListForm';

function TaskLists() {
  const [showNameForm, setShowNameForm] = React.useState(false);
  const [lists, setLists] = React.useState([]);

  const handleCreateList = newList => {
    setLists(prevLists => [...prevLists, newList]);
    setShowNameForm(false);
  };

  return (
    <div>
      <button onClick={() => setShowNameForm(true)}>Create list</button>
      {showNameForm ? (
        <NameListForm
          onClose={() => setShowNameForm(false)}
          onAddNameList={handleCreateList}
        />
      ) : null}

      <div>
        {lists.map((list, index) => (
          <div key={index}>
            <h3>{list.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskLists;
