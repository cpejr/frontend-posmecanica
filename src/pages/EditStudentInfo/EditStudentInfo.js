import React, { useState } from 'react';
import './EditStudentInfo.scss';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Navbar';
import RightPanel from '../../components/Menu/RightPanel';
import StyledInput from '../../components/StyledInput/StyledInput';
import * as managerService from '../../services/manager/managerService';
import StudEdit from '../../utils/StudentEdit_ByAdmin';
import Footer from '../../components/Footer';

function EditStudentInfo({ location }) {
  const history = useHistory();
  const [dados, setDados] = useState();
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  if (location.state == null) {
    window.location = '/login';
  }
  const { stud_id } = location.state; // eslint-disable-line
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
      text: 'Criar processo seletivo',
      path: 'administrator/criar-processo-seletivo',
    },
    {
      text: 'Visualizar Processos Seletivos',
      path: 'processos-seletivos',
    },
    {
      text: 'Divulgar Defesa de Tese',
      path: 'administrator/defesa-de-teses',
    },
    {
      text: 'Lista de professores',
      path: 'lista-professores',
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
  const { addToast } = useToasts();
  const handleClick = async (e) => {
    try {
      e.preventDefault();
      await managerService.updateStudent(dados, stud_id);
      addToast('Cadastro atualizado com sucesso!', { appearance: 'success' });
      history.push('/painel/administrator/lista-estudantes');
    } catch {
      addToast('Falha em atualizar o cadastro!', { appearance: 'error' });
    }
  };
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  return (
    <div className="screen-ps">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="atualizationContent">
        <div className="campsContent">
          <div className="titleEdit">
            <h1> Atualização Cadastral:</h1>
          </div>
          {StudEdit.map((topic) => (
            <div key={topic.title}>
              <div className="formsDI_box_title">
                <div className="formsDI_title">
                  {topic.title}
                </div>
              </div>
              {topic.lines.map((line) => (
                <div className="formsDI_line">
                  {line.items.map((item) => (
                    <div className="formsDI_input">
                      <StyledInput
                        type={item.type}
                        shrink={item.type === 'date' ? true : undefined}
                        id={item.id}
                        label={item.label}
                        width={item.width}
                        field={item.field}
                        select={item.select}
                        dados={dados}
                        setDados={handleChange}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <div className="Login-button1">
            <button type="submit" onClick={handleClick}>Atualizar</button>
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

export default EditStudentInfo;
