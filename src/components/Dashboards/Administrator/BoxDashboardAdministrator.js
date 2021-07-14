import React, { useState, useEffect } from 'react';
import Box from '../BoxDashboard';
import * as managerService from '../../../services/manager/managerService';

function BoxDashboardAdministrator() {
  const [candidates, setCandidates] = useState([]);
  const [processsSelective, setProcesssSelective] = useState([]);
  useEffect(async () => {
    const selectiveProcesses = await managerService.getActualSelectiveProcess('process_type', ['', 'MESTRADO', 'DOUTORADO']);
    const totalCandidates = await managerService.getCandidates('candidate_process_id', (selectiveProcesses.map((selectiveProcess) => selectiveProcess.process_id)));
    setCandidates(totalCandidates);
    setProcesssSelective(selectiveProcesses);
  }, []);

  return (
    <Box title="Processo Seletivo" subtitle="Contagem de Inscritos: " list={candidates} processes={processsSelective} type="adm" />
  );
}

export default BoxDashboardAdministrator;
