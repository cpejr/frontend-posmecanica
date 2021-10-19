import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons/lib';
import { BiUserCircle } from 'react-icons/bi';
import Button from '@material-ui/core/Button';
import { useToasts } from 'react-toast-notifications';
import InfoModal from '../../../pages/SentDocuments/InfoModal';
import DeferirModal from '../../../utils/DeferirModal';
import * as managerService from '../../../services/manager/managerService';
import './InscritosIsoPS.scss';

function InscritosIsoPS({
  isoCandidates, setIsoCandidates, candidate, disciplineToDeferment,
}) {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showConfirmModalCandidate, setShowConfirmModalCandidate] = useState(false);
  const [buttonName, setButtonName] = useState();
  const [label, setLabel] = useState();
  const [deletePermission, setDeletePermission] = useState(false);
  const [showCandidate, setShowCandidate] = useState(true);
  const [object, setObject] = useState([]);
  const { addToast } = useToasts();
  let nullCounter = 0;

  const handleClickClose = () => {
    setShowInfoModal(false);
    setShowConfirmModalCandidate(false);
  };

  const totalAprrovalCandidate = async () => {
    candidate.stud_scholarship = false;
    managerService.createStudent(candidate, candidate.candidate_process_id);
    managerService.updateByIdDisciplineDeferment({
      cd_dis_deferment: true,
    }, candidate.candidate_id, disciplineToDeferment);
    managerService.updateCandidate({
      candidate_deferment: true,
    }, candidate.candidate_id);
    setShowCandidate(false);
  };

  const deleteCandidate = async () => {
    await managerService.denyCandidate(candidate.candidate_id);
    const removeCandidate = isoCandidates.filter(
      (person) => person.candidate_id !== candidate.candidate_id,
    );
    setIsoCandidates(removeCandidate);
  };

  const buildObject = (candidateId, disciplineId) => {
    const line = {};

    Promise.all([
      managerService.getByIdDiscipline(disciplineId),
      managerService.getByIdDisciplineDeferment(candidateId, disciplineId),
      managerService.getProfByDisciplineId(disciplineId),
    ]).then((response) => {
      line.disciplineName = response[0].discipline_name;
      line.candidateDisciplineDeferment = response[1][0].cd_dis_deferment;
      line.professorName = response[2].prof_name;
    });
    setObject((previousState) => [...previousState, line]);
  };

  const handleClickConfirmClick = async () => {
    nullCounter = 0;
    if (buttonName === 'Deferir') {
      if (candidate.disciplines.length === 1) {
        totalAprrovalCandidate();
      }
      if (candidate.disciplines.length === 2 || candidate.disciplines.length === 3) {
        managerService.getByIdDisciplineDefermentCandidateSituation(candidate.candidate_id, true)
          .then((response) => {
            if ((response.length !== 0 && candidate.disciplines.length === 2)
              || (response.length === 2 && candidate.disciplines.length === 3)) {
              totalAprrovalCandidate();
            } else {
              managerService.updateByIdDisciplineDeferment({
                cd_dis_deferment: true,
              }, candidate.candidate_id, disciplineToDeferment);
              setShowCandidate(false);
            }
          });
      }
      if (candidate.disciplines.length === 4) {
        managerService.getByIdDisciplineDefermentCandidateSituation(candidate.candidate_id, true)
          .then((response) => {
            if (response.length === 3) {
              totalAprrovalCandidate();
            } else if (response?.cd_dis_id.some(candidate.first_discipline_isolated) === true
              && response?.cd_dis_id.some(candidate.second_discipline_isolated) === true
              && response?.cd_dis_id.some(candidate.third_discipline_isolated) === true
              && response.length !== 0) {
              totalAprrovalCandidate();
            } else {
              managerService.updateByIdDisciplineDeferment({
                cd_dis_deferment: true,
              }, candidate.candidate_id, disciplineToDeferment);
              setShowCandidate(false);
            }
          });
      }
      addToast('Candidato deferido com sucesso!', { appearance: 'success' });
    } else {
      managerService.getByIdDisciplineDefermentCandidateSituation(candidate.candidate_id, false)
        .then((resp) => {
          nullCounter = candidate.disciplines.length - resp.length;
          if ((candidate.disciplines.length === 2 && resp.length === 1)
            || (candidate.disciplines.length === 3 && resp.length === 2)
            || (candidate.disciplines.length === 4 && resp.length === 3)) {
            deleteCandidate();
            setDeletePermission(true);
            setShowCandidate(null);
          }
        });
      if (candidate.disciplines.length === 1) {
        deleteCandidate();
        setDeletePermission(true);
        setShowCandidate(null);
      } else if (deletePermission === false) {
        managerService.getByIdDisciplineDefermentCandidateSituation(candidate.candidate_id, true)
          .then((response) => {
            nullCounter -= response.length;
            if (nullCounter > 1) {
              managerService.updateByIdDisciplineDeferment({
                cd_dis_deferment: false,
              }, candidate.candidate_id, disciplineToDeferment);
              setShowCandidate(null);
            } else if (response.length > 0) {
              candidate.stud_scholarship = false;
              managerService.updateByIdDisciplineDeferment({
                cd_dis_deferment: false,
              }, candidate.candidate_id, disciplineToDeferment);
              managerService.createStudent(candidate, candidate.candidate_process_id);
              managerService.updateCandidate({
                candidate_deferment: true,
              }, candidate.candidate_id);
              setShowCandidate(null);
            }
          });
      }
      addToast('Candidato indeferido com sucesso!', { appearance: 'success' });
    }
    setShowConfirmModalCandidate(false);
  };

  const handleClick = async (e) => {
    if (e.currentTarget.id === 'Deferir') {
      setButtonName('Deferir');
      setLabel('Deseja deferir esse candidato?');
    } else {
      setButtonName('Indeferir');
      setLabel('Deseja indeferir esse candidato?');
    }
    setShowConfirmModalCandidate(true);
  };

  useEffect(() => {
    setObject('');
    buildObject(candidate.candidate_id, candidate.first_discipline_isolated);
    if (candidate.second_discipline_isolated) {
      buildObject(candidate.candidate_id, candidate.second_discipline_isolated);
    }
    if (candidate.third_discipline_isolated) {
      buildObject(candidate.candidate_id, candidate.third_discipline_isolated);
    }
    if (candidate.fourth_discipline_isolated) {
      buildObject(candidate.candidate_id, candidate.fourth_discipline_isolated);
    }
  }, []);

  useEffect(() => {
    setShowCandidate(true);
  }, [disciplineToDeferment]);

  return (
    <div className="isoPsListItem" id={candidate.candidate_id}>
      <div className="isoPsDivItem">
        <IconContext.Provider value={{ size: 50 }}>
          <BiUserCircle className="isoPsIcon" />
        </IconContext.Provider>
        <p>{candidate.candidate_name}</p>
      </div>
      {showCandidate === true && candidate.candidate_discipline[0].cd_dis_deferment === null
        && (
          <div className="isoPsDivButtons">
            <Button className="isoPsConfirmButton" id="Deferir" onClick={(e) => handleClick(e)} variant="contained">Deferir</Button>
            <Button className="isoPsDenyButton" id="Indeferir" onClick={(e) => handleClick(e)} variant="contained">Indeferir</Button>
          </div>
        )}
      {(showCandidate === false || candidate.candidate_discipline[0].cd_dis_deferment === true)
        && (
          <div className="isoPsDivButtons">
            <div className="isoPsDivButtonsDeferido">
              <Button className="isoPsDefermentStatus" id="Deferido" variant="contained">Deferido</Button>
            </div>
          </div>
        )}
      {showCandidate === null
        && (
          <div className="isoPsDivButtons">
            <div className="isoPsDivButtonsDeferido" />
          </div>
        )}
      <div className="divButtonSituationStudent">
        <button type="button" className="buttonSituationStudent" onClick={() => setShowInfoModal(true)}>Ver situação do aluno</button>
      </div>
      {showInfoModal && (
        <InfoModal
          painelADM={0}
          disciplinaInfo={object}
          conteudo={candidate}
          close={handleClickClose}
          className="isoPsLinkButton"
        />
      )}
      {showConfirmModalCandidate && (
        <DeferirModal
          label={label}
          handleCloseClick={handleClickClose}
          handleConfirmClick={handleClickConfirmClick}
          className="confirmCandidateButton"
        />
      )}
    </div>
  );
}

export default InscritosIsoPS;
