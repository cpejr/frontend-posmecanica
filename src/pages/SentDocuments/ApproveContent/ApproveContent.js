/* eslint-disable */
import React, { useState } from "react";
import StyledInput from "../../../components/StyledInput";
import Modal from "../../../utils/GenericModal";
import * as managerService from "../../../services/manager/managerService";
import "./ApproveContent.scss";

function ApproveContent({ candidate }) {
  const [action, setAction] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const handleCloseClick = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmClick = async () => {
    if (action.toLowerCase() === "aprovar") {
      await managerService.updateCandidate(
        {
          candidate_approval: true,
        },
        candidate.candidate_id
      );
    } else {
      await managerService.updateCandidate(
        {
          candidate_approval: false,
        },
        candidate.candidate_id
      );
    }
    setShowConfirmModal(false);
  };

  const handleButtonsClick = (e) => {
    setAction(e.target.id)
    setShowConfirmModal(true);
  };

  return (
    <div className="TC-page">
      {candidate.candidate_approval === null ? (
        <>
          <div className="TC-title">Deseja tornar esse candidato um aluno ativo?</div>
          <button
            onClick={handleButtonsClick}
            id="aprovado"
            className="TC-button-aprovar"
            type="button"
          >
            Sim
          </button>
          <button
            onClick={handleButtonsClick}
            id="reprovado"
            className="TC-button-solicitar"
            type="button"
          >
            Não
          </button>
        </>
      ) : (
        <div className="TC-title">
          {candidate.candidate_approval === true ? (
            <>Candidato já aprovado </>
          ) : (
            <>Candidato já reprovado </>
          )}
        </div>
      )}
      {showConfirmModal && (
        <Modal
          handleCloseClick={handleCloseClick}
          handleConfirmClick={handleConfirmClick}
        >
          {`Deseja confirmar que o candidato foi ${action.toLowerCase()} pela banca?`}
        </Modal>
      )}
    </div>
  );
}
export default ApproveContent;
