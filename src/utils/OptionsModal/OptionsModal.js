import React from 'react';
import { FiX } from 'react-icons/fi';

function Modal({
  children, handleCloseClick, handleConfirmClick, handleNegativeClick,
}) {
  return (
    <div className="modal">
      <div className="container">
        <button type="button" className="close" onClick={handleCloseClick}>
          <FiX size={23} color="#FFF" />
          Voltar
        </button>
        <div>
          <h2>{children}</h2>
          <div className="DM-row">
            <div className="DM-button">
              <button type="button" onClick={handleConfirmClick}>
                Sim
              </button>
            </div>
            <div className="DM-button">
              <button type="button" onClick={handleNegativeClick}>
                Não
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
