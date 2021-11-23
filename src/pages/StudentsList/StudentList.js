import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import StyledInput from '../../components/StyledInput';
import RightPanel from '../../components/Menu/RightPanel';
import * as managerService from '../../services/manager/managerService';
import InscritoPS from '../../components/Inscritos/InscritosPS/InscritoPS';
import { AllTitleTypes } from '../../utils/titleTypes';
import './StudentList.scss';

function StudentList() {
  const initialState = {
    semester: '',
  };
  const [allStudents, setAllStudents] = useState([]);
  const [filterStudents, setFilterStudents] = useState([]);
  const [dados, setDados] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('');
  const [semestre, setSemestre] = useState([]);
  const [filterName, setFilterName] = useState();
  const [filterGraduation, setFilterGraduation] = useState();
  const [expandRightPanel, setExpandRightPanel] = useState(false);

  useEffect(async () => {
    if (dados.semester === '') {
      setPeriod('Todos');
    } else {
      setPeriod(`${dados.semester}`);
    }
  }, [dados]);

  useEffect(async () => {
    if (dados) {
      setLoading(true);
      const students = await managerService.getStudents();
      const selectiveProcess = await managerService.getAllSelectiveProcess();
      setAllStudents(students);
      setFilterStudents(students);
      let Array = [];
      selectiveProcess.forEach((process) => {
        Array.push(process.process_semester);
      });
      Array = [...new Set(Array)];
      Array.sort();
      const auxSemestre = [];
      auxSemestre.push({ label: 'Todos', value: 'Todos' });
      Array.forEach((semester) => {
        auxSemestre.push({ label: semester, value: semester });
      });
      setSemestre(auxSemestre);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let initialStudents = allStudents;
    if (filterName) {
      initialStudents = initialStudents.filter(
        (student) => student.candidate_name.toLowerCase().includes(filterName.toLowerCase()),
      );
    }
    if (period !== '' && period !== 'Todos') {
      initialStudents = initialStudents.filter((student) => (
        student.selective_process.process_semester === period
      ));
    }
    if (filterGraduation) {
      initialStudents = initialStudents.filter((student) => (
        student.process_type.toLowerCase() === filterGraduation.toLowerCase()
      ));
    }
    setFilterStudents(initialStudents);
  }, [filterName, period, filterGraduation]);

  const handleFilterNameChange = (value) => {
    setFilterName(value);
  };
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  const handleFilterGraduationChange = (value) => {
    setFilterGraduation(value);
  };
  const inputProps = [
    {
      text: 'Página principal',
      path: 'administrator',
    },
    {
      text: 'Lista de professores',
      path: 'lista-professores',
    },
    {
      text: 'Lista de Disciplinas',
      path: 'administrator/lista-isoladas',
    },
    {
      text: 'Criar processo seletivo',
      path: 'administrator/criar-processo-seletivo',
    },
    {
      text: 'Visualizar Processos Seletivos',
      path: 'processos-seletivos',
    },
    {
      text: 'Cadastro de professores',
      path: 'administrator/formulario-professores',
    },
    {
      text: 'Cadastro de disciplina isolada',
      path: 'administrator/cadastro-disciplina',
    },
    {
      text: 'Enviar Notificação',
      path: 'administrator/criar-notificacao',
    },
    {
      text: 'Redefinição de senha',
      path: '../esqueci-senha',
    },
  ];
  return (
    <div className="studentList-Root">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="studentList-Content">
        <div className="studentList-LeftContainer">
          <h1>Lista de estudantes</h1>
          <div className="studentList-Filters">
            <div className="studentList-FiltersDIVInside">
              <StyledInput
                styled={{ marginTop: '20px' }}
                type="text"
                id="filter-name"
                label="Nome"
                width="80%"
                dados={filterName}
                setDados={handleFilterNameChange}
              />
              <StyledInput
                type="text"
                id="semester"
                label="Semestre"
                width="80%"
                field={semestre}
                select
                dados={dados}
                setDados={handleChange}
              />
              <StyledInput
                type="text"
                id="filter-graduation"
                label="Graduação"
                width="80%"
                field={AllTitleTypes}
                select
                dados={filterGraduation}
                setDados={handleFilterGraduationChange}
              />
            </div>
          </div>
          <div className={loading ? 'gridLoadTrue' : 'gridAll'}>
            {loading === true && (
              <div className="gridLoaderTrue">
                <CircularProgress size={32} color="inherit" className="LoaderProfCandidates" />
              </div>
            )}
            {filterStudents.map((student) => (
              <div className="formsDI_input_list">
                <InscritoPS
                  candidate={student}
                  boolean="true"
                  studentCondition="true"
                />
              </div>
            ))}
          </div>
        </div>
        <RightPanel
          inputProps={inputProps}
          expandRightPanel={expandRightPanel}
          setExpandRightPanel={setExpandRightPanel}
        />
      </div>
      <Footer />
    </div>
  );
}

export default StudentList;
