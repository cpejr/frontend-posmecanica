import React from 'react';
import Menu from '../../components/Menu';
import BoxDashboardAdministrator from '../../components/Dashboards/Administrator';

function DashboardAdministrator() {
  const inputProps = [
    {
      text: 'Lista de estudantes',
      path: 'administrator/lista-estudantes',
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

  const LeftPanelContent = (
    <BoxDashboardAdministrator />
  );
  return (
    <Menu LeftPanelContent={LeftPanelContent} inputProps={inputProps} />
  );
}

export default DashboardAdministrator;
