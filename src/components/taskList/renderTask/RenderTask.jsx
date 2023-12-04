import React from 'react';
import PropTypes from 'prop-types';
import { Buttons, Alert } from '../../shared';
import { FaTrashAlt, FaInfoCircle, FaEdit } from 'react-icons/fa';
import storage from '../../../utils/storage';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../../utils/constants';
import './RenderTask.css';

const RenderTask = ({
  index,
  listName,
  text,
  date,
  id,
  description,
  color,
  createdDate,
  estimatedDuration,
  priority,
  updateData,
  modifyTask,
}) => {
  const [, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { index, listName, id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const [showConfirmAlert, setShowConfirmAlert] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const formatDate = date => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  // funcion para mostrar los detalles de la tarea
  const handleDetailExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // funcion para borrar la tarea
  const handleDeleteTask = index => {
    const currentTasks = storage.getListTasks(listName);
    const updatedTasks = currentTasks.filter((_, i) => i !== index);
    storage.setListTasks(listName, updatedTasks);
    setShowConfirmAlert(false);
    updateData();
  };

  function isColorLight(hexColor) {
    // Convertir el color hexadecimal a RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Calcular el índice de luminosidad (fórmula simple)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Si la luminosidad es mayor que 0.5, el color es claro
    return luminance > 0.5;
  }

  const textColor = isColorLight(color) ? 'black' : 'white';

  return (
    <div
      ref={drag}
      className="task-container"
      style={{ backgroundColor: color, color: textColor }}
    >
      {showConfirmAlert ? (
        <Alert
          message={'Are you sure you want to delete this task?'}
          onClose={() => setShowConfirmAlert(false)}
          onConfirm={() => handleDeleteTask(index)}
        />
      ) : null}

      <div
        className="options-task-container"
        style={isColorLight(color) ? { backgroundColor: 'gray' } : null}
      >
        <Buttons
          label={<FaInfoCircle className="info-task-icon" />}
          className="detail-task-button"
          ariaLabel="Detail task"
          type="button"
          onClick={handleDetailExpand}
        />
        <Buttons
          label={<FaEdit className="edit-task-icon" />}
          className="modify-task-button"
          ariaLabel="Modify task"
          type="button"
          onClick={() => modifyTask()}
        />
        <Buttons
          label={<FaTrashAlt className="delete-task-icon" />}
          className="delete-task-button"
          ariaLabel="delete task"
          type="button"
          onClick={() => setShowConfirmAlert(true)}
        />
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
  listName: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string,
  createdDate: PropTypes.string,
  estimatedDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  priority: PropTypes.string,
  updateData: PropTypes.func,
  modifyTask: PropTypes.func,
  deleteTask: PropTypes.func,
};

export default RenderTask;
