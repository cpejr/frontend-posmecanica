/* eslint-disable no-restricted-syntax */
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
    const disciplineAux = [];
    const allCandidatesArray = [];
    const disciplineProfessor = [];
    let filteredCandidates = [];

    const getAllProfessorDiscipline = await managerService.getAllProfessorDiscipline('pd_professor_id', user.id);
    getAllProfessorDiscipline.forEach((response) => {
      disciplineProfessor.push(response.pd_dis_id);
    });

    for (const id of disciplineProfessor) {
      const disc = await managerService.getByIdDiscipline(id);
      disciplineAux.push({ label: disc.discipline_name, value: disc.discipline_id });
    }
    filteredCandidates = [...new Set(allCandidatesArray)];
    setCandidates(filteredCandidates);

    setDisciplineObject(disciplineAux);
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
        setList={setFilteredStudents}
        disciplineFilter={disciplineObject}
        position="first"
        type="prof"
        processes={processsSelective}
      />
      <Box
        subtitle="Candidatos deferidos: "
        list={filteredStudents}
        setList={setFilteredStudents}
        disciplineFilter={disciplineObject}
        position="second"
        type="prof"
        processes={processsSelective}
      />
    </div>
  );
}

export default BoxDashboardProfesssor;
