import PropTypes from 'prop-types';
import { RenderTask } from './renderTask';
import './TaskList.css';

const TaskList = ({ tasks, updateData }) => {
  const renderTasks = (task, index) => {
    return <RenderTask key={index} {...task} updateData={updateData} />;
  };
  return (
    <div className="tasks-list-container">
      <div>
        <div>
          <h2>Pending:</h2>
        </div>
        <div>
          <h2>In Progress:</h2>
        </div>
        <div>
          <h2>Complete:</h2>
        </div>
      </div>
      {tasks ? (
        <div>{tasks.map((task, index) => renderTasks(task, index))}</div>
      ) : (
        <p>Still no tasks, would you like to create one?</p>
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  updateData: PropTypes.func,
};

export default TaskList;
