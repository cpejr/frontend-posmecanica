import React, { useState } from 'react';
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
  const [approvePermission, setApprovePermission] = useState(false);
  const [deletePermission, setDeletePermission] = useState(false);
  const { addToast } = useToasts();

  const handleClickClose = () => {
    setShowInfoModal(false);
    setShowConfirmModalCandidate(false);
  };

  const handleClickConfirmClick = async () => {
    if (buttonName === 'Deferir') {
      candidate.stud_scholarship = false;
      if (candidate.disciplines.length === 1) {
        setApprovePermission(true);
      }
      if (candidate.disciplines.length === 2 || candidate.disciplines.length === 3) {
        managerService.getByIdDisciplineDefermentCandidateSituation(candidate.candidate_id, true)
          .then((response) => {
            if ((response.length !== 0 && candidate.disciplines.length === 2)
              || (response.length === 2 && candidate.disciplines.length === 3)) {
              setApprovePermission(true);
            } else {
              managerService.updateByIdDisciplineDeferment({
                cd_dis_deferment: true,
              }, candidate.candidate_id, disciplineToDeferment);
            }
          });
      }
      if (candidate.disciplines.length === 4) {
        managerService.getByIdDisciplineDefermentCandidateSituation(candidate.candidate_id, true)
          .then((response) => {
            if (response.length === 3) {
              setApprovePermission(true);
            } else if (response.cd_dis_id.some(candidate.first_discipline_isolated) === true
              && response.cd_dis_id.some(candidate.second_discipline_isolated) === true
              && response.cd_dis_id.some(candidate.third_discipline_isolated) === true) {
              setApprovePermission(true);
            } else {
              managerService.updateByIdDisciplineDeferment({
                cd_dis_deferment: true,
              }, candidate.candidate_id, disciplineToDeferment);
            }
          });
        if (approvePermission === true) {
          managerService.createStudent(candidate, candidate.candidate_process_id);
          managerService.updateByIdDisciplineDeferment({
            cd_dis_deferment: true,
          }, candidate.candidate_id, disciplineToDeferment);
          managerService.updateCandidate({
            candidate_deferment: true,
          }, candidate.candidate_id);
        }
      }
      addToast('Candidato deferido com sucesso!', { appearance: 'success' });
    } else {
      managerService.getByIdDisciplineDefermentCandidateSituation(candidate.candidate_id, false)
        .then((resp) => {
          if (resp.length === candidate.disciplines.length) {
            setDeletePermission(true);
          }
        });
      if (candidate.disciplines.length === 1) {
        setDeletePermission(true);
      } else if (deletePermission === false) {
        managerService.getByIdDisciplineDefermentCandidateSituation(candidate.candidate_id, true)
          .then((response) => {
            if ((candidate.disciplines.length === 2 && response.length === 1)
              || (candidate.disciplines.length === 3 && response.length === 2)
              || (candidate.disciplines.length === 4 && response.length === 3)
            ) {
              managerService.updateByIdDisciplineDeferment({
                cd_dis_deferment: false,
              }, candidate.candidate_id, disciplineToDeferment);
              managerService.createStudent(candidate, candidate.candidate_process_id);
              managerService.updateCandidate({
                candidate_deferment: true,
              }, candidate.candidate_id);
            }
          });
      }

      if (deletePermission === true) {
        await managerService.denyCandidate(candidate.candidate_id);
        const removeCandidate = isoCandidates.filter(
          (person) => person.candidate_id !== candidate.candidate_id,
        );
        setIsoCandidates(removeCandidate);
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

  const verifyDeferment = async () => {
    const result = await managerService.getByIdDisciplineDeferment(
      candidate.candidate_id,
      disciplineToDeferment,
    );
    return result.cd_dis_deferment;
  };

  return (
    <div className="isoPsListItem" id={candidate.candidate_id}>
      <div className="isoPsDivItem">
        <IconContext.Provider value={{ size: 50 }}>
          <BiUserCircle className="isoPsIcon" />
        </IconContext.Provider>
        {candidate.candidate_name}
      </div>
      {verifyDeferment() === false
        && (
          <div className="isoPsDivButtons">
            <Button className="isoPsConfirmButton" id="Deferir" onClick={(e) => handleClick(e)} variant="contained">Deferir</Button>
            <Button className="isoPsDenyButton" id="Indeferir" onClick={(e) => handleClick(e)} variant="contained">Indeferir</Button>
          </div>
        )}
      {verifyDeferment() === true
        && (
          <div className="isoPsDivButtons">
            <div className="isoPsDivButtonsDeferido">
              <Button className="isoPsDefermentStatus" id="Deferido" variant="contained">Deferido</Button>
            </div>
          </div>
        )}
      <div className="divButtonSituationStudent">
        <button type="button" className="buttonSituationStudent" onClick={() => setShowInfoModal(true)}>Ver situação do aluno</button>
      </div>
      {showInfoModal && (
        <InfoModal
          painelADM={0}
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
