import React from 'react';
import './Document.scss';
import * as managerService from '../../services/manager/managerService';

function SentDocuments({
  children,
  candidate,
  type,
  handleClick,
  text,
}) {
  const handleClickShowDocs = async () => {
    const url = await managerService.getUserFiles(candidate, type);
    window.open(`${url[0].url}`);
  };
  return (
    <div className="Document-externalDiv">
      <div className="Document-icon">
        {children}
      </div>
      {text === 'Form'
        && (
          <button type="button" onClick={() => handleClick()} className="Document-type">
            {type}
          </button>
        )}
      {text === 'Docs'
        && (
          <button type="button" onClick={() => handleClickShowDocs(candidate, type)} className="Document-type">
            {type}
          </button>
        )}
    </div>
  );
}
export default SentDocuments;
