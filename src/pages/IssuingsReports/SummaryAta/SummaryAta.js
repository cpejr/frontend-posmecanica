import React from 'react';
import SummaryAtaPDF from '../../../components/PDFs/SummaryAtaPDF/SummaryAtaPDF';

function SummaryAta(props) {
  const qualiInfo = props;
  return (
    <SummaryAtaPDF props={qualiInfo.location.state.detail} />
  );
}

export default SummaryAta;
