import React, { useState, useEffect } from 'react';
import Box from '../BoxDashboard';
import * as managerService from '../../../services/manager/managerService';

function BoxDashboardProfesssor() {
  const [candidates, setCandidates] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [processsSelective, setProcesssSelective] = useState([]);

  useEffect(async () => {
    const selectiveProcesses = await managerService.getActualSelectiveProcess('process_type');
    const isolatedCandidates = await managerService.getCandidates('candidate_process_id', selectiveProcesses.map((selectiveProcess) => selectiveProcess.process_id));
    setProcesssSelective(selectiveProcesses);
    setCandidates(isolatedCandidates);
  }, []);
  useEffect(() => {
    setFilteredStudents(candidates);
    // setFilteredStudents(candidates.slice(0, 8));
  }, [candidates]);

  return (
    <div>
      <Box
        title="Matrículas Realizadas: "
        subtitle="Candidatos: "
        list={filteredStudents}
        isoCandidates={candidates}
        setIsoCandidates={setCandidates}
        position="first"
        type="prof"
        processes={processsSelective}
      />
      <Box
        subtitle="Candidatos deferidos: "
        listDefer={filteredStudents}
        isoCandidates={candidates}
        setIsoCandidates={setCandidates}
        position="second"
        type="prof"
        processes={processsSelective}
      />
    </div>
  );
}

export default BoxDashboardProfesssor;
