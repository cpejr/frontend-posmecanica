import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { BiUserCircle } from 'react-icons/bi';
import './InscritoPS.scss';

function InscritoPS({ candidate, boolean }) {
  const [processType, setProcesstype] = useState();
  const [stylesProcessType, setstylesProcessType] = useState(false);
  const [buttonText, setButtonText] = useState();
  const [link, setLink] = useState();
  useEffect(async () => {
    console.log(candidate);
    if (boolean === 'true') {
      setProcesstype(candidate.process_type);
      if (candidate.process_type === 'DOUTORADO') {
        setProcesstype('Doutorado');
        setstylesProcessType(false);
      } else {
        setProcesstype('Mestrado');
        setstylesProcessType(true);
      }
      setButtonText('Editar informações');
      setLink('/painel/administrator/editar/aluno');
    } else {
      setProcesstype(candidate.selective_process.process_type);
      if (candidate.selective_process.process_type === 'DOUTORADO') {
        setProcesstype('Doutorado');
        setstylesProcessType(false);
      } else {
        setProcesstype('Mestrado');
        setstylesProcessType(true);
      }
      setButtonText('Ver informações do candidato');
      setLink('/documentos-enviados');
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
            pathname: link,
            state: { candidate },
          }}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

export default InscritoPS;
