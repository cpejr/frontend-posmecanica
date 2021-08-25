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
    setData(data);
    handleClickOpen();
  };

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
            onClick={storeData}
          >
            {infoPS.process_name}
          </button>
        </div>
      </div>
      <div className={inCourse ? 'compoSP-buttonAndamento' : 'compoSP-buttonFinalizado'}>
        {progress}
      </div>
    </div>
  );
}

export default SelectiveProcess;
