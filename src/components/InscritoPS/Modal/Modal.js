import React from 'react';
import './Modal.scss';
import { FiX } from 'react-icons/fi';

function Modal({ close, conteudo }) {
  return (
    <div className="modal">
      <div className="container">
        <button type="button" className="close" onClick={close}>
          <FiX size={23} color="#FFF" />
          Voltar
        </button>
        <div>
          <h2>Detalhes do Candidato:</h2>
          <div className="row">
            Nome:
            {conteudo && conteudo.candidate_name}
          </div>
          <div className="row">
            Email:
            {conteudo && conteudo.candidate_email}
          </div>
          <div className="row">
            Graduação:
            {conteudo && conteudo.candidate_graduation}
          </div>
          <div className="row">
            Nacionalidade:
            {conteudo && conteudo.candidate_nationality}
          </div>
          <div className="row">
            Número de telefone:
            {conteudo && conteudo.candidate_phone_number}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Modal;
