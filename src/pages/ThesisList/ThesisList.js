import React, { useState, useEffect } from 'react';
import { Button, Fab } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Navbar';
import * as managerService from '../../services/manager/managerService';
import { useAuth } from '../../providers/auth';
import StudentDocument from '../../components/StudentDocument';
import RightPanel from '../../components/Menu/RightPanel';

import './thesisList.scss';

const inputProps = [
  {
    text: 'Página Inicial',
    path: 'aluno',
  },
  {
    text: 'Postagem Teses',
    path: 'aluno/postagem-teses',
  },
  {
    text: 'Enviar Dúvida',
    path: 'aluno/duvidas/envio',
  },
  {
    text: 'Meus Documentos',
    path: 'aluno/documentos',
  },
  {
    text: 'Notificações',
    path: 'aluno/notificacoes',
  },
  {
    text: 'Redefinição de senha',
    path: 'esqueci-senha',
  },
];

function StudentDocuments() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToast } = useToasts();
  const history = useHistory();

  useEffect(() => {
    if (user.id) {
      managerService.getThesisList(user.id).then((res) => {
        setDocuments(res);
      }).catch((error) => {
        console.error(error);
        history.push('/');
        addToast('Erro ao buscar teses', { appearance: 'error' });
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [user]);

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
                  <h1 className="sentDocumentsTitle">Minhas Teses:</h1>
                </div>
                <div className="sentDocumentsPost">
                  <Link to="/painel/aluno/postagem-teses">
                    <Button className="button1">Postar +</Button>
                    <Button className="button2">
                      <Fab color="primary">
                        +
                      </Fab>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="sentDocumentsWrapper">
                {documents.map((document) => (
                  <StudentDocument file={document} />
                ))}
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
