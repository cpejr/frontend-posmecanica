/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import * as managerService from '../../services/manager/managerService';
import BoxResult from '../BoxResult';

function SelectiveProcessResult({ processId }) {
  const [candidates, setCandidates] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [processsSelective, setProcesssSelective] = useState([]);
  const [disciplineObject, setDisciplineObject] = useState([]);

  useEffect(async () => {
    const selectiveProcesses = [await managerService.getByIdSelectiveProcess(processId)];
    const allCandidatesArray = [];
    const disciplines = [];
    let filteredCandidates = [];

    const getDiscipline = await managerService.getDisciplines();
    getDiscipline.forEach((response) => {
      disciplines.push({ label: response.discipline_name, value: response.discipline_id });
    });
    filteredCandidates = [...new Set(allCandidatesArray)];
    setCandidates(filteredCandidates);

    setDisciplineObject(disciplines);
    setProcesssSelective(selectiveProcesses);
  }, []);

  useEffect(() => {
    setFilteredStudents(candidates);
  }, [candidates]);

  return (
    <div>
      <BoxResult
        title="Lista de candidatos deferidos: "
        subtitle="Total: "
        list={filteredStudents}
        setList={setFilteredStudents}
        disciplineFilter={disciplineObject}
        processes={processsSelective}
      />
    </div>
  );
}

export default SelectiveProcessResult;
