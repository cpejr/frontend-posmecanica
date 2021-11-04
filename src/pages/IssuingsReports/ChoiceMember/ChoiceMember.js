import React from 'react';
import ChoiceMemberPDF from '../../../components/PDFs/ChoiceMemberPDF';

function ChoiceMember(props) {
  const qualiInfo = props;
  return (
    <ChoiceMemberPDF props={qualiInfo.location.state.detail} />
  );
}

export default ChoiceMember;
