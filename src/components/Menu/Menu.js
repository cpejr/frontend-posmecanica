import React from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

function Menu({ RightPanelContent }) {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <LeftPanel />
      <RightPanel>
        {RightPanelContent}
      </RightPanel>
    </div>
  );
}

export default Menu;
