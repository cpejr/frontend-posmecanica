import React from 'react';
import './InfoModal.scss';
import { FiX } from 'react-icons/fi';

function InfoModal({
  close, conteudo, painelADM, disciplina,
}) {
  function formatedDate(date) {
    const data = new Date(date);
    const day = data.getDate().toString();
    const responseDay = day.length === 1 ? `0${day}` : day;
    const month = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
    const responseMonth = month.length === 1 ? `0${month}` : month;
    const year = data.getFullYear();
    return `${responseDay}/${responseMonth}/${year}`;
  }
  function disciplineSituation(discipline) {
    if (discipline === false) {
      return 'Indeferida';
    }
    if (discipline === true) {
      return 'Deferida';
    }

    return 'Pendente';
  }
  return (
    <>
      {painelADM === 0 ? (
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
                {` ${conteudo && formatedDate(conteudo.candidate_date_inscrition)}`}
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
              {` ${conteudo?.disciplines[0]?.discipline_name} `}
            </div>
            <div>
              <b>Segunda Disciplina Isolada:</b>
              {` ${conteudo?.disciplines[1]?.discipline_name}`}
            </div>
          </div>
          )}
              {conteudo?.third_discipline_isolated !== 'none'
          && conteudo?.fourth_discipline_isolated !== 'none'
          && (
          <div className="rowGrid">
            <div>
              <b>Terceira Disciplina Isolada:</b>
              {` ${conteudo?.disciplines[2]?.discipline_name}`}
            </div>
            <div>
              <b>Quarta Disciplina Isolada:</b>
              {` ${conteudo?.disciplines[3]?.discipline_name}`}
            </div>
          </div>
          )}
              <div className="row">
                <b>Data de Nascimento:</b>
                {` ${conteudo && formatedDate(conteudo.candidate_birth)}`}
              </div>
              <div className="row">
                <b>Endereço:</b>
                {` ${conteudo?.candidate_street}, N°${conteudo?.candidate_adress_num}, ${conteudo?.candidate_district}, ${conteudo?.candidate_city}, ${conteudo?.candidate_state}, ${conteudo?.candidate_country}`}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="modalIsolatedCandidate">
          <div className="infoModalcontainerIsolatedCandidate">
            <button type="button" className="close" onClick={close}>
              <FiX size={23} className="modalCloseIcon" color="#FFF" />
              Fechar
            </button>
            <div>
              <h2>Detalhes do Candidato:</h2>
              <div className="rowGrid">
                <div>
                  <b>Nome:</b>
                  {` ${conteudo?.candidate_name} `}
                </div>
              </div>
              <div className="rowGridIsolatedCandidate">
                <div>
                  <b>Primeira Disciplina Isolada:</b>
                  {` ${conteudo?.disciplines[0]?.discipline_name} `}
                </div>
                <div>
                  <b>Situação:</b>
                  {` ${disciplina && disciplineSituation(disciplina[0][0].cd_dis_deferment)}`}
                </div>
                <div>
                  <b>Professor responsável:</b>
                  {` ${conteudo?.disciplines[3]?.discipline_name}`}
                </div>
              </div>
              <div className="rowGridIsolatedCandidate">
                <div>
                  <b>Segunda Disciplina Isolada:</b>
                  {` ${conteudo?.disciplines[1]?.discipline_name}`}
                </div>
                <div>
                  <b>Situação:</b>
                  {` ${disciplina && disciplineSituation(disciplina[0][1].cd_dis_deferment)}`}
                </div>
                <div>
                  <b>Professor responsável:</b>
                  {` ${conteudo?.disciplines[3]?.discipline_name}`}
                </div>
              </div>
              <div className="rowGridIsolatedCandidate">
                <div>
                  <b>Terceira Disciplina Isolada:</b>
                  {` ${conteudo?.disciplines[2]?.discipline_name}`}
                </div>
                <div>
                  <b>Situação:</b>
                  {` ${disciplina && disciplineSituation(disciplina[0][2].cd_dis_deferment)}`}
                </div>
                <div>
                  <b>Professor responsável:</b>
                  {` ${conteudo?.disciplines[3]?.discipline_name}`}
                </div>
              </div>
              <div className="rowGridIsolatedCandidate">
                <div>
                  <b>Quarta Disciplina Isolada:</b>
                  {` ${conteudo?.disciplines[3]?.discipline_name}`}
                </div>
                <div>
                  <b>Situação:</b>
                  {` ${disciplina && disciplineSituation(disciplina[0][3].cd_dis_deferment)}`}
                </div>
                <div>
                  <b>Professor responsável:</b>
                  {` ${conteudo?.disciplines[3]?.discipline_name}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InfoModal;
