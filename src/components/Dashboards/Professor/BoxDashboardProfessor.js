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
    const isolatedCandidates = await managerService.getCandidates('candidate_process_id', selectiveProcesses[0].process_id);
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

      isolatedCandidates.forEach((candidato) => {
        if (candidato.first_discipline_isolated === id
          || candidato.second_discipline_isolated === id
          || candidato.third_discipline_isolated === id
          || candidato.fourth_discipline_isolated === id) {
          allCandidatesArray.push(candidato);
        }
      });
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
        setList={setFilteredStudents}
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
