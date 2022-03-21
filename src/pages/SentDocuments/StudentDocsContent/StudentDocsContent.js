import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../providers/auth';
import Document from '../../../components/Document';
import Header from '../../../components/Navbar';
import RightPanel from '../../../components/Menu/RightPanel';
import Footer from '../../../components/Footer';
import infos from '../../../utils/CandidateDocuments';
import infosIso from '../../../utils/CandidateDocumentsIso';
import InfoModal from '../InfoModal/InfoModal';
import * as managerService from '../../../services/manager/managerService';
import './StudentDocsContent.scss';

const inputProps = [
  {
    text: 'Página principal',
    path: 'aluno',
  },
  {
    text: 'Postagem de Teses',
    path: 'aluno/postagem-teses',
  },
  {
    text: 'Enviar Dúvida',
    path: 'aluno/duvidas/envio',
  },
  {
    text: 'Notificações',
    path: 'aluno/notificacoes',
  },
  {
    text: 'Redefinição de senha',
    path: 'esqueci-senha',
  },
];

function StudentDocsContent() {
  const { user } = useAuth();
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [student, setStudent] = useState([]);
  const [candidate, setCandidate] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToasts();
  const history = useHistory();

  const handleClickInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleClickClose = () => {
    setShowInfoModal(false);
  };

  useEffect(() => {
    if (user.id) {
      managerService.getByIdStudent(user.id).then((res) => {
        setStudent(res);
      }).catch((error) => {
        console.error(error);
        history.push('/');
        addToast('Erro ao buscar documentos', { appearance: 'error' });
      });
    }
  }, [user]);

  useEffect(() => {
    if (student.stud_candidate_id) {
      managerService.getByIdCandidate(student.stud_candidate_id).then((res) => {
        setCandidate(res);
      }).catch((error) => {
        console.error(error);
        history.push('/');
        addToast('Erro ao buscar documentos', { appearance: 'error' });
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [student]);

  const renderLine = (docs) => {
    if (docs.types.length === 1) {
      return (
        <div key={docs.types[0]} className="DC-documentsDivLine">
          <Document handleClick={handleClickInfoModal} type={docs.types[0]} text={docs.text[0]}>
            {docs.icons[0]}
          </Document>
        </div>
      );
    }
    return (
      <div className="DC-documentsDivLine">
        <Document
          type={docs.types[0]}
          candidate={candidate.candidate_id}
          text={docs.text}
        >
          {docs.icons[0]}
        </Document>
        <Document
          type={docs.types[1]}
          candidate={candidate.candidate_id}
          text={docs.text}
        >
          {docs.icons[1]}
        </Document>
        <Document
          type={docs.types[2]}
          candidate={candidate.candidate_id}
          text={docs.text}
        >
          {docs.icons[2]}
        </Document>
        <Document
          type={docs.types[3]}
          candidate={candidate.candidate_id}
          text={docs.text}
        >
          {docs.icons[3]}
        </Document>
        <Document
          type={docs.types[5]}
          candidate={candidate.candidate_id}
          text={docs.text}
        >
          {docs.icons[5]}
        </Document>
        {candidate.candidate_grade === 'DOUTORADO'
          && (
            <Document
              type={docs.types[4]}
              candidate={candidate.candidate_id}
              text={docs.text}
            >
              {docs.icons[4]}
            </Document>
          )}
        {candidate.candidate_race === 'indígena'
          && (
            <Document
              type={docs.types[9]}
              candidate={candidate.candidate_id}
              text={docs.text}
            >
              {docs.icons[9]}
            </Document>
          )}
        {candidate.candidate_PcD === true
          && (
            <Document
              type={docs.types[10]}
              candidate={candidate.candidate_id}
              text={docs.text}
            >
              {docs.icons[10]}
            </Document>
          )}
        {(candidate.candidate_nationality.toLowerCase() === 'brasileiro' || candidate.candidate_nationality.toLowerCase() === 'brasileira')
          ? (
            <>
              <Document
                type={docs.types[6]}
                candidate={candidate.candidate_id}
                text={docs.text}
              >
                {docs.icons[6]}
              </Document>

              {candidate.candidate_gender === 'masculino'
                && (
                  <Document
                    type={docs.types[7]}
                    candidate={candidate.candidate_id}
                    text={docs.text}
                  >
                    {docs.icons[7]}
                  </Document>
                )}
            </>
          ) : (
            <Document
              type={docs.types[8]}
              candidate={candidate.candidate_id}
              text={docs.text}
            >
              {docs.icons[8]}
            </Document>
          )}
      </div>
    );
  };

  const renderLineIso = (docs) => {
    if (docs.types.length === 1) {
      return (
        <div key={docs.types[0]} className="DC-documentsDivLine">
          <Document handleClick={handleClickInfoModal} type={docs.types[0]} text={docs.text[0]}>
            {docs.icons[0]}
          </Document>
        </div>
      );
    }
    return (
      <div className="DC-documentsDivLine">
        <Document
          type={docs.types[0]}
          candidate={candidate.candidate_id}
          text={docs.text}
        >
          {docs.icons[0]}
        </Document>
        <Document
          type={docs.types[1]}
          candidate={candidate.candidate_id}
          text={docs.text}
        >
          {docs.icons[1]}
        </Document>
        <Document
          type={docs.types[2]}
          candidate={candidate.candidate_id}
          text={docs.text}
        >
          {docs.icons[2]}
        </Document>
        {candidate.candidate_grade === 'DOUTORADO'
          && (
            <Document
              type={docs.types[3]}
              candidate={candidate.candidate_id}
              text={docs.text}
            >
              {docs.icons[3]}
            </Document>
          )}
      </div>
    );
  };

  const renderInfo = (info) => (
    <div key={info.text} className="DC-infoContainer">
      <div className="DC-personNameTitle">
        {info.subText}
      </div>
      {info.docs.map((line) => renderLine(line))}
    </div>
  );

  const renderInfoIso = (info) => (
    <div key={info.text} className="DC-infoContainer">
      <div className="DC-personNameTitle">
        {info.text}
      </div>
      {info.docs.map((line) => renderLineIso(line))}
    </div>
  );

  return (
    <div className="sentDocumentsRoot">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      {loading ? (
        <div style={{
          height: '72%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <CircularProgress />
        </div>
      )
        : (
          <>
            <div className="DC-title">
              Documentos Enviados
            </div>
            <div className="DC-documentsDiv">
              {candidate.candidate_grade === 'NENHUMA DAS OPÇÕES' ? (
                infosIso.map((info) => renderInfoIso(info))
              ) : (
                infos.map((info) => renderInfo(info))
              )}
              {candidate && showInfoModal
                && <InfoModal painelADM={0} conteudo={candidate} close={handleClickClose} />}
            </div>
          </>
        )}
      <RightPanel
        inputProps={inputProps}
        expandRightPanel={expandRightPanel}
        setExpandRightPanel={setExpandRightPanel}
      />
      <Footer />
    </div>
  );
}
export default StudentDocsContent;
