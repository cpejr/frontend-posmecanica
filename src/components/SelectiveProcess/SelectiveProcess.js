import React, { useState, useEffect } from 'react';
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
          <button
            type="button"
            className="buttonInfoSPname"
          >
            {name}
          </button>
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
