import React from 'react';

import PropTypes from 'prop-types';
import FilterForm from './FilterForm';
import './Filter.css';

function Filter({ tasks, onSubmit, resetFilter }) {
  const [showFilterForm, setFilterForm] = React.useState(false);

  const filterText = (filterDataString, taskString) => {
    var equal = filterDataString === taskString;
    return equal;
  };

  const filterDateRange = (taskDate, from, to) => {
    if (!from && !to) {
      return false;
    }

    const taskDateTime = new Date(taskDate).getTime();
    const fromDateTime = from
      ? new Date(from).getTime()
      : Number.NEGATIVE_INFINITY;
    const toDateTime = to ? new Date(to).getTime() : Number.POSITIVE_INFINITY;

    return taskDateTime >= fromDateTime && taskDateTime <= toDateTime;
  };

  const handleFilterSubmit = filterData => {
    const filterTask = tasks
      .filter(task => {
        return (
          (filterData.text
            ? filterText(filterData.text.toLowerCase(), task.text)
            : true) &&
          (filterData.status
            ? filterText(filterData.status, task.status)
            : true) &&
          (filterData.priority
            ? filterText(filterData.priority, task.priority)
            : true) &&
          (filterData.from || filterData.to
            ? filterDateRange(task.date, filterData.from, filterData.to)
            : true)
        );
      })
      .sort((a, b) => {
        if (filterData.estimatedDuration) {
          const orderFactor = filterData.estimatedDuration === 'asc' ? 1 : -1;
          const durationA = a.estimatedDuration || 0;
          const durationB = b.estimatedDuration || 0;
          return (durationA - durationB) * orderFactor;
        }
        return 0;
      });

    onSubmit(filterTask);
  };

  return (
    <div className="buttons-filter-container">
      <button className="filter-button" onClick={() => setFilterForm(true)}>
        Filter
      </button>
      <button className="filter-button" onClick={resetFilter}>
        Reset Filter
      </button>
      {showFilterForm ? (
        <FilterForm
          onSubmit={handleFilterSubmit}
          onClose={() => setFilterForm(false)}
        />
      ) : null}
    </div>
  );
}

Filter.propTypes = {
  tasks: PropTypes.array,
  onSubmit: PropTypes.func,
  resetFilter: PropTypes.func,
};

export default Filter;
