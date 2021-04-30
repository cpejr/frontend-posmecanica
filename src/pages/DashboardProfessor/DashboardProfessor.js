import React from 'react';
import { BiBeer } from 'react-icons/bi';
import Menu from '../../components/Menu';
import BoxDashboardProfessor from '../../components/Dashboards/Professor';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';

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

  const RightPanelContent = (
    <BoxDashboardProfessor />
  );
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Header />
      <Menu RightPanelContent={RightPanelContent} inputProps={inputProps} />
      <Footer />
    </div>
  );
}

export default DashboardProfessor;
