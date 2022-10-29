import React, { useState, useEffect } from 'react';
import './DisciplinesResult.scss';

function DisciplinesResult({
  candidate, disciplineToDeferment,
}) {
  const [showCandidate, setShowCandidate] = useState(true);

  useEffect(() => {
    setShowCandidate(true);
  }, [disciplineToDeferment]);

  return (
    <div className="isoPsListItem" id={candidate.candidate_id}>
      <div className="Result-candidate">
        <p className="Result-fields">{candidate.candidate_name}</p>
        <p>{candidate.candidate_cpf}</p>
        <p className="Result-fields">{candidate.discipline_name}</p>
      </div>
      {showCandidate === null
        && (
          <div className="isoPsDivButtons">
            <div className="isoPsDivButtonsDeferido" />
          </div>
        )}
    </div>
  );
}

export default DisciplinesResult;
