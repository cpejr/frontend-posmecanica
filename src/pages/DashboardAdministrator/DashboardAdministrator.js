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
      path: 'criar-processo-seletivo',
    },
    {
      text: 'Visualizar Processos Seletivos',
      path: 'processos-seletivos',
    },
    {
      text: 'Divulgar Defesa de Tese',
      path: 'defesa-de-teses',
    },
    {
      text: 'Cadastro de professores',
      path: 'formulario-professores',
    },
    {
      text: 'Cadastro de disciplina isolada',
      path: 'cadastro-disciplina',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
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
