import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { BiUserCircle } from 'react-icons/bi';
import InfoModal from '../../../pages/SentDocuments/InfoModal';
import './InscritoPS.scss';
import * as managerService from '../../../services/manager/managerService';

function InscritoPS({ candidate, boolean, studentCondition }) {
  const history = useHistory();
  const [processType, setProcesstype] = useState();
  const [stylesProcessType, setstylesProcessType] = useState(false);
  const [studentList, setStudentList] = useState();
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
      if (studentCondition === 'true' && response[1][0]?.cd_dis_deferment === true) {
        line.disciplineName = response[0].discipline_name;
      } else if (studentCondition !== 'true') {
        line.disciplineName = response[0].discipline_name;
        line.candidateDisciplineDeferment = response[1][0]?.cd_dis_deferment;
        line.professorName = response[2].prof_name;
      }
    }).then(() => {
      if (line.disciplineName) {
        setObject((previousState) => [...previousState, line]);
      }
    });
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
      setStudentList(true);
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
  }, [candidate]);

  const handleClick = () => {
    history.push({
      pathname: '/documentos-enviados',
      state: { candidate },
    });
  };

  return (
    <>
      {candidate.selective_process.process_type !== 'ISOLADA' && studentList !== true ? (
        <div className="linhaInscrito">
          <div className="nomeInscrito">
            <IconContext.Provider value={{ size: 50 }}>
              <BiUserCircle className="isoPsIcon" />
            </IconContext.Provider>
            <p>{candidate.candidate_name}</p>
          </div>
          <div className="tipo">
            <div className={stylesProcessType ? 'Mestrado' : 'Doutorado'}>
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
              <p>{buttonText}</p>
              <p>Info</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="linhaInscrito">
          <div className="nomeInscrito">
            <IconContext.Provider value={{ size: 50 }}>
              <BiUserCircle className="isoPsIcon" />
            </IconContext.Provider>
            <p>{candidate.candidate_name}</p>
          </div>
          <div className="tipo">
            <div className={processType}>
              {processType}
            </div>
          </div>
          <div className="divButtonInfoIsolatedCandidate">
            <button type="button" className="buttonInfoIsolatedCandidate" onClick={() => setShowInfoModal(true)}>
              <p>Ver informações do candidato</p>
              <p>Info</p>
            </button>
          </div>
        </div>
      )}
      {showInfoModal && (
        <InfoModal
          painelADM={studentCondition === 'true' ? 0 : 1}
          studentList={studentCondition}
          disciplinaInfo={object}
          conteudo={candidate}
          handleClick={handleClick}
          close={handleClickClose}
          className="isoPsLinkButton"
        />
      )}
    </>
  );
}

export default InscritoPS;
