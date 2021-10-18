import React from 'react';
import DeclarationPDF from '../../../components/PDFs/DeclarationPDF';

function Declaration(props) {
  const studentInfo = props;
  return (
    <DeclarationPDF props={studentInfo.location.state.detail} />
  );
}

export default Declaration;
