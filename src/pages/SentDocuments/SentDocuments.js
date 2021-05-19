import React, { useEffect, useState } from 'react';
import './SentDocuments.scss';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Document from '../../components/Document';
import DocumentModal from './DocumentModal';

function SentDocuments(props) {
  const [showPostModal, setShowPostModal] = useState(false);
  const [candidate, setCandidate] = useState('');
  const inscritoModal = async () => {
    setShowPostModal(!showPostModal);
  };
  useEffect(async () => {
    setCandidate(props.location.state.candidate);
  }, []);
  return (
    <div className="SD-externalDiv">
      <Navbar />
      <div className="SD-screen">
        <div className="SD-title">
          Documentos Enviados
        </div>
        <div className="SD-personNameTitle">
          {candidate.candidate_name}
        </div>
        <div className="SD-documentsDiv">
          <div className="SD-documentsDivLine">
            <Document type="Registro Geral (RG)" />
            <Document type="Cadastro de Pessoa Física (CPF)" />
          </div>
          <div className="SD-documentsDivLine">
            <Document type="Comprovante de Residência" />
            <Document type="Diploma de Graduação" />
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
