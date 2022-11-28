import React, { useState, useEffect } from 'react';
import Box from '../BoxDashboard';
import * as managerService from '../../../services/manager/managerService';

function recentEndingDate(a, b) {
  const a1 = new Date(a.process_date_end);
  const b1 = new Date(b.process_date_end);
  return b1 - a1;
}

function alreadyStarted(a) {
  const initialDate = new Date(a.process_date_begin);
  return initialDate <= new Date();
}

function BoxDashboardAdministrator() {
  const [candidates, setCandidates] = useState([]);
  const [processsSelective, setProcesssSelective] = useState([]);
  const [activeProcesses, setActiveProcesses] = useState(true);
  useEffect(async () => {
    let selectiveProcesses = await managerService.getActualSelectiveProcess('process_type', ['ISOLADA', 'MESTRADO', 'DOUTORADO']);
    if (selectiveProcesses.length === 0) {
      const allSelectiveProcesses = await managerService.getAllSelectiveProcessPainels('process_type', ['ISOLADA', 'MESTRADO', 'DOUTORADO']);
      selectiveProcesses = allSelectiveProcesses.filter(alreadyStarted).sort(recentEndingDate);
      selectiveProcesses.length = 1;
      setActiveProcesses(false);
    }
    let totalCandidates = await managerService.getCandidates('candidate_process_id', (selectiveProcesses.map((selectiveProcess) => selectiveProcess.process_id)));
    totalCandidates = totalCandidates.filter((response) => {
      if (response.candidate_approval !== true
        && response.candidate_deferment !== true) { return true; }
      return false;
    });
    setCandidates(totalCandidates);
    setProcesssSelective(selectiveProcesses);
  }, []);

  return (
    <Box
      title={activeProcesses ? 'Processo Seletivo' : 'Último Processo Seletivo'}
      subtitle="Contagem de Inscritos: "
      activeProcesses={activeProcesses}
      position="first"
      list={candidates}
      processes={processsSelective}
      type="adm"
    />
  );
}

export default BoxDashboardAdministrator;
