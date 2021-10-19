import React from 'react';
import CompleteAtaPDF from '../../../components/PDFs/CompleteAtaPDF';

function CompleteAta(props) {
  const qualiInfo = props;
  return (
    <CompleteAtaPDF props={qualiInfo.location.state.detail} />
  );
}

export default CompleteAta;
