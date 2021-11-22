/* eslint-disable max-len */
import React from 'react';
import './WarningModal.scss';

function WarningModal({ close, content }) {
  const phrase = `Devido a sucessivas tentativas de login falhas essa conta foi bloqueada temporariamente, tente novamente ${content}`;

  return (
    <div className="WarningModalLogin">
      <div className="WarningModalLoginContainer">
        <div className="WarningModalLoginContainerInside">
          <h2>Aviso</h2>
          <div className="WarningModalContent">
            <b>{phrase}</b>
          </div>
          <div className="WarningModalCloseDiv">
            <button type="button" className="WarningModalCloseButton" onClick={close}>Entendi</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default WarningModal;
