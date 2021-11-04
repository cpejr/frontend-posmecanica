import React from 'react';
import DisciplinesResultPDF from '../../../components/PDFs/DisciplinesResultPDF';

function ProcessSelectiveResult(props) {
  const processInfo = props;
  return (
    <DisciplinesResultPDF props={processInfo.location.state.detail} />
  );
}

export default ProcessSelectiveResult;
