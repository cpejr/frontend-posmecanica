import React from 'react';
import { BsFileEarmarkArrowDown } from 'react-icons/bs';

import './StudentDocument.scss';

function StudentDocument({ file }) {
  return (
    <>
      {file && (
        <div className="fileInfo">
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="fileLink"
          >
            <BsFileEarmarkArrowDown style={{ marginRight: 8, minHeight: 18, minWidth: 18 }} size={30} color="#222" />
            <strong>{file.name}</strong>
          </a>
        </div>
      )}
    </>
  );
}

export default StudentDocument;
