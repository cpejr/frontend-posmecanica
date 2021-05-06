import React from 'react';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import './Navbar.scss';
import { Button } from '@material-ui/core';

export default function Navbar({ expandRightPanel, setExpandRightPanel }) {
  const handleClick = () => {
    setExpandRightPanel(!expandRightPanel);
  };
  const expandIcon = expandRightPanel
    ? <AiOutlineMenuFold className="menuIcon" />
    : <AiOutlineMenuUnfold className="menuIcon" />;
  return (
    <div className="containerHeader">
      <div className="divLogo">
        <img src="/images/engrenagem.png" alt="engrenagem" className="logoHeader" />
        <div className="titleHeader">Pós Mecânica UFMG</div>
      </div>
      <Button className="buttonExpandIcon" onClick={handleClick}>
        {expandIcon}
      </Button>
    </div>
  );
}
