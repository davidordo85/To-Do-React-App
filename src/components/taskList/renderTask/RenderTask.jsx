import PropTypes from 'prop-types';
import storage from '../../../utils/storage';

const RenderTask = ({
  index,
  text,
  date,
  description,
  color,
  createdDate,
  estimatedDuration,
  priority,
  status,
  updateData,
}) => {
  const formatDate = date => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleDeleteTask = index => {
    storage.removeTask(index);
    updateData();
  };

  return (
    <div className="task-container">
      <div className="data-container">
        <p className="task-paragraph">
          <strong>Task:</strong>
        </p>
        <span className="task-contain">{text}</span>
      </div>
      <div className="data-container">
        <p className="task-paragraph">
          <strong>Task color:</strong>
        </p>
        <span
          className={'task-color'}
          style={{ backgroundColor: color }}
        ></span>
      </div>
      <div className="data-container">
        <p className="task-paragraph">
          <strong>Due date:</strong>
        </p>
        <span className="task-contain">{formatDate(date)}</span>
      </div>
      <div className="data-container">
        <p className="task-paragraph">
          <strong>Description:</strong>
        </p>
        <span className="task-contain">{description}</span>
      </div>
      {estimatedDuration > 0 && (
        <div className="data-container">
          <p className="task-paragraph">
            <strong>Estimated duration:</strong>
          </p>
          <span className="task-contain">
            {estimatedDuration} {estimatedDuration > 1 ? 'hours' : 'hour'}
          </span>
        </div>
      )}
      <div className="data-container">
        <p className="task-paragraph">
          <strong>Created date:</strong>
        </p>
        <span className="task-contain">{formatDate(createdDate)}</span>
      </div>
      <div className="data-container">
        <p className="task-paragraph">
          <strong>Priority:</strong>
        </p>
        <span className="task-contain">{priority}</span>
      </div>
      <div className="data-container">
        <p className="task-paragraph">
          <strong>Status:</strong>
        </p>
        <span className="task-contain">{status}</span>
      </div>
      <div className="button-task-container">
        <button className="modify-button">Modify</button>
        <button className="complete-button">Complete</button>
        <button
          className="delete-button"
          onClick={() => handleDeleteTask(index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

RenderTask.propTypes = {
  index: PropTypes.number,
  text: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string,
  createdDate: PropTypes.string,
  estimatedDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  priority: PropTypes.string,
  status: PropTypes.string,
  updateData: PropTypes.func,
};

export default RenderTask;
