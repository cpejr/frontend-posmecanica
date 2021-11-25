import React, { useState } from 'react';
import { GoBook } from 'react-icons/go';
import { MdQuestionAnswer } from 'react-icons/md';
import { FaFileCode } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Navbar';
import RightPanel from '../../components/Menu/RightPanel';
import './DashboardAluno.scss';

function DashboardAluno() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const history = useHistory();
  const StyledButton = withStyles({
    label: {
      display: 'flex',
      flexDirection: 'column',
    },
  })(Button);
  const inputProps = [
    {
      text: 'Postagem de Teses',
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

  return (
    <div className="student-Root">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="studentContent">
        <RightPanel
          inputProps={inputProps}
          expandRightPanel={expandRightPanel}
          setExpandRightPanel={setExpandRightPanel}
        />
        <div className="studentGrid">
          <h1 className="studentTitulo">Aluno</h1>
          <div className="icones">
            <StyledButton className="buttonIcon" classes={{ label: 'my' }} onClick={() => history.push('/painel/aluno/teses')}>
              <GoBook style={{ fontSize: 50 }} />
              Teses
            </StyledButton>
            <StyledButton className="buttonIcon" onClick={() => history.push('/painel/aluno/documentos')}>
              <FaFileCode style={{ fontSize: 50 }} />
              Meus Documentos
            </StyledButton>
            <StyledButton className="buttonIcon" onClick={() => history.push('/painel/aluno/notificacoes')}>
              <IoMdNotifications style={{ fontSize: 50 }} />
              Notificações
            </StyledButton>
            <StyledButton className="buttonIcon" onClick={() => history.push('/painel/aluno/duvidas/lista')}>
              <MdQuestionAnswer style={{ fontSize: 50 }} />
              Dúvidas
            </StyledButton>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardAluno;
