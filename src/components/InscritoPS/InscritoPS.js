import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InscritoPS.scss';
import { BsFileEarmarkArrowDown } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import * as managerService from '../../services/manager/managerService';
import Modal from './Modal';

function InscritoPS({ candidate }) {
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();
  const handleClick = async () => {
    await managerService.denyCandidate(candidate.candidate_id);
  };
  const inscritoModal = async () => {
    setShowPostModal(!showPostModal);
    setDetail(candidate);
  };
  return (
    <div className="linhaInscrito">
      <div className="inscritoPSicon">
        <BsFileEarmarkArrowDown size={40} />
      </div>
      <div aria-hidden="true" className="nomeInscrito" onClick={() => inscritoModal()}>
        {candidate.candidate_name}
      </div>
      <div className="trash">
        <FaTrash onClick={() => handleClick()} size={28} />
      </div>
      <div className="linkDocumentos">
        <Link
          to={{
            pathname: '/documentos-enviados',
            state: { candidate },
          }}
        >
          Ver documentos enviados
        </Link>
      </div>
      {
      showPostModal && (
      <Modal
        conteudo={detail}
        close={inscritoModal}
      />
      )
}
    </div>
  );
}

export default InscritoPS;
