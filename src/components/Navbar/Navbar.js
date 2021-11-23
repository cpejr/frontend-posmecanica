import React from 'react';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import './Navbar.scss';
import { Button } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { MdChatBubble } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/auth';
import { useAdminDoubtContext } from '../../providers/adminDoubt';

export default function Navbar({ expandRightPanel, setExpandRightPanel }) {
  const handleClick = () => {
    setExpandRightPanel(!expandRightPanel);
  };
  const { user } = useAuth();
  const { total } = useAdminDoubtContext();

  const expandIcon = expandRightPanel
    ? <AiOutlineMenuFold className="menuIcon" />
    : <AiOutlineMenuUnfold className="menuIcon" />;
  return (
    <div className="containerHeader">
      <div className="divLogo">
        <img src="/images/engrenagem.png" alt="engrenagem" className="logoHeader" />
        <div className="titleHeader">Pós Mecânica UFMG</div>
      </div>
      <div className="headerActions">
        {user && user.type === 'administrator'
          && (
            <Link to="/painel/administrator/duvidas">
              <Badge badgeContent={total} color="primary">
                <MdChatBubble className="doubtIcon" />
              </Badge>
            </Link>
          )}
        <Button className="buttonExpandIcon" onClick={handleClick}>
          {expandIcon}
        </Button>
      </div>
    </div>
  );
}
