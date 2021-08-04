/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import StyledInput from '../../components/StyledInput';
import RightPanel from '../../components/Menu/RightPanel';
import * as managerService from '../../services/manager/managerService';
import InscritoPS from '../../components/Inscritos/InscritosPS/InscritoPS';
import { AllTitleTypes } from '../../utils/titleTypes';
import './StudentList.scss';

function StudentList() {
  const [allStudents, setAllStudents] = useState([]);
  const [filterStudents, setFilterStudents] = useState([]);
  const [years, setYears] = useState([]);
  const [filterName, setFilterName] = useState();
  const [filterYear, setFilterYear] = useState();
  const [filterGraduation, setFilterGraduation] = useState();
  const [expandRightPanel, setExpandRightPanel] = useState(false);

  useEffect(async () => {
    const students = await managerService.getStudents();
    let yearsFilters = [{ label: 'Nenhum filtro', value: '' }];
    let existentYears = students.map((student) => {
      const parseDate = new Date(student.created_at).getUTCFullYear();
      const parseDateObj = { label: `${parseDate}`, value: `${parseDate}` };
      return parseDateObj;
    });
    existentYears = [...new Map(existentYears.map((item) => [item.label, item])).values()];
    yearsFilters = yearsFilters.concat(existentYears);
    setAllStudents(students);
    setFilterStudents(students);
    setYears(yearsFilters);
  }, []);

  useEffect(() => {
    let initialStudents = allStudents;
    if (filterName) {
      initialStudents = initialStudents.filter(
        (student) => student.candidate_name.toLowerCase().includes(filterName.toLowerCase()),
      );
    }
    if (filterYear) {
      initialStudents = initialStudents.filter((student) => (
        new Date(student.created_at).getUTCFullYear().toString() === filterYear
      ));
    }
    if (filterGraduation) {
      initialStudents = initialStudents.filter((student) => (
        student.process_type.toLowerCase() === filterGraduation.toLowerCase()
      ));
    }
    setFilterStudents(initialStudents);
  }, [filterName, filterYear, filterGraduation]);

  const handleFilterNameChange = (value) => {
    setFilterName(value);
  };
  const handleFilterYearChange = (value) => {
    setFilterYear(value);
  };
  const handleFilterGraduationChange = (value) => {
    setFilterGraduation(value);
  };
  const inputProps = [
    {
      text: 'Página principal',
      path: 'lista-estudantes',
    },
    {
      text: 'Criar processo seletivo',
      path: '/',
    },
    {
      text: 'Postagens de teses',
      path: '/',
    },
    {
      text: 'Cadastro de professores',
      path: 'lista-professores',
    },
    {
      text: 'Cadastro de disciplina isolada',
      path: 'cadastro-disciplina',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
    },
  ];
  const Json = {
    candidate_name: 'Malaquias',
    process_type: 'mestrado',
  };

  return (
    <div className="studentList-Root">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="studentList-Content">
        <div className="studentList-LeftContainer">
          <div className="studentList-Filters">
            <StyledInput
              type="text"
              id="filter-name"
              label="Nome"
              width="16rem"
              dados={filterName}
              setDados={handleFilterNameChange}
            />
            <StyledInput
              type="number"
              id="filter-year"
              label="Ano"
              width="16rem"
              field={years}
              select
              dados={filterYear}
              setDados={handleFilterYearChange}
            />
            <StyledInput
              type="text"
              id="filter-graduation"
              label="Graduação"
              width="16rem"
              field={AllTitleTypes}
              select
              dados={filterGraduation}
              setDados={handleFilterGraduationChange}
            />
          </div>
          <div className="gridAll">
            {filterStudents.map((student) => (
              <div className="formsDI_input">
                <InscritoPS
                  candidate={student}
                  boolean="true"
                />
              </div>
            ))}
          </div>
        </div>
        <RightPanel inputProps={inputProps} expandRightPanel={expandRightPanel} />
      </div>
      <Footer />
    </div>
  );
}

export default StudentList;
