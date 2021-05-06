import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InscritoPS.scss';
import { BsFileEarmarkArrowDown } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import * as managerService from '../../services/manager/managerService';
import Modal from './Modal';

function InscritoPS({ name, id }) {
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();
  const handleClick = async () => {
    await managerService.denyCandidate(id);
  };
  const inscritoModal = async () => {
    const candidatoAtual = await managerService.getByIdCandidate(id);
    setShowPostModal(!showPostModal);
    setDetail(candidatoAtual);
    console.log({ candidatoAtual });
    console.log({ detail });
  };
  return (
    <div className="linhaInscrito">
      <div className="inscritoPSicon">
        <BsFileEarmarkArrowDown size={40} />
      </div>
      <div aria-hidden="true" className="nomeInscrito" onClick={() => inscritoModal()}>
        {name}
      </div>
      <div className="trash">
        <FaTrash onClick={() => handleClick()} size={28} />
      </div>
      <div className="linkDocumentos">
        <Link to="/"> Ver documentos enviados </Link>
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
