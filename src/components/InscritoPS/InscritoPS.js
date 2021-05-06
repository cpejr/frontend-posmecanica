import React from 'react';
import { Link } from 'react-router-dom';
import './InscritoPS.scss';
import { BsFileEarmarkArrowDown } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import * as managerService from '../../services/manager/managerService';

function InscritoPS({ name, id }) {
  const handleClick = async () => {
    await managerService.denyCandidate(id);
  };
  return (
    <div className="linhaInscrito">
      <div className="inscritoPSicon">
        <BsFileEarmarkArrowDown size={40} />
      </div>
      <div className="nomeInscrito">
        {name}
      </div>
      <div className="trash">
        <FaTrash onClick={() => handleClick()} size={28} />
      </div>
      <div className="linkDocumentos">
        <Link to="/dashboard/administrator"> Ver documentos enviados </Link>
      </div>
    </div>
  );
}

export default InscritoPS;
