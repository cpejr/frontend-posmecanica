/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import StyledInput from '../../components/StyledInput';
import SelectiveProcess from '../../components/SelectiveProcess';
import SPInfoModal from '../SentDocuments/SPInfoModal';
import * as managerService from '../../services/manager/managerService';
import './SelectiveProcesses.scss';
import Header from '../../components/Navbar';
import RightPanel from '../../components/Menu/RightPanel';
import { useAuth } from '../../providers/auth';

const initialStateData = {
  process_type: '',
  process_name: '',
  process_date_begin: '',
  process_date_end: '',
};

function SelectiveProcesses() {
  const { user } = useAuth();
  const initialState = {
    semester: '',
  };
  const [showSPInfoModal, setShowSPInfoModal] = useState(false);
  const [dados, setDados] = useState(initialState);
  const [period, setPeriod] = useState('');
  const [allProcessMestrado, setAllProcessMestrado] = useState([]);
  const [filterProcessMestrado, setFilterProcessMestrado] = useState([]);
  const [allProcessDoutorado, setAllProcessDoutorado] = useState([]);
  const [filterProcessDoutorado, setFilterProcessDoutorado] = useState([]);
  const [allProcessIsolada, setAllProcessIsolada] = useState([]);
  const [filterProcessIsolada, setFilterProcessIsolada] = useState([]);
  const [semestre, setSemestre] = useState([]);
  const [data, setData] = useState(initialStateData);

  function verificationIsOpen(process) {
    const beginDate = new Date(process.process_date_begin);
    const endDate = new Date(process.process_date_end);
    const currentDate = new Date();
    if (currentDate >= beginDate && currentDate <= endDate) {
      return 'Em andamento';
    }
    if (currentDate > endDate) {
      return 'Finalizado';
    }
    return 'Não iniciado';
  }
  const handleClickClose = () => {
    setShowSPInfoModal(false);
  };
  const handleClickOpen = () => {
    if (showSPInfoModal === true) {
      setShowSPInfoModal(false);
    } else {
      setShowSPInfoModal(true);
    }
  };

  useEffect(async () => {
    if (dados.semester === '') {
      setPeriod('Todos');
    } else {
      setPeriod(`${dados.semester}`);
    }
  }, [dados]);
  useEffect(async () => {
    const selectiveProcess = await managerService.getAllSelectiveProcess();
    let newArray = selectiveProcess.filter((process) => process.process_type === 'MESTRADO');
    setAllProcessMestrado(newArray);
    setFilterProcessMestrado(newArray);
    newArray = selectiveProcess.filter((process) => process.process_type === 'DOUTORADO');
    setAllProcessDoutorado(newArray);
    setFilterProcessDoutorado(newArray);
    newArray = selectiveProcess.filter((process) => process.process_type === 'ISOLADA');
    setAllProcessIsolada(newArray);
    setFilterProcessIsolada(newArray);
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
  }, []);

  useEffect(() => {
    let initialProcessMestrado = allProcessMestrado;
    let initialProcessDoutorado = allProcessDoutorado;
    let initialProcessIsolada = allProcessIsolada;

    if (period !== '' && period !== 'Todos') {
      initialProcessMestrado = initialProcessMestrado.filter((semester) => (
        semester.process_semester === period
      ));
      initialProcessDoutorado = initialProcessDoutorado.filter((semester) => (
        semester.process_semester === period
      ));
      initialProcessIsolada = initialProcessIsolada.filter((semester) => (
        semester.process_semester === period
      ));
    }
    setFilterProcessMestrado(initialProcessMestrado);
    setFilterProcessDoutorado(initialProcessDoutorado);
    setFilterProcessIsolada(initialProcessIsolada);
  }, [period]);
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const inputProps = [
    {
      text: 'Página principal',
      path: 'administrator',
    },
    {
      text: 'Lista de estudantes',
      path: 'administrator/lista-estudantes',
    },
    {
      text: 'Lista de Disciplinas',
      path: 'administrator/lista-isoladas',
    },
    {
      text: 'Lista de professores',
      path: 'lista-professores',
    },
    {
      text: 'Criar processo seletivo',
      path: 'administrator/criar-processo-seletivo',
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
      text: 'Redefinição de senha',
      path: '../esqueci-senha',
    },
  ];
  const inputPropsProfessor = [
    {
      text: 'Página principal',
      path: 'professor',
    },
    {
      text: 'Lista de professores',
      path: 'lista-professores',
    },
    {
      text: 'Redefinição de senha',
      path: '../esqueci-senha',
    },
  ];
  return (
    <div className="SP-externalDiv">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="SP-screen">
        <div className="SP-title">
          Processos Seletivos
        </div>
        <div className="subTitle-line" />
        <div className="SP-filter">
          <div className="SP-subtitle">
            Filtrar por tempo
          </div>
          <div className="SP-filterBox">
            <StyledInput
              type="text"
              id="semester"
              label="Semestre"
              width="100%"
              field={semestre}
              select
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
        <div className="SP-box">
          <div className="SP-topBar">
            <div className="SP-barTitle">
              {'Período: '}
              {period}
            </div>
          </div>
          <div className="SP-bottomBar">
            {filterProcessMestrado.map((process, key) => (
              <SelectiveProcess
                infoPS={process}
                id={process.process_id}
                progress={verificationIsOpen(process)}
                setData={setData}
                handleClickOpen={handleClickOpen}
                chave={key}
              />
            ))}
            {filterProcessDoutorado.map((process) => (
              <SelectiveProcess
                infoPS={process}
                id={process.process_id}
                setData={setData}
                handleClickOpen={handleClickOpen}
                progress={verificationIsOpen(process)}
              />
            ))}
            {filterProcessIsolada.map((process) => (
              <SelectiveProcess
                infoPS={process}
                id={process.process_id}
                setData={setData}
                handleClickOpen={handleClickOpen}
                progress={verificationIsOpen(process)}
              />
            ))}
          </div>
          {showSPInfoModal && (
            <SPInfoModal
              conteudo={data}
              close={handleClickClose}
              className="PSLinkButton"
            />
          )}
        </div>
        {user.type === 'administrator'
          && (
            <RightPanel
              inputProps={inputProps}
              expandRightPanel={expandRightPanel}
              setExpandRightPanel={setExpandRightPanel}
            />
          )}
        {user.type === 'professor'
          && (
            <RightPanel
              inputProps={inputPropsProfessor}
              expandRightPanel={expandRightPanel}
              setExpandRightPanel={setExpandRightPanel}
            />
          )}
      </div>
      <Footer />
    </div>
  );
}

export default SelectiveProcesses;
