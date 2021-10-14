import React from 'react';
import CertificatePDF from '../../../components/PDFs/CertificatePDF';

function CertificateReport(props) {
  const defenseInfo = props;
  return (
    <CertificatePDF props={defenseInfo.location.state.detail} />
  );
}

export default CertificateReport;
