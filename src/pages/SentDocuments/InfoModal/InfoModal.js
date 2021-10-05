import React from 'react';
import './InfoModal.scss';
import { FiX } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

function InfoModal({
  close, conteudo, painelADM, disciplinaInfo, studentList,
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

  const history = useHistory();

  function disciplineSituation(discipline) {
    if (discipline === false) {
      return 'Indeferida';
    }
    if (discipline === true) {
      return 'Deferida';
    }
    return 'Pendente';
  }

  function redirect() {
    history.push({
      pathname: '/painel/administrator/editar/aluno',
      state: conteudo,
    });
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
                <div className="InsideRowGridModal">
                  <b>Nome:</b>
                  {` ${conteudo?.candidate_name} `}
                </div>
                <div>
                  <b>Email:</b>
                  {` ${conteudo?.candidate_email}`}
                </div>
              </div>
              <div className="rowGrid">
                <div className="InsideRowGridModal">
                  <b>Graduação:</b>
                  {` ${conteudo?.candidate_graduation} `}
                </div>
                <div>
                  <b>Universidade:</b>
                  {` ${conteudo?.candidate_university} `}
                </div>
              </div>
              <div className="rowGrid">
                <div className="InsideRowGridModal">
                  <b>Número de telefone:</b>
                  {` ${conteudo?.candidate_phone_number}`}
                </div>
                <div>
                  <b>Expedição:</b>
                  {` ${conteudo?.candidate_expedition} `}
                </div>
              </div>
              <div className="rowGrid">
                <div className="InsideRowGridModal">
                  <b>CPF/Passaporte:</b>
                  {` ${conteudo?.candidate_cpf} `}
                </div>
                <div>
                  <b>Identidade:</b>
                  {` ${conteudo?.candidate_identity}`}
                </div>
              </div>
              <div className="rowGrid">
                <div className="InsideRowGridModal">
                  <b>Título de Eleitor:</b>
                  {` ${conteudo?.candidate_voter_title} `}
                </div>
                <div>
                  <b>Zona de Eleição:</b>
                  {` ${conteudo?.candidate_zone_title}`}
                </div>
              </div>
              <div className="rowGrid">
                <div className="InsideRowGridModal">
                  <b>Sessão de Eleição:</b>
                  {` ${conteudo?.candidate_section_title} `}
                </div>
                <div>
                  <b>Estado Civil:</b>
                  {` ${conteudo?.candidate_civil_state}`}
                </div>
              </div>
              <div className="rowGrid">
                <div className="InsideRowGridModal">
                  <b>Raça:</b>
                  {` ${conteudo?.candidate_race} `}
                </div>
                <div>
                  <b>Gênero:</b>
                  {` ${conteudo?.candidate_gender}`}
                </div>
              </div>
              <div className="rowGrid">
                <div className="InsideRowGridModal">
                  <b>Nacionalidade:</b>
                  {` ${conteudo?.candidate_nationality} `}
                </div>
                <div>
                  <b>CEP:</b>
                  {` ${conteudo?.candidate_cep}`}
                </div>
              </div>
              <div className="rowGrid">
                <div className="InsideRowGridModal">
                  <b>Primeira Disciplina Isolada:</b>
                  {` ${conteudo?.disciplines[0]?.discipline_name ? conteudo?.disciplines[0]?.discipline_name : '-'} `}
                </div>
                <div>
                  <b>Segunda Disciplina Isolada:</b>
                  {` ${conteudo?.disciplines[1]?.discipline_name ? conteudo?.disciplines[1]?.discipline_name : '-'}`}
                </div>
              </div>
              <div className="rowGrid">
                <div className="InsideRowGridModal">
                  <b>Terceira Disciplina Isolada:</b>
                  {` ${conteudo?.disciplines[2]?.discipline_name ? conteudo?.disciplines[0]?.discipline_name : '-'}`}
                </div>
                <div>
                  <b>Quarta Disciplina Isolada:</b>
                  {` ${conteudo?.disciplines[3]?.discipline_name ? conteudo?.disciplines[0]?.discipline_name : '-'}`}
                </div>
              </div>
              <div className="row">
                <b>Data de Nascimento:</b>
                {` ${conteudo && formatedDate(conteudo.candidate_birth)}`}
              </div>
              <div className="row">
                <b>Endereço:</b>
                {` ${conteudo?.candidate_street}, N°${conteudo?.candidate_adress_num}, ${conteudo?.candidate_district}, ${conteudo?.candidate_city}, ${conteudo?.candidate_state}, ${conteudo?.candidate_country}`}
              </div>
              <div className="row">
                <b>Justificativa:</b>
                {` ${conteudo?.candidate_justify}`}
              </div>
            </div>
            {studentList === 'true' && (
              <div className="divInfoModalStudentRedirect">
                <button type="button" className="InfoModalStudentRedirect" onClick={redirect}>
                  Editar estudante
                </button>
              </div>
            )}
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
                  {` ${disciplinaInfo[0]?.disciplineName} `}
                </div>
                <div>
                  <b>Situação:</b>
                  {` ${disciplinaInfo && disciplineSituation(disciplinaInfo[0].candidateDisciplineDeferment)}`}
                </div>
                <div>
                  <b>Professor responsável:</b>
                  {` ${disciplinaInfo[0]?.professorName}`}
                </div>
              </div>
              {disciplinaInfo[1]
                && (
                  <div className="rowGridIsolatedCandidate">
                    <div>
                      <b>Segunda Disciplina Isolada:</b>
                      {` ${disciplinaInfo[1]?.disciplineName}`}
                    </div>
                    <div>
                      <b>Situação:</b>
                      {` ${disciplinaInfo && disciplineSituation(disciplinaInfo[1].candidateDisciplineDeferment)}`}
                    </div>
                    <div>
                      <b>Professor responsável:</b>
                      {` ${disciplinaInfo[1]?.professorName}`}
                    </div>
                  </div>
                )}
              {disciplinaInfo[2]
                && (
                  <div className="rowGridIsolatedCandidate">
                    <div>
                      <b>Terceira Disciplina Isolada:</b>
                      {` ${disciplinaInfo[2]?.disciplineName}`}
                    </div>
                    <div>
                      <b>Situação:</b>
                      {` ${disciplinaInfo && disciplineSituation(disciplinaInfo[2].candidateDisciplineDeferment)}`}
                    </div>
                    <div>
                      <b>Professor responsável:</b>
                      {` ${disciplinaInfo[2]?.professorName}`}
                    </div>
                  </div>
                )}
              {disciplinaInfo[3]
                && (
                  <div className="rowGridIsolatedCandidate">
                    <div>
                      <b>Quarta Disciplina Isolada:</b>
                      {` ${disciplinaInfo[3]?.disciplineName}`}
                    </div>
                    <div>
                      <b>Situação:</b>
                      {` ${disciplinaInfo && disciplineSituation(disciplinaInfo[3].candidateDisciplineDeferment)}`}
                    </div>
                    <div>
                      <b>Professor responsável:</b>
                      {` ${disciplinaInfo[3]?.professorName}`}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InfoModal;
