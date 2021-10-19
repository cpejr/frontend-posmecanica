import React from 'react';
import FinalCertificatePDF from '../../../components/PDFs/FinalCertificatePDF';

function FinalCertificate(props) {
  const qualiInfo = props;
  return (
    <FinalCertificatePDF props={qualiInfo.location.state.detail} />
  );
}

export default FinalCertificate;
