import React from 'react';
import './SPInfoModal.scss';
import { FiX } from 'react-icons/fi';

function InfoModal({ close, conteudo, redirect }) {
  return (
    <div className="SPmodal">
      <div className="SPinfoModalcontainer">
        <button type="button" className="SPclose" onClick={close}>
          <FiX size={23} className="SPmodalCloseIcon" color="#FFF" />
          Fechar
        </button>
        <div>
          <h2>Detalhes do Processo Seletivo:</h2>
          <div className="SProw">
            <b>Nome:</b>
            {` ${conteudo?.process_name}`}
          </div>
          <div className="SProw">
            <b>Tipo de processo:</b>
            {` ${conteudo?.process_type}`}
          </div>
          <div className="SProw">
            <b>Data de início:</b>
            {` ${conteudo && new Date(conteudo.process_date_begin).toUTCString()}`}
          </div>
          <div className="SProw">
            <b>Data de término:</b>
            {` ${conteudo && new Date(conteudo.process_date_end).toUTCString()}`}
          </div>
        </div>
        <div className="divSPredirect">
          <button type="button" className="SPredirect" onClick={redirect}>
            Ver candidatos
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
