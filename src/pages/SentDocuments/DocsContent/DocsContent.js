import React, { useState } from 'react';
import Document from '../../../components/Document';
import infos from '../../../utils/CandidateDocuments';
import Modal from '../../../utils/GenericModal';
import * as managerService from '../../../services/manager/managerService';
import './DocsContent.scss';

function DocsContent({ setShowInfoModal, candidate }) {
  const [action, setAction] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleClickInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseClick = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmClick = async () => {
    if (action.toLowerCase() === 'homologar') {
      await managerService.updateCandidate({
        candidate_form_approval: true,
      }, candidate.candidate_id);
    } else {
      await managerService.updateCandidate({
        candidate_form_approval: false,
      }, candidate.candidate_id);
    }
    setShowConfirmModal(false);
  };

  const handleButtonsClick = (e) => {
    setAction(e.target.innerText);
    setShowConfirmModal(true);
  };

  const renderLine = (docs) => {
    if (docs.types.length === 1) {
      return (
        <div key={docs.types[0]} className="DC-documentsDivLine">
          <Document handleClick={handleClickInfoModal} type={docs.types[0]}>
            {docs.icons[0]}
          </Document>
        </div>
      );
    }
    return (
      <div key={docs.types[1]} className="DC-documentsDivLine">
        <Document type={docs.types[0]}>
          {docs.icons[0]}
        </Document>
        <Document type={docs.types[1]}>
          {docs.icons[1]}
        </Document>
      </div>
    );
  };

  const renderInfo = (info) => (
    <div key={info.text} className="DC-infoContainer">
      <div className="DC-personNameTitle">
        {info.text}
      </div>
      {info.docs.map((line) => renderLine(line))}
    </div>
  );

  return (
    <div>
      <div className="DC-title">
        Documentos Enviados
      </div>
      <div className="DC-documentsDiv">
        {infos.map((info) => renderInfo(info))}
      </div>
      {candidate.candidate_form_approval === null && (
        <div className="DC-buttons">
          <div className="DC-button-aprovar">
            <button type="button" onClick={handleButtonsClick}>
              Homologar
            </button>
          </div>
          <div className="DC-button-solicitar">
            <button type="button" onClick={handleButtonsClick}>
              Não homologar
            </button>
          </div>
        </div>
      )}
      {showConfirmModal && (
        <Modal handleCloseClick={handleCloseClick} handleConfirmClick={handleConfirmClick}>
          {`Deseja ${action.toLowerCase()} os doumentos do candidato?`}
        </Modal>
      )}
    </div>
  );
}
export default DocsContent;
