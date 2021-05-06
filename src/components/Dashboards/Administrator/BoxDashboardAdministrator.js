import React, { useState, useEffect } from 'react';
import './BoxDashboardAdministrator.scss';
import InscritoPS from '../../InscritoPS';
import * as managerService from '../../../services/manager/managerService';

function BoxDashboardAdministrator() {
  const [candidates, setCandidates] = useState([]);
  useEffect(async () => {
    const selectiveProcess = await managerService.getByIdSelectiveProcess('ce96ed27-7d30-4157-bc63-bc9bd2a21dc6');
    const totalCandidates = await managerService.getCandidates('candidate_process_id', selectiveProcess.candidate_process_id);
    setCandidates(totalCandidates);
    console.log(candidates);
  }, []);
  return (
    <div className="tela">
      <div className="tituloPrincipal"> Processo Seletivo </div>
      <div className="tituloSecundario"> Lista de Inscritos: </div>
      <div className="aba">
        <div className="inscritos">
          {candidates.map((candidate, key) => (
            <InscritoPS name={candidate.candidate_name} id={candidate.candidate_id} chave={key} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoxDashboardAdministrator;
