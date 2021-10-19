import React from 'react';
import ThesisQualificationPDF from '../../components/PDFs/ThesisQualificationPDF/ThesisQualificationPDF';

function Qualificaçao(props) {
  const defenseInfo = props;
  return (
    <ThesisQualificationPDF props={defenseInfo.location.state.detail} />
  );
}

export default Qualificaçao;
