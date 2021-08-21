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
  isoCandidates, setIsoCandidates, candidate,
}) {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showConfirmModalCandidate, setShowConfirmModalCandidate] = useState(false);
  const [buttonName, setButtonName] = useState();
  const [label, setLabel] = useState();
  const { addToast } = useToasts();

  const handleClickClose = () => {
    setShowInfoModal(false);
    setShowConfirmModalCandidate(false);
  };

  const handleClickConfirmClick = async () => {
    if (buttonName === 'Deferir') {
      candidate.stud_scholarship = false;
      if (candidate.first_discipline_isolated !== 'none'
        && candidate.second_discipline_isolated !== 'none'
        && candidate.third_discipline_isolated !== 'none') {
        await managerService.createStudent(candidate, candidate.candidate_process_id);
        await managerService.updateCandidate({
          candidate_deferment: true,
        }, candidate.candidate_id);
        candidate.candidate_deferment = true;
        addToast('Candidato deferido com sucesso!', { appearance: 'success' });
      } else {
        await managerService.createStudent(candidate);
        await managerService.updateCandidate({
          candidate_deferment: true,
        }, candidate.candidate_id);
        candidate.candidate_deferment = true;
        addToast('Candidato deferido com sucesso!', { appearance: 'success' });
      }
    } else {
      await managerService.denyCandidate(candidate.candidate_id);
      const removeCandidate = isoCandidates.filter(
        (person) => person.candidate_id !== candidate.candidate_id,
      );
      setIsoCandidates(removeCandidate);
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

  return (
    <div className="isoPsListItem" id={candidate.candidate_id}>
      <div className="isoPsDivItem">
        <IconContext.Provider value={{ size: 50 }}>
          <BiUserCircle className="isoPsIcon" />
        </IconContext.Provider>
        {candidate.candidate_name}
      </div>
      <div className="isoPsDivButtons">
        {candidate.candidate_deferment === false && <Button className="isoPsConfirmButton" id="Deferir" onClick={(e) => handleClick(e)} variant="contained">Deferir</Button>}
        {candidate.candidate_deferment === false && <Button className="isoPsDenyButton" id="Indeferir" onClick={(e) => handleClick(e)} variant="contained">Indeferir</Button>}

      </div>
      <div className="divButtonSituationStudent">
        <button type="button" className="buttonSituationStudent" onClick={() => setShowInfoModal(true)}>Ver situação do aluno</button>
      </div>
      {showInfoModal && (
      <InfoModal
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
