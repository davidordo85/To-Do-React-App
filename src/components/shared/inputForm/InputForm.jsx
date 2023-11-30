//import React from 'react';
import PropTypes from 'prop-types';

const InputForm = ({
  label,
  className,
  type,
  id,
  name,
  value,
  onChange,
  min,
  ariaLabel,
  required,
}) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        min={min}
        onChange={onChange}
        aria-label={ariaLabel}
        required={required}
      />
    </div>
  );
};

InputForm.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
};

export default InputForm;
