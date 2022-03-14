import React, { useState, useEffect } from 'react';
import './InfoModal.scss';
import { FiX } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import * as managerService from '../../../services/manager/managerService';
import GenericModal from '../../../utils/GenericModal';

function InfoModal({
  close, conteudo, painelADM, disciplinaInfo, studentList, handleClick,
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
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('');
  const [selectiveProcessName, setSelectiveProcessName] = useState('-');

  function disciplineSituation(discipline) {
    if (discipline === false) {
      return 'Indeferida';
    }
    if (discipline === true) {
      return 'Deferida';
    }
    return 'Pendente';
  }

  useEffect(async () => {
    if (painelADM === 0) {
      const process = await managerService.getByIdSelectiveProcess(conteudo.candidate_process_id);
      setSelectiveProcessName(process.process_name);
    }
  }, []);

  function redirectToEdit() {
    history.push({
      pathname: '/painel/administrator/editar/aluno',
      state: conteudo,
    });
  }
  async function redirectToQualification() {
    setAction('qualificação');
    const verify = await managerService.getByStudentQualification(conteudo.stud_id);
    if (verify) {
      setShowModal(true);
    } else {
      history.push({
        pathname: '/painel/administrator/qualificaçao-teses',
        state: conteudo,
      });
    }
  }

  async function redirectToDefense() {
    setAction('defesa');
    const verify = await managerService.getByStudentDefense(conteudo.stud_id);
    if (verify) {
      setShowModal(true);
    } else {
      history.push({
        pathname: '/painel/administrator/defesa-de-teses',
        state: conteudo,
      });
    }
  }

  function redirectToReports() {
    history.push({
      pathname: '/painel/administrator/relatorios',
      state: conteudo,
    });
  }

  const handleCloseClick = () => {
    setShowModal(false);
  };

  const handleConfirmClick = async () => {
    if (action === 'qualificação') {
      const qualification = await managerService.getByStudentQualification(conteudo.stud_id);
      await managerService.deleteQualification(qualification.quali_id);
      history.push({
        pathname: '/painel/administrator/qualificaçao-teses',
        state: conteudo,
      });
    } else {
      const defense = await managerService.getByStudentDefense(conteudo.stud_id);
      await managerService.deleteDefense(defense.defense_id);
      history.push({
        pathname: '/painel/administrator/defesa-de-teses',
        state: conteudo,
      });
    }
  };

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
                  <b>Data de Nascimento:</b>
                  {` ${conteudo && formatedDate(conteudo.candidate_birth)}`}
                </div>
                <div>
                  <b>Processo Seletivo:</b>
                  {` ${selectiveProcessName}`}
                </div>
              </div>
              <div className="rowGrid">
                <div className="InsideRowGridModal">
                  <b>Área de Concentração:</b>
                  {` ${conteudo?.candidate_concentration_area ? conteudo?.candidate_concentration_area : '-'}`}
                </div>
              </div>
              {conteudo?.candidate_grade === 'NENHUMA DAS OPÇÕES' && (
                <>
                  <div className="rowGrid">
                    <div className="InsideRowGridModal">
                      <b>Primeira Disciplina Isolada:</b>
                      {` ${disciplinaInfo && disciplinaInfo[0]?.disciplineName ? disciplinaInfo[0]?.disciplineName : '-'} `}
                    </div>
                    <div>
                      <b>Segunda Disciplina Isolada:</b>
                      {` ${disciplinaInfo && disciplinaInfo[1]?.disciplineName ? disciplinaInfo[1]?.disciplineName : '-'}`}
                    </div>
                  </div>
                  <div className="rowGrid">
                    <div className="InsideRowGridModal">
                      <b>Terceira Disciplina Isolada:</b>
                      {` ${disciplinaInfo && disciplinaInfo[2]?.disciplineName ? disciplinaInfo[2]?.disciplineName : '-'}`}
                    </div>
                    <div>
                      <b>Quarta Disciplina Isolada:</b>
                      {` ${disciplinaInfo && disciplinaInfo[3]?.disciplineName ? disciplinaInfo[3]?.disciplineName : '-'}`}
                    </div>
                  </div>
                </>
              )}
              <div className="row">
                <b>Endereço:</b>
                {` ${conteudo?.candidate_street}, N°${conteudo?.candidate_adress_num}, ${conteudo?.candidate_district}, ${conteudo?.candidate_city}, ${conteudo?.candidate_state}, ${conteudo?.candidate_country}`}
              </div>
              {conteudo.candidate_grade === 'NENHUMA DAS OPÇÕES' && (
                <div className="row">
                  <b>Justificativa:</b>
                  {` ${conteudo?.candidate_justify}`}
                </div>
              )}
            </div>
            {studentList === 'true' && conteudo.process_type !== 'ISOLADA' && (
              <div className="buttonsGroupRedirect">
                <div className="divInfoModalStudentRedirect">
                  <button type="button" className="InfoModalStudentRedirect" onClick={redirectToEdit}>
                    EDITAR ESTUDANTE
                  </button>
                  <button type="button" className="InfoModalStudentRedirect" onClick={redirectToQualification}>
                    MARCAR QUALIFICAÇÃO
                  </button>
                  <button type="button" className="InfoModalStudentRedirect" onClick={redirectToDefense}>
                    MARCAR DEFESA
                  </button>
                  <button type="button" className="InfoModalStudentRedirect" onClick={redirectToReports}>
                    RELATÓRIOS
                  </button>
                </div>
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
            <div className="teste">
              <button type="button" className="SPbutton-result" onClick={() => handleClick()}>Ver Documentos</button>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <GenericModal
          handleCloseClick={handleCloseClick}
          handleConfirmClick={handleConfirmClick}
        >
          O estudante já possui uma
          {` ${action}`}
          , deseja remarcar?
        </GenericModal>
      )}
    </>
  );
}

export default InfoModal;
