import React, { useState, useEffect } from 'react';
import './BoxDashboardAdministrator.scss';
import InscritoPS from '../../InscritoPS';
import * as managerService from '../../../services/manager/managerService';

function BoxDashboardAdministrator() {
  const [candidates, setCandidates] = useState([]);
  useEffect(async () => {
    const selectiveProcess = await managerService.getByIdSelectiveProcess('0615d76a-acfa-4231-b698-0a66ec0ce7d7');
    const totalCandidates = await managerService.getCandidates('candidate_process_id', selectiveProcess.candidate_process_id);
    setCandidates(totalCandidates);
  }, []);
  return (
    <div className="BDAtela">
      <div className="BDAtituloPrincipal"> Processo Seletivo </div>
      <div className="BDAtituloSecundario"> Lista de Inscritos: </div>
      <div className="BDAaba">
        <div className="BDAinscritos">
          {candidates.map((candidate) => (
            <InscritoPS candidate={candidate} key={candidate.candidate_id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoxDashboardAdministrator;
