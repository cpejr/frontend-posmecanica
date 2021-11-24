import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import StyledInput from '../../components/StyledInput';
import RightPanel from '../../components/Menu/RightPanel';
import * as managerService from '../../services/manager/managerService';
import Isolateds from '../../components/Isolateds';
import '../StudentsList/StudentList.scss';

function IsolatedList() {
  const [allIsoladas, setAllIsoladas] = useState([]);
  const [filterIsoladas, setFilterIsoladas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterName, setFilterName] = useState();
  const [expandRightPanel, setExpandRightPanel] = useState(false);

  useEffect(async () => {
    if (filterIsoladas) {
      setLoading(true);
      const isoladas = await managerService.getDisciplines();
      setAllIsoladas(isoladas);
      setFilterIsoladas(isoladas);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let initialIsoladas = allIsoladas;
    if (filterName) {
      initialIsoladas = initialIsoladas.filter(
        (discipline) => discipline.discipline_name.toLowerCase().includes(filterName.toLowerCase()),
      );
    }
    setFilterIsoladas(initialIsoladas);
  }, [filterName]);

  const handleFilterNameChange = (value) => {
    setFilterName(value);
  };
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
      text: 'Lista de professores',
      path: 'lista-professores',
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
      text: 'Visualizar Teses',
      path: 'administrator/teses',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
    },
  ];
  return (
    <div className="studentList-Root">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="studentList-Content">
        <div className="studentList-LeftContainer">
          <h1>Lista de Disciplinas Isoladas</h1>
          <div className="studentList-Filters">
            <div className="studentList-FiltersDIVInside">
              <StyledInput
                styled={{ marginTop: '20px' }}
                type="text"
                id="filter-name"
                label="Disciplina"
                width="40%"
                dados={filterName}
                setDados={handleFilterNameChange}
              />
            </div>
          </div>
          <div className={loading ? 'gridLoadTrue' : 'gridAll'}>
            {loading === true && (
              <div className="gridLoaderTrue">
                <CircularProgress size={32} color="inherit" className="LoaderProfCandidates" />
              </div>
            )}
            {filterIsoladas.map((isoladas) => (
              <div className="formsDI_input_list">
                <Isolateds
                  isolated={isoladas}
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

export default IsolatedList;
