import React from 'react';
import CompleteAtaPDF from '../../../components/PDFs/CompleteAtaPDF';

function CompleteAta(props) {
  const defenseInfo = props;
  return (
    <CompleteAtaPDF props={defenseInfo.location.state.detail} />
  );
}

export default CompleteAta;
