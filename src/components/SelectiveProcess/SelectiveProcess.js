/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import './SelectiveProcess.scss';

function SelectiveProcess({
  infoPS, progress, handleClickOpen, setData,
}) {
  const [inCourse, setInCourse] = useState();

  const storeData = () => {
    const data = {};
    data.process_type = infoPS.process_type;
    data.process_name = infoPS.process_name;
    data.process_date_begin = infoPS.process_date_begin;
    data.process_date_end = infoPS.process_date_end;
    data.candidate_quantity = infoPS.candidate_quantity;
    data.process_id = infoPS.process_id;
    setData(data);
    handleClickOpen();
  };

  useEffect(async () => {
    if (progress === 'Finalizado') {
      setInCourse(false);
    } else if (progress === 'Em andamento') {
      setInCourse(true);
    } else {
      setInCourse(null);
    }
  }, []);

  return (
    <div className="compoSP-externalDiv">
      <div className="compoSP-titles">
        <div className="compoSP-principalTitle">
          <button
            type="button"
            className="buttonInfoSPname"
            onClick={storeData}
          >
            {infoPS.process_name}
          </button>
        </div>
      </div>
      <div className={inCourse ? 'campoSP-buttonAndamento' : inCourse === false ? 'campoSP-buttonFinalizado' : 'campoSP-buttonNaoIniciado'}>
        {progress}
      </div>
    </div>
  );
}

export default SelectiveProcess;
