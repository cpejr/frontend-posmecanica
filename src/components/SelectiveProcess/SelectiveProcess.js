import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SPInfoModal from '../../pages/SentDocuments/SPInfoModal';

import './SelectiveProcess.scss';

function SelectiveProcess({ infoPS, progress }) {
  const history = useHistory();
  const [inCourse, setInCourse] = useState();
  const [showSPInfoModal, setShowSPInfoModal] = useState(false);

  const handleClickClose = () => {
    setShowSPInfoModal(false);
  };
  const handleClickOpen = () => {
    if (showSPInfoModal === true) {
      setShowSPInfoModal(false);
    } else {
      setShowSPInfoModal(true);
    }
  };
  const handleClickRedirect = () => {
    history.push('painel/professor');
  };

  useEffect(async () => {
    if (progress === 'Finalizado') {
      setInCourse(false);
    } else {
      setInCourse(true);
    }
  }, []);

  return (
    <div className="compoSP-externalDiv">
      <div className="compoSP-titles">
        <div className="compoSP-principalTitle">
          <button
            type="button"
            className="buttonInfoSPname"
            onClick={handleClickOpen}
          >
            {infoPS.process_name}
          </button>
        </div>
      </div>
      <div className={inCourse ? 'compoSP-buttonAndamento' : 'compoSP-buttonFinalizado'}>
        {progress}
      </div>
      {showSPInfoModal && (
      <SPInfoModal
        conteudo={infoPS}
        close={handleClickClose}
        redirect={handleClickRedirect}
        className="isoPsLinkButton"
      >
        Ver situação do aluno
      </SPInfoModal>
      )}
    </div>
  );
}

export default SelectiveProcess;
