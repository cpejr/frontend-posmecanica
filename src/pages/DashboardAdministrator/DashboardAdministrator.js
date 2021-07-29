import React from 'react';
import Menu from '../../components/Menu';
import BoxDashboardAdministrator from '../../components/Dashboards/Administrator';

function DashboardAdministrator() {
  const inputProps = [
    {
      text: 'Lista de estudantes',
      path: 'lista-estudantes',
    },
    {
      text: 'Criar processo seletivo',
      path: '/',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
    },
    {
      text: 'Postagens de teses',
      path: '/',
    },
    {
      text: 'Cadastro de professores',
      path: '/',
    },
    {
      text: 'Cadastro de disciplina isolada',
      path: 'cadastro-disciplina',
    },
  ];

  const LeftPanelContent = (
    <BoxDashboardAdministrator />
  );
  return (
    <Menu LeftPanelContent={LeftPanelContent} inputProps={inputProps} />
  );
}

export default DashboardAdministrator;
