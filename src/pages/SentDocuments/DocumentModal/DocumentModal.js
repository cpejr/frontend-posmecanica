import React from 'react';
import './DocumentModal.scss';
import { FiX } from 'react-icons/fi';

function DocumentModal({ close }) {
  return (
    <div className="modal">
      <div className="container">
        <button type="button" className="close" onClick={close}>
          <FiX size={23} color="#FFF" />
          Voltar
        </button>
        <div>
          <h2>Qual documento reenviar?</h2>
          <div className="DM-button">
            <button type="submit">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DocumentModal;
