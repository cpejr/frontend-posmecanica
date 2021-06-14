/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import { MdLink } from 'react-icons/md';
import './UploadInput.scss';

function UploadInput({ files, fileName, setFiles }) {
  const [uploadedFile, setUploadedFile] = useState();
  const handleUpload = (file) => {
    const uploaded = {
      file: file[0],
      name: file[0].name,
      url: URL.createObjectURL(file[0]),
    };
    setUploadedFile(uploaded);
    setFiles([...files, { file: file[0], name: fileName }]);
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: 'application/pdf',
    maxFiles: 1,
    onDrop: (file) => handleUpload(file),
  });

  const renderDragMessage = () => {
    if (!isDragActive) {
      return <p className="uploadMessage">Arraste arquivos aqui...</p>;
    }
    if (isDragReject) {
      return <p className={clsx('uploadMessage', 'error')}>Arquivo não suportado</p>;
    }
    return <p className={clsx('uploadMessage', 'sucess')}>Solte os arquivos aqui</p>;
  };

  return (
    <>
      <div {...getRootProps()} className={clsx('dropzone', { dragActive: isDragActive, dragReject: isDragReject })}>
        <input {...getInputProps()} />
        {renderDragMessage()}
      </div>
      {uploadedFile && (
        <div className="fileInfo">
          <a
            href={uploadedFile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="fileInfoLink"
          >
            <MdLink style={{ marginRight: 8, minHeight: 18, minWidth: 18 }} size={18} color="#222" />
            <strong>{uploadedFile.name}</strong>
          </a>
        </div>
      )}
    </>
  );
}

export default UploadInput;
