import React, { useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { BiUserCircle } from 'react-icons/bi';
import Button from '@material-ui/core/Button';
import InfoModal from '../../../pages/SentDocuments/InfoModal';
import * as managerService from '../../../services/manager/managerService';
import './InscritosIsoPS.scss';

function InscritosIsoPS({
  isoCandidates, setIsoCandidates, candidate,
}) {
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleClickClose = () => {
    setShowInfoModal(false);
  };

  const handleClick = async (e) => {
    const buttonName = e.currentTarget.id;
    if (buttonName === 'Deferir') {
      if (candidate.first_discipline_isolated
        && candidate.second_discipline_isolated
        && candidate.third_discipline_isolated) {
        await managerService.createCandidate(candidate, candidate.candidate_process_id); // TO DO
      } else {
        await managerService.createCandidate(candidate, candidate.candidate_process_id);
      }
    } else {
      await managerService.denyCandidate(candidate.candidate_id);
      const removeCandidate = isoCandidates.filter(
        (person) => person.candidate_id !== candidate.candidate_id,
      );
      setIsoCandidates(removeCandidate);
    }
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
        <Button className="isoPsConfirmButton" id="Deferir" onClick={(e) => handleClick(e)} variant="contained">Deferir</Button>
        <Button className="isoPsDenyButton" id="Indeferir" onClick={(e) => handleClick(e)} variant="contained">Indeferir</Button>
      </div>
      <div className="divButtonSituationStudent">
        <button type="button" className="buttonSituationStudent" onClick={() => setShowInfoModal(true)}>Ver situação do aluno</button>
      </div>
      {showInfoModal && (
      <InfoModal
        conteudo={candidate}
        close={handleClickClose}
        className="isoPsLinkButton"
      >
        Ver situação do aluno
      </InfoModal>
      )}

    </div>
  );
}

export default InscritosIsoPS;
