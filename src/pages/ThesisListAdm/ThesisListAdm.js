import React, { useState, useEffect } from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Navbar';
import * as managerService from '../../services/manager/managerService';
import StudentDocument from '../../components/StudentDocument';
import RightPanel from '../../components/Menu/RightPanel';
import './ThesisListAdm.scss';

const inputProps = [
  {
    text: 'Página principal',
    path: 'administrator',
  },
  {
    text: 'Criar processo seletivo',
    path: 'administrator/criar-notificacao',
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

function StudentDocuments() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [students, setStudents] = useState([]);
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();

  function Set(e) {
    setId(e);
    setLoad(true);
  }

  useEffect(async () => {
    await managerService.getStudents().then((res) => {
      const student = [];
      res.forEach((object) => {
        student.push({ label: object.candidate_name, value: object.stud_id });
      });
      setStudents(student);
    });
    if (id) {
      await managerService.getThesisList(id).then((res) => {
        setDocuments(res);
        setLoad(false);
      }).catch((error) => {
        console.error(error);
        history.push('/');
        addToast('Erro ao buscar teses', { appearance: 'error' });
      }).finally(() => {
        setLoading(false);
      });
    }
    setLoading(false);
  }, [id]);

  return (
    <div className="sentDocumentsRoot">
      <div className="screen-SentDoubts">
        <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
        {loading ? (
          <div style={{
            height: '72%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          >
            <CircularProgress />
          </div>
        )
          : (
            <>
              <div className="thesisList-header">
                <div className="sentPostTitle">
                  <h1 className="sentDocumentsTitle">Buscar Teses:</h1>
                </div>
              </div>
              <div className="thesisList-grid">
                <div className="thesisList-student">
                  <TextField
                    id="outlined-select-currency"
                    label="Estudante"
                    defaultValue="Selecione um estudante"
                    select
                    onChange={(e) => Set(e.target.value)}
                  >
                    {students.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="thesisList-sentDocumentsWrapper">
                  {load && (
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    >
                      <CircularProgress />
                    </div>
                  )}
                  {!load && (
                    documents.map((document) => (
                      <StudentDocument file={document} />
                    ))
                  )}
                  {documents.length === 0 && id && !load && (
                    <div className="thesisList-NoStudentSelected">
                      <p>~ Não há teses disponíveis para o estudante selecionado ~</p>
                    </div>
                  )}
                  {!id && (
                    <div className="thesisList-NoStudentSelected">
                      <p>~ Selecione um estudante ~</p>
                    </div>
                  )}
                </div>
              </div>
              <RightPanel
                inputProps={inputProps}
                expandRightPanel={expandRightPanel}
                setExpandRightPanel={setExpandRightPanel}
              />
            </>
          )}
        <Footer />
      </div>
    </div>
  );
}

export default StudentDocuments;
