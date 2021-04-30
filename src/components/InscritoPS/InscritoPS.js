import React from 'react';
import { Link } from 'react-router-dom';
import './InscritoPs.scss';
import { BsFileEarmarkArrowDown, BsThreeDots } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';

function InscritoPS({ name }) {
  return (
    <div className="linhaInscrito">
      <BsFileEarmarkArrowDown size={54} />
      <div className="nomeInscrito">
        {name}
      </div>
      <div className="dots">
        <BsThreeDots size={32} />
      </div>
      <div className="dots">
        <FaTrash size={28} />
      </div>
      <div className="linkDocumentos">
        <Link to="/dashboard/administrator"> Ver documentos enviados </Link>
      </div>
    </div>
  );
}

export default InscritoPS;
