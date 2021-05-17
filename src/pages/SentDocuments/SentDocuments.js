import React, { useEffect, useState } from 'react';
import './SentDocuments.scss';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Document from '../../components/Document';
import DocumentModal from './DocumentModal';

function SentDocuments({ name }) {
  const [showPostModal, setShowPostModal] = useState(false);
  const inscritoModal = async () => {
    setShowPostModal(!showPostModal);
  };
  useEffect(async () => {
    console.log(name);
  }, []);
  return (
    <div className="SD-externalDiv">
      <Navbar />
      <div className="SD-screen">
        <div className="SD-title">
          Documentos Enviados
        </div>
        <div className="SD-personNameTitle">
          Gustavo Almeida Baracho
        </div>
        <div className="SD-documentsDiv">
          <div className="SD-documentsDivLine">
            <Document type="Documento Oficial com Foto" />
            <Document type="Documento Oficial com Foto" />
          </div>
          <div className="SD-documentsDivLine">
            <Document type="Documento Oficial com Foto" />
            <Document type="Documento Oficial com Foto" />
          </div>
          <div className="SD-documentsDivLine">
            <Document type="Documento Oficial com Foto" />
            <Document type="Documento Oficial com Foto" />
          </div>
          <div className="SD-documentsDivLine">
            <Document type="Documento Oficial com Foto" />
            <Document type="Documento Oficial com Foto" />
          </div>
          <div className="SD-documentsDivLine">
            <Document type="Documento Oficial com Foto" />
            <Document type="Documento Oficial com Foto" />
          </div>
        </div>
        <div className="SD-buttons">
          <div className="SD-button-aprovar">
            <button type="submit">
              Aprovar
            </button>
          </div>
          <div className="SD-button-solicitar">
            <button type="submit" onClick={() => inscritoModal()}>
              Solicitar Reenvio de Documentos
            </button>
          </div>
        </div>
        {
      showPostModal && (
      <DocumentModal close={inscritoModal} />
      )
}
      </div>
      <Footer />
    </div>
  );
}
export default SentDocuments;
