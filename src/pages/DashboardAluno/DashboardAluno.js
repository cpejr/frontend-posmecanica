import React, { useState } from 'react';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Navbar';
import RightPanel from '../../components/Menu/RightPanel';
import './DashboardAluno.scss';

function DashboardAluno() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const StyledButton = withStyles({
    label: {
      display: 'flex',
      flexDirection: 'column',
    },
  })(Button);
  const inputProps = [
    {
      text: 'Notas',
      path: '/',
    },
    {
      text: 'Teses',
      path: '/',
    },
    {
      text: 'Editar Informações',
      path: '/',
    },
    {
      text: 'Dúvidas',
      path: '/',
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
        <RightPanel inputProps={inputProps} expandRightPanel={expandRightPanel} />
        <div className="studentGrid">
          <h1 className="studentTitulo">Aluno</h1>
          <div className="icones">
            <StyledButton className="buttonIcon" classes={{ label: 'my' }}>
              <MenuBookIcon style={{ fontSize: 50 }} />
              Teses
            </StyledButton>
            <StyledButton className="buttonIcon">
              <FileCopyIcon style={{ fontSize: 50 }} />
              Meus Documentos
            </StyledButton>
            <StyledButton className="buttonIcon">
              <NotificationsIcon style={{ fontSize: 50 }} />
              Notificações
            </StyledButton>
            <StyledButton className="buttonIcon">
              <BorderColorIcon style={{ fontSize: 50 }} />
              Editar Informações
            </StyledButton>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardAluno;
