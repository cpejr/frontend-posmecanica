import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SentDocuments.scss';
import Pagination from '@material-ui/lab/Pagination';
import Header from '../../components/Navbar';
import RightPanel from '../../components/Menu/RightPanel';
import Footer from '../../components/Footer';
import InfoModal from './InfoModal';
import DocsContent from './DocsContent';
import TestContent from './TestContent';

function SentDocuments({ location }) {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [page, setPage] = useState(1);
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const history = useHistory();
  let candidate;
  if (location.state && location.state.candidate) {
    candidate = location.state.candidate;
  } else {
    history.push('/');
  }

  const handleClickClose = () => {
    setShowInfoModal(false);
  };
  const handleChangePag = (e, value) => {
    setPage(value);
  };
  const inputProps = [
    {
      text: 'Página principal',
      path: '',
    },
    {
      text: 'Lista de estudantes',
      path: 'lista-estudantes',
    },
    {
      text: 'Criar processo seletivo',
      path: 'criar-processo-seletivo',
    },
    {
      text: 'Postagens de teses',
      path: '/',
    },
    {
      text: 'Cadastro de professores',
      path: 'formulario-professores',
    },
    {
      text: 'Cadastro de disciplina isolada',
      path: 'cadastro-disciplina',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
    },
  ];
  return (
    <div className="SD-externalDiv">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="SD-screen">
        {candidate && page === 1 && (
          <DocsContent setShowInfoModal={setShowInfoModal} candidate={candidate} />
        )}
        {candidate && page === 2 && <TestContent id={candidate.candidate_id} />}
        {candidate && candidate.candidate_rating === null && (
          <Pagination page={page} className="sentDoc-pagination" count={2} size="small" onChange={handleChangePag} />
        )}
        {candidate && showInfoModal && <InfoModal conteudo={candidate} close={handleClickClose} />}
      </div>
      <RightPanel
        inputProps={inputProps}
        expandRightPanel={expandRightPanel}
        setExpandRightPanel={setExpandRightPanel}
      />
      <Footer />
    </div>
  );
}
export default SentDocuments;
