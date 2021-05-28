import React from 'react';
import './GenericModal.scss';
import { FiX } from 'react-icons/fi';

function Modal({ children, handleCloseClick, handleConfirmClick }) {
  return (
    <div className="modal">
      <div className="container">
        <button type="button" className="close" onClick={handleCloseClick}>
          <FiX size={23} color="#FFF" />
          Voltar
        </button>
        <div>
          <h2>{children}</h2>
          <div className="DM-button">
            <button type="button" onClick={handleConfirmClick}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
