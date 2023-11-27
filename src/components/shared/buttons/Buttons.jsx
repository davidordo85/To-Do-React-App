import PropTypes from 'prop-types';
import './Buttons.css';

const Buttons = ({ label, className, type, onClick, ariaLabel }) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
};

Buttons.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

export default Buttons;
