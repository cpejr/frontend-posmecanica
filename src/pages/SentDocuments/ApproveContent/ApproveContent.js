/* eslint-disable */
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Modal from "../../../utils/GenericModal";
import * as managerService from "../../../services/manager/managerService";
import "./ApproveContent.scss";

function ApproveContent({ candidate }) {
  const [action, setAction] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const history = useHistory();

  const handleCloseClick = () => {
    setShowConfirmModal(false);
    setShowDeleteModal(false);
  };

  const handleConfirmClick = async () => {
    const result = await managerService.getStudents('stud_candidate_id', candidate.candidate_id);
    if (action.toLowerCase() === "aprovado") {
      await managerService.updateCandidate(
        {
          candidate_approval: true,
        },
        candidate.candidate_id
      );
      candidate.candidate_approval = true;
      if (result.length === 0) {
        await managerService.createStudent(candidate);
      }
    } else {
      await managerService.updateCandidate(
        {
          candidate_approval: false,
        },
        candidate.candidate_id
      );
      if (result.length > 0) {
        await managerService.deleteStudent(result[0].stud_id);
      }
      candidate.candidate_approval = false;
    }
    setShowConfirmModal(false);
  };

  const handleButtonsClick = (e) => {
    setAction(e.target.id)
    setShowConfirmModal(true);
    setEdit(false);
  };

  const handleButtonDeleteClick = (e) => {
    setAction(e.target.innerText);
    setShowDeleteModal(true);
  };

  const handleDeleteClick = async () => {
    await managerService.denyCandidate(candidate.candidate_id);
    history.push('/painel/administrator');
  };
  
  return (
    <div className="TC-page">
      {(candidate.candidate_approval === null || edit === true) ? (
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
        <>
          <div className="TC-title">
            {candidate.candidate_approval === true ? (
              <>Candidato aprovado </>
            ) : (
              <>Candidato já reprovado </>
            )}
          </div>
          <button
            onClick={() => {setEdit(true)}}
            id="aprovado"
            className="TC-button-aprovar"
            type="button"
          >
            Alterar resultado
          </button>
          {candidate.candidate_approval === false &&(
            <button
              onClick={handleButtonDeleteClick}
              id="reprovado"
              className="TC-button-solicitar"
              type="button"
            >
              Excluir candidato
            </button>
          )}
        </>
      )}
      {showConfirmModal && (
        <Modal
          handleCloseClick={handleCloseClick}
          handleConfirmClick={handleConfirmClick}
        >
          {`Deseja confirmar que o candidato foi ${action.toLowerCase()} pela banca?`}
        </Modal>
      )}
      {showDeleteModal && (
        <Modal
          handleCloseClick={handleCloseClick}
          handleConfirmClick={handleDeleteClick}
        >
          {`Deseja confirmar que o candidato foi ${action.toLowerCase()} pela banca?`}
        </Modal>
      )}
    </div>
  );
}
export default ApproveContent;
