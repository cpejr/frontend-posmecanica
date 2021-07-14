import React, { useState, useEffect } from 'react';
import Box from '../BoxDashboard';
import * as managerService from '../../../services/manager/managerService';

function BoxDashboardProfesssor() {
  const [candidates, setCandidates] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [processsSelective, setProcesssSelective] = useState([]);
  useEffect(async () => {
    const selectiveProcesses = await managerService.getActualSelectiveProcess('process_type', 'ISOLADA');
    const isolatedCandidates = await managerService.getCandidates('candidate_process_id', selectiveProcesses.map((selectiveProcess) => selectiveProcess.process_id));
    setProcesssSelective(selectiveProcesses);
    setCandidates(isolatedCandidates);
  }, []);
  useEffect(() => {
    setFilteredStudents(candidates.slice(0, 5));
  }, [candidates]);

  return (
    <Box
      title="Matrículas Isoladas Realizadas"
      subtitle="Alunos:"
      list={filteredStudents}
      isoCandidates={candidates}
      setIsoCandidates={setCandidates}
      type="prof"
      processes={processsSelective}
    />
  );
}

export default BoxDashboardProfesssor;
