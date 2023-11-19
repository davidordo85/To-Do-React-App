import PropTypes from 'prop-types';
import './Alert.css';

function Alert({ message, onClose, onConfirm }) {
  return (
    <div className="div-alert">
      <div className="alert-container">
        <p className="alert-message">{message}</p>
        <div>
          <button className="alert-button-confirm" onClick={onConfirm}>
            Confirm
          </button>
          <button className="alert-button-cancel" onClick={onClose}>
            Cancel
          </button>
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
