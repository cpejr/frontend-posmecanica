import React, { useState, useEffect } from 'react';
import './EditStudentInfo.scss';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Navbar';
import RightPanel from '../../components/Menu/RightPanel';
import StyledInput from '../../components/StyledInput/StyledInput';
import * as managerService from '../../services/manager/managerService';
import StudEdit from '../../utils/StudentEdit_ByAdmin';
import Footer from '../../components/Footer';
import { useAuth } from '../../providers/auth';

function EditStudentInfo({ location }) {
  const history = useHistory();
  const [dados, setDados] = useState();
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const { user } = useAuth();

  // eslint-disable-next-line camelcase
  let stud_id;

  useEffect(() => {
    if (user.type === 'aluno') {
      // eslint-disable-next-line camelcase
      stud_id = user.id;
    } else {
      if (location.state == null || user) {
        window.location = '/login';
      }

      // eslint-disable-next-line camelcase
      stud_id = location.state.stud_id;
    }
  }, []);

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
      text: 'Lista de professores',
      path: 'lista-professores',
    },
    {
      text: 'Cadastro de professores',
      path: 'administrator/formulario-professores',
    },
    {
      text: 'Cadastro de disciplina',
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
    <div className="screen-Edit">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="atualizationContent">
        <div className="campsContent">
          <div className="titleEdit">
            <h1> Atualização Cadastral:</h1>
          </div>
          {StudEdit.map((topic) => (
            <div key={topic.title}>
              <div className="formsDI_box_title">
                <div className="formsEdit-title">
                  {topic.title}
                </div>
              </div>
              <div className="editBox">
                {topic.lines.map((line) => (
                  <div className="formsDI_line">
                    {line.items.map((item) => (
                      <div className={item.className}>
                        <StyledInput
                          type={item.type}
                          shrink={item.type === 'date' ? true : undefined}
                          id={item.id}
                          label={item.label}
                          field={item.field}
                          select={item.select}
                          multiline={item.multiline}
                          rows={item.rows}
                          dados={dados}
                          setDados={handleChange}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="Update-button1">
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
