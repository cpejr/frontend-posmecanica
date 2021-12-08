import React from 'react';
import Badge from '@material-ui/core/Badge';
import { MdChatBubble } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../providers/auth';
import { useAdminDoubtContext } from '../../providers/adminDoubt';

export default function Navbar() {
  const { user } = useAuth();
  const { total } = useAdminDoubtContext();
  const location = useLocation();

  return (
    <div className="containerHeader">
      <div className="divLogo">
        <img src="/Images/engrenagem.png" alt="engrenagem" className="logoHeader" />
        <div className="titleHeader">Pós Mecânica UFMG</div>
      </div>
      <div className="headerActions">
        {(location.pathname === '/painel/administrator' || location.pathname === '/painel/administrator/duvidas')
        && user && user.type === 'administrator'
          && (
            <Link to="/painel/administrator/duvidas">
              <Badge badgeContent={total} color="primary">
                <MdChatBubble className="doubtIcon" />
              </Badge>
            </Link>
          )}
      </div>
    </div>
  );
}
