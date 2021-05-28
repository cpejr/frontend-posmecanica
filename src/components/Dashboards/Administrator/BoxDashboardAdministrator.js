import React, { useState, useEffect } from 'react';
import Box from '../BoxDashboard';
import * as managerService from '../../../services/manager/managerService';

function BoxDashboardAdministrator() {
  const [candidates, setCandidates] = useState([]);
  useEffect(async () => {
    const selectiveProcesses = await managerService.getSelectiveProcess('process_type', ['MESTRADO', 'DOUTORADO']);
    const totalCandidates = await managerService.getCandidates('candidate_process_id', (selectiveProcesses.map((selectiveProcess) => selectiveProcess.process_id)));
    setCandidates(totalCandidates);
  }, []);

  return (
    <Box title="Processo Seletivo" subtitle="Lista de Inscritos:" list={candidates} type="adm" />
  );
}

export default BoxDashboardAdministrator;
