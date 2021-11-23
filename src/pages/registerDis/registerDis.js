import React, { useState, useEffect } from 'react';
import './registerDis.scss';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Header from '../../components/Navbar';
import StyledInput from '../../components/StyledInput';
import enumm from '../../utils/enum';
import boolean from '../../utils/boolean';
import semester from '../../utils/semester';
import RightPanel from '../../components/Menu/RightPanel';
import Footer from '../../components/Footer';
import * as managerService from '../../services/manager/managerService';

const booleans = boolean;
const initialState = {
  discipline_name: '',
  discipline_code: '',
  discipline_is_isolated: '',
  discipline_semester: '',
  discipline_type: '',
  discipline_content: '',
};

function registerDis() {
  const [professorsList, setProfessorsList] = useState([]);
  const [error, setError] = useState(false);
  const [dados, setDados] = useState(initialState);
  const [prof, setProf] = useState();
  const history = useHistory();
  const { addToast } = useToasts();

  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  const handleChangeProfessor = (value, field) => {
    setProf({ ...prof, [field]: value });
  };

  useEffect(async () => {
    managerService.getAllProfessors().then((response) => {
      const professors = [];
      response.forEach((object) => {
        professors.push({ label: object.prof_name, value: object.prof_id });
      });
      setProfessorsList(professors);
    });
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    if (dados.discipline_name.length > 3
      && dados.discipline_code.length > 3
      && dados.discipline_semester.length > 3
      && dados.discipline_is_isolated !== ''
      && dados.discipline_type.length !== ''
      && dados.discipline_content.length > 3) {
      await managerService.createDiscipline(dados, prof);
      history.push('/painel/administrator/');
      addToast('Cadastro realizado com sucesso!', { appearance: 'success' });
    } else {
      addToast('Preencha todos os campos!', { appearance: 'error' });
      setError(true);
    }
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
      text: 'Visualizar Processos Seletivos',
      path: 'processos-seletivos',
    },
    {
      text: 'Cadastro de professores',
      path: 'administrator/formulario-professores',
    },
    {
      text: 'Enviar Notificação',
      path: 'administrator/criar-notificacao',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
    },
  ];
  return (
    <div className="screen-ps-registerDis">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <h1 className="title_registerDiscipline"> Cadastro de Disciplinas:</h1>
      <div className="form_dis_cad_box_title">
        <div className="form_dis_cad_title">
          Dados da Disciplina
        </div>
      </div>
      <div className="form_dis_cad_requerente">
        <div className="form_dis_cad_box">
          <div className="form_dis_cad_line">
            <div className="input-content">
              <div className="form_dis_cad_input">
                <StyledInput
                  type="text"
                  id="discipline_name"
                  label="Nome"
                  dados={dados}
                  error={error}
                  setDados={handleChange}
                />
              </div>
            </div>
            <div className="input-content">
              <div className="form_dis_cad_input">
                <StyledInput
                  type="text"
                  id="prof_id"
                  label="Professor Responsável"
                  select
                  error={error}
                  field={professorsList}
                  dados={prof}
                  setDados={handleChangeProfessor}
                />
              </div>
            </div>
            <div className="input-content">
              <div className="form_dis_cad_input" />
              <StyledInput
                type="text"
                id="discipline_code"
                label="Código da Disciplina"
                error={error}
                dados={dados}
                setDados={handleChange}
              />
            </div>
            <div className="form_dis_cad_line2">
              <div className="form_dis_cad_input">
                <StyledInput
                  type="text"
                  id="discipline_semester"
                  label="Período Ofertado"
                  error={error}
                  select
                  field={semester}
                  dados={dados}
                  setDados={handleChange}
                />
              </div>
              <div className="form_dis_cad_input">
                <StyledInput
                  type="text"
                  id="discipline_is_isolated"
                  label="Disciplina Isolada"
                  error={error}
                  field={booleans}
                  select
                  dados={dados}
                  setDados={handleChange}
                />
                <div className="form_dis_cad_input" />
                <StyledInput
                  type="text"
                  id="discipline_type"
                  label="Conteúdo"
                  field={enumm}
                  error={error}
                  select
                  dados={dados}
                  setDados={handleChange}
                />
              </div>
              <div className="form_dis_cad_input" />
              <StyledInput
                type="text"
                id="discipline_content"
                label="Descrição"
                error={error}
                dados={dados}
                setDados={handleChange}
              />
            </div>
            <div className="divButton-cad">
              <button type="submit" onClick={handleClick}> Cadastrar </button>
            </div>
          </div>
        </div>
      </div>
      <RightPanel
        inputProps={inputProps}
        expandRightPanel={expandRightPanel}
        setExpandRightPanel={setExpandRightPanel}
      />
      <Footer />
    </div>
  );
}
export default registerDis;
