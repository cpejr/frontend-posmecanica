import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { BiUserCircle } from 'react-icons/bi';
import InfoModal from '../../../pages/SentDocuments/InfoModal';
import './InscritoPS.scss';
import * as managerService from '../../../services/manager/managerService';

function InscritoPS({ candidate, boolean }) {
  const [processType, setProcesstype] = useState();
  const [stylesProcessType, setstylesProcessType] = useState(false);
  const [buttonText, setButtonText] = useState();
  const [link, setLink] = useState();
  const [showInfoModal, setShowInfoModal] = useState(false);

  const [object, setObject] = useState([]);

  const handleClickClose = () => {
    setShowInfoModal(false);
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

  useEffect(() => {
    setObject('');
    if (candidate.selective_process.process_type === 'ISOLADA') {
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
    }

    if (boolean === 'true') {
      setProcesstype(candidate.process_type);
      if (candidate.process_type === 'DOUTORADO') {
        setProcesstype('Doutorado');
        setstylesProcessType(false);
      } else {
        setProcesstype('Mestrado');
        setstylesProcessType(true);
      }
      setButtonText('Editar informações');
      setLink('/painel/administrator/editar/aluno');
    } else {
      setProcesstype(candidate.selective_process.process_type);
      if (candidate.selective_process.process_type === 'DOUTORADO') {
        setProcesstype('Doutorado');
        setstylesProcessType(false);
      } else {
        setProcesstype('Mestrado');
        setstylesProcessType(true);
      }
      setButtonText('Ver informações do candidato');
      setLink('/documentos-enviados');
    }
    if (candidate.selective_process.process_type === 'ISOLADA') {
      setProcesstype('Isolada');
    }
  }, []);

  return (
    <>
      {candidate.selective_process.process_type !== 'ISOLADA' ? (
        <div className="linhaInscrito">
          <div className="nomeInscrito">
            <IconContext.Provider value={{ size: 50 }}>
              <BiUserCircle className="isoPsIcon" />
            </IconContext.Provider>
            {candidate.candidate_name}
          </div>
          <div className="tipo">
            <div className={stylesProcessType ? 'mestrado' : 'doutorado'}>
              {processType}
            </div>
          </div>
          <div className="linkDocumentos">
            <Link
              to={{
                pathname: link,
                state: { candidate },
              }}
            >
              {buttonText}
            </Link>
          </div>
        </div>
      ) : (
        <div className="linhaInscrito">
          <div className="nomeInscrito">
            <IconContext.Provider value={{ size: 50 }}>
              <BiUserCircle className="isoPsIcon" />
            </IconContext.Provider>
            {candidate.candidate_name}
          </div>
          <div className="tipo">
            <div className="isolada">
              {processType}
            </div>
          </div>
          <div className="divButtonInfoIsolatedCandidate">
            <button type="button" className="buttonInfoIsolatedCandidate" onClick={() => setShowInfoModal(true)}>Ver informações do candidato</button>
          </div>
        </div>
      )}
      {showInfoModal && (
        <InfoModal
          painelADM={1}
          disciplinaInfo={object}
          conteudo={candidate}
          close={handleClickClose}
          className="isoPsLinkButton"
        />
      )}
    </>
  );
}

export default InscritoPS;
