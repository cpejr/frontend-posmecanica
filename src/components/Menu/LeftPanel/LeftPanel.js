import React from 'react';
import './LeftPanel.scss';

function LeftPanel({ children }) {
  return (
    <div className="leftPanelContainer">
      {children}
    </div>
  );
}

export default LeftPanel;
