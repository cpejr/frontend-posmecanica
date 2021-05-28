import React from 'react';
import { IconContext } from 'react-icons/lib';
import { BiUserCircle } from 'react-icons/bi';
import Button from '@material-ui/core/Button';
import * as managerService from '../../../services/manager/managerService';
import './InscritosIsoPS.scss';

function InscritosIsoPS({ isoCandidates, setIsoCandidates, candidate }) {
  const handleClick = async (e) => {
    const buttonName = e.currentTarget.id;
    if (buttonName === 'Deferir') {
      // await managerService.approveCandidate();
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
      <a
        href="https://www.google.com"
        target="_blank"
        rel="noreferrer"
        className="isoPsLinkButton"
      >
        Ver situação do aluno
      </a>
    </div>
  );
}

export default InscritosIsoPS;
