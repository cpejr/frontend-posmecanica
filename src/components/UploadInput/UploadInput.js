/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { MdLink } from "react-icons/md";
import "./UploadInput.scss";

function UploadInput({ files, fileName, setFiles }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isValidSize, setIsValidSize] = useState(true);

  const handleUpload = (file) => {
    setUploadedFile(null);
    setFiles([...files, { file: null, name: null }]);
    const uploadedFile = file[0];
    if (uploadedFile.size > 1048576) {
      setIsValidSize(false);
      return;
    }
    const uploaded = {
      file: uploadedFile,
      name: uploadedFile.name,
      url: URL.createObjectURL(uploadedFile),
    };
    setUploadedFile(uploaded);
    setFiles([...files, { file: uploadedFile, name: fileName }]);
    setIsValidSize(true);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: "application/pdf",
      maxFiles: 1,
      onDrop: (file) => {
        setIsValidSize(file[0].size <= 1048576);
        handleUpload(file);
      },
    });

  useEffect(() => {
    return () => {
      if (uploadedFile) {
        URL.revokeObjectURL(uploadedFile.url);
      }
    };
  }, [uploadedFile]);

  const renderDragMessage = () => {
    if (!isDragActive) {
      return <p className="uploadMessage">Arraste arquivos aqui...</p>;
    }
    if (isDragReject) {
      return (
        <p className={clsx("uploadMessage", "error")}>Arquivo não suportado</p>
      );
    }
    return (
      <p className={clsx("uploadMessage", "success")}>Solte os arquivos aqui</p>
    );
  };

  return (
    <>
      <div
        {...getRootProps()}
        className={clsx("dropzone", {
          dragActive: isDragActive,
          dragReject: isDragReject,
        })}
      >
        <input {...getInputProps()} />
        {renderDragMessage()}
      </div>
      {!isValidSize && (
        <p className={clsx("uploadMessage", "error")}>
          O arquivo excede o tamanho máximo permitido (1 MB).
        </p>
      )}
      {uploadedFile && (
        <div className="fileInfo">
          <a
            href={uploadedFile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="fileInfoLink"
          >
            <MdLink
              style={{ marginRight: 8, minHeight: 18, minWidth: 18 }}
              size={18}
              color="#222"
            />
            <strong>{uploadedFile.name}</strong>
          </a>
        </div>
      )}
    </>
  );
}

export default UploadInput;
