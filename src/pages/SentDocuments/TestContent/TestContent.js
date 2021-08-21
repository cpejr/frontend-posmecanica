/* eslint-disable */
import React, { useState } from "react";
import StyledInput from "../../../components/StyledInput";
import Modal from "../../../utils/GenericModal";
import * as managerService from "../../../services/manager/managerService";
import "./TestContent.scss";

function TestContent({ id }) {
  const [action, setAction] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [rank, setRank] = useState();

  const handleChange = (value) => {
    setRank(value);
  };

  const handleCloseClick = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmClick = async () => {
    if (action.toLowerCase() === "aprovar") {
      await managerService.updateCandidate(
        {
          candidate_rating: rank,
          candidate_test_approval: true,
        },
        id
      );
    } else {
      await managerService.updateCandidate(
        {
          candidate_rating: rank,
          candidate_test_approval: false,
        },
        id
      );
    }
    setShowConfirmModal(false);
  };

  const handleButtonsClick = (e) => {
    setAction(e.target.innerText);
    setShowConfirmModal(true);
  };

  return (
    <div className="TC-page">
      <div className="TC-title">Prova</div>
      <StyledInput
        type="number"
        id="candidate_name"
        label="Colocação"
        width="16rem"
        setDados={handleChange}
      />
      <button
        onClick={handleButtonsClick}
        className="TC-button-aprovar"
        type="button"
      >
        Aprovar
      </button>
      <button
        onClick={handleButtonsClick}
        className="TC-button-solicitar"
        type="button"
      >
        Reprovar
      </button>
      {showConfirmModal && (
        <Modal
          handleCloseClick={handleCloseClick}
          handleConfirmClick={handleConfirmClick}
        >
          {`Deseja ${action.toLowerCase()} a prova do candidato?`}
        </Modal>
      )}
    </div>
  );
}
export default TestContent;
