import PropTypes from 'prop-types';
import './CloseFormButton.css';

const CloseFormButton = ({ onClose }) => {
  return (
    <button className="close" type="button" onClick={onClose}>
      X
    </button>
  );
};

CloseFormButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default CloseFormButton;
