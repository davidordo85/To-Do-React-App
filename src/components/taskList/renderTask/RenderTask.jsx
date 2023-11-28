import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../../shared/alert/Alert';
import Buttons from '../../shared/buttons';
import './RenderTask.css';

const RenderTask = ({
  index,
  text,
  date,
  description,
  color,
  createdDate,
  estimatedDuration,
  priority,
  updateData,
}) => {
  const [showConfirmAlert, setShowConfirmAlert] = React.useState(false);
  const [optionExpanded, setOptionExpanded] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const formatDate = date => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleToggleExpand = () => {
    setOptionExpanded(!optionExpanded);
  };

  const handleDetailExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDeleteTask = index => {
    console.log('borrar task', index, updateData);
  };

  console.log(color);

  return (
    <div className="task-container" style={{ backgroundColor: color }}>
      {showConfirmAlert ? (
        <Alert
          message={'Are you sure you want to delete this task?'}
          onClose={() => setShowConfirmAlert(false)}
          onConfirm={() => handleDeleteTask(index)}
        />
      ) : null}
      <div className="options-task-container">
        <Buttons
          label="..."
          ariaLabel="options"
          className="option-task-button"
          type="button"
          onClick={handleToggleExpand}
        />
        {optionExpanded && (
          <div className="options-task-dropdown">
            <Buttons
              label="Detail"
              className="detail-task-button"
              ariaLabel="Detail task"
              type="button"
              onClick={handleDetailExpand}
            />
            <Buttons
              label="Modify"
              className="modify-task-button"
              ariaLabel="Modify task"
              type="button"
              /* onClick={handleDeleteTask} */
            />
            <Buttons
              label="Delete"
              className="delete-task-button"
              ariaLabel="delete task"
              type="button"
              onClick={handleDeleteTask}
            />
          </div>
        )}
      </div>
      <div className="data-container">
        <div>
          <p className="task-paragraph">
            <strong>Task:</strong>
          </p>
          <span className="task-contain">{text}</span>
        </div>
      </div>
      {isExpanded ? (
        <>
          {' '}
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
        </>
      ) : null}
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
  updateData: PropTypes.func,
};

export default RenderTask;
