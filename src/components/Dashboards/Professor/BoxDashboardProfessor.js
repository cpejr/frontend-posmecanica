import React, { useState, useEffect } from 'react';
import Box from '../BoxDashboard';
import * as managerService from '../../../services/manager/managerService';

function BoxDashboardProfesssor() {
  const [candidates, setCandidates] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  useEffect(async () => {
    const selectiveProcesses = await managerService.getSelectiveProcess('process_type', 'ISOLADA');
    const isolatedCandidates = await managerService.getCandidates('candidate_process_id', selectiveProcesses.map((selectiveProcess) => selectiveProcess.process_id));
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
    />
  );
}

export default BoxDashboardProfesssor;
