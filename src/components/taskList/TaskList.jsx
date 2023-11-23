import PropTypes from 'prop-types';
import { RenderTask } from './renderTask';
import './TaskList.css';
import Filter from '../shared/filter/Filter';

const TaskList = ({ tasks, updateData }) => {
  const renderTasks = (task, index) => {
    return <RenderTask key={index} {...task} updateData={updateData} />;
  };
  return (
    <div className="tasks-list-container">
      <div>
        <Filter tasks={tasks} />
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
