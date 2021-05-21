import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SelectiveProcess.scss';

function SelectiveProcess({ name, type, progress }) {
  const [inCourse, setInCourse] = useState();

  useEffect(async () => {
    if (progress === 'Finalizado') {
      setInCourse(false);
    } else {
      setInCourse(true);
    }
  }, []);

  return (
    <div className="compoSP-externalDiv">
      <div className="compoSP-titles">
        <div className="compoSP-principalTitle">
          <Link to="/dashboard/professor">
            {name}
          </Link>
        </div>
        <div className="compoSP-subtitle">
          {type}
        </div>
      </div>
      <div className={inCourse ? 'compoSP-buttonAndamento' : 'compoSP-buttonFinalizado'}>
        {progress}
      </div>
    </div>
  );
}

export default SelectiveProcess;
