import React from 'react';
import Menu from '../../components/Menu';
import BoxDashboardAdministrator from '../../components/Dashboards/Administrator';

function DashboardAdministrator() {
  const inputProps = [
    {
      text: 'editar informações',
    },
    {
      text: 'editar informações',
    },
    {
      text: 'redefinição de senha',
    },
  ];

  const RightPanelContent = (
    <BoxDashboardAdministrator />
  );
  return (
    <div style={{ height: '100%' }}>
      <Menu RightPanelContent={RightPanelContent} inputProps={inputProps} />
    </div>
  );
}

export default DashboardAdministrator;
