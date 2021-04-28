import React from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

function Menu({ inputProps, RightPanelContent }) {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <LeftPanel inputProps={inputProps} />
      <RightPanel>
        {RightPanelContent}
      </RightPanel>
    </div>
  );
}

export default Menu;
