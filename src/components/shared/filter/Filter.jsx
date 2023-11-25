import React from 'react';

import PropTypes from 'prop-types';
import FilterForm from './FilterForm';
import './Filter.css';

function Filter({ tasks }) {
  const [showFilterForm, setFilterForm] = React.useState(false);

  const filterText = (filterDataString, taskString) => {
    var equal = filterDataString === taskString;
    return equal;
  };

  const filterDateRange = (taskDate, from, to) => {
    // Verificar si from o to son valores válidos antes de realizar la comparación
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

    console.log(filterTask);
    return filterTask;
  };

  return (
    <div>
      <button onClick={() => setFilterForm(true)}>Filter</button>
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
};

export default Filter;
