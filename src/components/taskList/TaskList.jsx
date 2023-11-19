import PropTypes from 'prop-types';

const TaskList = ({ tasks, onShowTaskForm }) => {
  console.log(tasks);
  return (
    <div className="task-list-container">
      <div>pending</div>
      <div>in process</div>
      <div>completed</div>
      <button onClick={onShowTaskForm}>Create Task</button>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  onShowTaskForm: PropTypes.func,
};

export default TaskList;
