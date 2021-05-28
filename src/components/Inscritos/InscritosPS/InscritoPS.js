import React from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { BiUserCircle } from 'react-icons/bi';
import './InscritoPS.scss';

function InscritoPS({ candidate }) {
  return (
    <div className="linhaInscrito">
      <div className="nomeInscrito">
        <IconContext.Provider value={{ size: 50 }}>
          <BiUserCircle className="isoPsIcon" />
        </IconContext.Provider>
        {candidate.candidate_name}
      </div>
      <div className="linkDocumentos">
        <Link
          to={{
            pathname: '/documentos-enviados',
            state: { candidate },
          }}
        >
          Ver informações do candidato
        </Link>
      </div>
    </div>
  );
}

export default InscritoPS;
