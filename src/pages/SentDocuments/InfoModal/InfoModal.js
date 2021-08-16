import React from 'react';
import './InfoModal.scss';
import { FiX } from 'react-icons/fi';

function InfoModal({ close, conteudo }) {
  return (
    <div className="modal">
      <div className="infoModalcontainer">
        <button type="button" className="close" onClick={close}>
          <FiX size={23} className="modalCloseIcon" color="#FFF" />
          Fechar
        </button>
        <div>
          <h2>Detalhes do Candidato:</h2>
          <div className="row">
            <b>Data de Inscrição:</b>
            {` ${conteudo && new Date(conteudo.candidate_date_inscrition).toUTCString()}`}
          </div>
          <div className="rowGrid">
            <div>
              <b>Nome:</b>
              {` ${conteudo?.candidate_name} `}
            </div>
            <div>
              <b>Email:</b>
              {` ${conteudo?.candidate_email}`}
            </div>
          </div>
          <div className="rowGrid">
            <div>
              <b>Graduação:</b>
              {` ${conteudo?.candidate_graduation} `}
            </div>
            <div>
              <b>Universidade:</b>
              {` ${conteudo?.candidate_university} `}
            </div>
          </div>
          <div className="rowGrid">
            <div>
              <b>Número de telefone:</b>
              {` ${conteudo?.candidate_phone_number}`}
            </div>
            <div>
              <b>Expedição:</b>
              {` ${conteudo?.candidate_expedition} `}
            </div>
          </div>
          <div className="rowGrid">
            <div>
              <b>CPF/Passaporte:</b>
              {` ${conteudo?.candidate_cpf} `}
            </div>
            <div>
              <b>Identidade:</b>
              {` ${conteudo?.candidate_identity}`}
            </div>
          </div>
          <div className="rowGrid">
            <div>
              <b>Título de Eleitor:</b>
              {` ${conteudo?.candidate_voter_title} `}
            </div>
            <div>
              <b>Zona de Eleição:</b>
              {` ${conteudo?.candidate_zone_title}`}
            </div>
          </div>
          <div className="rowGrid">
            <div>
              <b>Sessão de Eleição:</b>
              {` ${conteudo?.candidate_section_title} `}
            </div>
            <div>
              <b>Estado Civil:</b>
              {` ${conteudo?.candidate_civil_state}`}
            </div>
          </div>
          <div className="rowGrid">
            <div>
              <b>Raça:</b>
              {` ${conteudo?.candidate_race} `}
            </div>
            <div>
              <b>Gênero:</b>
              {` ${conteudo?.candidate_gender}`}
            </div>
          </div>
          <div className="rowGrid">
            <div>
              <b>Nacionalidade:</b>
              {` ${conteudo?.candidate_nationality} `}
            </div>
            <div>
              <b>CEP:</b>
              {` ${conteudo?.candidate_cep}`}
            </div>
          </div>
          {conteudo?.first_discipline_isolated !== 'none'
          && conteudo?.second_discipline_isolated !== 'none'
          && (
          <div className="rowGrid">
            <div>
              <b>Primeira Disciplina Isolada:</b>
              {` ${conteudo?.first_discipline_isolated} `}
            </div>
            <div>
              <b>Segunda Disciplina Isolada:</b>
              {` ${conteudo?.second_discipline_isolated}`}
            </div>
          </div>
          )}
          {conteudo?.third_discipline_isolated !== 'none'
          && (
          <div className="row">
            <b>Terceira Disciplina Isolada:</b>
            {` ${conteudo?.third_discipline_isolated}`}
          </div>
          )}
          <div className="row">
            <b>Data de Nascimento:</b>
            {` ${conteudo && new Date(conteudo.candidate_birth).toUTCString()}`}
          </div>
          <div className="row">
            <b>Endereço:</b>
            {` ${conteudo?.candidate_street}, N°${conteudo?.candidate_adress_num}, ${conteudo?.candidate_district}, ${conteudo?.candidate_city}, ${conteudo?.candidate_state}, ${conteudo?.candidate_country}`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
