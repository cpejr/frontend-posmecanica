import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Document from '../../../components/Document';
import infos from '../../../utils/CandidateDocuments';
import Modal from '../../../utils/GenericModal';
import * as managerService from '../../../services/manager/managerService';
import './DocsContent.scss';

function DocsContent({ setShowInfoModal, setHasChanged, candidate }) {
  const [action, setAction] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const history = useHistory();

  const handleClickInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseClick = () => {
    setShowConfirmModal(false);
    setShowDeleteModal(false);
  };

  const handleConfirmClick = async () => {
    if (action.toLowerCase() === 'homologar') {
      await managerService.updateCandidate({
        candidate_form_approval: true,
      }, candidate.candidate_id);
      candidate.candidate_form_approval = true;
      setHasChanged(true);
    } else {
      await managerService.updateCandidate({
        candidate_form_approval: false,
      }, candidate.candidate_id);
      candidate.candidate_form_approval = false;
      setHasChanged(false);
    }
    setEdit(false);
    setShowConfirmModal(false);
  };

  const handleButtonDeleteClick = (e) => {
    setAction(e.target.innerText);
    setShowDeleteModal(true);
  };

  const handleDeleteClick = async () => {
    await managerService.denyCandidate(candidate.candidate_id);
    history.push('/painel/administrator');
  };

  const handleButtonsClick = (e) => {
    setAction(e.target.innerText);
    setShowConfirmModal(true);
  };

  const renderLine = (docs) => {
    if (docs.types.length === 1) {
      return (
        <div key={docs.types[0]} className="DC-documentsDivLine">
          <Document handleClick={handleClickInfoModal} type={docs.types[0]} text={docs.text[0]}>
            {docs.icons[0]}
          </Document>
        </div>
      );
    }
    return (
      <div key={docs.types[1]} className="DC-documentsDivLine">
        <Document
          type={docs.types[0]}
          candidate={candidate.candidate_id}
          text={docs.text}
        >
          {docs.icons[0]}
        </Document>
        <Document
          type={docs.types[1]}
          candidate={candidate.candidate_id}
          text={docs.text}
        >
          {docs.icons[1]}
        </Document>
        <Document
          type={docs.types[2]}
          candidate={candidate.candidate_id}
          text={docs.text}
        >
          {docs.icons[2]}
        </Document>
        {candidate.candidate_grade === 'DOUTORADO'
          && (
            <Document
              type={docs.types[3]}
              candidate={candidate.candidate_id}
              text={docs.text}
            >
              {docs.icons[3]}
            </Document>
          )}
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
      {(candidate.candidate_form_approval === null || edit === true) ? (
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
      ) : (
        <div className="DC-result">
          {candidate.candidate_form_approval === true ? (
            <p>Documentos Homologados</p>
          ) : (
            <p>Documentos não homologados</p>
          )}
          <div className="DC-buttons">
            <div className="DC-button-aprovar">
              <button type="button" onClick={() => setEdit(true)}>
                Alterar resultado
              </button>
            </div>
            {candidate.candidate_form_approval === false && (
              <div className="DC-button-solicitar">
                <button type="button" onClick={handleButtonDeleteClick}>
                  Excluir candidato
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showConfirmModal && (
        <Modal handleCloseClick={handleCloseClick} handleConfirmClick={handleConfirmClick}>
          {`Deseja ${action.toLowerCase()} os doumentos do candidato?`}
        </Modal>
      )}
      {showDeleteModal && (
        <Modal handleCloseClick={handleCloseClick} handleConfirmClick={handleDeleteClick}>
          {`Deseja ${action.toLowerCase()} os doumentos do candidato?`}
        </Modal>
      )}
    </div>
  );
}
export default DocsContent;
