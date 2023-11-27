import PropTypes from 'prop-types';
import Buttons from '../buttons';
import './Alert.css';

function Alert({ message, onClose, onConfirm }) {
  return (
    <div className="div-alert">
      <div className="alert-container">
        <p className="alert-message">{message}</p>
        <div>
          <Buttons
            label="Confirm"
            ariaLabel="Confirm"
            type="button"
            className="alert-button-confirm"
            onClick={onConfirm}
          />
          <Buttons
            label="Cancel"
            ariaLabel="Cancel"
            type="button"
            className="alert-button-cancel"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default Alert;
