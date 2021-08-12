import React, { useState } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import Header from '../Navbar';
import Footer from '../Footer';
import './Menu.scss';

function Menu({ inputProps, LeftPanelContent }) {
  const [expandRightPanel, setExpandRightPanel] = useState(false);

  return (
    <div className="containerDashboard">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="menuDashboard">
        <LeftPanel>
          {LeftPanelContent}
        </LeftPanel>
        <RightPanel
          inputProps={inputProps}
          expandRightPanel={expandRightPanel}
          setExpandRightPanel={setExpandRightPanel}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Menu;
