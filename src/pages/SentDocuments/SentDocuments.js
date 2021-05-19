import React, { useEffect, useState } from 'react';
import './SentDocuments.scss';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Document from '../../components/Document';
import DocumentModal from './DocumentModal';
import * as managerService from '../../services/manager/managerService';

function SentDocuments({ id }) {
  const [showPostModal, setShowPostModal] = useState(false);
  const inscritoModal = async () => {
    setShowPostModal(!showPostModal);
  };
  const [candidato, setCandidato] = useState([]);
  useEffect(async () => {
    const candidate = await managerService.getByIdCandidate('32068f61-d55e-4662-bcac-dda91f0eae49');
    setCandidato(candidate);
    console.log(id);
  }, []);
  return (
    <div className="SD-externalDiv">
      <Navbar />
      <div className="SD-screen">
        <div className="SD-title">
          Documentos Enviados
        </div>
        <div className="SD-personNameTitle">
          {candidato.candidate_name}
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
