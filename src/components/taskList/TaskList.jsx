import PropTypes from 'prop-types';
import { RenderTask } from './renderTask';
import './TaskList.css';

const TaskList = ({ tasks, onShowTaskForm, updateData }) => {
  const renderTasks = (task, index) => {
    return <RenderTask key={index} {...task} updateData={updateData} />;
  };
  return (
    <div className="tasks-list-container">
      {tasks ? (
        <div>{tasks.map((task, index) => renderTasks(task, index))}</div>
      ) : (
        <p>Still no tasks, would you like to create one?</p>
      )}
      <button className="create-task-button" onClick={onShowTaskForm}>
        Create Task
      </button>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  onShowTaskForm: PropTypes.func,
  updateData: PropTypes.func,
};

export default TaskList;
