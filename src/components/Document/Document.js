import React from 'react';
import './Document.scss';
import { HiDocument } from 'react-icons/hi';

function SentDocuments({ type }) {
  return (
    <div className="Document-externalDiv">
      <div className="Document-icon">
        <HiDocument size="4em" />
      </div>
      <div className="Document-type">
        {type}
      </div>

    </div>
  );
}
export default SentDocuments;
