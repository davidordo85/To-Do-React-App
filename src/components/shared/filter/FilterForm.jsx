import React from 'react';
import PropTypes from 'prop-types';

function FilterForm({ onClose, onSubmit }) {
  const initialState = {
    text: '',
    from: '',
    to: '',
    priority: '',
    estimatedDuration: '',
    status: '',
  };
  const [resetClicked, setResetClicked] = React.useState(false);
  const [tasksFilter, setTasksFilter] = React.useState({
    ...initialState,
  });

  const handleChange = event => {
    setTasksFilter(oldTasks => {
      const newTasks = {
        ...oldTasks,
        [event.target.name]: event.target.value,
      };
      return newTasks;
    });
  };

  const { text, from, to, priority, estimatedDuration, status } = tasksFilter;

  const handleFilterTasks = event => {
    event.preventDefault();
    if (resetClicked) {
      setResetClicked(false);
      return;
    }
    const filteredTasksFilter = Object.keys(tasksFilter).reduce((acc, key) => {
      if (tasksFilter[key] !== '') {
        acc[key] = tasksFilter[key];
      }
      return acc;
    }, {});
    onSubmit(filteredTasksFilter);
    onClose();
  };

  const handleResetClick = () => {
    setResetClicked(true);
    setTasksFilter(initialState);
  };

  return (
    <form className="add-task-form" onSubmit={handleFilterTasks}>
      <button className="close" type="button" onClick={onClose}>
        X
      </button>

      <div className="text-input-container">
        <label htmlFor="text">Task</label>
        <input
          type="text"
          id="text"
          name="text"
          value={text}
          onChange={handleChange}
          aria-label="Enter your task"
        />
      </div>
      <div className="date-input-container">
        <label htmlFor="from">From</label>
        <input
          type="date"
          id="from"
          name="from"
          value={from}
          onChange={handleChange}
          aria-label="Select from date"
        />
      </div>
      <div className="date-input-container">
        <label htmlFor="to">To</label>
        <input
          type="date"
          id="to"
          name="to"
          value={to}
          onChange={handleChange}
          aria-label="Select to date"
        />
      </div>
      <div className="priority-input-container">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={priority}
          onChange={handleChange}
          aria-label="Select task priority"
        >
          <option>Select one option...</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="duration-input-container">
        <label htmlFor="estimatedDuration">Estimated Duration</label>
        <select
          id="estimatedDuration"
          name="estimatedDuration"
          value={estimatedDuration}
          onChange={handleChange}
          aria-label="Select estimated duration order"
        >
          <option>Select one option...</option>
          <option value="asc">Short to Long</option>
          <option value="desc">Long to Short</option>
        </select>
      </div>
      <div className="status-input-container">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={handleChange}
          aria-label="Select task status"
        >
          <option>Select one option...</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
        </select>
      </div>
      <div>
        <div className="buttons-filter-container">
          <button className="reset-button" onClick={handleResetClick}>
            Reset Filter
          </button>
          <button className="filter-button" type="submit">
            Apply Filters
          </button>
        </div>
      </div>
    </form>
  );
}

FilterForm.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default FilterForm;
