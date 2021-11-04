import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SentDocuments.scss';
import Pagination from '@material-ui/lab/Pagination';
import Header from '../../components/Navbar';
import RightPanel from '../../components/Menu/RightPanel';
import Footer from '../../components/Footer';
import InfoModal from './InfoModal';
import DocsContent from './DocsContent';
import ApproveContent from './ApproveContent';

function SentDocuments({ location }) {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [page, setPage] = useState(1);
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const history = useHistory();
  const [wasApproved, setWasApproved] = useState(false);
  let candidate;
  if (location.state && location.state.candidate) {
    candidate = location.state.candidate;
  } else {
    history.push('/');
  }
  useEffect(() => {
    setWasApproved(candidate.candidate_form_approval);
  });
  const handleClickClose = () => {
    setShowInfoModal(false);
  };
  const handleChangePag = (e, value) => {
    setPage(value);
  };
  const inputProps = [
    {
      text: 'Página principal',
      path: 'administrator',
    },
    {
      text: 'Lista de estudantes',
      path: 'administrator/lista-estudantes',
    },
    {
      text: 'Lista de Disciplinas',
      path: 'administrator/lista-isoladas',
    },
    {
      text: 'Criar processo seletivo',
      path: 'administrator/criar-processo-seletivo',
    },
    {
      text: 'Visualizar Processos Seletivos',
      path: 'processos-seletivos',
    },
    {
      text: 'Lista de professores',
      path: 'lista-professores',
    },
    {
      text: 'Cadastro de professores',
      path: 'administrator/formulario-professores',
    },
    {
      text: 'Cadastro de disciplina isolada',
      path: 'administrator/cadastro-disciplina',
    },
    {
      text: 'Redefinição de senha',
      path: '../esqueci-senha',
    },
  ];

  return (
    <div className="SD-externalDiv">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="SD-screen">
        {candidate && page === 1 && (
          <DocsContent
            setShowInfoModal={setShowInfoModal}
            setHasChanged={setWasApproved}
            id={candidate.candidate_id}
            candidate={candidate}
          />
        )}
        {candidate && page === 2 && <ApproveContent candidate={candidate} />}
        {candidate && wasApproved && (
          <Pagination page={page} className="sentDoc-pagination" count={2} size="small" onChange={handleChangePag} />
        )}
        {candidate && showInfoModal
          && <InfoModal painelADM={0} conteudo={candidate} close={handleClickClose} />}
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
