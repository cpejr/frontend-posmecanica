import React from 'react';
import './SPInfoModal.scss';
import { FiX } from 'react-icons/fi';

function InfoModal({ close, conteudo }) {
  function formatedDate(date) {
    const data = new Date(date);
    const day = data.getDate().toString();
    const responseDay = day.length === 1 ? `0${day}` : day;
    const month = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
    const responseMonth = month.length === 1 ? `0${month}` : month;
    const year = data.getFullYear();
    return `${responseDay}/${responseMonth}/${year}`;
  }
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
            <b>Número de inscritos:</b>
            {` ${conteudo?.candidate_quantity}`}
          </div>
          <div className="SProw">
            <b>Data de início:</b>
            {` ${conteudo && formatedDate(conteudo.process_date_begin)}`}
          </div>
          <div className="SProw">
            <b>Data de término:</b>
            {` ${conteudo && formatedDate(conteudo.process_date_end)}`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
