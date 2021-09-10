import React, { useState, useEffect } from 'react';
import Box from '../BoxDashboard';
import * as managerService from '../../../services/manager/managerService';

function BoxDashboardProfesssor() {
  const [candidates, setCandidates] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [processsSelective, setProcesssSelective] = useState([]);
  const [disciplineObject, setDisciplineObject] = useState([]);

  useEffect(async () => {
    const data = localStorage.getItem('user');
    const user = JSON.parse(data);
    const selectiveProcesses = await managerService.getActualSelectiveProcess('process_type', 'ISOLADA');
    const isolatedCandidates = await managerService.getCandidates('candidate_process_id', selectiveProcesses[0].process_id);
    const disciplineAux = [];

    await managerService.getAllProfessorDiscipline('pd_professor_id', user.id).then((resp) => {
      const disciplineProfessor = [];
      resp.forEach((response) => {
        disciplineProfessor.push(response.pd_dis_id);
      });
      disciplineProfessor.forEach((id) => {
        managerService.getByIdDiscipline(id).then((disc) => {
          disciplineAux.push({ label: disc.discipline_name, value: disc.discipline_id });
        });
        isolatedCandidates.forEach((candidato) => {
          if (candidato.first_discipline_isolated === id
            || candidato.second_discipline_isolated === id
            || candidato.third_discipline_isolated === id
            || candidato.fourth_discipline_isolated === id) {
            setCandidates([candidato]);
          }
        });
      });
    });
    setDisciplineObject(disciplineAux);
    console.log('🚀 ~ file: BoxDashboardProfessor.js ~ line 10 ~ BoxDashboardProfesssor ~ disciplineObject', disciplineObject);
    setProcesssSelective(selectiveProcesses);
  }, []);
  useEffect(() => {
    setFilteredStudents(candidates);
  }, [candidates]);

  return (
    <div>
      <Box
        title="Matrículas Realizadas: "
        subtitle="Candidatos: "
        list={filteredStudents}
        isoCandidates={candidates}
        setIsoCandidates={setCandidates}
        disciplineFilter={disciplineObject}
        position="first"
        type="prof"
        processes={processsSelective}
      />
      <Box
        subtitle="Candidatos deferidos: "
        list={filteredStudents}
        isoCandidates={candidates}
        setIsoCandidates={setCandidates}
        disciplineFilter={disciplineObject}
        position="second"
        type="prof"
        processes={processsSelective}
      />
    </div>
  );
}

export default BoxDashboardProfesssor;
