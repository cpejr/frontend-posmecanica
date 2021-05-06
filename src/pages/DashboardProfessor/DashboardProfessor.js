import React from 'react';
import { BiBeer } from 'react-icons/bi';
import Menu from '../../components/Menu';
import BoxDashboardProfessor from '../../components/Dashboards/Professor';

function DashboardProfessor() {
  const inputProps = [
    {
      icon: <BiBeer />,
      text: 'Inbox',
    },
    {
      icon: <BiBeer />,
      text: 'Starred',
    },
    {
      icon: <BiBeer />,
      text: 'Send email',
    },
    {
      icon: <BiBeer />,
      text: 'Drafts',
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
