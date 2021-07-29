import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SentDocuments.scss';
import Pagination from '@material-ui/lab/Pagination';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import InfoModal from './InfoModal';
import DocsContent from './DocsContent';
import TestContent from './TestContent';

function SentDocuments({ location }) {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [page, setPage] = useState(1);
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

  return (
    <div className="SD-externalDiv">
      <Navbar />
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
      <Footer />
    </div>
  );
}
export default SentDocuments;
