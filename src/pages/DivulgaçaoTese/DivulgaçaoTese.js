import React from 'react';
import ThesisDefensePDF from '../../components/PDFs/ThesisDefensePDF/ThesisDefensePDF';

function Divulgaçao(props) {
  const defenseInfo = props;
  return (
    <ThesisDefensePDF props={defenseInfo.location.state.detail} />
  );
}

export default Divulgaçao;
