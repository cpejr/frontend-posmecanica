import React from 'react';

function Modal({ children, handleConfirmClick }) {
  return (
    <div className="modal">
      <div className="container">
        <div>
          <h2>{children}</h2>
          <div className="DM-button">
            <button type="button" onClick={handleConfirmClick}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
