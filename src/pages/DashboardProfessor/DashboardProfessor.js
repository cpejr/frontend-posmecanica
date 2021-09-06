import React from 'react';
import { BiBeer } from 'react-icons/bi';
import Menu from '../../components/Menu';
import BoxDashboardProfessor from '../../components/Dashboards/Professor';

function DashboardProfessor() {
  const inputProps = [
    {
      icon: <BiBeer style={{ marginRight: '10px' }} />,
      text: 'Processos Seletivos',
      path: 'processos-seletivos',
    },
    {
      icon: <BiBeer style={{ marginRight: '10px' }} />,
      text: 'Lista de professores',
      path: 'lista-professores',
    },
    {
      icon: <BiBeer style={{ marginRight: '10px' }} />,
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
