import React from 'react';
import Menu from '../../components/Menu';
import BoxDashboardProfessor from '../../components/Dashboards/Professor';

function DashboardProfessor() {
  const inputProps = [
    {
      text: 'Processos Seletivos',
      path: 'processos-seletivos',
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

  const LeftPanelContent = (
    <BoxDashboardProfessor />
  );
  return (

    <Menu LeftPanelContent={LeftPanelContent} inputProps={inputProps} />

  );
}

export default DashboardProfessor;
