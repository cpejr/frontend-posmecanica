import React from 'react';
import './DeferirModal.scss';
import { FiX } from 'react-icons/fi';

function DeferirModal({ label, handleCloseClick, handleConfirmClick }) {
  return (
    <div className="deferirModal">
      <div className="deferirModalContainer">
        <button type="button" className="deferirModalClose" onClick={handleCloseClick}>
          <FiX size={23} color="#FFF" />
          <p style={{ marginTop: '1px' }}>Voltar</p>
        </button>
        <div>
          <h2>{label}</h2>
          <div className="deferirModal-button">
            <button type="button" onClick={handleConfirmClick}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeferirModal;
