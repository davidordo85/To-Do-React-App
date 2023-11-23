import React from 'react';

import PropTypes from 'prop-types';
import FilterForm from './FilterForm';

function Filter({ tasks }) {
  const [showFilterForm, setFilterForm] = React.useState(false);

  //TODO: funcion de filtrado de task, a completar
  const handleFilterSubmit = filterData => {
    console.log('Filtered tasks:', filterData, 'Tasks:', tasks);
    setFilterForm(false);
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
