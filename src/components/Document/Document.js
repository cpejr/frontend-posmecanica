import React from 'react';
import './Document.scss';

function SentDocuments({ children, type, handleClick }) {
  return (
    <div className="Document-externalDiv">
      <div className="Document-icon">
        {children}
      </div>
      <button type="button" onClick={() => handleClick()} className="Document-type">
        {type}
      </button>

    </div>
  );
}
export default SentDocuments;
