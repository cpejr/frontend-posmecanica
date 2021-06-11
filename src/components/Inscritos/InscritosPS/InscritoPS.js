import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { BiUserCircle } from 'react-icons/bi';
import './InscritoPS.scss';

function InscritoPS({ candidate }) {
  const [processType, setProcesstype] = useState();
  const [stylesProcessType, setstylesProcessType] = useState(false);
  useEffect(async () => {
    setProcesstype(candidate.selective_process.process_type);
    if (candidate.selective_process.process_type === 'DOUTORADO') {
      setProcesstype('Doutorado');
      setstylesProcessType(false);
    } else {
      setProcesstype('Mestrado');
      setstylesProcessType(true);
    }
  }, []);
  return (
    <div className="linhaInscrito">
      <div className="nomeInscrito">
        <IconContext.Provider value={{ size: 50 }}>
          <BiUserCircle className="isoPsIcon" />
        </IconContext.Provider>
        {candidate.candidate_name}
      </div>
      <div className="tipo">
        <div className={stylesProcessType ? 'mestrado' : 'doutorado'}>
          {processType}
        </div>
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
