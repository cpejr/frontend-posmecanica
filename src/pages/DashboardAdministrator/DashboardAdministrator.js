import React from 'react';
import Menu from '../../components/Menu';
import BoxDashboardAdministrator from '../../components/Dashboards/Administrator';

function DashboardAdministrator() {
  const inputProps = [
    {
      text: 'editar informações',
    },
    {
      text: 'nando sonolento',
    },
    {
      text: 'redefinição de senha',
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
